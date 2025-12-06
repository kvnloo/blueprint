/**
 * useSearch Hook - Debounced Full-Text Search
 *
 * Provides a React hook for the FlexSearch-powered search service
 * with automatic debouncing to prevent excessive re-indexing.
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  search,
  searchAndFilter,
  initializeSearchIndex,
  SearchResult,
  getSearchStats,
} from '../services/searchService';
import { Article, ArticleTrack, ArticleType } from '../data/researchData';

interface UseSearchOptions {
  debounceMs?: number;
  minQueryLength?: number;
}

interface UseSearchReturn {
  query: string;
  setQuery: (query: string) => void;
  results: SearchResult[] | Article[];
  isSearching: boolean;
  hasSearchQuery: boolean;
  stats: ReturnType<typeof getSearchStats>;
  selectedTracks: ArticleTrack[];
  setSelectedTracks: React.Dispatch<React.SetStateAction<ArticleTrack[]>>;
  selectedTypes: ArticleType[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<ArticleType[]>>;
  toggleTrack: (track: ArticleTrack) => void;
  toggleType: (type: ArticleType) => void;
  clearFilters: () => void;
  hasActiveFilters: boolean;
}

export function useSearch(options: UseSearchOptions = {}): UseSearchReturn {
  const { debounceMs = 150, minQueryLength = 2 } = options;

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SearchResult[] | Article[]>([]);
  const [selectedTracks, setSelectedTracks] = useState<ArticleTrack[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<ArticleType[]>([]);

  const isInitialized = useRef(false);

  // Initialize search index on mount
  useEffect(() => {
    if (!isInitialized.current) {
      initializeSearchIndex();
      isInitialized.current = true;
    }
  }, []);

  // Debounce search query
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [query, debounceMs]);

  // Perform search when debounced query or filters change
  useEffect(() => {
    setIsSearching(true);

    // Use requestAnimationFrame for smoother UI
    const rafId = requestAnimationFrame(() => {
      const searchResults = searchAndFilter(
        debouncedQuery,
        selectedTracks,
        selectedTypes
      );
      setResults(searchResults);
      setIsSearching(false);
    });

    return () => cancelAnimationFrame(rafId);
  }, [debouncedQuery, selectedTracks, selectedTypes]);

  // Toggle track filter
  const toggleTrack = useCallback((track: ArticleTrack) => {
    setSelectedTracks(prev =>
      prev.includes(track)
        ? prev.filter(t => t !== track)
        : [...prev, track]
    );
  }, []);

  // Toggle type filter
  const toggleType = useCallback((type: ArticleType) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedTracks([]);
    setSelectedTypes([]);
  }, []);

  // Compute derived state
  const hasSearchQuery = query.length >= minQueryLength;
  const hasActiveFilters = query !== '' || selectedTracks.length > 0 || selectedTypes.length > 0;
  const stats = useMemo(() => getSearchStats(), []);

  return {
    query,
    setQuery,
    results,
    isSearching,
    hasSearchQuery,
    stats,
    selectedTracks,
    setSelectedTracks,
    selectedTypes,
    setSelectedTypes,
    toggleTrack,
    toggleType,
    clearFilters,
    hasActiveFilters,
  };
}

// Type guard to check if results are SearchResults
export function isSearchResults(results: SearchResult[] | Article[]): results is SearchResult[] {
  return results.length > 0 && 'score' in results[0];
}
