/**
 * Gallery Grid Component
 * 
 * Purpose: Grid layout for media gallery with lightbox support.
 * Displays images with captions and click-to-expand.
 */

'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { Badge, Lightbox, useLightbox } from '@/components/ui';
import type { MediaItem } from '@/types';

interface GalleryGridProps {
  items: MediaItem[];
}

/**
 * GalleryGrid Component
 * 
 * Image gallery with:
 * - Responsive grid layout
 * - Category filters
 * - Click-to-expand lightbox
 * - Image captions
 */
export function GalleryGrid({ items }: GalleryGridProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Get unique categories
  const categories = useMemo(() => {
    const unique = Array.from(new Set(items.map((item) => item.category)));
    return ['all', ...unique];
  }, [items]);

  // Filter items by category
  const filteredItems = useMemo(() => {
    if (categoryFilter === 'all') return items;
    return items.filter((item) => item.category === categoryFilter);
  }, [items, categoryFilter]);

  // Prepare images for lightbox
  const lightboxImages = filteredItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    caption: item.caption,
  }));

  const lightbox = useLightbox(lightboxImages);

  // Category badge colors
  const categoryColors: Record<string, 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'> = {
    event: 'primary',
    talk: 'accent',
    group: 'success',
    lab: 'neutral',
    conference: 'warning',
    award: 'error',
  };

  return (
    <div>
      {/* Category Filters */}
      <div className="mb-8 flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              categoryFilter === category
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
            }`}
          >
            {category === 'all' ? 'All' : category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Results count */}
      <p className="mb-4 text-sm text-surface-600 dark:text-surface-400">
        Showing {filteredItems.length} images
      </p>

      {/* Image Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((item, index) => (
          <GalleryItem
            key={item.id}
            item={item}
            categoryColor={categoryColors[item.category] || 'neutral'}
            onClick={() => lightbox.open(index)}
          />
        ))}
      </div>

      {/* Empty state */}
      {filteredItems.length === 0 && (
        <div className="rounded-lg border border-surface-200 bg-surface-50 p-8 text-center dark:border-surface-700 dark:bg-surface-800/50">
          <p className="text-surface-600 dark:text-surface-400">
            No images found in this category.
          </p>
        </div>
      )}

      {/* Lightbox */}
      <Lightbox
        images={lightboxImages}
        currentIndex={lightbox.currentIndex}
        isOpen={lightbox.isOpen}
        onClose={lightbox.close}
        onNext={lightbox.next}
        onPrevious={lightbox.previous}
      />
    </div>
  );
}

/**
 * GalleryItem Component
 * 
 * Individual gallery image with caption.
 */
interface GalleryItemProps {
  item: MediaItem;
  categoryColor: 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
  onClick: () => void;
}

export function GalleryItem({ item, categoryColor, onClick }: GalleryItemProps) {
  return (
    <button
      onClick={onClick}
      className="group relative aspect-[4/3] overflow-hidden rounded-lg bg-surface-100 dark:bg-surface-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {/* PLACEHOLDER: Replace with actual gallery images */}
      <div className="flex h-full w-full items-center justify-center text-surface-400">
        <svg
          className="h-16 w-16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {/* Overlay with caption */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
        <Badge variant={categoryColor} size="sm" className="mb-2 w-fit">
          {item.category}
        </Badge>
        <p className="text-sm font-medium text-white">{item.caption}</p>
        {item.event && (
          <p className="text-xs text-white/80">{item.event}</p>
        )}
        {item.date && (
          <p className="text-xs text-white/60">
            {new Date(item.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
            })}
          </p>
        )}
      </div>

      {/* Hover effect */}
      <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
    </button>
  );
}
