/**
 * SearchBar Component
 * 
 * Purpose: Accessible search input with debounced filtering.
 * Used for client-side search on Publications and other list pages.
 */

'use client';

import { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
  debounceMs?: number;
  className?: string;
  initialValue?: string;
}

/**
 * SearchBar Component
 * 
 * Features:
 * - Debounced search to avoid excessive filtering
 * - Clear button when input has value
 * - Accessible labels and keyboard support
 * - Search icon for visual clarity
 */
export function SearchBar({
  placeholder = 'Search...',
  onSearch,
  debounceMs = 300,
  className = '',
  initialValue = '',
}: SearchBarProps) {
  const [value, setValue] = useState(initialValue);
  const [debouncedValue, setDebouncedValue] = useState(initialValue);

  // Debounce the search value
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  // Trigger search callback when debounced value changes
  useEffect(() => {
    onSearch(debouncedValue);
  }, [debouncedValue, onSearch]);

  // Handle input change
  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  }, []);

  // Handle clear button
  const handleClear = useCallback(() => {
    setValue('');
    setDebouncedValue('');
  }, []);

  return (
    <div className={`relative ${className}`}>
      {/* Search icon */}
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <Search className="h-5 w-5 text-surface-400" aria-hidden="true" />
      </div>

      {/* Search input */}
      <input
        type="search"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="w-full rounded-lg border border-surface-300 bg-white py-2.5 pl-10 pr-10 text-surface-900 placeholder:text-surface-400 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100 dark:placeholder:text-surface-500 dark:focus:border-primary-400"
        aria-label={placeholder}
      />

      {/* Clear button */}
      {value && (
        <button
          type="button"
          onClick={handleClear}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-surface-400 hover:text-surface-600 dark:hover:text-surface-300"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}

/**
 * SearchFilters Component
 * 
 * Container for additional filter options alongside search.
 */
interface SearchFiltersProps {
  children: React.ReactNode;
  className?: string;
}

export function SearchFilters({ children, className = '' }: SearchFiltersProps) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      {children}
    </div>
  );
}

/**
 * FilterSelect Component
 * 
 * Dropdown select for filter options.
 */
interface FilterSelectProps {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (value: string) => void;
  className?: string;
}

export function FilterSelect({
  label,
  value,
  options,
  onChange,
  className = '',
}: FilterSelectProps) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <label className="text-sm font-medium text-surface-600 dark:text-surface-400">
        {label}:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-lg border border-surface-300 bg-white px-3 py-1.5 text-sm text-surface-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-surface-600 dark:bg-surface-800 dark:text-surface-100"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
