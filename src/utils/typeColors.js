/**
 * Returns Tailwind class strings for a model modality.
 * text-encoder → grey/slate
 * text         → cyan  (default)
 * vision-language → violet
 * multimodal   → fuchsia (text+vision+audio — Gemma 3n only for now)
 * reasoning    → amber
 */
export function typeColors(modality) {
  switch (modality) {
    case 'text-encoder':
      return {
        dot:      'bg-slate-400 shadow-[0_0_40px_rgba(148,163,184,0.5)]',
        dotSmall: 'bg-slate-400 shadow-[0_0_12px_rgba(148,163,184,0.4)]',
        badge:    'bg-slate-400/10 border-slate-400/40 text-slate-400',
        pulse:    'bg-slate-400',
      };
    case 'vision-language':
      return {
        dot:      'bg-violet-500 shadow-[0_0_40px_rgba(139,92,246,0.6)]',
        dotSmall: 'bg-violet-500 shadow-[0_0_12px_rgba(139,92,246,0.5)]',
        badge:    'bg-violet-500/10 border-violet-500/40 text-violet-500',
        pulse:    'bg-violet-500',
      };
    case 'multimodal':
      return {
        dot:      'bg-fuchsia-500 shadow-[0_0_40px_rgba(217,70,239,0.6)]',
        dotSmall: 'bg-fuchsia-500 shadow-[0_0_12px_rgba(217,70,239,0.5)]',
        badge:    'bg-fuchsia-500/10 border-fuchsia-500/40 text-fuchsia-500',
        pulse:    'bg-fuchsia-500',
      };
    case 'reasoning':
      return {
        dot:      'bg-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.6)]',
        dotSmall: 'bg-amber-500 shadow-[0_0_12px_rgba(245,158,11,0.5)]',
        badge:    'bg-amber-500/10 border-amber-500/40 text-amber-500',
        pulse:    'bg-amber-500',
      };
    default: // text
      return {
        dot:      'bg-cyan-500 shadow-[0_0_40px_rgba(34,211,238,0.6)]',
        dotSmall: 'bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]',
        badge:    'bg-cyan-500/10 border-cyan-500/40 text-cyan-500',
        pulse:    'bg-cyan-500',
      };
  }
}

/** Human-readable label for a modality value */
export const MODALITY_LABEL = {
  'text-encoder':   'Text Encoder',
  'text':           'Text',
  'vision-language':'Vision-Language',
  'multimodal':     'Multimodal',
  'reasoning':      'Reasoning',
};