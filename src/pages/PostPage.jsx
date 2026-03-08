import { useState, useEffect, useRef } from 'react';
import { Link, useParams, useOutletContext } from 'react-router-dom';
import { getPost } from '../content/posts/posts';

// Vite glob — bundles all MDX files and allows dynamic loading by slug
const mdxModules = import.meta.glob('../content/posts/*.mdx');

const TYPE_COLORS = {
  technique: 'bg-amber-500/15 text-amber-400',
  tooling:   'bg-blue-500/15 text-blue-400',
  project:   'bg-emerald-500/15 text-emerald-400',
  writeup:   'bg-violet-500/15 text-violet-400',
};

const TAG_COLORS = {
  frida:           'bg-amber-500/15 text-amber-400',
  android:         'bg-blue-500/15 text-blue-400',
  ios:             'bg-blue-500/15 text-blue-400',
  pyrit:           'bg-blue-500/15 text-blue-400',
  'on-device-llm': 'bg-blue-500/15 text-blue-400',
  atlas:           'bg-violet-500/15 text-violet-400',
  research:        'bg-violet-500/15 text-violet-400',
  'red-teaming':        'bg-violet-500/15 text-violet-400',
  'prompt-injection':   'bg-rose-500/15 text-rose-400',
  'ai-security':        'bg-fuchsia-500/15 text-fuchsia-400',
  ctf:                  'bg-amber-500/15 text-amber-400',
};

function tagClass(tag) {
  return TAG_COLORS[tag] ?? 'bg-[#1E2533] text-[#94A3B8]';
}

export default function PostPage() {
  const { slug } = useParams();
  const { isDark } = useOutletContext();
  const post = getPost(slug);

  const [PostContent, setPostContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toc, setToc] = useState([]);
  const [activeToc, setActiveToc] = useState('');
  const contentRef = useRef(null);

  // Load MDX module
  useEffect(() => {
    setLoading(true);
    setPostContent(null);
    const loader = mdxModules[`../content/posts/${slug}.mdx`];
    if (loader) {
      loader().then(mod => {
        setPostContent(() => mod.default);
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [slug]);

  // Build ToC from rendered h2 elements (IDs provided by rehype-slug at build time)
  useEffect(() => {
    if (!PostContent || !contentRef.current) return;
    const timer = setTimeout(() => {
      const h2s = Array.from(contentRef.current?.querySelectorAll('h2[id]') ?? []);
      setToc(h2s.map(h => ({ id: h.id, text: h.textContent })));
    }, 50);
    return () => clearTimeout(timer);
  }, [PostContent]);

  // Scroll-spy for ToC active state
  useEffect(() => {
    if (toc.length === 0) return;
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveToc(entry.target.id);
        }
      },
      { rootMargin: '-80px 0px -66% 0px' }
    );
    toc.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [toc]);

  if (!post) {
    return (
      <div className="pt-32 px-8 max-w-[900px] mx-auto text-center">
        <p className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-widest">Post not found</p>
        <Link to="/blog" className="mt-4 inline-block font-mono text-[10px] text-blue-400 hover:text-blue-300">
          ← Back to blog
        </Link>
      </div>
    );
  }

  const typeClass = TYPE_COLORS[post.type] ?? 'bg-neutral-500/15 text-neutral-400';

  return (
    <div className="pt-24 pb-20 px-8 max-w-[1000px] mx-auto">

      {/* Back link */}
      <Link
        to="/blog"
        className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-colors mb-7 flex items-center gap-1.5 w-fit ${
          isDark ? 'text-[#94A3B8] hover:text-[#E2E8F0]' : 'text-[#737373] hover:text-[#171717]'
        }`}
      >
        ← Blog
      </Link>

      {/* Meta row */}
      <div className="flex flex-wrap items-center gap-2.5 mb-4">
        {post.tags.map(tag => (
          <span
            key={tag}
            className={`font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded ${tagClass(tag)}`}
          >
            {tag}
          </span>
        ))}
        <span className={`font-mono text-[11px] ml-1 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          {post.dateLabel} · {post.readTime} min read
        </span>
      </div>

      {/* Title */}
      <h1 className="text-[32px] font-black tracking-tight leading-tight mb-4">
        {post.title}
      </h1>

      {/* Summary */}
      <p className={`text-[14px] font-medium leading-relaxed mb-7 max-w-[600px] ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
        {post.summary}
      </p>

      {/* Body: prose + ToC sidebar */}
      <div className={toc.length > 0 ? 'lg:grid lg:gap-8 lg:[grid-template-columns:1fr_200px]' : ''}>

        {/* Prose */}
        <div ref={contentRef} className={`post-prose min-w-0 ${isDark ? '' : 'post-prose-light'}`}>
          {loading && (
            <div className="font-mono text-[11px] text-[#94A3B8] uppercase tracking-widest animate-pulse py-8">
              Loading…
            </div>
          )}
          {!loading && PostContent && <PostContent />}
          {!loading && !PostContent && (
            <p className="font-mono text-[11px] text-[#94A3B8]">Content not available.</p>
          )}
        </div>

        {/* Sticky ToC sidebar — hidden on mobile */}
        {toc.length > 0 && (
          <aside className="hidden lg:block">
            <div className={`sticky top-24 border rounded-xl p-4 ${
              isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-white border-[#E5E5E5]'
            }`}>
              <div className={`font-mono text-[9px] font-black uppercase tracking-[0.3em] mb-3 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                Contents
              </div>
              <nav className="flex flex-col gap-0.5">
                {toc.map(item => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    onClick={e => {
                      e.preventDefault();
                      document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`text-[11px] font-semibold border-l-2 pl-2.5 py-1 transition-colors ${
                      activeToc === item.id
                        ? 'border-blue-400 text-blue-400'
                        : isDark
                          ? 'border-[#1E2533] text-[#94A3B8] hover:text-[#E2E8F0] hover:border-[#94A3B8]'
                          : 'border-[#E5E5E5] text-[#737373] hover:text-[#171717] hover:border-[#D4D4D4]'
                    }`}
                  >
                    {item.text}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        )}

      </div>

    </div>
  );
}
