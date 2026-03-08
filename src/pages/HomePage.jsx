import { Link, useOutletContext } from 'react-router-dom';
import { publishedPosts } from '../content/posts/posts';
import { papers } from '../content/papers';


const TAG_COLORS = {
  frida:           { bg: 'bg-amber-500/15', text: 'text-amber-400' },
  pyrit:           { bg: 'bg-blue-500/15',  text: 'text-blue-400'  },
  android:         { bg: 'bg-blue-500/15',  text: 'text-blue-400'  },
  'on-device-llm': { bg: 'bg-blue-500/15',  text: 'text-blue-400'  },
  atlas:           { bg: 'bg-violet-500/15',  text: 'text-violet-400'  },
  research:        { bg: 'bg-violet-500/15',  text: 'text-violet-400'  },
};

function tagStyle(tag, isDark) {
  return TAG_COLORS[tag] ?? {
    bg: isDark ? 'bg-[#1E2533]' : 'bg-[#F0F0F0]',
    text: isDark ? 'text-[#94A3B8]' : 'text-[#737373]',
  };
}

export default function HomePage() {
  const { isDark } = useOutletContext();
  const recentPosts = publishedPosts.slice(0, 3);
  const thesis = papers.find(p => p.status === 'thesis');
  const award  = papers.find(p => p.award);

  return (
    <div className="pt-24 pb-20 px-8 max-w-[1100px] mx-auto">

      {/* ── Hero ── */}
      <section className="mb-16">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-4">
          Alejandro Mazuera-Rozo · Mobile Security
        </p>
        <h1 className="text-[52px] font-black leading-none tracking-[-0.03em] mb-5">
          Mobile security<br />
          <span className="text-blue-400">practitioner.</span>
        </h1>
        <p className={`text-base font-medium max-w-[480px] leading-relaxed mb-7 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          VAPT on Android and iOS apps.<br />Exploring on-device AI (Still mapping the attack surface).
        </p>
      </section>

      {/* ── Featured work ── */}
      <SectionDivider label="Featured work" isDark={isDark} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-stretch gap-3 mb-10">

        {/* Thesis card */}
        {thesis && (
          <a
            href={thesis.links[0]?.url ?? '#'}
            target="_blank"
            rel="noreferrer"
            className={`border rounded-2xl p-5 group transition-colors flex flex-col ${
              isDark ? 'bg-[#151921] border-[#1E2533] hover:border-[#4A5568]' : 'bg-white border-[#E5E5E5] hover:border-[#D4D4D4]'
            }`}
          >
            <div className={`font-mono text-[9px] font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 inline-block" />
              Doctoral Thesis · {thesis.year}
            </div>
            <h3 className="text-[14px] font-black leading-tight mb-1">{thesis.title}</h3>
            <p className={`font-mono text-[9px] mb-2 truncate ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>{thesis.venueFull}</p>
            <p className={`text-[11px] leading-relaxed mb-5 flex-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
              Empirical study of code quality in Android apps, covering security weaknesses, performance bugs, and connectivity defects across real-world codebases.
            </p>
            <div className="flex items-center justify-between">
              <span className={`font-mono text-[10px] font-bold ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                {thesis.tags.slice(0, 2).join(' · ')}
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-cyan-400 group-hover:text-cyan-300 transition-colors">
                Read ↗
              </span>
            </div>
          </a>
        )}

        {/* JSS Best Paper Award card */}
        {award && (
          <a
            href={award.links[0]?.url ?? '#'}
            target="_blank"
            rel="noreferrer"
            className={`border rounded-2xl p-5 group transition-colors flex flex-col ${
              isDark ? 'bg-[#151921] border-[#1E2533] hover:border-[#4A5568]' : 'bg-white border-[#E5E5E5] hover:border-[#D4D4D4]'
            }`}
          >
            <div className={`font-mono text-[9px] font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 inline-block" />
              {award.venue} · {award.year}
            </div>
            <h3 className="text-[14px] font-black leading-tight mb-1">{award.title}</h3>
            <p className={`font-mono text-[9px] mb-2 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>{award.venueFull}</p>
            <p className={`text-[11px] leading-relaxed mb-3 flex-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
              Taxonomy of security weaknesses in Java and Kotlin Android apps, derived from security-fixing commits and validated with a developer survey.
            </p>
            <div className="flex items-center justify-between">
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-400 flex items-center gap-1">
                <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                Best Paper
              </span>
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-amber-400 group-hover:text-amber-300 transition-colors">
                Read ↗
              </span>
            </div>
          </a>
        )}

        {/* Atlas card */}
        <div className={`border rounded-2xl p-5 flex flex-col ${isDark ? 'bg-[#151921] border-blue-500/25' : 'bg-white border-blue-200'}`}>
          <div className={`font-mono text-[9px] font-bold uppercase tracking-[0.3em] mb-2 flex items-center gap-1.5 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 inline-block" />
            Project · 2026
          </div>
          <h3 className="text-[15px] font-black leading-tight mb-2">On-Device SLM Atlas</h3>
          <p className={`text-[11px] leading-relaxed mb-5 flex-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
            A chronological registry of small language models that run locally on smartphones, tablets, or edge hardware, without cloud connectivity.
          </p>
          <div className="flex items-center justify-between">
            <span className="font-mono text-[10px] text-blue-400 font-bold">88 models · 40+ orgs</span>
            <a href="/atlas" className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-blue-400 hover:text-blue-300 transition-colors">
              Open tool ↗
            </a>
          </div>
        </div>

      </div>

      {/* ── Recent posts ── */}
      <SectionDivider label="Recent posts" isDark={isDark} />

      <div className="flex flex-col">
        {recentPosts.map(post => {
          const firstTag = post.tags[0];
          const ts = tagStyle(firstTag, isDark);
          return (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className={`flex items-baseline gap-3.5 py-2.5 border-b group transition-colors ${
                isDark ? 'border-[#1E2533] hover:border-[#1E2533]' : 'border-[#E5E5E5]'
              }`}
            >
              <span className={`font-mono text-[10px] font-bold w-[70px] flex-shrink-0 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                {post.monthLabel}
              </span>
              <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded flex-shrink-0 ${ts.bg} ${ts.text}`}>
                {firstTag}
              </span>
              <span className="text-[13px] font-bold flex-1 group-hover:text-blue-400 transition-colors">
                {post.title}
              </span>
              <span className={`text-xs flex-shrink-0 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>→</span>
            </Link>
          );
        })}
      </div>

    </div>
  );
}

function SectionDivider({ label, isDark }) {
  return (
    <div className={`flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.5em] font-mono mb-5 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
      <span className={`flex-1 h-px ${isDark ? 'bg-[#1E2533]' : 'bg-[#E5E5E5]'}`} />
      {label}
      <span className={`flex-1 h-px ${isDark ? 'bg-[#1E2533]' : 'bg-[#E5E5E5]'}`} />
    </div>
  );
}
