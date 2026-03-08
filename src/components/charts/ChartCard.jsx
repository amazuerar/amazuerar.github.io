/**
 * ChartCard.jsx
 * Consistent card wrapper for every chart on the Trends page.
 */
export default function ChartCard({ title, subtitle, children, isDark, t, className = '' }) {
  return (
    <div className={`p-8 rounded-[2.5rem] border transition-colors ${t.card} ${className}`}>
      <div className="mb-6">
        <h3 className={`text-xl font-black tracking-tight ${t.yearLabel}`}>{title}</h3>
        {subtitle && (
          <p className={`text-[11px] font-bold uppercase tracking-widest mt-1 ${t.muted}`}>
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
