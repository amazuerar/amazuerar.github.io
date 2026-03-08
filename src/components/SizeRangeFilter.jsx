/**
 * SizeRangeFilter.jsx
 * Dual-handle range slider — panel uses position:fixed to escape overflow-x-auto bar.
 */
import { useRef, useCallback, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown, X } from 'lucide-react';
import { formatSizeB } from '../utils/parseSize';

const SNAP_POINTS = [
  0.014, 0.1, 0.25, 0.5, 1, 1.5, 2, 3, 4, 7, 8, 10, 13, 14,
];

const QUICK_PICKS = [
  { label: '≤ 500M', high: 0.5  },
  { label: '≤ 1B',   high: 1    },
  { label: '≤ 2B',   high: 2    },
  { label: '≤ 3B',   high: 3    },
  { label: '≤ 7B',   high: 7    },
  { label: '≤ 14B',  high: 14   },
];

const SLIDER_MIN = SNAP_POINTS[0];
const SLIDER_MAX = SNAP_POINTS[SNAP_POINTS.length - 1];

function snapToNearest(value) {
  return SNAP_POINTS.reduce((best, p) =>
    Math.abs(p - value) < Math.abs(best - value) ? p : best, SNAP_POINTS[0]);
}

function toPct(value) {
  return ((value - SLIDER_MIN) / (SLIDER_MAX - SLIDER_MIN)) * 100;
}

function fromPct(pct) {
  return SLIDER_MIN + (pct / 100) * (SLIDER_MAX - SLIDER_MIN);
}

export default function SizeRangeFilter({
  sizeRange, setSizeRange, isSizeFiltered, clearSize, isDark, t,
}) {
  const [low, high]   = sizeRange;
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const panelRef   = useRef(null);
  const trackRef   = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (triggerRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target))   return;
      setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  function handleToggle() {
    if (!open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, left: r.left });
    }
    setOpen(o => !o);
  }

  const getValueFromPointer = useCallback((e) => {
    const track = trackRef.current;
    if (!track) return null;
    const rect    = track.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const pct     = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    return snapToNearest(fromPct(pct));
  }, []);

  const startDrag = useCallback((handle) => (e) => {
    e.preventDefault();
    const onMove = (ev) => {
      const v = getValueFromPointer(ev);
      if (v === null) return;
      setSizeRange(prev => {
        const [l, h] = prev;
        if (handle === 'low')  return [Math.min(v, h), h];
        if (handle === 'high') return [l, Math.max(v, l)];
        return prev;
      });
    };
    const onUp = () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
  }, [getValueFromPointer, setSizeRange]);

  const lowPct  = toPct(low);
  const highPct = toPct(high);

  const buttonLabel = isSizeFiltered
    ? `${formatSizeB(low)} – ${formatSizeB(high)}`
    : 'Size';

  return (
    <div className="flex-shrink-0">

      {/* Trigger */}
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-all ${t.sortBtn} ${isSizeFiltered ? 'border-blue-500/60 text-blue-400' : ''}`}
      >
        {buttonLabel}
        {isSizeFiltered ? (
          <span
            role="button"
            onClick={(e) => { e.stopPropagation(); clearSize(); }}
            className="bg-blue-500 text-white text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center hover:bg-blue-400 transition-colors"
          >
            <X size={8} />
          </span>
        ) : (
          <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
        )}
      </button>

      {/* Dropdown panel — portalled to body so it escapes backdrop-filter/overflow */}
      {open && createPortal(
        <div
          ref={panelRef}
          className={`fixed z-[9999] rounded-2xl border shadow-2xl overflow-hidden ${
            isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-white border-[#E5E5E5]'
          }`}
          style={{ top: pos.top, left: pos.left, width: 248 }}
        >
          {/* Header */}
          <div className={`flex items-center justify-between px-4 py-2.5 border-b ${isDark ? 'border-[#1E2533]' : 'border-[#E5E5E5]'}`}>
            <span className={`text-[10px] font-bold uppercase tracking-[0.4em] font-mono ${t.muted}`}>
              Max param count
            </span>
            {isSizeFiltered && (
              <button
                onClick={clearSize}
                className={`flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-colors ${
                  isDark ? 'text-blue-400 hover:text-blue-300' : 'text-blue-500 hover:text-blue-400'
                }`}
              >
                <X size={10} /> Clear
              </button>
            )}
          </div>

          <div className="px-4 pt-3.5 pb-4">

            {/* Range readout */}
            <div className="flex items-center justify-between mb-4">
              <span className={`text-xs font-bold tabular-nums font-mono ${isDark ? 'text-[#E2E8F0]' : 'text-[#171717]'}`}>
                {formatSizeB(low)}
              </span>
              <div className={`h-px flex-1 mx-3 ${isDark ? 'bg-[#1E2533]' : 'bg-[#E5E5E5]'}`} />
              <span className={`text-xs font-bold tabular-nums font-mono ${isDark ? 'text-[#E2E8F0]' : 'text-[#171717]'}`}>
                {formatSizeB(high)}
              </span>
            </div>

            {/* Track */}
            <div
              ref={trackRef}
              className="relative h-1 rounded-full select-none mb-5"
              style={{ background: isDark ? '#1E2533' : '#E5E5E5' }}
            >
              {/* Active fill */}
              <div
                className="absolute top-0 h-full rounded-full pointer-events-none"
                style={{
                  left:       `${lowPct}%`,
                  width:      `${highPct - lowPct}%`,
                  background: '#3B82F6',
                }}
              />
              {/* Low handle */}
              <div
                onMouseDown={startDrag('low')}
                onTouchStart={startDrag('low')}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full cursor-grab active:cursor-grabbing transition-transform hover:scale-125"
                style={{
                  left:      `${lowPct}%`,
                  background: isDark ? '#0B0E14' : '#fff',
                  border:    `2px solid ${isSizeFiltered ? '#3B82F6' : (isDark ? '#4A5568' : '#D4D4D4')}`,
                  boxShadow: isSizeFiltered ? '0 0 0 3px rgba(59,130,246,0.15)' : 'none',
                  zIndex:    lowPct > 50 ? 3 : 2,
                }}
              />
              {/* High handle */}
              <div
                onMouseDown={startDrag('high')}
                onTouchStart={startDrag('high')}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-3.5 h-3.5 rounded-full cursor-grab active:cursor-grabbing transition-transform hover:scale-125"
                style={{
                  left:      `${highPct}%`,
                  background: isDark ? '#0B0E14' : '#fff',
                  border:    `2px solid ${isSizeFiltered ? '#3B82F6' : (isDark ? '#4A5568' : '#D4D4D4')}`,
                  boxShadow: isSizeFiltered ? '0 0 0 3px rgba(59,130,246,0.15)' : 'none',
                  zIndex:    2,
                }}
              />
            </div>

            {/* Quick picks */}
            <div className={`text-[9px] font-bold uppercase tracking-[0.4em] font-mono mb-2 ${t.muted}`}>
              Quick select
            </div>
            <div className="flex flex-wrap gap-1.5">
              {QUICK_PICKS.map(({ label, high: h }) => {
                const active = Math.abs(low - SLIDER_MIN) < 0.001 && Math.abs(high - h) < 0.001;
                return (
                  <button
                    key={label}
                    onClick={() => setSizeRange([SLIDER_MIN, h])}
                    className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] font-mono transition-all ${
                      active
                        ? 'bg-blue-500 text-white'
                        : isDark
                          ? 'bg-[#1E2533] border border-[#1E2533] text-[#4A5568] hover:bg-[#262D3D] hover:text-[#E2E8F0]'
                          : 'bg-[#FAFAFA] border border-[#E5E5E5] text-[#737373] hover:bg-[#E5E5E5] hover:text-[#171717]'
                    }`}
                  >
                    {label}
                  </button>
                );
              })}
              <button
                onClick={() => setSizeRange([SLIDER_MIN, SLIDER_MAX])}
                className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] font-mono transition-all ${
                  !isSizeFiltered
                    ? 'bg-blue-500 text-white'
                    : isDark
                      ? 'bg-[#1E2533] border border-[#1E2533] text-[#4A5568] hover:bg-[#262D3D] hover:text-[#E2E8F0]'
                      : 'bg-[#FAFAFA] border border-[#E5E5E5] text-[#737373] hover:bg-[#E5E5E5] hover:text-[#171717]'
                }`}
              >
                All
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}
