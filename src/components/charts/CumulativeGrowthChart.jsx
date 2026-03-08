/**
 * CumulativeGrowthChart.jsx
 * Area/line chart — cumulative model count over time.
 */
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { getCumulativeGrowth } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getCumulativeGrowth();

// Show only year-boundary ticks on x-axis
const YEAR_TICKS = DATA
  .filter(d => d.month === 1 || DATA.indexOf(d) === 0 || DATA.indexOf(d) === DATA.length - 1)
  .map(d => d.label);

function CustomTooltip({ active, payload, isDark }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div className="text-blue-400 uppercase tracking-widest mb-1 font-mono">
        {MONTHS[d.month - 1]} {d.year}
      </div>
      <div>{d.total} models total</div>
    </div>
  );
}

export default function CumulativeGrowthChart({ isDark, t }) {
  return (
    <ChartCard
      title="Cumulative growth"
      subtitle="Total models in registry over time"
      isDark={isDark}
      t={t}
    >
      <ResponsiveContainer width="100%" height={240}>
        <AreaChart data={DATA} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
          <defs>
            <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%"  stopColor="#22d3ee" stopOpacity={isDark ? 0.25 : 0.15} />
              <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1E2533' : '#E5E5E5'}
            vertical={false}
          />
          <XAxis
            dataKey="label"
            ticks={YEAR_TICKS}
            tickFormatter={label => label.split('-')[0]}
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
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ stroke: isDark ? '#404040' : '#d4d4d4', strokeWidth: 1 }} />
          <Area
            type="monotone"
            dataKey="total"
            stroke="#22d3ee"
            strokeWidth={2.5}
            fill="url(#growthGradient)"
            dot={false}
            activeDot={{ r: 5, fill: '#22d3ee', strokeWidth: 0 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
