/**
 * Publication Filters Component
 * 
 * Purpose: Client-side filtering for publications page.
 * Includes search bar and filter dropdowns.
 */

'use client';

import { useState, useMemo, useCallback } from 'react';
import { SearchBar, FilterSelect } from '@/components/ui';
import { PublicationList } from './PublicationCard';
import type { Publication } from '@/types';

interface PublicationFiltersProps {
  publications: Publication[];
}

/**
 * PublicationFilters Component
 * 
 * Client-side filtering with:
 * - Text search (title, authors, venue)
 * - Year filter
 * - Type filter
 * - Tag filter
 * - Instant results
 */
export function PublicationFilters({ publications }: PublicationFiltersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [yearFilter, setYearFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [tagFilter, setTagFilter] = useState('all');

  // Extract unique values for filter options
  const years = useMemo(() => {
    const uniqueYears = Array.from(new Set(publications.map((p) => p.year))).sort((a, b) => b - a);
    return [{ value: 'all', label: 'All Years' }, ...uniqueYears.map((y) => ({ value: String(y), label: String(y) }))];
  }, [publications]);

  const types = useMemo(() => {
    const uniqueTypes = Array.from(new Set(publications.map((p) => p.type)));
    return [
      { value: 'all', label: 'All Types' },
      ...uniqueTypes.map((t) => ({ value: t, label: t.charAt(0).toUpperCase() + t.slice(1) })),
    ];
  }, [publications]);

  const tags = useMemo(() => {
    const uniqueTags = Array.from(new Set(publications.flatMap((p) => p.tags))).sort();
    return [{ value: 'all', label: 'All Topics' }, ...uniqueTags.map((t) => ({ value: t, label: t }))];
  }, [publications]);

  // Filter publications based on current filters
  const filteredPublications = useMemo(() => {
    return publications.filter((pub) => {
      // Text search
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = pub.title.toLowerCase().includes(query);
        const matchesAuthors = pub.authors.some((a) => a.toLowerCase().includes(query));
        const matchesVenue = pub.venue.toLowerCase().includes(query);
        const matchesTags = pub.tags.some((t) => t.toLowerCase().includes(query));
        
        if (!matchesTitle && !matchesAuthors && !matchesVenue && !matchesTags) {
          return false;
        }
      }

      // Year filter
      if (yearFilter !== 'all' && pub.year !== parseInt(yearFilter)) {
        return false;
      }

      // Type filter
      if (typeFilter !== 'all' && pub.type !== typeFilter) {
        return false;
      }

      // Tag filter
      if (tagFilter !== 'all' && !pub.tags.includes(tagFilter)) {
        return false;
      }

      return true;
    });
  }, [publications, searchQuery, yearFilter, typeFilter, tagFilter]);

  // Sort by year (most recent first)
  const sortedPublications = useMemo(() => {
    return [...filteredPublications].sort((a, b) => b.year - a.year);
  }, [filteredPublications]);

  // Handle search
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('');
    setYearFilter('all');
    setTypeFilter('all');
    setTagFilter('all');
  };

  const hasActiveFilters = searchQuery || yearFilter !== 'all' || typeFilter !== 'all' || tagFilter !== 'all';

  return (
    <div>
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        {/* Search Bar */}
        <SearchBar
          placeholder="Search by title, author, venue, or topic..."
          onSearch={handleSearch}
          className="max-w-2xl"
        />

        {/* Filter Dropdowns */}
        <div className="flex flex-wrap items-center gap-4">
          <FilterSelect
            label="Year"
            value={yearFilter}
            options={years}
            onChange={setYearFilter}
          />
          <FilterSelect
            label="Type"
            value={typeFilter}
            options={types}
            onChange={setTypeFilter}
          />
          <FilterSelect
            label="Topic"
            value={tagFilter}
            options={tags}
            onChange={setTagFilter}
          />

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Results count */}
        <p className="text-sm text-surface-600 dark:text-surface-400">
          Showing {sortedPublications.length} of {publications.length} publications
        </p>
      </div>

      {/* Publication List */}
      <PublicationList publications={sortedPublications} />
    </div>
  );
}
