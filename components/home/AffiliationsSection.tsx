/**
 * Affiliations Section Component
 * 
 * Purpose: Display university and institute logos/affiliations.
 * Shows partner organizations and academic affiliations.
 */

import Image from 'next/image';
import type { Affiliation } from '@/types';

interface AffiliationsSectionProps {
  affiliations: Affiliation[];
}

/**
 * AffiliationsSection Component
 * 
 * Displays affiliated institutions with:
 * - Logos in a grid/row layout
 * - Links to institution websites
 * - Responsive layout
 */
export function AffiliationsSection({ affiliations }: AffiliationsSectionProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12 lg:gap-16">
      {affiliations.map((affiliation) => (
        <a
          key={affiliation.name}
          href={affiliation.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center transition-all duration-300 hover:scale-110"
          title={affiliation.name}
        >
          {affiliation.logo ? (
            <Image
              src={affiliation.logo}
              alt={`${affiliation.name} logo`}
              width={320}
              height={160}
              className="max-h-32 w-auto object-contain bg-transparent shadow-none transition-transform rounded-2xl"
              style={{ background: 'none' }}
            />
          ) : (
            <div className="flex h-16 w-32 items-center justify-center rounded-lg bg-surface-200 text-sm font-medium text-surface-600 dark:bg-surface-700 dark:text-surface-300">
              {affiliation.name}
            </div>
          )}
        </a>
      ))}
    </div>
  );
}

/**
 * AffiliationLogo Component
 * 
 * Individual affiliation logo with hover effect.
 */
interface AffiliationLogoProps {
  affiliation: Affiliation;
}

export function AffiliationLogo({ affiliation }: AffiliationLogoProps) {
  return (
    <a
      href={affiliation.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex items-center justify-center opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
      title={affiliation.name}
    >
      {/* PLACEHOLDER: In production, use actual logo images */}
      <Image
        src={affiliation.logo}
        alt={`${affiliation.name} logo`}
        width={160}
        height={64}
        className="h-16 w-auto object-contain"
      />
    </a>
  );
}
