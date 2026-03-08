import { useState, useMemo } from 'react';
import { MODELS } from '../data/models';


// Slider bounds in billions — derived from SNAP_POINTS in SizeRangeFilter
export const SLIDER_MIN = 0.014;
export const SLIDER_MAX = 14;

export function useFilters() {
  const [sortOrder, setSortOrder]             = useState('desc');
  const [filterOrgs, setFilterOrgs]           = useState(new Set());
  const [filterModalities, setFilterModalities] = useState(new Set());
  const [searchTerm, setSearchTerm]           = useState('');
  const [sizeRange, setSizeRange]             = useState([SLIDER_MIN, SLIDER_MAX]);
  const [edgeNativeOnly, setEdgeNativeOnly]   = useState(false);
  const [openWeightsOnly, setOpenWeightsOnly] = useState(false);

  const isSizeFiltered = useMemo(() =>
    sizeRange[0] > SLIDER_MIN || sizeRange[1] < SLIDER_MAX,
    [sizeRange]
  );

  const filteredModels = useMemo(() => {
    return MODELS.filter(m => {
      // Org filter
      if (filterOrgs.size > 0 && !filterOrgs.has(m.org)) return false;

      // Modality filter
      if (filterModalities.size > 0 && !filterModalities.has(m.modality)) return false;

      // Edge-native filter
      if (edgeNativeOnly && !m.edge_native) return false;

      // Open-weights filter
      if (openWeightsOnly && !m.open_weights) return false;

      // Search
      if (searchTerm) {
        const q = searchTerm.toLowerCase();
        if (
          !m.name.toLowerCase().includes(q) &&
          !m.org.toLowerCase().includes(q)
        ) return false;
      }

      // Size range — show model if ANY variant falls within the range
      if (isSizeFiltered && m.params?.length) {
        const hasVariantInRange = m.params.some(p => p >= sizeRange[0] && p <= sizeRange[1]);
        if (!hasVariantInRange) return false;
      }

      return true;
    });
  }, [filterOrgs, filterModalities, edgeNativeOnly, openWeightsOnly,
      searchTerm, sizeRange, isSizeFiltered]);

  const sortedYears = useMemo(() => {
    const years = Array.from(new Set(filteredModels.map(m => m.year)));
    return sortOrder === 'desc'
      ? years.sort((a, b) => b - a)
      : years.sort((a, b) => a - b);
  }, [filteredModels, sortOrder]);

  const toggleSort = () => setSortOrder(o => (o === 'desc' ? 'asc' : 'desc'));

  function toggleOrg(org) {
    setFilterOrgs(prev => {
      const next = new Set(prev);
      next.has(org) ? next.delete(org) : next.add(org);
      return next;
    });
  }

  function toggleModality(mod) {
    setFilterModalities(prev => {
      const next = new Set(prev);
      next.has(mod) ? next.delete(mod) : next.add(mod);
      return next;
    });
  }

  function clearOrgs()       { setFilterOrgs(new Set()); }
  function clearModalities() { setFilterModalities(new Set()); }
  function clearSize()       { setSizeRange([SLIDER_MIN, SLIDER_MAX]); }

  return {
    sortOrder, toggleSort,
    filterOrgs,        toggleOrg,       clearOrgs,
    filterModalities,  toggleModality,  clearModalities,
    searchTerm, setSearchTerm,
    sizeRange, setSizeRange, isSizeFiltered, clearSize,
    edgeNativeOnly, setEdgeNativeOnly,
    openWeightsOnly, setOpenWeightsOnly,
    filteredModels,
    sortedYears,
  };
}