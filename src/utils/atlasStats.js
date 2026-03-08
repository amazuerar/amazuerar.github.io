/**
 * Derives live stats from the MODELS array.
 */
import { MODELS } from '../data/models';

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function latestModel() {
  return MODELS.reduce((best, m) =>
    (m.year > best.year || (m.year === best.year && m.month > best.month)) ? m : best,
    MODELS[0]
  );
}
function earliestModel() {
  return MODELS.reduce((best, m) =>
    (m.year < best.year || (m.year === best.year && m.month < best.month)) ? m : best,
    MODELS[0]
  );
}

const latest   = latestModel();
const earliest = earliestModel();

export const ATLAS_STATS = {
  modelCount:       MODELS.length,
  orgCount:         new Set(MODELS.map(m => m.org)).size,
  modalityCount:    new Set(MODELS.map(m => m.modality)).size,
  coverageSpan:     `${earliest.year}–${latest.year}`,
  latestYear:       latest.year,
  latestMonth:      latest.month,
  earliestYear:     earliest.year,
  earliestMonth:    earliest.month,
  latestLabel:      `${MONTH_NAMES[latest.month - 1]} ${latest.year}`,
  earliestLabel:    `${MONTH_NAMES[earliest.month - 1]} ${earliest.year}`,
  // Tier breakdown
  edgeNativeCount:  MODELS.filter(m => m.edge_native).length,
  tier2Count:       MODELS.filter(m => !m.edge_native).length,
  // Weights
  openWeightsCount: MODELS.filter(m => m.open_weights).length,
  closedWeightsCount: MODELS.filter(m => !m.open_weights).length,
  // Provenance
  academiaCount:    MODELS.filter(m => m.provenance === 'academia').length,
  industryCount:    MODELS.filter(m => m.provenance === 'industry').length,
  collabCount:      MODELS.filter(m => m.provenance === 'collaboration').length,
  // Modality breakdown
  visionLangCount:  MODELS.filter(m => m.modality === 'vision-language').length,
  reasoningCount:   MODELS.filter(m => m.modality === 'reasoning').length,
  textEncoderCount: MODELS.filter(m => m.modality === 'text-encoder').length,
};