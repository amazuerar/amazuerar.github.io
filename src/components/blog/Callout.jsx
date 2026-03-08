import { useOutletContext } from 'react-router-dom';

const styles = {
  warning: { border: 'border-amber-500/30 border-l-amber-400', label: 'text-amber-400', lightBg: 'bg-amber-50 border-amber-200', icon: '⚠' },
  tip:     { border: 'border-emerald-500/30 border-l-emerald-400', label: 'text-emerald-400', lightBg: 'bg-emerald-50 border-emerald-200', icon: '→' },
  finding: { border: 'border-blue-500/30 border-l-blue-400', label: 'text-blue-400', lightBg: 'bg-blue-50 border-blue-200', icon: '◆' },
};

export default function Callout({ type = 'tip', label, children }) {
  const { isDark } = useOutletContext();
  const s = styles[type] ?? styles.tip;
  const displayLabel = label ?? type.charAt(0).toUpperCase() + type.slice(1);

  return (
    <div className={`border border-l-[3px] rounded-xl p-4 mb-5 ${
      isDark ? `bg-[#111111] ${s.border}` : s.lightBg
    }`}>
      <div className={`font-mono text-[9px] font-black uppercase tracking-[0.3em] ${s.label} mb-2`}>
        {s.icon} {displayLabel}
      </div>
      <div className={`text-[13px] font-medium leading-relaxed ${isDark ? 'text-neutral-400' : 'text-neutral-600'}`}>
        {children}
      </div>
    </div>
  );
}
