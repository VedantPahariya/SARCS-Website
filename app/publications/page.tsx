/**
 * Publications Page
 * 
 * Purpose: Searchable list of all lab publications.
 * Features client-side filtering by title, author, tag, and venue.
 */

import type { Metadata } from 'next';
import { PageHeader, Section, Quote } from '@/components/ui';
import { PublicationFilters } from '@/components/publications';
import type { Publication } from '@/types';

// Import data
import publicationsData from '@/data/publications.json';

const publications = publicationsData as Publication[];

export const metadata: Metadata = {
  title: 'Publications',
  description: 'Browse our publications in computer architecture, in-memory computing, RISC-V, and AI systems.',
};

/**
 * Publications Page Component
 * 
 * Publication listing with:
 * - Search functionality
 * - Filter by year, type, and topic
 * - Chronological listing
 */
export default function PublicationsPage() {
  return (
    <>
      <PageHeader
        title="Publications"
        description="Our research publications in top venues including ISCA, MICRO, DAC, and leading journals. Use the search and filters to find specific papers."
      />

      {/* Inspirational Quote */}
      <Section className="py-8 md:py-12">
        <Quote
          text="If I have seen further it is by standing on the shoulders of Giants."
          author="Isaac Newton"
          title="Mathematician & Physicist"
          variant="centered"
        />
      </Section>

      <Section className="pt-0">
        <PublicationFilters publications={publications} />
      </Section>
    </>
  );
}
