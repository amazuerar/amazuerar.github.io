import { useOutletContext } from 'react-router-dom';
import { papers } from '../content/papers';

const STATUS_COLORS = {
  published: { bg: 'bg-emerald-500/15', text: 'text-emerald-400', label: 'Published' },
  preprint:  { bg: 'bg-amber-500/15',   text: 'text-amber-400',   label: 'Preprint'  },
  workshop:  { bg: 'bg-blue-500/15',    text: 'text-blue-400',    label: 'Workshop'  },
  thesis:    { bg: 'bg-cyan-500/15',    text: 'text-cyan-400',    label: 'Thesis'    },
};

// Group by year descending
function groupByYear(list) {
  const map = {};
  for (const p of list) {
    if (!map[p.year]) map[p.year] = [];
    map[p.year].push(p);
  }
  return Object.entries(map).sort(([a], [b]) => Number(b) - Number(a));
}

export default function PapersPage() {
  const { isDark } = useOutletContext();
  const grouped = groupByYear(papers);
  const muted = isDark ? 'text-[#94A3B8]' : 'text-[#737373]';

  return (
    <div className="pt-24 pb-20 px-8 max-w-[1100px] mx-auto">

      {/* Header */}
      <div className="mb-10">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-4">
          Research
        </p>
        <h2 className="text-[36px] font-black tracking-tight leading-none mb-3">Publications</h2>
        <p className={`text-[13px] font-medium ${muted}`}>
          Published work on Android security, vulnerability detection, and mobile software quality.
        </p>
      </div>

      {/* Papers grouped by year */}
      <div className="flex flex-col gap-10">
        {grouped.map(([year, yearPapers]) => (
          <div key={year}>
            {/* Year label */}
            <div className={`font-mono text-[10px] font-black uppercase tracking-[0.4em] mb-4 flex items-center gap-3 ${muted}`}>
              {year}
              <span className={`flex-1 h-px ${isDark ? 'bg-[#1E2533]' : 'bg-[#E5E5E5]'}`} />
            </div>

            <div className="flex flex-col gap-4">
              {yearPapers.map((paper, i) => (
                <PaperCard key={i} paper={paper} isDark={isDark} muted={muted} />
              ))}
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

function PaperCard({ paper, isDark, muted }) {
  const sc = STATUS_COLORS[paper.status] ?? STATUS_COLORS.published;

  return (
    <div className={`border rounded-2xl p-6 transition-colors ${
      isDark ? 'bg-[#151921] border-[#1E2533] hover:border-[#4A5568]' : 'bg-white border-[#E5E5E5] hover:border-[#D4D4D4]'
    }`}>

      {/* Award banner */}
      {paper.award && (
        <div className="flex items-center gap-2 mb-3 font-mono text-[10px] font-black uppercase tracking-[0.25em] text-amber-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
            <path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
            <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
            <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
          </svg>
          {paper.award}
        </div>
      )}

      {/* Venue + status + citations row */}
      <div className="flex items-center flex-wrap gap-2 mb-3">
        <span className={`font-mono text-[9px] font-black uppercase tracking-[0.25em] px-2 py-0.5 rounded border ${
          isDark ? 'border-[#1E2533] text-[#E2E8F0]' : 'border-[#E5E5E5] text-[#171717]'
        }`}>
          {paper.venue}
        </span>
        <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded ${sc.bg} ${sc.text}`}>
          {sc.label}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-[15px] font-black leading-snug mb-1.5">{paper.title}</h3>

      {/* Venue full name */}
      <p className={`font-mono text-[10px] mb-2 ${muted}`}>{paper.venueFull}</p>

      {/* Authors */}
      <p className={`font-mono text-[11px] mb-3 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
        {paper.authors}
      </p>

      {/* Abstract */}
      <p className={`text-[13px] font-medium leading-relaxed mb-4 ${muted}`}>
        {paper.abstract}
      </p>

      {/* Tags + links */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex flex-wrap gap-1.5">
          {paper.tags.map(tag => (
            <span
              key={tag}
              className={`font-mono text-[9px] font-bold uppercase tracking-[0.1em] px-1.5 py-0.5 rounded ${
                isDark ? 'bg-[#1E2533] text-[#64748B]' : 'bg-[#F5F5F5] text-[#737373]'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex gap-2">
          {paper.links.map(link => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noreferrer"
              className={`font-mono text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1.5 rounded-lg border transition-colors ${
                isDark
                  ? 'border-[#1E2533] text-[#94A3B8] hover:border-blue-500 hover:text-blue-400'
                  : 'border-[#E5E5E5] text-[#737373] hover:border-blue-500 hover:text-blue-500'
              }`}
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}
