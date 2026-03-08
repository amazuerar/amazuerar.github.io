import { useState } from 'react';
import { Cpu, Smartphone, Zap, Globe, Filter, Quote, Copy, Check,
         FlaskConical, Building2, Handshake, BookOpen, Layers, Ruler } from 'lucide-react';
import { ATLAS_STATS } from '../utils/atlasStats';
import { PUB_YEAR } from '../data/atlasConfig';

function CopyBlock({ text, isDark }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className={`relative rounded-2xl p-6 font-mono text-xs leading-relaxed ${isDark ? 'bg-[#0B0E14] text-[#94A3B8]' : 'bg-[#F5F5F5] text-[#171717]'}`}>
      <button
        onClick={copy}
        className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${isDark ? 'hover:bg-[#1E2533] text-[#4A5568] hover:text-[#94A3B8]' : 'hover:bg-[#E5E5E5] text-[#737373] hover:text-[#171717]'}`}
        title="Copy BibTeX"
      >
        {copied ? <Check size={14} className="text-cyan-500" /> : <Copy size={14} />}
      </button>
      <pre className="whitespace-pre-wrap break-all pr-8">{text}</pre>
    </div>
  );
}

// ── Two-Tier Visual ───────────────────────────────────────────────────────────
function TierDiagram({ isDark }) {
  return (
    <div className="space-y-3 my-6">
      {/* Tier 1 */}
      <div className={`flex items-start gap-4 p-5 rounded-2xl border ${isDark ? 'bg-cyan-500/5 border-cyan-500/20' : 'bg-cyan-50 border-cyan-200'}`}>
        <div className="flex-shrink-0 mt-0.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-xl bg-cyan-500 text-white">
            <Cpu size={16} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-[11px] font-black uppercase tracking-widest text-cyan-400`}>Tier 1 (Edge-Native)</span>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400`}>{ATLAS_STATS.edgeNativeCount} models</span>
          </div>
          <p className={`text-[14px] font-medium leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
            Authors explicitly designed <em>and</em> documented the model for mobile or edge deployment.
            The model targets phones, NPUs, Snapdragon, Apple Neural Engine, or similar hardware.
            Examples: MobileLLM, Gemini Nano, PhoneLM, Llama 3.2 Mobile, SmolLM2, Gemma 3n.
          </p>
        </div>
      </div>

      {/* Tier 2 */}
      <div className={`flex items-start gap-4 p-5 rounded-2xl border ${isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-[#F5F5F5] border-[#E5E5E5]'}`}>
        <div className="flex-shrink-0 mt-0.5">
          <div className={`flex items-center justify-center w-8 h-8 rounded-xl text-white ${isDark ? 'bg-[#4A5568]' : 'bg-[#94A3B8]'}`}>
            <BookOpen size={16} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>Tier 2 (Ecosystem predecessor)</span>
            <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full ${isDark ? 'bg-[#1E2533] text-[#94A3B8]' : 'bg-[#E5E5E5] text-[#737373]'}`}>{ATLAS_STATS.tier2Count} models</span>
          </div>
          <p className={`text-[14px] font-medium leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
            While not explicitly designed for edge deployment, these models served as foundational benchmarks 
  and were widely adopted by practitioners to shape the field's evolution. 
  Inclusion criterion: <em>The model represents a critical branch in the developmental lineage 
  of on-device SLMs or provided the architectural basis for subsequent hardware-specific optimization. </em>
             Examples: Llama 1/2, Mistral 7B, TinyLlama, Pythia, RWKV, OPT.
          </p>
        </div>
      </div>

      {/* Size threshold */}
      <div className={`flex items-start gap-4 p-5 rounded-2xl border ${isDark ? 'bg-[#151921] border-[#1E2533]' : 'bg-[#F5F5F5] border-[#E5E5E5]'}`}>
        <div className="flex-shrink-0 mt-0.5">
          <div className={`flex items-center justify-center w-8 h-8 rounded-xl text-white ${isDark ? 'bg-[#4A5568]' : 'bg-[#94A3B8]'}`}>
            <Ruler size={16} />
          </div>
        </div>
        <div>
          <div className="flex items-center gap-3 mb-1">
            <span className={`text-[11px] font-black uppercase tracking-widest ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>Size threshold: 14B parameters</span>
          </div>
          <p className={`text-[14px] font-medium leading-relaxed ${isDark ? 'text-[#94A3B8]' : 'text-[#737373]'}`}>
            Both tiers are capped at <strong className={isDark ? 'text-[#E2E8F0]' : 'text-[#171717]'}>14 billion parameters</strong>.
            This reflects the practical upper bound of what current mobile and edge hardware can run locally
            with quantization. A model is included when at least one of its variants falls at or below this
            ceiling. The 14B boundary also aligns with a natural gap in the model landscape: the next common
            size tier jumps to 32B+, which requires desktop GPUs or cloud infrastructure.
          </p>
        </div>
      </div>

      <p className={`text-[12px] font-medium pl-1 mt-3 ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>
        Small parameter count alone does not satisfy the criteria for inclusion. Models such as Galactica, Bloom, Cerebras-GPT, and Dolly-v2 are omitted because their development was driven by research objectives (such as scientific reasoning or scaling laws) that are outside of the specific lineage of on-device optimization and adoption.
      </p>
    </div>
  );
}

// ── Provenance Visual ─────────────────────────────────────────────────────────
function ProvenanceDiagram({ isDark }) {
  const items = [
    {
      icon: FlaskConical,
      label: 'Academia',
      count: ATLAS_STATS.academiaCount,
      desc: 'University labs and non-profit research institutes (EleutherAI, AllenAI, TII, MBZUAI, Princeton NLP).',
      colors: isDark ? 'bg-violet-500/10 border-violet-500/20 text-violet-400' : 'bg-violet-50 border-violet-200 text-violet-600',
      iconBg: 'bg-violet-500',
    },
    {
      icon: Building2,
      label: 'Industry',
      count: ATLAS_STATS.industryCount,
      desc: 'Companies and corporate research labs (Meta, Google, Microsoft, Apple, Alibaba, Huawei, Mistral AI).',
      colors: isDark ? 'bg-blue-500/10 border-blue-500/20 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600',
      iconBg: 'bg-blue-500',
    },
    {
      icon: Handshake,
      label: 'Collaboration',
      count: ATLAS_STATS.collabCount,
      desc: 'Explicit multi-org or university+industry joint work (CMU/Google on MobileBERT, UW/Apple on DCLM, OpenBMB/Tsinghua on MiniCPM).',
      colors: isDark ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600',
      iconBg: 'bg-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
      {items.map(({ icon: Icon, label, count, desc, colors, iconBg }) => (
        <div key={label} className={`p-5 rounded-2xl border ${colors}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className={`flex items-center justify-center w-7 h-7 rounded-xl text-white ${iconBg}`}>
              <Icon size={14} />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest">{label}</span>
            <span className="ml-auto text-lg font-black">{count}</span>
          </div>
          <p className={`text-[12px] font-medium leading-relaxed ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>{desc}</p>
        </div>
      ))}
    </div>
  );
}

// ── Section definitions ───────────────────────────────────────────────────────
export default function AboutPage({ isDark, t }) {
  const STATS = [
    { value: `${ATLAS_STATS.modelCount}`,        label: 'Models tracked'   },
    { value: `${ATLAS_STATS.edgeNativeCount}`,   label: 'Edge-native (T1)' },
    { value: `${ATLAS_STATS.orgCount}`,          label: 'Organisations'    },
    { value: ATLAS_STATS.coverageSpan,           label: 'Coverage span'    },
  ];

  const bodyMuted = isDark ? 'text-[#94A3B8]' : 'text-[#737373]';
  const bodyStrong = isDark ? 'text-[#E2E8F0]' : 'text-[#171717]';

  return (
    <div className="max-w-[1100px] mx-auto px-4 pb-24">

      {/* Hero */}
      <div className="mb-20 pt-4">
        <span className={`text-[10px] font-black uppercase tracking-[0.6em] ${t.accent}`}>About</span>
        <h2 className={`text-6xl font-black tracking-tighter mt-3 mb-6 ${t.yearLabel}`}>
          On-Device SLM<br />Atlas
        </h2>
        <p className={`text-2xl leading-relaxed font-medium tracking-tight ${bodyMuted}`}>
          A registry of small language models for edge inference.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-20">
        {STATS.map(s => (
          <div key={s.label} className={`p-6 rounded-3xl border text-center ${t.card}`}>
            <div className={`text-3xl font-black tracking-tighter mb-1 ${t.accent}`}>{s.value}</div>
            <div className={`text-[10px] font-black uppercase tracking-widest ${t.muted}`}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* 2×2 info grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        {/* What is this */}
        <div className={`p-8 rounded-[2rem] border ${t.card}`}>
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
              <Cpu className="text-white" size={20} />
            </div>
            <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>What is this?</h3>
          </div>
          <p className={`text-[14px] leading-relaxed font-medium ${bodyMuted}`}>
            The On-Device SLM Atlas is a chronological registry of small language models
            that run locally, on smartphones, tablets, or edge hardware, without cloud connectivity.
            It spans {ATLAS_STATS.coverageSpan} and covers {ATLAS_STATS.modelCount} models across text,
            multimodal, and reasoning capabilities. The Atlas also preserves some historical context, namely the ecosystem predecessors without which
            today's on-device field would not exist.
          </p>
        </div>

        {/* Why on-device */}
        <div className={`p-8 rounded-[2rem] border ${t.card}`}>
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
              <Smartphone className="text-white" size={20} />
            </div>
            <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>Why on-device?</h3>
          </div>
          <p className={`text-[14px] leading-relaxed font-medium ${bodyMuted}`}>
            On-device inference is a fundamental shift in how AI is deployed. When a model runs locally,
            user data never leaves the device, no cloud round-trips, no latency penalty, no privacy exposure.
            This atlas documents the models that made that shift possible.
          </p>
        </div>

        {/* How organized */}
        <div className={`p-8 rounded-[2rem] border ${t.card}`}>
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
              <Zap className="text-white" size={20} />
            </div>
            <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>How is it organized?</h3>
          </div>
          <p className={`text-[14px] leading-relaxed font-medium ${bodyMuted}`}>
            Models are tagged by capability type: <strong className={bodyStrong}>text</strong> (standard language models),{' '}
            <strong className={bodyStrong}>multimodal</strong> (vision + language),
            and <strong className={bodyStrong}>reasoning</strong> (explicit chain-of-thought
            or RL-trained thinking). Each model also carries a{' '}
            <strong className={bodyStrong}>tier badge</strong> (Edge-Native or Ecosystem),
            a <strong className={bodyStrong}>provenance tag</strong> (Academia / Industry / Collaboration),
            and a link where a paper exists or a link to official resources.
            Moreover, two views: <strong className={bodyStrong}>Linear</strong> (timeline with model cards)
            and <strong className={bodyStrong}>Matrix</strong> (org × time grid).
          </p>
        </div>

        {/* Who is it for */}
        <div className={`p-8 rounded-[2rem] border ${t.card}`}>
          <div className="flex items-center gap-4 mb-5">
            <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
              <Globe className="text-white" size={20} />
            </div>
            <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>Who is this for?</h3>
          </div>
          <p className={`text-[14px] leading-relaxed font-medium ${bodyMuted}`}>
            Mobile and embedded developers choosing a deployment-ready model. Security researchers
            assessing the attack surface of local LLM deployments (a fast-growing target).
            Academics and industry analysts tracing the field's evolution from 2019 distillation
            research to 2026 reasoning models running CoT on smartphones. Anyone asking:
            <em> "What is the current state of the art for running a language model on a phone?"</em>
          </p>
        </div>

      </div>

      {/* Inclusion criteria with tier diagram */}
      <div className={`p-8 rounded-[2rem] border mb-6 ${t.card}`}>
        <div className="flex items-center gap-4 mb-5">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
            <Layers className="text-white" size={20} />
          </div>
          <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>Inclusion criteria</h3>
        </div>
        <p className={`text-[14px] leading-relaxed font-medium mb-2 ${bodyMuted}`}>
          The registry uses a two-tier model:
        </p>
        <TierDiagram isDark={isDark} />
      </div>

      {/* Provenance */}
      <div className={`p-8 rounded-[2rem] border mb-6 ${t.card}`}>
        <div className="flex items-center gap-4 mb-5">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
            <Handshake className="text-white" size={20} />
          </div>
          <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>Provenance</h3>
        </div>
        <p className={`text-[14px] leading-relaxed font-medium mb-2 ${bodyMuted}`}>
          Each model is attributed to one of three provenance categories, reflecting where the primary
          research and development happened:
        </p>
        <ProvenanceDiagram isDark={isDark} />
      </div>


      {/* Citation */}
      <div className={`mt-8 p-8 rounded-[2rem] border ${isDark ? 'border-[#1E2533] bg-[#151921]/50' : 'border-[#E5E5E5] bg-[#F5F5F5]'}`}>
        <div className="flex items-center gap-4 mb-6">
          <div className="bg-gradient-to-br from-cyan-500 to-blue-600 p-2.5 rounded-xl">
            <Quote className="text-white" size={20} />
          </div>
          <h3 className={`text-[18px] font-black tracking-tight ${t.yearLabel}`}>Cite this work</h3>
        </div>
        <p className={`text-[13px] font-medium leading-relaxed mb-6 ${bodyMuted}`}>
          Mazuera-Rozo, A. ({PUB_YEAR}). <em>On-Device SLM Atlas: A Registry of Small Language Models for Edge Inference</em>. GitHub Pages.{' '}
          <a href="https://amazuerar.github.io" target="_blank" rel="noreferrer"
            className="text-cyan-500 hover:underline break-all">
            https://amazuerar.github.io/atlas
          </a>
        </p>
        <div className="relative">
          <div className={`text-[9px] font-black uppercase tracking-widest mb-2 ${isDark ? 'text-[#4A5568]' : 'text-[#737373]'}`}>BibTeX</div>
          <CopyBlock isDark={isDark} text={`@misc{mazuera-rozo${PUB_YEAR}ondeviceslmatlas,
  author       = {Mazuera-Rozo, Alejandro},
  title        = {On-Device {SLM} Atlas: A Registry of Small Language Models for Edge Inference},
  year         = {${PUB_YEAR}},
  publisher    = {GitHub Pages},
  howpublished = {\\url{https://amazuerar.github.io/atlas}}
}`} />
        </div>
      </div>

      {/* Contributions note */}
      <div className={`mt-8 p-8 rounded-3xl border border-dashed text-center ${isDark ? 'border-[#1E2533] text-[#4A5568]' : 'border-[#E5E5E5] text-[#737373]'}`}>
        <p className="text-sm font-medium leading-relaxed">
          Attribution corrections and additions are welcome. If something is missing or misattributed, this project is open to contributions.
        </p>
      </div>

    </div>
  );
}
