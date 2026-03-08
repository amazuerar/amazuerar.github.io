import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Search, ArrowUpNarrowWide, ArrowDownWideNarrow, ChevronDown, X, Cpu, LockOpen } from 'lucide-react';
import { ORGS, TYPES } from '../data/models';
import { MODALITY_LABEL } from '../utils/typeColors';
import SizeRangeFilter from './SizeRangeFilter';

// ── Modality dot colours (must match typeColors.js) ───────────────────────────
const MODALITY_DOT = {
  'text':           'bg-cyan-400',
  'text-encoder':   'bg-slate-400',
  'vision-language':'bg-violet-500',
  'multimodal':     'bg-fuchsia-500',
  'reasoning':      'bg-amber-500',
};

// ── Thin divider ──────────────────────────────────────────────────────────────
function Divider({ isDark }) {
  return (
    <div className={`h-5 w-px flex-shrink-0 ${isDark ? 'bg-[#1E2533]' : 'bg-[#E5E5E5]'}`} />
  );
}

// ── Multi-select dropdown ─────────────────────────────────────────────────────
// Uses position:fixed for the panel so it escapes the overflow-x-auto bar.
function MultiDropdown({ label, activeCount, onClear, children, isDark, t }) {
  const [open, setOpen] = useState(false);
  const [pos, setPos]   = useState({ top: 0, left: 0 });
  const triggerRef = useRef(null);
  const panelRef   = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (triggerRef.current?.contains(e.target)) return;
      if (panelRef.current?.contains(e.target))   return;
      setOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  function handleToggle() {
    if (!open && triggerRef.current) {
      const r = triggerRef.current.getBoundingClientRect();
      setPos({ top: r.bottom + 8, left: r.left });
    }
    setOpen(o => !o);
  }

  return (
    <div className="flex-shrink-0">
      <button
        ref={triggerRef}
        onClick={handleToggle}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-all ${t.sortBtn} ${activeCount > 0 ? 'border-blue-500/60 text-blue-400' : ''}`}
      >
        {label}
        {activeCount > 0 && (
          <span className="bg-blue-500 text-white text-[9px] font-bold rounded-full flex-shrink-0 text-center" style={{ width: 16, height: 16, lineHeight: '16px', display: 'block' }}>
            {activeCount}
          </span>
        )}
        <ChevronDown size={11} className={`transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && createPortal(
        <div
          ref={panelRef}
          className={`fixed z-[9999] rounded-2xl border shadow-2xl overflow-hidden ${
            isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-white border-[#E5E5E5]'
          }`}
          style={{ top: pos.top, left: pos.left, minWidth: '220px', maxHeight: '360px' }}
        >
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className={`w-full flex items-center gap-2 px-4 py-2.5 text-[10px] font-bold uppercase tracking-[0.25em] font-mono border-b transition-colors ${
                isDark ? 'border-[#1E2533] text-blue-400 hover:bg-[#1E2533]' : 'border-[#E5E5E5] text-blue-500 hover:bg-[#FAFAFA]'
              }`}
            >
              <X size={10} /> Clear selection
            </button>
          )}
          <div className="overflow-y-auto" style={{ maxHeight: '300px' }}>
            {children}
          </div>
        </div>,
        document.body
      )}
    </div>
  );
}

function CheckItem({ label, checked, onToggle, isDark, dot }) {
  return (
    <button
      onClick={onToggle}
      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left text-[10px] font-bold uppercase tracking-[0.2em] font-mono transition-colors ${
        checked
          ? isDark ? 'bg-blue-500/10 text-blue-400' : 'bg-blue-50 text-blue-500'
          : isDark ? 'text-[#4A5568] hover:bg-[#1E2533]' : 'text-[#737373] hover:bg-[#FAFAFA]'
      }`}
    >
      <span className={`w-3.5 h-3.5 rounded flex-shrink-0 border-2 flex items-center justify-center transition-colors ${
        checked ? 'bg-blue-500 border-blue-500' : isDark ? 'border-[#4A5568]' : 'border-[#D4D4D4]'
      }`}>
        {checked && (
          <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
            <path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </span>
      {dot && <span className={`w-2 h-2 rounded-full flex-shrink-0 ${dot}`} />}
      {label}
    </button>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function Controls({
  sortOrder, toggleSort,
  filterOrgs,        toggleOrg,       clearOrgs,
  filterModalities,  toggleModality,  clearModalities,
  searchTerm, setSearchTerm,
  sizeRange, setSizeRange, isSizeFiltered, clearSize,
  edgeNativeOnly,  setEdgeNativeOnly,
  openWeightsOnly, setOpenWeightsOnly,
  isDark, t,
}) {
  const [orgSearch, setOrgSearch] = useState('');
  const filteredOrgs = ORGS.filter(o => o.toLowerCase().includes(orgSearch.toLowerCase()));

  return (
    <div className={`fixed top-16 left-0 right-0 h-14 border-b z-50 flex items-center px-3 sm:px-6 backdrop-blur-xl transition-colors overflow-x-auto no-scrollbar ${t.header}`}>
      <div className="max-w-[1600px] sm:mx-auto w-full min-w-max flex items-center gap-2 sm:gap-3">

        {/* ── Search ── */}
        <div className="relative group flex-1 min-w-[160px]">
          <Search className={`absolute left-3 top-1/2 -translate-y-1/2 ${t.muted}`} size={12} />
          <input
            type="text"
            placeholder="Search models..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className={`w-full rounded-lg pl-8 pr-8 py-1.5 text-[10px] font-bold font-mono focus:outline-none focus:ring-1 focus:ring-blue-500/30 transition-all ${t.input}`}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className={`absolute right-3 top-1/2 -translate-y-1/2 ${t.muted} hover:text-[#E2E8F0]`}
            >
              <X size={10} />
            </button>
          )}
        </div>

        <Divider isDark={isDark} />

        {/* ── Sort ── */}
        <button
          onClick={toggleSort}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-all flex-shrink-0 ${t.sortBtn}`}
        >
          {sortOrder === 'desc' ? <ArrowDownWideNarrow size={13} /> : <ArrowUpNarrowWide size={13} />}
          <span className="hidden sm:inline">{sortOrder === 'desc' ? 'Newest' : 'Oldest'}</span>
        </button>

        {/* ── Edge-Native toggle ── */}
        <button
          onClick={() => setEdgeNativeOnly(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-all flex-shrink-0 ${
            edgeNativeOnly
              ? 'border-cyan-500/60 text-cyan-400 bg-cyan-500/10'
              : t.sortBtn
          }`}
        >
          <Cpu size={12} />
          <span className="hidden sm:inline">Edge-Native</span>
        </button>

        {/* ── Open Weights toggle ── */}
        <button
          onClick={() => setOpenWeightsOnly(v => !v)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-bold uppercase tracking-[0.25em] font-mono transition-all flex-shrink-0 ${
            openWeightsOnly
              ? 'border-emerald-500/60 text-emerald-400 bg-emerald-500/10'
              : t.sortBtn
          }`}
        >
          <LockOpen size={12} />
          <span className="hidden sm:inline">Open Weights</span>
        </button>

        <Divider isDark={isDark} />

        {/* ── Orgs multi-select ── */}
        <MultiDropdown label="Orgs" activeCount={filterOrgs.size} onClear={clearOrgs} isDark={isDark} t={t}>
          <div className={`px-3 py-2 border-b sticky top-0 ${isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-white border-[#E5E5E5]'}`}>
            <div className="relative">
              <Search size={10} className={`absolute left-2.5 top-1/2 -translate-y-1/2 ${t.muted}`} />
              <input
                type="text" placeholder="Search orgs..." value={orgSearch}
                onChange={e => setOrgSearch(e.target.value)}
                className={`w-full pl-7 pr-3 py-1.5 rounded-lg text-[10px] font-bold font-mono focus:outline-none focus:ring-1 focus:ring-blue-500/30 ${t.input}`}
              />
            </div>
          </div>
          {filteredOrgs.map(org => (
            <CheckItem key={org} label={org} checked={filterOrgs.has(org)} onToggle={() => toggleOrg(org)} isDark={isDark} />
          ))}
          {filteredOrgs.length === 0 && (
            <p className={`px-4 py-3 text-[10px] font-mono ${t.muted}`}>No orgs found</p>
          )}
        </MultiDropdown>

        {/* ── Modality multi-select ── */}
        <MultiDropdown label="Modality" activeCount={filterModalities.size} onClear={clearModalities} isDark={isDark} t={t}>
          {TYPES.map(mod => (
            <CheckItem
              key={mod}
              label={MODALITY_LABEL[mod] || mod}
              checked={filterModalities.has(mod)}
              onToggle={() => toggleModality(mod)}
              dot={MODALITY_DOT[mod]}
              isDark={isDark}
            />
          ))}
        </MultiDropdown>

        {/* ── Size range ── */}
        <SizeRangeFilter
          sizeRange={sizeRange} setSizeRange={setSizeRange}
          isSizeFiltered={isSizeFiltered} clearSize={clearSize}
          isDark={isDark} t={t}
        />

        {/* ── Modality legend — xl+ only ── */}
        <div className="hidden xl:flex items-center gap-3 flex-shrink-0 ml-1">
          <Divider isDark={isDark} />
          {TYPES.map(mod => (
            <div key={mod} className="flex items-center gap-1.5">
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${MODALITY_DOT[mod]}`} />
              <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.1em] whitespace-nowrap ${t.muted}`}>
                {MODALITY_LABEL[mod]}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
