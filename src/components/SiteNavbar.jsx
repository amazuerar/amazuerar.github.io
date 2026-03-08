import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Sun, Moon, Menu, X } from 'lucide-react';

export default function SiteNavbar({ isDark, toggle, t }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-colors ${
      isActive
        ? isDark ? 'text-blue-400' : 'text-blue-500'
        : isDark ? 'text-[#4A5568] hover:text-[#E2E8F0]' : 'text-[#737373] hover:text-[#171717]'
    }`;

  const mobileLinkClass = ({ isActive }) =>
    `block w-full text-[11px] font-bold uppercase tracking-[0.25em] font-mono py-3 border-b transition-colors ${
      isDark ? 'border-[#1E2533]' : 'border-neutral-100'
    } ${
      isActive
        ? isDark ? 'text-blue-400' : 'text-blue-500'
        : isDark ? 'text-[#4A5568]' : 'text-[#737373]'
    }`;

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 h-16 border-b z-[70] flex items-center justify-between px-6 backdrop-blur-3xl ${t.header}`}>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          <NavLink to="/" end className={linkClass}>Home</NavLink>
          <NavLink to="/blog" className={linkClass}>Blog</NavLink>
          <NavLink to="/papers" className={linkClass}>Research</NavLink>
          <a
            href="/atlas"
            className={`text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-colors ${
              isDark ? 'text-[#4A5568] hover:text-blue-400' : 'text-[#737373] hover:text-blue-500'
            }`}
          >
            Atlas ↗
          </a>
          <NavLink to="/about" className={linkClass}>About</NavLink>
        </div>

        {/* Mobile: hamburger + theme toggle */}
        <div className="flex md:hidden items-center gap-3">
          <button
            onClick={() => setMenuOpen(o => !o)}
            className={`p-2 rounded-full transition-all active:scale-90 ${
              isDark ? 'text-[#4A5568] hover:text-[#E2E8F0]' : 'text-[#737373] hover:text-[#171717]'
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* Theme toggle (always visible) */}
        <button
          onClick={toggle}
          className={`p-2 rounded-full transition-all active:scale-90 ${
            isDark
              ? 'bg-[#1E2533] text-yellow-400 hover:bg-[#262D3D]'
              : 'bg-[#E5E5E5] text-[#737373] hover:bg-[#D4D4D4]'
          }`}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </nav>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className={`fixed top-16 left-0 right-0 z-[69] px-6 pt-2 pb-4 border-b md:hidden ${
          isDark ? 'bg-[#0B0E14] border-[#1E2533]' : 'bg-white border-neutral-200'
        }`}>
          <NavLink to="/" end className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Home</NavLink>
          <NavLink to="/blog" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Blog</NavLink>
          <NavLink to="/papers" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>Research</NavLink>
          <a
            href="/atlas"
            onClick={() => setMenuOpen(false)}
            className={`block w-full text-[11px] font-bold uppercase tracking-[0.25em] font-mono py-3 border-b transition-colors ${
              isDark ? 'border-[#1E2533] text-[#4A5568]' : 'border-neutral-100 text-[#737373]'
            }`}
          >
            Atlas ↗
          </a>
          <NavLink to="/about" className={mobileLinkClass} onClick={() => setMenuOpen(false)}>About</NavLink>
        </div>
      )}
    </>
  );
}
