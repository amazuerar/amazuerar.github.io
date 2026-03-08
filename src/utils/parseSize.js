/**
 * parseSize.js
 * `params: number[]` (in billions) is the machine-readable source of truth.
 * All size logic operates on params[] directly — never on the m.size string.
 */

/** Smallest variant in billions — determines on-device viability */
export function minParams(m) {
  if (m.params?.length) return Math.min(...m.params);
  return null;
}

/**
 * Format a billion value for display.
 * 0.0145 → "14.5M"   0.135 → "135M"   3.8 → "3.8B"
 */
export function formatSizeB(b) {
  if (b < 1) return `${+(b * 1000).toFixed(b < 0.1 ? 1 : 0)}M`;
  return `${+b.toFixed(1)}B`;
}
