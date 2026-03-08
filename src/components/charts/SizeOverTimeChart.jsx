/**
 * SizeOverTimeChart.jsx
 * Scatter plot — parameter count (millions) vs release date, coloured by type.
 */
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import { getSizeOverTime } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getSizeOverTime();

const MODALITY_COLOR = {
  'text':            '#22d3ee',
  'text-encoder':    '#94a3b8',
  'vision-language': '#ec4899',
  'multimodal':      '#d946ef',
  'reasoning':       '#f59e0b',
};

const BY_MODALITY = Object.keys(MODALITY_COLOR).map(mod => ({
  modality: mod,
  color: MODALITY_COLOR[mod],
  data: DATA.filter(d => d.modality === mod),
}));

// Explicit Y ticks in millions — log scale, tops out at 14B (on-device ceiling).
const Y_TICKS_M = [
  14.5,   // ~14M
  100,    // 100M
  350,    // 350M
  1000,   // 1B
  3000,   // 3B
  7000,   // 7B
  14000,  // 14B
];

function formatSize(m) {
  if (m >= 1000) return `${+(m / 1000).toFixed(0)}B`;
  if (m >= 100)  return `${Math.round(m)}M`;
  return `${+m.toFixed(0)}M`;
}

function formatParam(p) {
  return p < 1 ? `${Math.round(p * 1000)}M` : `${p}B`;
}

function CustomTooltip({ active, payload, isDark }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  const variants = (d.params ?? []).filter(p => p <= 14).map(formatParam).join(', ');
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black max-w-[220px] ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div style={{ color: MODALITY_COLOR[d.modality] }} className="uppercase tracking-widest mb-1">
        {d.modality}
      </div>
      <div className="mb-0.5">{d.name}</div>
      <div className={isDark ? 'text-[#4A5568]' : 'text-[#737373]'}>
        {d.org} · {MONTHS[d.month - 1]} {d.year}
      </div>
      <div className={`mt-1.5 pt-1.5 border-t ${isDark ? 'border-[#1E2533]' : 'border-[#E5E5E5]'}`}>
        <span className={`text-[9px] uppercase tracking-widest ${isDark ? 'text-[#4A5568]' : 'text-[#A3A3A3]'}`}>
          Variants
        </span>
        <div>{variants || formatSize(d.sizeM)}</div>
      </div>
    </div>
  );
}

const MIN_X = Math.floor(Math.min(...DATA.map(d => d.x)));
const MAX_X = Math.ceil(Math.max(...DATA.map(d => d.x)));
const X_TICKS = Array.from({ length: MAX_X - MIN_X + 1 }, (_, i) => MIN_X + i);

export default function SizeOverTimeChart({ isDark, t, height = 280 }) {
  return (
    <ChartCard
      title="Parameter scale over time"
      subtitle="One dot per model family · log scale · hover for all variants"
      isDark={isDark}
      t={t}
    >
      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4">
        {BY_MODALITY.map(({ modality, color }) => (
          <div key={modality} className="flex items-center gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: color }} />
            <span className={`text-[10px] font-black uppercase tracking-wider ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
              {modality}
            </span>
          </div>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={height}>
        <ScatterChart margin={{ top: 4, right: 8, left: 8, bottom: 0 }}>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke={isDark ? '#1E2533' : '#E5E5E5'}
          />
          <XAxis
            type="number"
            dataKey="x"
            domain={[MIN_X, MAX_X + 0.1]}
            ticks={X_TICKS}
            tickFormatter={v => String(Math.round(v))}
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type="number"
            dataKey="sizeM"
            scale="log"
            domain={[10, 20000]}
            ticks={Y_TICKS_M}
            tickFormatter={formatSize}
            tick={{ fontSize: 10, fontWeight: 700, fill: isDark ? '#4A5568' : '#737373' }}
            axisLine={false}
            tickLine={false}
            width={44}
          />
          <ZAxis range={[40, 40]} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ stroke: isDark ? '#404040' : '#d4d4d4' }} />
          {BY_MODALITY.map(({ modality, color, data }) => (
            <Scatter
              key={modality}
              data={data}
              fill={color}
              fillOpacity={0.8}
              shape="circle"
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}