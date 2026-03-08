import { Cpu, Sun, Moon, LayoutGrid, Rows } from 'lucide-react';
import { ATLAS_STATS } from '../utils/atlasStats';

export default function Navbar({ view, setView, isDark, toggleTheme, t, page, setPage }) {
  return (
    <nav className={`fixed top-0 left-0 right-0 h-16 border-b z-[70] flex items-center justify-between px-6 backdrop-blur-3xl ${t.header}`}>
      {/* Logo */}
      <button
        onClick={() => setPage('atlas')}
        className="flex items-center gap-3 group"
      >
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-1.5 rounded-lg shadow-lg shadow-blue-500/20">
          <Cpu className="text-white" size={18} />
        </div>
        <div>
          <h1 className="text-xs font-black uppercase tracking-tight group-hover:text-blue-400 transition-colors">
            On-Device SLM Atlas
          </h1>
          <p className={`text-[9px] font-bold uppercase tracking-widest hidden sm:block ${t.muted}`}>
            {ATLAS_STATS.latestLabel}
          </p>
        </div>
      </button>

      {/* Center nav */}
      <div className="hidden md:flex items-center gap-6">
        {['atlas','trends','sources','about'].map((p, i) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`text-[10px] font-bold uppercase tracking-[0.25em] transition-colors font-mono ${
              page === p
                ? isDark ? 'text-blue-400' : 'text-blue-500'
                : t.muted
            }`}
          >
            {['Atlas','Insights','Sources','About'][i]}
          </button>
        ))}
      </div>

      {/* Right controls */}
      <div className="flex items-center gap-4">
        {page === 'atlas' && (
          <div className={`flex items-center gap-1 p-1 rounded-xl border border-[#1E2533]/50 bg-[#1E2533]/20`}>
            <button
              onClick={() => setView('linear')}
              className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                view === 'linear' ? 'bg-blue-500 text-white shadow-lg' : `${t.muted} hover:text-[#E2E8F0]`
              }`}
            >
              <Rows size={14} /> <span className="hidden md:inline">Linear</span>
            </button>
            <button
              onClick={() => setView('matrix')}
              className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                view === 'matrix' ? 'bg-blue-500 text-white shadow-lg' : `${t.muted} hover:text-[#E2E8F0]`
              }`}
            >
              <LayoutGrid size={14} /> <span className="hidden md:inline">Matrix</span>
            </button>
          </div>
        )}
        <a
          href="/"
          className={`hidden sm:block text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-colors ${
            isDark ? 'text-[#4A5568] hover:text-[#E2E8F0]' : 'text-[#737373] hover:text-[#171717]'
          }`}
        >
          ← Home
        </a>
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full transition-all active:scale-90 ${
            isDark ? 'bg-[#1E2533] text-yellow-400 hover:bg-[#262D3D]' : 'bg-[#E5E5E5] text-[#737373] hover:bg-[#D4D4D4]'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
}
