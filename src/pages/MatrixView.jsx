import { useRef, useEffect } from 'react';
import { ORGS, MODELS } from '../data/models';
import ModelDot from '../components/ModelDot';

function buildTimeAxis() {
  const years = MODELS.map(m => m.year);
  const minYear = Math.min(...years);
  const maxYear = Math.max(...years);
  const maxMonth = Math.max(...MODELS.filter(m => m.year === maxYear).map(m => m.month));
  const yearsWithModels = new Set(years);
  const axis = [];
  let prevYear = null;
  for (let year = minYear; year <= maxYear; year++) {
    if (!yearsWithModels.has(year)) continue;
    const endMonth = year === maxYear ? maxMonth : 12;
    for (let month = 1; month <= endMonth; month++) {
      const gapBefore = month === 1 && prevYear !== null && year - prevYear > 1;
      axis.push({ year, month, gapBefore });
    }
    prevYear = year;
  }
  return axis;
}

const TIME_AXIS = buildTimeAxis();

const CELL_W = 56;  // w-14
const ORG_W  = 192; // w-48

export default function MatrixView({ filteredModels, filterOrgs, isDark, t }) {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const now = new Date();
    const cy = now.getFullYear();
    const cm = now.getMonth() + 1;
    let idx = TIME_AXIS.findIndex(tc => tc.year === cy && tc.month === cm);
    if (idx === -1) idx = TIME_AXIS.length - 1;
    const containerW = scrollRef.current.clientWidth;
    // Position current month one cell from the right edge
    const scrollLeft = Math.max(0, ORG_W + idx * CELL_W - containerW + CELL_W * 2);
    scrollRef.current.scrollLeft = scrollLeft;
  }, []);

  const visibleOrgs = ORGS.filter(o => {
    if (filterOrgs.size > 0 && !filterOrgs.has(o)) return false;
    return filteredModels.some(m => m.org === o);
  });

  const cellBorder = isDark ? 'border-neutral-800/30' : 'border-neutral-200/60';
  const yearBg     = isDark ? 'bg-neutral-800/15'     : 'bg-neutral-200/15';
  const gapBorder  = isDark
    ? 'border-l-4 border-dashed border-neutral-700/50'
    : 'border-l-4 border-dashed border-neutral-300/60';
  const rowHoverBg = isDark
    ? 'group-hover:bg-neutral-800/30'
    : 'group-hover:bg-neutral-100/60';

  if (filteredModels.length === 0) {
    return (
      <div className={`relative rounded-[2.5rem] border shadow-inner flex flex-col items-center justify-center min-h-[40vh] gap-4 ${t.matrixBg}`}>
        <div className={`text-5xl font-black tracking-tighter ${isDark ? 'text-[#1E2533]' : 'text-[#E5E5E5]'}`}>∅</div>
        <p className={`text-sm font-bold uppercase tracking-[0.3em] font-mono ${t.muted}`}>No models match your filters</p>
        <p className={`text-xs font-mono ${isDark ? 'text-[#2D3748]' : 'text-[#D4D4D4]'}`}>Try adjusting the size range or clearing a filter</p>
      </div>
    );
  }

  return (
    <div ref={scrollRef} className={`relative overflow-x-auto overflow-y-auto thin-scrollbar max-h-[calc(100vh-13rem)] rounded-[2.5rem] border shadow-inner ${t.matrixBg}`}>
      <div className="min-w-max">
        <div className="px-6 pb-6">

          {/* ── Time header (sticky) ────────────────────────────── */}
          <div className={`flex border-b pb-3 pt-6 sticky top-0 z-10 ${isDark ? 'bg-[#0B0E14]' : 'bg-[#FAFAFA]'} ${isDark ? 'border-neutral-800/40' : 'border-neutral-200'}`}>
            <div className={`w-48 flex-shrink-0 sticky left-0 z-20 ${isDark ? 'bg-[#0B0E14]' : 'bg-[#FAFAFA]'}`} />
            {TIME_AXIS.map((tc, i) => (
              <div key={i} className={`w-14 flex-shrink-0 text-center text-[10px] font-black
                ${tc.gapBefore ? gapBorder : tc.month === 1 ? 'border-l-2 border-cyan-500/50' : `border-l ${cellBorder}`}
                ${tc.month === 1 ? yearBg : ''}`}
              >
                {tc.month === 1 && <div className="text-cyan-500 mb-1">{tc.year}</div>}
                <div className={isDark ? 'text-neutral-600' : 'text-neutral-400'}>
                  {tc.month.toString().padStart(2, '0')}
                </div>
              </div>
            ))}
          </div>

          {/* ── Org rows ──────────────────────────────────────── */}
          {visibleOrgs.map(org => {
            const orgModels = filteredModels.filter(m => m.org === org);
            return (
              <div key={org} className={`flex group border-b last:border-0 transition-colors duration-150 ${t.rowBorder}`}>
                <div className={`w-48 flex-shrink-0 py-5 px-5 text-[11px] font-black uppercase tracking-wider truncate
                  sticky left-0 z-20 border-r transition-colors duration-150
                  ${t.stickyCell} ${t.muted} ${t.mutedHover}`}
                  title={org}>
                  {org}
                </div>
                {TIME_AXIS.map((tc, i) => {
                  const cellModels = orgModels.filter(m => m.year === tc.year && m.month === tc.month);
                  return (
                    <div key={i} className={`w-14 flex-shrink-0 h-16 flex items-center justify-center gap-1
                      transition-colors duration-150 ${rowHoverBg}
                      ${tc.gapBefore ? gapBorder : tc.month === 1 ? 'border-l-2 border-cyan-500/50' : `border-l ${cellBorder}`}
                      ${tc.month === 1 ? yearBg : ''}`}
                    >
                      {cellModels.map((m, mi) => (
                        <ModelDot key={mi} m={m} isDark={isDark} t={t} />
                      ))}
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}