/**
 * trendsData.js
 * Derives all chart-ready data structures from the MODELS array.
 * Uses params[] as the source of truth for sizes.
 */
import { MODELS } from '../data/models';

// ── 1. Models per year ────────────────────────────────────────────────────────
export function getModelsPerYear() {
  const counts = {};
  MODELS.forEach(m => { counts[m.year] = (counts[m.year] || 0) + 1; });
  return Object.entries(counts)
    .sort(([a], [b]) => Number(a) - Number(b))
    .map(([year, count]) => ({ year: Number(year), count }));
}

// ── 2. Cumulative model count over time ───────────────────────────────────────
export function getCumulativeGrowth() {
  const sorted = [...MODELS].sort((a, b) =>
    a.year !== b.year ? a.year - b.year : a.month - b.month
  );
  let total = 0;
  const byYearMonth = {};
  sorted.forEach(m => {
    total += 1;
    const key = `${m.year}-${String(m.month).padStart(2, '0')}`;
    byYearMonth[key] = { year: m.year, month: m.month, total };
  });
  return Object.values(byYearMonth).map(({ year, month, total }) => ({
    label: `${year}-${String(month).padStart(2, '0')}`,
    year, month, total,
  }));
}

// ── 3. Parameter size over time (scatter) ────────────────────────────────────
// Uses minParams from params[] — smallest (on-device viable) variant
export function getSizeOverTime() {
  return MODELS
    .map(m => {
      const onDevice = (m.params ?? []).filter(p => p <= 14);
      return {
        name:     m.name,
        org:      m.org,
        modality: m.modality,
        year:     m.year,
        month:    m.month,
        x:        m.year + (m.month - 1) / 12,
        params:   m.params ?? [],
        // sizeM in millions — largest on-device variant (≤14B) as family representative
        sizeM: onDevice.length ? Math.max(...onDevice) * 1000 : null,
      };
    })
    .filter(m => m.sizeM !== null)
    .sort((a, b) => a.x - b.x);
}

// ── 4. Org breakdown ──────────────────────────────────────────────────────────
export function getOrgBreakdown(topN = 8) {
  const counts = {};
  MODELS.forEach(m => { counts[m.org] = (counts[m.org] || 0) + 1; });
  const sorted = Object.entries(counts)
    .sort(([, a], [, b]) => b - a)
    .map(([org, count]) => ({ org, count }));
  if (sorted.length <= topN) return sorted;
  const top = sorted.slice(0, topN);
  const otherCount = sorted.slice(topN).reduce((s, { count }) => s + count, 0);
  return [...top, { org: 'Others', count: otherCount }];
}

// ── 5. Modality distribution over time ───────────────────────────────────────
// Groups vision-language + multimodal together as "visual" for the stacked bar,
// keeps text-encoder separate, reasoning separate.
export function getModalityByYear() {
  const byYear = {};
  MODELS.forEach(m => {
    if (!byYear[m.year]) byYear[m.year] = {
      year: m.year,
      text: 0,
      'text-encoder': 0,
      'vision-language': 0,
      multimodal: 0,
      reasoning: 0,
    };
    byYear[m.year][m.modality] = (byYear[m.year][m.modality] || 0) + 1;
  });
  return Object.values(byYear).sort((a, b) => a.year - b.year);
}

// Legacy alias used by TypeByYearChart — maps old type keys to new modality keys
export function getTypeByYear() {
  return getModalityByYear();
}

// ── 6. Open weights vs closed by year ─────────────────────────────────────────
export function getOpenWeightsByYear() {
  const byYear = {};
  MODELS.forEach(m => {
    if (!byYear[m.year]) byYear[m.year] = { year: m.year, open: 0, closed: 0 };
    if (m.open_weights) byYear[m.year].open++;
    else                byYear[m.year].closed++;
  });
  return Object.values(byYear).sort((a, b) => a.year - b.year);
}

// ── 7. Tier 1 (edge-native) vs Tier 2 by year ────────────────────────────────
export function getTierByYear() {
  const byYear = {};
  MODELS.forEach(m => {
    if (!byYear[m.year]) byYear[m.year] = { year: m.year, tier1: 0, tier2: 0 };
    if (m.edge_native) byYear[m.year].tier1++;
    else               byYear[m.year].tier2++;
  });
  return Object.values(byYear).sort((a, b) => a.year - b.year);
}

// ── 8. Provenance (academia / industry / collaboration) by year ───────────────
export function getProvenanceByYear() {
  const byYear = {};
  MODELS.forEach(m => {
    if (!byYear[m.year]) byYear[m.year] = { year: m.year, academia: 0, industry: 0, collaboration: 0 };
    const key = m.provenance;
    if (key in byYear[m.year]) byYear[m.year][key]++;
  });
  return Object.values(byYear).sort((a, b) => a.year - b.year);
}

// ── 9. Size variants (one entry per param variant — for bubble scatter) ──────
export function getSizeVariants() {
  const entries = [];
  MODELS.forEach(m => {
    if (!m.params?.length) return;
    m.params.filter(p => p <= 14).forEach(p => {
      entries.push({
        name:     m.name,
        org:      m.org,
        modality: m.modality,
        year:     m.year,
        month:    m.month,
        x:        m.year + (m.month - 1) / 12,
        sizeM:    p * 1000,
        // sqrt-scaled z for ZAxis — compresses the 14M→14B range into readable bubble sizes
        z:        Math.sqrt(p * 1000),
      });
    });
  });
  return entries.sort((a, b) => a.x - b.x);
}

// ── 10b. Size histogram (all variants ≤ 14B grouped by exact param size) ─────
export function getSizeHistogram() {
  const counts = {};
  MODELS.forEach(m => {
    (m.params ?? []).filter(p => p <= 14).forEach(p => {
      counts[p] = (counts[p] || 0) + 1;
    });
  });
  // Sort by numeric value, format label
  return Object.entries(counts)
    .map(([size, count]) => {
      const p = Number(size);
      const label = p < 1 ? `${Math.round(p * 1000)}M` : `${p}B`;
      return { label, count, sizeB: p };
    })
    .sort((a, b) => a.sizeB - b.sizeB);
}

// ── 10. Size distribution (by minimum variant, in billions) ───────────────────
const SIZE_BUCKETS = [
  { label: '<500M',  min: 0,   max: 0.5  },
  { label: '0.5–1B', min: 0.5, max: 1    },
  { label: '1–3B',   min: 1,   max: 3    },
  { label: '3–7B',   min: 3,   max: 7    },
  { label: '7–14B',  min: 7,   max: 14   },
];

export function getSizeDistribution() {
  // Explode all variants ≤ 14B, then bucket
  const variants = [];
  MODELS.forEach(m => {
    (m.params ?? []).filter(p => p <= 14).forEach(p => variants.push(p));
  });
  return SIZE_BUCKETS.map(b => ({
    label: b.label,
    count: variants.filter(p => p >= b.min && p < b.max).length,
  }));
}