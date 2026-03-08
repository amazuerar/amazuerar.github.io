/**
 * ModelsPerYearChart.jsx
 * Bar chart — releases per calendar year.
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { getModelsPerYear } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getModelsPerYear();
const MAX_YEAR = Math.max(...DATA.map(d => d.year));

function CustomTooltip({ active, payload, label, isDark }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div className="text-blue-400 uppercase tracking-widest mb-1 font-mono">{label}</div>
      <div>{payload[0].value} model{payload[0].value !== 1 ? 's' : ''} released</div>
    </div>
  );
}

export default function ModelsPerYearChart({ isDark, t }) {
  return (
    <ChartCard
      title="Releases per year"
      subtitle="Model count by calendar year"
      isDark={isDark}
      t={t}
    >
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={DATA} barSize={32} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1E2533' : '#E5E5E5'}
            vertical={false}
          />
          <XAxis
            dataKey="year"
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? '#ffffff08' : '#00000006' }} />
          <Bar dataKey="count" radius={[6, 6, 0, 0]}>
            {DATA.map(entry => (
              <Cell
                key={entry.year}
                fill={entry.year === MAX_YEAR ? '#22d3ee' : isDark ? '#0e7490' : '#0891b2'}
                opacity={entry.year === MAX_YEAR ? 1 : 0.75}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
