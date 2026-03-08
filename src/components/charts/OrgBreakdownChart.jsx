/**
 * OrgBreakdownChart.jsx
 * Horizontal bar chart — model count by organisation (top N + Others).
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Cell,
} from 'recharts';
import { getOrgBreakdown } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const ALL_DATA    = getOrgBreakdown(8);
const OTHERS      = ALL_DATA.find(d => d.org === 'Others');
const DATA        = ALL_DATA.filter(d => d.org !== 'Others');
const MAX_COUNT   = Math.max(...DATA.map(d => d.count));

// Gradient from cyan → blue for top orgs, grey for Others
function barColor(org, count, isDark) {
  if (org === 'Others') return isDark ? '#404040' : '#d4d4d4';
  const ratio = count / MAX_COUNT;
  // interpolate cyan (#22d3ee) → blue (#3b82f6)
  const r = Math.round(34  + (59  - 34)  * (1 - ratio));
  const g = Math.round(211 + (130 - 211) * (1 - ratio));
  const b = Math.round(238 + (246 - 238) * (1 - ratio));
  return `rgb(${r},${g},${b})`;
}

function CustomTooltip({ active, payload, isDark }) {
  if (!active || !payload?.length) return null;
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div className="text-blue-400 uppercase tracking-widest mb-1 font-mono">{payload[0].payload.org}</div>
      <div>{payload[0].value} model{payload[0].value !== 1 ? 's' : ''}</div>
    </div>
  );
}

export default function OrgBreakdownChart({ isDark, t }) {
  return (
    <ChartCard
      title="Organisation breakdown"
      subtitle={`Top ${DATA.length} organisations by model count · others shown in footnote`}
      isDark={isDark}
      t={t}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={DATA}
          layout="vertical"
          barSize={18}
          margin={{ top: 0, right: 16, left: 8, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1E2533' : '#E5E5E5'}
            horizontal={false}
          />
          <XAxis
            type="number"
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
          />
          <YAxis
            type="category"
            dataKey="org"
            width={90}
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? '#ffffff06' : '#00000004' }} />
          <Bar dataKey="count" radius={[0, 6, 6, 0]}>
            {DATA.map(entry => (
              <Cell
                key={entry.org}
                fill={barColor(entry.org, entry.count, isDark)}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      {OTHERS && (
        <p className={`mt-3 text-[10px] font-mono font-bold uppercase tracking-widest ${isDark ? 'text-neutral-600' : 'text-neutral-400'}`}>
          + {OTHERS.count} model{OTHERS.count !== 1 ? 's' : ''} from additional organizations not shown
        </p>
      )}
    </ChartCard>
  );
}
