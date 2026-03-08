/**
 * TierGrowthChart.jsx
 * Stacked bar — Tier 1 (edge-native) vs Tier 2 (ecosystem) by year.
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { getTierByYear } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getTierByYear();

const TIER1_COLOR = '#22d3ee'; // cyan — edge-native
const TIER2_COLOR = '#404040'; // neutral — ecosystem

function CustomTooltip({ active, payload, label, isDark }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + (p.value || 0), 0);
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div className="text-blue-400 uppercase tracking-widest mb-2 font-mono">{label}</div>
      {payload.map(p => (
        <div key={p.dataKey} className="flex justify-between gap-6 mb-0.5" style={{ color: p.fill }}>
          <span className="uppercase tracking-wider">
            {p.dataKey === 'tier1' ? 'Edge-Native' : 'Ecosystem'}
          </span>
          <span>{p.value}</span>
        </div>
      ))}
      <div className={`mt-2 pt-2 border-t flex justify-between ${isDark ? 'border-neutral-700' : 'border-neutral-200'}`}>
        <span className="uppercase tracking-wider">Total</span>
        <span>{total}</span>
      </div>
    </div>
  );
}

export default function TierGrowthChart({ isDark, t }) {
  return (
    <ChartCard
      title="Tier 1 vs Tier 2 growth"
      subtitle="Edge-native releases vs ecosystem adaptations"
      isDark={isDark}
      t={t}
    >
      {/* Legend */}
      <div className="flex gap-5 mb-4">
        {[['Tier 1 — Edge-Native', TIER1_COLOR], ['Tier 2 — Ecosystem', TIER2_COLOR]].map(([label, color]) => (
          <div key={label} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: color }} />
            <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
              {label}
            </span>
          </div>
        ))}
      </div>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={DATA} barSize={26} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1E2533' : '#E5E5E5'} vertical={false} />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false} tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false} tickLine={false} allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? '#ffffff06' : '#00000004' }} />
          <Bar dataKey="tier2" stackId="a" fill={TIER2_COLOR} fillOpacity={0.75} radius={[0, 0, 0, 0]} />
          <Bar dataKey="tier1" stackId="a" fill={TIER1_COLOR} fillOpacity={0.85} radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
