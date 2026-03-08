import { useState, useRef, useEffect, useMemo } from 'react';
import { Globe, FileText, FlaskConical, Building2, Handshake } from 'lucide-react';
import { typeColors } from '../utils/typeColors';
import useHorizontalScroll from '../hooks/useHorizontalScroll';

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Stable identity key — safe for data attributes and querySelector
const mid = (m) =>
  `mid_${m.year}_${m.month}_${String(m.org).replace(/\W/g,'')}_${String(m.name).replace(/\W/g,'')}`;

// ── Horizontal timeline layout ─────────────────────────────────────────────────
// above col:  [year_label][card][connector↓][dot][spacer=SPACER_BELOW]
// below col:  [year_label][spacer=ABOVE_SEC-YEAR_H][dot][connector↓][card]
// Both columns identical height; year labels always rendered above the centreline.
const CARD_W      = 256;
const GAP         = 6;
const YEAR_GAP    = 36;   // extra left-margin added to first column of each new year
const YEAR_H      = 28;
const CARD_H      = 210;
const CONN_H      = 28;
const DOT_D       = 12;
const PT          = 8;                                 // paddingTop of inner flex
const ABOVE_SEC   = YEAR_H + CARD_H + CONN_H;         // 266 — distance from top to dot top
const SPACER_BELOW = CONN_H + CARD_H;                 // 238 — spacer below dot for above-cols
const LINE_Y      = PT + ABOVE_SEC + DOT_D / 2;       // absolute Y of centreline = 280


// ── Provenance badge config ──────────────────────────────────────────────────
const PROV_CFG = {
  academia:      { icon: FlaskConical, label: 'Acad.',   badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400' },
  industry:      { icon: Building2,    label: 'Ind.',    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
  collaboration: { icon: Handshake,    label: 'Collab.', badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
};

// ── Compact card for horizontal mode ──────────────────────────────────────────
function HCard({ m, isDark, t, highlighted }) {
  const c = typeColors(m.modality);
  const prov = PROV_CFG[m.provenance];
  return (
    <div
      data-mid={mid(m)}
      className={`w-full p-4 rounded-2xl border flex flex-col gap-1.5
        transition-all duration-300 hover:border-blue-500/50 group
        ${t.card} ${highlighted ? 'card-flash' : ''}`}
    >
      <div className={`text-[10px] font-bold uppercase tracking-[0.35em] font-mono transition-colors line-clamp-2
        ${isDark ? 'text-[#4A5568] group-hover:text-blue-400' : 'text-[#737373] group-hover:text-blue-500'}`}
        title={m.org}>
        {m.org}
      </div>
      <h4 className={`text-[15px] font-black tracking-tight leading-snug line-clamp-2
        ${isDark ? 'text-[#E2E8F0]' : 'text-[#171717]'}`}
        title={m.name}>
        {m.name}
      </h4>
      <div className={`text-[10px] font-bold font-mono ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
        {MONTHS[m.month - 1]} {m.year} · {m.size}
      </div>
      <div className="flex flex-wrap gap-1 mt-1">
        {m.edge_native && (
          <span className="px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-[0.1em] font-mono bg-cyan-500/10 border-cyan-500/30 text-cyan-400">
            Edge
          </span>
        )}
        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-[0.1em] font-mono ${c.badge}`}>
          <span className={`w-1.5 h-1.5 rounded-full ${c.pulse}`} />
          {m.modality}
        </span>
        {prov && (() => { const Icon = prov.icon; return (
          <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-[0.1em] font-mono ${prov.badge}`}>
            <Icon size={9} /> {prov.label}
          </span>
        ); })()}
      </div>
      <div className="flex items-center gap-2 mt-1">
        <a href={m.url} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
          className={`flex items-center gap-1 text-[10px] font-bold font-mono transition-colors
            ${isDark ? 'text-[#4A5568] hover:text-blue-400' : 'text-[#737373] hover:text-blue-500'}`}>
          <Globe size={11} /> site
        </a>
        {m.arxiv && (
          <a href={`https://arxiv.org/abs/${m.arxiv}`} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            className={`flex items-center gap-1 text-[10px] font-bold font-mono transition-colors
              ${isDark ? 'text-[#4A5568] hover:text-blue-400' : 'text-[#737373] hover:text-blue-500'}`}>
            <FileText size={11} /> arXiv
          </a>
        )}
      </div>
    </div>
  );
}

// ── Horizontal timeline ────────────────────────────────────────────────────────
function HorizontalTimeline({ sorted, isDark, t, scrollRef, highlightId }) {
  useHorizontalScroll(scrollRef);
  const connColor = isDark ? '#334155' : '#D4D4D4';
  const yearColor = isDark ? '#4A5568' : '#A3A3A3';

  // Compute x-offset where each year starts for sticky year tracking
  const yearBreakpoints = useMemo(() => {
    const result = [];
    let x = 0;
    sorted.forEach((m, i) => {
      const isNewYear = i === 0 || sorted[i - 1].year !== m.year;
      if (i > 0 && isNewYear) x += YEAR_GAP;
      if (isNewYear) result.push({ year: m.year, x });
      x += CARD_W + GAP;
    });
    return result;
  }, [sorted]);

  const [stickyYear, setStickyYear] = useState(() => yearBreakpoints[0]?.year ?? '');

  // Auto-scroll to most recent (rightmost) on mount + track sticky year on scroll
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    function onScroll() {
      const sl = el.scrollLeft;
      let year = yearBreakpoints[0]?.year;
      for (const bp of yearBreakpoints) {
        if (bp.x <= sl) year = bp.year;
      }
      setStickyYear(year);
    }
    el.addEventListener('scroll', onScroll, { passive: true });
    el.scrollLeft = el.scrollWidth;
    onScroll(); // sync badge immediately after programmatic scroll
    return () => el.removeEventListener('scroll', onScroll);
  }, [scrollRef, yearBreakpoints]);

  return (
    <div className="relative w-full overflow-hidden">
      {/* Sticky year badge — always visible at top-left */}
      <div className="absolute pointer-events-none z-30" style={{ top: PT, left: 8 }}>
        <span className={`text-[10px] font-black uppercase tracking-[0.5em] font-mono ${t.accent}`}>
          {stickyYear}
        </span>
      </div>

    <div ref={scrollRef} className="overflow-x-auto thin-scrollbar">
      <div
        className="relative flex items-start min-w-max"
        style={{ gap: GAP, paddingTop: PT, paddingBottom: 48 }}
      >
        {/* Centreline */}
        <div
          className="absolute left-0 right-0 h-[2px] opacity-50"
          style={{ top: LINE_Y, backgroundColor: connColor }}
        />

        {sorted.map((m, i) => {
          const c         = typeColors(m.modality);
          const modelId   = mid(m);
          const isNewYear = i === 0 || sorted[i - 1].year !== m.year;
          const above     = i % 2 === 0;
          const sepX      = -Math.round((GAP + YEAR_GAP) / 2);

          return (
            <div
              key={modelId}
              className="relative flex flex-col items-center flex-shrink-0"
              style={{
                width:      CARD_W,
                marginLeft: isNewYear && i > 0 ? YEAR_GAP : 0,
              }}
            >
              {/* ── Year boundary: label centred above dotted line ── */}
              {isNewYear && i > 0 && (
                <div
                  className="absolute top-0 bottom-0 pointer-events-none z-20 flex flex-col items-center"
                  style={{ left: sepX, width: 0 }}
                >
                  <div
                    className="text-[9px] font-black uppercase tracking-[0.4em] font-mono whitespace-nowrap"
                    style={{ height: YEAR_H, display: 'flex', alignItems: 'center', color: yearColor }}
                  >
                    {m.year}
                  </div>
                  <div className="flex-1" style={{ borderLeft: `1px dashed ${connColor}`, opacity: 0.55 }} />
                </div>
              )}

              {/* YEAR_H spacer — all columns (separator labels are absolute, add no flow height) */}
              <div style={{ height: YEAR_H }} />

              {above ? (
                <>
                  {/* Card — anchored to bottom so its border always touches the connector */}
                  <div style={{ width: CARD_W, height: CARD_H, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
                    <HCard m={m} isDark={isDark} t={t} highlighted={highlightId === modelId} />
                  </div>
                  {/* Connector ↓ to dot */}
                  <div className="w-[2px] opacity-60 flex-shrink-0" style={{ height: CONN_H, backgroundColor: connColor }} />
                  {/* Dot on centreline */}
                  <div className={`rounded-full ring-[4px] z-10 flex-shrink-0 ${t.ring} ${c.dot}`}
                    style={{ width: DOT_D, height: DOT_D }} />
                  {/* Spacer below dot */}
                  <div style={{ height: SPACER_BELOW }} />
                </>
              ) : (
                <>
                  {/* Spacer between year slot and dot (keeps dot on centreline) */}
                  <div style={{ height: ABOVE_SEC - YEAR_H }} />
                  {/* Dot on centreline */}
                  <div className={`rounded-full ring-[4px] z-10 flex-shrink-0 ${t.ring} ${c.dot}`}
                    style={{ width: DOT_D, height: DOT_D }} />
                  {/* Connector ↓ to card */}
                  <div className="w-[2px] opacity-60 flex-shrink-0" style={{ height: CONN_H, backgroundColor: connColor }} />
                  {/* Card */}
                  <div style={{ width: CARD_W, height: CARD_H }}>
                    <HCard m={m} isDark={isDark} t={t} highlighted={highlightId === modelId} />
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function LinearView({ filteredModels, isDark, t }) {
  const scrollRef = useRef(null);

  // Always oldest → newest (left → right)
  const sorted = useMemo(() =>
    [...filteredModels].sort((a, b) =>
      a.year !== b.year ? a.year - b.year : a.month - b.month
    ),
    [filteredModels]
  );

  return (
    <div>
      {/* ── Empty state ── */}
      {filteredModels.length === 0 && (
        <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
          <div className={`text-5xl font-black tracking-tighter ${isDark ? 'text-[#1E2533]' : 'text-[#E5E5E5]'}`}>∅</div>
          <p className={`text-sm font-bold uppercase tracking-[0.3em] font-mono ${t.muted}`}>No models match your filters</p>
          <p className={`text-xs font-mono ${isDark ? 'text-[#2D3748]' : 'text-[#D4D4D4]'}`}>Try adjusting the size range or clearing a filter</p>
        </div>
      )}

      {filteredModels.length > 0 && (
        <div className="w-full overflow-hidden flex items-center" style={{ minHeight: 'calc(100vh - 210px)' }}>
          <HorizontalTimeline
            sorted={sorted}
            isDark={isDark}
            t={t}
            scrollRef={scrollRef}
            highlightId={null}
          />
        </div>
      )}
    </div>
  );
}
