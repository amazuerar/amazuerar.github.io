import { useOutletContext } from 'react-router-dom';

export default function TLDRBox({ children }) {
  const { isDark } = useOutletContext();
  return (
    <div className={`border border-l-[3px] border-l-cyan-400 rounded-xl p-4 mb-7 ${
      isDark
        ? 'bg-[#111111] border-cyan-500/20'
        : 'bg-cyan-50 border-cyan-200'
    }`}>
      <div className="font-mono text-[9px] font-black uppercase tracking-[0.3em] text-cyan-500 mb-3">
        TL;DR
      </div>
      <ul className={`list-disc pl-4 space-y-1 text-[13px] font-medium leading-relaxed ${
        isDark ? 'text-neutral-400' : 'text-neutral-600'
      }`}>
        {children}
      </ul>
    </div>
  );
}
