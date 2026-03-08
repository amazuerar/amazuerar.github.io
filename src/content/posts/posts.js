// Eagerly import all MDX modules — remark-mdx-frontmatter exports each
// file's frontmatter as `mod.frontmatter`, so we never duplicate metadata.
const modules = import.meta.glob('./*.mdx', { eager: true });

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(dateStr) {
  // dateStr is always "YYYY-MM-DD" (quoted in frontmatter to prevent YAML Date coercion)
  const [year, month, day] = dateStr.split('-').map(Number);
  return {
    dateLabel:  `${MONTHS[month - 1]} ${day}, ${year}`,
    monthLabel: `${MONTHS[month - 1]} ${year}`,
  };
}

export const posts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.replace(/^\.\//, '').replace(/\.mdx$/, '');
    const fm   = mod.frontmatter ?? {};
    return { slug, ...fm, ...formatDate(fm.date ?? '2000-01-01') };
  })
  .sort((a, b) => new Date(b.date) - new Date(a.date));

export const publishedPosts = posts.filter(p => p.status === 'published');

export function getPost(slug) {
  return posts.find(p => p.slug === slug) ?? null;
}
