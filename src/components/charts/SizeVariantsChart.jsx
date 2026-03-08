/**
 * SizeVariantsChart.jsx
 * Bubble scatter — one dot per size variant, bubble area scales with param count.
 * Models with multiple variants (e.g. Llama 2 7B/13B/70B) appear as a vertical
 * cluster of growing bubbles at the same x position.
 */
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, ZAxis,
} from 'recharts';
import { getSizeVariants } from '../../utils/trendsData';
import ChartCard from './ChartCard';

const DATA = getSizeVariants();

const MODALITY_COLOR = {
  'text':            '#22d3ee',
  'text-encoder':    '#94a3b8',
  'vision-language': '#ec4899',
  'multimodal':      '#d946ef',
  'reasoning':       '#f59e0b',
};

const BY_MODALITY = Object.keys(MODALITY_COLOR).map(mod => ({
  modality: mod,
  color:    MODALITY_COLOR[mod],
  data:     DATA.filter(d => d.modality === mod),
}));

const Y_TICKS_M = [
  14.5,
  100,
  350,
  1000,
  3000,
  7000,
  14000,
];

function formatSize(m) {
  if (m >= 1000) return `${+(m / 1000).toFixed(0)}B`;
  if (m >= 100)  return `${Math.round(m)}M`;
  return `${+m.toFixed(0)}M`;
}

function CustomTooltip({ active, payload, isDark }) {
  if (!active || !payload?.length) return null;
  const d = payload[0]?.payload;
  if (!d) return null;
  const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return (
    <div className={`px-4 py-3 rounded-2xl border shadow-xl text-xs font-black max-w-[200px] ${
      isDark ? 'bg-[#151921] border-[#1E2533] text-[#E2E8F0]' : 'bg-white border-[#E5E5E5] text-[#171717]'
    }`}>
      <div style={{ color: MODALITY_COLOR[d.modality] }} className="uppercase tracking-widest mb-1">
        {d.modality}
      </div>
      <div className="mb-0.5">{d.name}</div>
      <div className={isDark ? 'text-[#4A5568]' : 'text-[#737373]'}>
        {d.org} · {MONTHS[d.month - 1]} {d.year}
      </div>
      <div className="mt-1">{formatSize(d.sizeM)} variant</div>
    </div>
  );
}

const MIN_X = Math.floor(Math.min(...DATA.map(d => d.x)));
const MAX_X = Math.ceil(Math.max(...DATA.map(d => d.x)));
const X_TICKS = Array.from({ length: MAX_X - MIN_X + 1 }, (_, i) => MIN_X + i);

export default function SizeVariantsChart({ isDark, t, height = 280 }) {
  return (
    <ChartCard
      title="Variant breadth over time"
      subtitle="One dot per on-device variant (≤ 14B) · dot size = parameter count"
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
          {/* z is sqrt(sizeM) — compresses the 14M→70B range into readable bubble sizes */}
          <ZAxis dataKey="z" domain={[0, 120]} range={[15, 400]} />
          <Tooltip content={<CustomTooltip isDark={isDark} />} cursor={{ stroke: isDark ? '#404040' : '#d4d4d4' }} />
          {BY_MODALITY.map(({ modality, color, data }) => (
            <Scatter
              key={modality}
              data={data}
              fill={color}
              fillOpacity={0.6}
              shape="circle"
            />
          ))}
        </ScatterChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}
