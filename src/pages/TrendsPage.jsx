/**
 * TrendsPage.jsx
 * Insights & Trends — visualises the full MODELS dataset.
 * Two tabs: Size (scatter plots) and Ecosystem (growth and composition).
 */
import { useState } from 'react';
import { ATLAS_STATS } from '../utils/atlasStats';
import { MODELS } from '../data/models';
import ModelsPerYearChart    from '../components/charts/ModelsPerYearChart';
import CumulativeGrowthChart  from '../components/charts/CumulativeGrowthChart';
import SizeOverTimeChart      from '../components/charts/SizeOverTimeChart';
import OrgBreakdownChart      from '../components/charts/OrgBreakdownChart';
import TypeByYearChart        from '../components/charts/TypeByYearChart';
import OpenWeightsChart       from '../components/charts/OpenWeightsChart';
import TierGrowthChart        from '../components/charts/TierGrowthChart';
import ProvenanceChart        from '../components/charts/ProvenanceChart';
import SizeDistributionChart  from '../components/charts/SizeDistributionChart';
import SizeVariantsChart      from '../components/charts/SizeVariantsChart';

// ── Derived callout stats ────────────────────────────────────────────────────
function deriveInsights() {
  const reasoningModels = MODELS.filter(m => m.modality === 'reasoning');
  const firstReasoning  = reasoningModels.reduce((best, m) =>
    m.year < best.year || (m.year === best.year && m.month < best.month) ? m : best,
    reasoningModels[0]
  );

  const models2024plus  = MODELS.filter(m => m.year >= 2024).length;
  const pct2024plus     = Math.round((models2024plus / MODELS.length) * 100);

  const orgs            = new Set(MODELS.map(m => m.org));
  const multimodalCount = MODELS.filter(m => m.modality === 'vision-language' || m.modality === 'multimodal').length;

  return {
    total:          MODELS.length,
    orgs:           orgs.size,
    pct2024plus,
    multimodalCount,
    reasoningCount: reasoningModels.length,
    firstReasoningYear: firstReasoning?.year ?? 'N/A',
  };
}

const INSIGHTS = deriveInsights();

const CALLOUTS = [
  {
    value: `${INSIGHTS.pct2024plus}%`,
    label: 'of all entries released since 2024',
    note:  'The field accelerated sharply',
  },
  {
    value: `${INSIGHTS.reasoningCount}`,
    label: 'reasoning-capable models',
    note:  `First appeared ${INSIGHTS.firstReasoningYear}`,
  },
  {
    value: `${INSIGHTS.multimodalCount}`,
    label: 'vision + multimodal models',
    note:  'Vision-language & multimodal',
  },
  {
    value: `${INSIGHTS.orgs}`,
    label: 'organisations represented',
    note:  'Across academia and industry',
  },
];

const TAB_DESCRIPTIONS = {
  size:      'Parameter counts over time and variant breadth across the full registry.',
  ecosystem: 'Release cadence, org composition, modality mix, and ecosystem growth.',
};

function StatCallout({ value, label, note, t }) {
  return (
    <div className={`p-6 rounded-2xl border text-center ${t.card}`}>
      <div className={`text-4xl font-black tracking-tighter mb-1 ${t.accent}`}>{value}</div>
      <div className={`text-[11px] font-black uppercase tracking-widest mb-1 ${t.yearLabel}`}>{label}</div>
      <div className={`text-[10px] font-medium ${t.muted}`}>{note}</div>
    </div>
  );
}

export default function TrendsPage({ isDark, t }) {
  const [tab, setTab] = useState('size');

  return (
    <div className="max-w-[1100px] mx-auto px-4 pb-24">

      {/* Hero */}
      <div className="mb-16 pt-4">
        <span className={`text-[10px] font-black uppercase tracking-[0.6em] ${t.accent}`}>
          Insights
        </span>
        <h2 className={`text-6xl font-black tracking-tighter mt-3 mb-6 ${t.yearLabel}`}>
          Trends &<br />Statistics
        </h2>
      </div>

      {/* Stat callouts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-14">
        {CALLOUTS.map(c => (
          <StatCallout key={c.label} {...c} t={t} />
        ))}
      </div>

      {/* Tab switcher */}
      <div className="mb-8">
        <div className={`inline-flex items-center gap-0.5 p-0.5 rounded-xl border ${
          isDark ? 'border-[#1E2533] bg-[#1E2533]/20' : 'border-[#E5E5E5] bg-[#F5F5F5]'
        }`}>
          <button
            onClick={() => setTab('size')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[10px] font-bold uppercase tracking-[0.2em] font-mono transition-all ${
              tab === 'size'
                ? 'bg-blue-500 text-white shadow-md'
                : isDark ? 'text-[#4A5568] hover:text-[#E2E8F0]' : 'text-[#737373] hover:text-[#171717]'
            }`}
          >Size</button>
          <button
            onClick={() => setTab('ecosystem')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-[10px] text-[10px] font-bold uppercase tracking-[0.2em] font-mono transition-all ${
              tab === 'ecosystem'
                ? 'bg-blue-500 text-white shadow-md'
                : isDark ? 'text-[#4A5568] hover:text-[#E2E8F0]' : 'text-[#737373] hover:text-[#171717]'
            }`}
          >Ecosystem</button>
        </div>
        <p className={`mt-2 text-[11px] font-medium ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
          {TAB_DESCRIPTIONS[tab]}
        </p>
      </div>

      {/* Size tab: scatter plots */}
      {tab === 'size' && (
        <div className="space-y-6">
          <SizeVariantsChart isDark={isDark} t={t} height={420} />
          <SizeOverTimeChart isDark={isDark} t={t} height={420} />
        </div>
      )}

      {/* Ecosystem tab: growth and composition */}
      {tab === 'ecosystem' && (
        <div className="space-y-6">
          {/* Row 1 — Releases per year + Cumulative growth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ModelsPerYearChart  isDark={isDark} t={t} />
            <CumulativeGrowthChart isDark={isDark} t={t} />
          </div>

          {/* Row 2 — Org breakdown + Type by year */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrgBreakdownChart isDark={isDark} t={t} />
            <TypeByYearChart   isDark={isDark} t={t} />
          </div>

          {/* Row 3 — Open weights + Tier growth */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OpenWeightsChart isDark={isDark} t={t} />
            <TierGrowthChart  isDark={isDark} t={t} />
          </div>

          {/* Row 4 — Provenance + Size distribution (buckets) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProvenanceChart        isDark={isDark} t={t} />
            <SizeDistributionChart  isDark={isDark} t={t} />
          </div>
        </div>
      )}

    </div>
  );
}
