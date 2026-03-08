import { useOutletContext } from 'react-router-dom';

/**
 * Embeds a PDF from public/posts/<slug>/<file>.pdf
 *
 * Usage in MDX:
 *   import PDFViewer from '../../components/blog/PDFViewer';
 *   <PDFViewer src="/posts/8ksec-ultimate-ai-essay-grader/cert.pdf" title="Completion Certificate" />
 *
 * Props:
 *   src    — absolute path from public/, e.g. /posts/my-post/file.pdf
 *   title  — label shown above the viewer
 *   height — iframe height in px (default 520)
 */
export default function PDFViewer({ src, title, height = 520 }) {
  const { isDark } = useOutletContext();

  return (
    <div className={`rounded-xl overflow-hidden border mb-6 ${
      isDark ? 'border-[#1E2533] bg-[#111111]' : 'border-neutral-200 bg-neutral-50'
    }`}>
      {/* Header bar */}
      {title && (
        <div className={`flex items-center justify-between px-4 py-2.5 border-b ${
          isDark ? 'border-[#1E2533]' : 'border-neutral-200'
        }`}>
          <span className={`font-mono text-[10px] font-bold uppercase tracking-[0.2em] ${
            isDark ? 'text-[#4A5568]' : 'text-neutral-400'
          }`}>
            {title}
          </span>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            download
            className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-blue-400 hover:text-blue-300 transition-colors"
          >
            Download ↓
          </a>
        </div>
      )}

      {/* PDF iframe — desktop browsers render natively */}
      <iframe
        src={src}
        title={title ?? 'PDF document'}
        width="100%"
        height={height}
        className="block w-full"
        style={{ border: 'none' }}
      >
        {/* Fallback for browsers that block iframes (e.g. iOS Safari) */}
        <div className={`flex flex-col items-center justify-center gap-3 py-12 ${
          isDark ? 'text-[#4A5568]' : 'text-neutral-400'
        }`}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="opacity-40">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <p className="font-mono text-[11px]">PDF cannot be displayed in this browser.</p>
          <a
            href={src}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] px-4 py-2 rounded-lg border border-blue-500/40 text-blue-400 hover:bg-blue-500/10 transition-colors"
          >
            Open PDF ↗
          </a>
        </div>
      </iframe>
    </div>
  );
}
