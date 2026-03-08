import { useState, useEffect } from 'react';

// Sync html background-color so fast scroll never exposes white
function syncHtmlBg(isDark) {
  document.documentElement.style.backgroundColor = isDark ? '#0B0E14' : '#FAFAFA';
  document.body.style.backgroundColor = isDark ? '#0B0E14' : '#FAFAFA';
}

const STORAGE_KEY = 'theme-preference';

export function useTheme(initial = 'light') {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) ?? initial; } catch { return initial; }
  });
  const isDark = theme === 'dark';

  // Sync on mount and every toggle
  useEffect(() => { syncHtmlBg(isDark); }, [isDark]);

  // Re-read localStorage when browser restores page from back-forward cache
  useEffect(() => {
    const handlePageShow = (e) => {
      if (e.persisted) {
        try {
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) setTheme(stored);
        } catch {}
      }
    };
    window.addEventListener('pageshow', handlePageShow);
    return () => window.removeEventListener('pageshow', handlePageShow);
  }, []);

  const toggle = () => setTheme(t => {
    const next = t === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem(STORAGE_KEY, next); } catch {}
    return next;
  });

  const t = {
    // Page & surface
    bg:           isDark ? 'bg-[#0B0E14]'  : 'bg-[#FAFAFA]',
    text:         isDark ? 'text-[#E2E8F0]' : 'text-[#171717]',
    header:       isDark ? 'bg-[#151921]/90 border-[#1E2533]'  : 'bg-white/90 border-[#E5E5E5]',
    card:         isDark ? 'bg-[#151921] border-[#1E2533]'     : 'bg-white border-[#E5E5E5] shadow-sm',
    matrixBg:     isDark ? 'bg-[#151921]/30 border-[#1E2533]'  : 'bg-[#FAFAFA] border-[#E5E5E5]',
    input:        isDark ? 'bg-[#1E2533] border-[#1E2533] text-[#E2E8F0]' : 'bg-[#FAFAFA] border-[#E5E5E5] text-[#171717]',
    stickyLabel:  isDark ? 'bg-[#151921]/80 border-blue-500/30' : 'bg-white/95 border-blue-600/30',

    // Text shades
    muted:        isDark ? 'text-[#4A5568]' : 'text-[#737373]',
    mutedHover:   isDark ? 'group-hover:text-[#E2E8F0]' : 'group-hover:text-[#171717]',
    yearLabel:    isDark ? 'text-[#E2E8F0]' : 'text-[#171717]',

    // Accent — blue (#3B82F6) replaces cyan as primary UI chrome colour
    accent:         isDark ? 'text-blue-400'  : 'text-blue-500',
    accentGradient: isDark
      ? 'bg-gradient-to-r from-blue-400 to-transparent'
      : 'bg-gradient-to-r from-blue-500 to-transparent',

    // Rows & table cells
    rowHover:     isDark ? 'hover:bg-[#1E2533]/20'  : 'hover:bg-white/60',
    rowBorder:    isDark ? 'border-[#1E2533]/40'     : 'border-[#E5E5E5]',
    stickyCell:   isDark
      ? 'bg-[#0B0E14] border-[#1E2533] group-hover:bg-[#151921]'
      : 'bg-[#FAFAFA] border-[#E5E5E5] group-hover:bg-white',

    // Ring (used as dot outline in timeline)
    ring:         isDark ? 'ring-[#0B0E14]' : 'ring-[#FAFAFA]',

    // Buttons
    linkBtn:      isDark
      ? 'bg-[#1E2533] text-blue-400 hover:bg-blue-500 hover:text-white'
      : 'bg-[#FAFAFA] text-blue-500 hover:bg-blue-500 hover:text-white',
    selectBg:     isDark ? 'bg-[#151921] border-[#1E2533] text-[#4A5568]' : 'bg-white border-[#E5E5E5] text-[#737373]',
    sortBtn:      isDark
      ? 'bg-[#1E2533] border-[#1E2533] text-[#E2E8F0] hover:border-blue-500'
      : 'bg-white border-[#E5E5E5] text-[#737373] hover:border-blue-500',

    // Misc
    timelineLine: isDark ? 'bg-[#334155]'  : 'bg-[#E5E5E5]',
    footerBg:     isDark ? 'bg-[#0B0E14] border-[#1E2533] text-[#4A5568]' : 'bg-white border-[#E5E5E5] text-[#737373]',
  };

  return { theme, isDark, toggle, t };
}
