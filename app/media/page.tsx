/**
 * Media/Gallery Page
 * 
 * Purpose: Photo gallery of lab events, talks, and activities.
 * Features lightbox viewer and category filtering.
 */

import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { GalleryGrid } from '@/components/media';
import type { MediaItem } from '@/types';

// Import data
import mediaData from '@/data/media.json';

const mediaItems = mediaData as MediaItem[];

export const metadata: Metadata = {
  title: 'Media Gallery',
  description: 'Photos from lab events, conferences, talks, and team activities.',
};

/**
 * Media Page Component
 * 
 * Photo gallery with:
 * - Category filtering
 * - Click-to-expand lightbox
 * - Captions and event info
 */
export default function MediaPage() {
  return (
    <>
      <PageHeader
        title="Media Gallery"
        description="Explore photos from our lab events, conference presentations, team activities, and research highlights."
      />

      <Section>
        <GalleryGrid items={mediaItems} />
      </Section>
    </>
  );
}
