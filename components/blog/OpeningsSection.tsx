/**
 * Openings Section Component
 * 
 * Purpose: Display open positions and opportunities at the lab.
 */

import { Card, Badge, Button } from '@/components/ui';
import { Briefcase, Calendar, Mail, CheckCircle } from 'lucide-react';
import type { Opening } from '@/types';

interface OpeningsSectionProps {
  openings: Opening[];
}

/**
 * OpeningsSection Component
 * 
 * Open positions display with:
 * - Position type and title
 * - Description and requirements
 * - Deadline info
 * - Contact email npm run build
 */
export function OpeningsSection({ openings }: OpeningsSectionProps) {
  // Filter to only show open positions
  const activeOpenings = openings.filter((o) => o.isOpen);

  if (activeOpenings.length === 0) {
    return (
      <Card>
        <h3 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-50">
          Open Positions
        </h3>
        <p className="text-surface-600 dark:text-surface-400">
          There are no open positions at this time. Please check back later or contact us for future opportunities.
        </p>
      </Card>
    );
  }

  return (
    <div>
      {/* <h3 className="mb-6 text-xl font-semibold text-surface-900 dark:text-surface-50">
        Open Positions
      </h3> */}
      <div className="space-y-4">
        {activeOpenings.map((opening) => (
          <OpeningCard key={opening.id} opening={opening} />
        ))}
      </div>
    </div>
  );
}

/**
 * OpeningCard Component
 * 
 * Individual opening display.
 */
interface OpeningCardProps {
  opening: Opening;
}

export function OpeningCard({ opening }: OpeningCardProps) {
  // Type badge colors
  const typeColors: Record<string, 'primary' | 'accent' | 'success' | 'warning'> = {
    PhD: 'primary',
    Masters: 'accent',
    Internship: 'success',
    PostDoc: 'primary',
    'Research Assistant': 'accent',
    Collaboration: 'warning',
  };

  const formattedDeadline = opening.deadline
    ? new Date(opening.deadline).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null;

  return (
    <Card className="text-left">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex-1">
          {/* Header - Position Type Badge Only */}
          <div className="mb-2">
            <Badge variant={typeColors[opening.type] || 'neutral'} size="md">
              {opening.type}
            </Badge>
          </div>

          {/* Title */}
          <h4 className="mb-2 text-lg font-semibold text-surface-900 dark:text-surface-50">
            {opening.title}
          </h4>

          {/* Description */}
          <p className="mb-4 text-surface-600 dark:text-surface-400">
            {opening.description}
          </p>

          {/* Requirements */}
          {opening.requirements && opening.requirements.length > 0 && (
            <div className="mb-4">
              <h5 className="mb-2 text-sm font-medium text-surface-700 dark:text-surface-300">
                Requirements:
              </h5>
              <ul className="space-y-1">
                {opening.requirements.map((req, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-2 text-sm text-surface-600 dark:text-surface-400"
                  >
                    <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-500" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Deadline */}
          {formattedDeadline && (
            <div className="flex items-center gap-2 text-sm text-surface-500 dark:text-surface-400">
              <Calendar className="h-4 w-4" />
              Application deadline: {formattedDeadline}
            </div>
          )}
        </div>

        {/* Apply button */}
        {opening.contactEmail && (
          <Button
            as="link"
            href={`mailto:${opening.contactEmail}?subject=Application: ${opening.title}`}
            variant="primary"
            size="md"
            leftIcon={<Mail className="h-4 w-4" />}
            external
          >
            Apply Now
          </Button>
        )}
      </div>
    </Card>
  );
}
