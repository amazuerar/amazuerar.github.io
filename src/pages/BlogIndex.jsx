import { useState } from 'react';
import { Link, useOutletContext } from 'react-router-dom';
import { publishedPosts } from '../content/posts/posts';

const TYPE_COLORS = {
  technique: 'bg-amber-500/15 text-amber-400',
  tooling:   'bg-blue-500/15 text-blue-400',
  project:   'bg-emerald-500/15 text-emerald-400',
  writeup:   'bg-violet-500/15 text-violet-400',
};

const ALL_TAGS = ['prompt-injection', 'ai-security', 'ctf'];

function tagLabel(tag) {
  const map = { 'prompt-injection': 'Prompt Injection', 'ai-security': 'AI Security' };
  return map[tag] ?? tag.charAt(0).toUpperCase() + tag.slice(1);
}

// Group posts by section → subsection, preserving insertion order
function groupPosts(posts) {
  const order = [];
  const map   = {};
  for (const post of posts) {
    const sec = post.section    ?? '';
    const sub = post.subsection ?? '';
    const key = `${sec}||${sub}`;
    if (!map[key]) {
      map[key] = { section: sec, subsection: sub, posts: [] };
      order.push(map[key]);
    }
    map[key].posts.push(post);
  }
  return order;
}

export default function BlogIndex() {
  const { isDark } = useOutletContext();
  const [activeTag, setActiveTag] = useState('all');

  const filtered = activeTag === 'all'
    ? publishedPosts
    : publishedPosts.filter(p => p.tags.includes(activeTag));

  const groups = groupPosts(filtered);

  return (
    <div className="pt-24 pb-20 px-8 max-w-[1100px] mx-auto">

      {/* Header */}
      <div className="mb-9">
        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.5em] text-blue-400 mb-4">Blog</p>
        <h2 className="text-[36px] font-black tracking-tight leading-none mb-2">Writing</h2>
        <p className={`text-[13px] font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          Field notes from mobile security and my exploration into on-device AI.
        </p>
      </div>

      {/* Tag filters */}
      <div className="flex flex-wrap gap-2 mb-9">
        <TagPill label="All" active={activeTag === 'all'} onClick={() => setActiveTag('all')} isDark={isDark} />
        {ALL_TAGS.map(tag => (
          <TagPill
            key={tag}
            label={tagLabel(tag)}
            active={activeTag === tag}
            onClick={() => setActiveTag(activeTag === tag ? 'all' : tag)}
            isDark={isDark}
          />
        ))}
      </div>

      {/* Grouped post list */}
      {filtered.length === 0 ? (
        <div className={`py-12 text-center font-mono text-[11px] ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          No posts match this filter yet.
        </div>
      ) : (
        groups.map(({ section, subsection, posts: group }, gi) => (
          <div key={gi} className="mb-10">

            {/* Section header */}
            {section && (
              <div className="flex items-center gap-4 mb-4">
                <span className="font-mono text-[10px] font-black uppercase tracking-[0.5em] text-blue-400 flex-shrink-0">
                  {section}
                </span>
                <div className={`flex-1 h-px ${isDark ? 'bg-[#1E2533]' : 'bg-[#E5E5E5]'}`} />
              </div>
            )}

            {/* Subsection header */}
            {subsection && (
              <p className={`font-mono text-[10px] font-bold uppercase tracking-[0.3em] mb-3 ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
                {subsection}
              </p>
            )}

            {/* Post rows */}
            <div className={`border rounded-2xl overflow-hidden ${isDark ? 'border-[#1E2533]' : 'border-[#E5E5E5]'}`}>
              {group.map((post, i) => (
                <PostRow key={post.slug} post={post} isDark={isDark} last={i === group.length - 1} />
              ))}
            </div>

          </div>
        ))
      )}

    </div>
  );
}

function TagPill({ label, active, onClick, isDark }) {
  return (
    <button
      onClick={onClick}
      className={`font-mono text-[9px] font-bold uppercase tracking-[0.2em] px-2.5 py-1.5 rounded-lg border transition-colors ${
        active
          ? 'border-blue-500/30 text-blue-400 bg-blue-500/10'
          : isDark
            ? 'border-[#1E2533] text-[#94A3B8] hover:text-[#E2E8F0] hover:border-[#94A3B8]'
            : 'border-[#E5E5E5] text-[#737373] hover:border-[#D4D4D4]'
      }`}
    >
      {label}
    </button>
  );
}

function PostRow({ post, isDark, last }) {
  const typeClass = TYPE_COLORS[post.type] ?? (isDark ? 'bg-[#1E2533] text-[#94A3B8]' : 'bg-[#F5F5F5] text-[#737373]');

  return (
    <Link
      to={`/blog/${post.slug}`}
      className={`grid items-center gap-5 px-5 py-[18px] transition-colors ${
        isDark
          ? 'bg-[#151921] border-b border-[#1E2533] hover:bg-[#1E2533]'
          : 'bg-white border-b border-[#E5E5E5] hover:bg-[#F5F5F5]'
      } ${last ? 'border-b-0' : ''}`}
      style={{ gridTemplateColumns: '80px 1fr auto' }}
    >
      <span className={`font-mono text-[10px] font-bold ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
        {post.monthLabel}
      </span>
      <div>
        <div className="text-[14px] font-black mb-0.5">{post.title}</div>
        <div className={`text-[11px] font-medium ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          {post.summary}
        </div>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className={`font-mono text-[9px] font-bold uppercase tracking-[0.15em] px-1.5 py-0.5 rounded ${typeClass}`}>
          {post.type}
        </span>
        <span className={`font-mono text-[9px] ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
          {post.readTime} min
        </span>
      </div>
    </Link>
  );
}
