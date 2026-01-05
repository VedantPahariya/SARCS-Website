/**
 * Resources Page
 * 
 * Purpose: Lab resources including tools, datasets, and code repositories.
 * Organized by category for easy discovery.
 */

import type { Metadata } from 'next';
import { PageHeader, Section, Quote } from '@/components/ui';
import { ResourceList } from '@/components/resources';
import type { Resource } from '@/types';

// Import data
import resourcesData from '@/data/resources.json';

const resources = resourcesData as Resource[];

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Access our open-source tools, datasets, code repositories, and documentation.',
};

/**
 * Resources Page Component
 * 
 * Resource listing with:
 * - Categorized grouping
 * - External links
 * - Type indicators
 */
export default function ResourcesPage() {
  return (
    <>
      <PageHeader
        title="Resources"
        description="Open-source tools, code repositories, datasets, and documentation from our research. Feel free to use and contribute!"
      />

      <Section>
        <ResourceList resources={resources} />
      </Section>

      {/* Inspirational Quote */}
      <Section className="py-8 md:py-12">
        <Quote
          text="Talk is cheap. Show me the code."
          author="Linus Torvalds"
          title="Creator of Linux"
          variant="centered"
        />
      </Section>
    </>
  );
}
