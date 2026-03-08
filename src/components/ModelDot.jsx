import { useState, useRef, useCallback, useEffect } from 'react';
import { typeColors } from '../utils/typeColors';
import { Globe, ExternalLink, Zap, FlaskConical, Building2, Handshake } from 'lucide-react';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

const PROV_CFG = {
  academia:      { icon: FlaskConical, label: 'Acad.',   badge: 'bg-violet-500/10 border-violet-500/30 text-violet-400' },
  industry:      { icon: Building2,    label: 'Ind.',    badge: 'bg-blue-500/10 border-blue-500/30 text-blue-400' },
  collaboration: { icon: Handshake,    label: 'Collab.', badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
};

const POPUP_W  = 288;
const POPUP_H  = 160;
const MOBILE_BP = 640; // px — matches Tailwind `sm:`

function isTouchPrimary() {
  return window.matchMedia('(hover: none) and (pointer: coarse)').matches;
}

export default function ModelDot({ m, isDark, t }) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos]         = useState({ x: 0, y: 0, alignRight: false, alignBottom: false });
  const dotRef    = useRef(null);
  const hideTimer = useRef(null);
  const c = typeColors(m.modality);

  const computePos = useCallback(() => {
    if (!dotRef.current) return;
    const rect = dotRef.current.getBoundingClientRect();
    setPos({
      x:           rect.left + rect.width  / 2,
      y:           rect.top  + rect.height / 2,
      alignRight:  rect.left + POPUP_W + 24 > window.innerWidth,
      alignBottom: rect.top  + POPUP_H + 24 > window.innerHeight,
    });
  }, []);

  const show = useCallback(() => {
    clearTimeout(hideTimer.current);
    computePos();
    setVisible(true);
  }, [computePos]);

  const hide = useCallback(() => {
    hideTimer.current = setTimeout(() => setVisible(false), 120);
  }, []);

  const keepOpen = useCallback(() => clearTimeout(hideTimer.current), []);

  useEffect(() => () => clearTimeout(hideTimer.current), []);

  // On touch: first tap shows popup, second tap (or backdrop) closes it.
  // On desktop: <a> navigates on click; popup is driven by hover.
  const handleClick = useCallback((e) => {
    if (isTouchPrimary()) {
      e.preventDefault();
      visible ? setVisible(false) : show();
    }
  }, [visible, show]);

  // Decide layout at render time (fine for a SPA — no SSR).
  const mobile = window.innerWidth < MOBILE_BP;
  const touch  = isTouchPrimary();

  const popupStyle = mobile
    ? {
        position:  'fixed',
        left:      '50%',
        transform: 'translateX(-50%)',
        bottom:    16,
        width:     Math.min(POPUP_W, window.innerWidth - 32),
        zIndex:    9999,
      }
    : {
        position: 'fixed',
        left:   pos.alignRight  ? 'auto'                         : pos.x + 16,
        right:  pos.alignRight  ? window.innerWidth - pos.x + 16 : 'auto',
        top:    pos.alignBottom ? 'auto'                          : pos.y - 16,
        bottom: pos.alignBottom ? window.innerHeight - pos.y - 16 : 'auto',
        width:  POPUP_W,
        zIndex: 9999,
      };

  return (
    <>
      <a
        ref={dotRef}
        href={m.url}
        target="_blank"
        rel="noreferrer"
        onMouseEnter={show}
        onMouseLeave={hide}
        onClick={handleClick}
        className={`w-3.5 h-3.5 rounded-full border-2 block cursor-pointer
          transition-all duration-150
          ${visible ? 'scale-150' : ''}
          ${isDark ? 'border-[#0B0E14]' : 'border-white'}
          ${c.dotSmall}`}
      />

      {visible && (
        <>
          {/* Backdrop — touch only. Sits behind popup; tapping it closes the popup. */}
          {touch && (
            <div
              className="fixed inset-0 z-[9998]"
              onPointerDown={() => setVisible(false)}
            />
          )}

          <div
            onMouseEnter={keepOpen}
            onMouseLeave={hide}
            style={popupStyle}
            className={`rounded-3xl border shadow-2xl overflow-hidden
              ${isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-white border-neutral-200'}`}
          >
            {/* Header */}
            <div className="px-5 pt-5 pb-4">
              <div className={`text-[10px] font-black uppercase tracking-[0.4em] mb-1.5 ${isDark ? 'text-[#4A5568]' : 'text-neutral-400'}`}>
                {m.org}
              </div>
              <div className="flex items-center justify-between gap-3">
                <h4 className={`text-xl font-black tracking-tight leading-none ${isDark ? 'text-[#E2E8F0]' : 'text-neutral-900'}`}>
                  {m.name}
                  {m.modality === 'reasoning' && (
                    <Zap size={14} className="inline ml-2 text-amber-500 fill-amber-500/20" />
                  )}
                </h4>
                <span className={`text-[10px] font-bold uppercase tracking-widest font-mono flex-shrink-0 ${isDark ? 'text-[#4A5568]' : 'text-neutral-400'}`}>
                  {MONTH_NAMES[m.month - 1]} {m.year}
                </span>
              </div>
              <div className={`text-[11px] font-bold font-mono mt-1.5 leading-snug ${isDark ? 'text-[#94A3B8]' : 'text-[#525252]'}`}>
                {m.size}
              </div>
            </div>

            {/* Badges */}
            <div className="px-5 flex flex-wrap items-center gap-1.5 mb-3">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${c.badge}`}>
                <div className={`w-2 h-2 rounded-full animate-pulse ${c.pulse}`} />
                {m.modality}
              </div>
              {(() => { const prov = PROV_CFG[m.provenance]; if (!prov) return null; const Icon = prov.icon; return (
                <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-[10px] font-black uppercase tracking-wider ${prov.badge}`}>
                  <Icon size={10} /> {prov.label}
                </div>
              ); })()}
            </div>

            {/* Link */}
            <div className="px-5 pb-5">
              <a
                href={m.url}
                target="_blank"
                rel="noreferrer"
                onClick={e => e.stopPropagation()}
                className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors w-fit"
              >
                <Globe size={12} /> Archive <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </>
      )}
    </>
  );
}
