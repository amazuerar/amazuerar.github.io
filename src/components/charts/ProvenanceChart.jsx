/**
 * ProvenanceChart.jsx
 * Stacked bar — academia / industry / collaboration by year.
 */
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';
import { getProvenanceByYear } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getProvenanceByYear();

const STACK_KEYS = ['industry', 'academia', 'collaboration'];

// Rounds the top of a bar only when it is the topmost non-zero segment for that column
function makeShape(currentKey) {
  return function RoundedBar({ x, y, width, height, fill, fillOpacity, index }) {
    if (!height || height <= 0) return <g />;
    const entry = DATA[index];
    const laterKeys = STACK_KEYS.slice(STACK_KEYS.indexOf(currentKey) + 1);
    const isTop = laterKeys.every(k => !entry?.[k]);
    if (!isTop) return <rect x={x} y={y} width={width} height={height} fill={fill} fillOpacity={fillOpacity} />;
    const r = Math.min(5, height, width / 2);
    return (
      <path
        d={`M${x + r},${y} H${x + width - r} Q${x + width},${y} ${x + width},${y + r} V${y + height} H${x} V${y + r} Q${x},${y} ${x + r},${y} Z`}
        fill={fill}
        fillOpacity={fillOpacity}
      />
    );
  };
}

const CONFIG = [
  { key: 'industry',      color: '#3b82f6', label: 'Industry'       },
  { key: 'academia',      color: '#8b5cf6', label: 'Academia'       },
  { key: 'collaboration', color: '#10b981', label: 'Collaboration'  },
];

function CustomTooltip({ active, payload, label, isDark }) {
  if (!active || !payload?.length) return null;
  const total = payload.reduce((s, p) => s + (p.value || 0), 0);
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div className="text-blue-400 uppercase tracking-widest mb-2 font-mono">{label}</div>
      {payload.map(p => p.value > 0 && (
        <div key={p.dataKey} className="flex justify-between gap-6 mb-0.5" style={{ color: p.fill }}>
          <span className="uppercase tracking-wider">{p.dataKey}</span>
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

export default function ProvenanceChart({ isDark, t }) {
  return (
    <ChartCard
      title="Provenance over time"
      subtitle="Who is driving on-device AI research"
      isDark={isDark}
      t={t}
    >
      {/* Legend */}
      <div className="flex gap-5 mb-4">
        {CONFIG.map(({ key, color, label }) => (
          <div key={key} className="flex items-center gap-1.5">
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
            domain={[0, dataMax => dataMax + 2]}
          />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ fill: isDark ? '#ffffff06' : '#00000004' }} />
          {CONFIG.map(({ key, color }) => (
            <Bar
              key={key}
              dataKey={key}
              stackId="a"
              fill={color}
              fillOpacity={0.85}
              shape={makeShape(key)}
            />
          ))}
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
