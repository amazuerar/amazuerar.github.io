/**
 * ChartCard.jsx
 * Consistent card wrapper for every chart on the Trends page.
 */
export default function ChartCard({ title, subtitle, children, isDark, t, className = '' }) {
  return (
    <div className={`p-8 rounded-2xl border transition-colors ${t.card} ${className}`}>
      <div className="mb-6">
        <h3 className={`text-lg font-black tracking-tight ${t.yearLabel}`}>{title}</h3>
        {subtitle && (
          <p className={`text-[10px] font-bold uppercase tracking-[0.4em] mt-1 font-mono ${t.muted}`}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
