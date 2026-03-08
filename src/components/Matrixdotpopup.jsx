import { useState, useRef, useCallback } from 'react';
import { ExternalLink, Zap, Globe, FlaskConical, Building2, Handshake } from 'lucide-react';
import { typeColors } from '../utils/typeColors';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const PROV_CFG = {
  academia:      { icon: FlaskConical, label: 'Acad.',   badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400' },
  industry:      { icon: Building2,    label: 'Ind.',    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
  collaboration: { icon: Handshake,    label: 'Collab.', badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
};

export default function MatrixDot({ model: m, isDark, t }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos]         = useState({ x: 0, y: 0, alignRight: false, alignBottom: false });
  const dotRef  = useRef(null);
  const hideTimer = useRef(null);
  const c = typeColors(m.modality);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    if (!dotRef.current) return;
    const rect   = dotRef.current.getBoundingClientRect();
    const vw     = window.innerWidth;
    const vh     = window.innerHeight;
    const popupW = 300;
    const popupH = 160;
    setPos({
      x: rect.left + rect.width / 2,
      y: rect.top  + rect.height / 2,
      alignRight:  rect.left + popupW + 24 > vw,
      alignBottom: rect.top  + popupH + 24 > vh,
    });
    setVisible(true);
  }, []);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  }, []);

  const keepOpen = useCallback(() => {
    clearTimeout(hideTimer.current);
  }, []);

  return (
    <>
      {/* The dot */}
      <div
        ref={dotRef}
        onMouseEnter={show}
        onMouseLeave={hide}
        className={`w-3.5 h-3.5 rounded-full cursor-pointer
          hover:scale-150 transition-all duration-150 border-2
          ${isDark ? 'border-[#0B0E14]' : 'border-white'}
          ${c.dotSmall}
          ${visible ? 'scale-150' : ''}
        `}
      />

      {/* Fixed-position popup — escapes overflow:hidden */}
      {visible && (
        <div
          onMouseEnter={keepOpen}
          onMouseLeave={hide}
          style={{
            position: 'fixed',
            left:  pos.alignRight  ? 'auto' : pos.x + 12,
            right: pos.alignRight  ? window.innerWidth - pos.x + 12 : 'auto',
            top:   pos.alignBottom ? 'auto' : pos.y - 12,
            bottom: pos.alignBottom ? window.innerHeight - pos.y - 12 : 'auto',
            width: 300,
            zIndex: 9999,
          }}
          className={`
            rounded-2xl border shadow-2xl p-5
            animate-in fade-in zoom-in-95 duration-150
            ${isDark
              ? 'bg-[#151921] border-[#1E2533] shadow-black/60'
              : 'bg-white border-[#E5E5E5] shadow-neutral-300/60'}
          `}
        >
          {/* Header */}
          <div className="mb-3">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className={`text-[9px] font-bold uppercase tracking-[0.4em] font-mono mb-1 ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
                  {m.org}
                </div>
                <div className="flex items-center gap-2">
                  <h4 className={`text-lg font-black tracking-tight leading-none truncate ${isDark ? 'text-[#E2E8F0]' : 'text-[#171717]'}`}>
                    {m.name}
                  </h4>
                  {m.modality === 'reasoning' && (
                    <Zap size={14} className="text-amber-500 fill-amber-500/20 flex-shrink-0" />
                  )}
                </div>
              </div>
              <div className={`text-[9px] font-bold uppercase tracking-widest font-mono flex-shrink-0 ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
                {MONTH_NAMES[m.month - 1]} {m.year}
              </div>
            </div>
            <div className={`text-[11px] font-bold font-mono mt-1.5 leading-snug ${isDark ? 'text-[#94A3B8]' : 'text-[#525252]'}`}>
              {m.size}
            </div>
          </div>

          {/* Badges */}
          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-[0.2em] font-mono ${c.badge}`}>
              <div className={`w-2 h-2 rounded-full animate-pulse ${c.pulse}`} />
              {m.modality}
            </div>
            {(() => { const prov = PROV_CFG[m.provenance]; if (!prov) return null; const Icon = prov.icon; return (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[9px] font-bold uppercase tracking-[0.2em] font-mono ${prov.badge}`}>
                <Icon size={10} /> {prov.label}
              </div>
            ); })()}
          </div>

          {/* Links */}
          <div className="flex items-center gap-2">
            <a
              href={m.url}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] font-mono transition-all ${
                isDark
                  ? 'bg-[#1E2533] text-blue-400 hover:bg-blue-500 hover:text-white'
                  : 'bg-[#FAFAFA] text-blue-500 hover:bg-blue-500 hover:text-white'
              }`}
            >
              <Globe size={10} /> Source
            </a>
            <a
              href={m.url}
              target="_blank"
              rel="noreferrer"
              onClick={e => e.stopPropagation()}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-[0.2em] font-mono transition-all ${
                isDark
                  ? 'bg-[#1E2533] text-[#E2E8F0] hover:bg-[#262D3D]'
                  : 'bg-[#FAFAFA] text-[#737373] hover:bg-[#E5E5E5]'
              }`}
            >
              <ExternalLink size={10} /> Archive
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
