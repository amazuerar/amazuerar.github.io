/**
 * SizeDistributionChart.jsx
 * Horizontal bar chart — model count by parameter size bucket (min variant).
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { getSizeDistribution } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getSizeDistribution();
const MAX  = Math.max(...DATA.map(d => d.count));

// Gradient cyan → violet by size bucket (smaller = more cyan, larger = more muted)
const BUCKET_COLORS = [
  '#22d3ee', // <500M   — cyan
  '#38bdf8', // 0.5–1B  — sky
  '#60a5fa', // 1–3B    — blue
  '#818cf8', // 3–7B    — indigo
  '#a78bfa', // 7–14B   — violet
];

function CustomTooltip({ active, payload, isDark }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div className="text-blue-400 uppercase tracking-widest mb-1 font-mono">{payload[0].payload.label}</div>
      <div>{payload[0].value} variant{payload[0].value !== 1 ? 's' : ''}</div>
    </div>
  );
}

export default function SizeDistributionChart({ isDark, t }) {
  return (
    <ChartCard
      title="Size distribution"
      subtitle="Variant count by parameter size bucket (all variants ≤ 14B)"
      isDark={isDark}
      t={t}
    >
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={DATA}
          layout="vertical"
          barSize={20}
          margin={{ top: 0, right: 24, left: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1E2533' : '#E5E5E5'}
            horizontal={false}
          />
          <XAxis
            type="number"
            domain={[0, MAX + 3]}
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false} tickLine={false} allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="label"
            width={52}
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false} tickLine={false}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? '#ffffff06' : '#00000004' }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {DATA.map((entry, i) => (
              <Cell
                key={entry.label}
                fill={BUCKET_COLORS[i] ?? '#94a3b8'}
                fillOpacity={entry.count === MAX ? 1 : 0.7}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <p className={`mt-3 text-[10px] font-mono font-bold uppercase tracking-widest ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
        Each variant counted separately: a model with params [1, 3] adds one count to 1–3B for each
      </p>
    </ChartCard>
  );
}
