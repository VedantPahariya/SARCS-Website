/**
 * Highlights Section Component
 * 
 * Purpose: Featured highlights, announcements, or recent achievements.
 * Displays prominent content on the home page.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Card, Badge, Button } from '@/components/ui';
import { Award, FileText, Users, Code } from 'lucide-react';

interface Highlight {
  id: string;
  type: 'paper' | 'award' | 'project' | 'news';
  title: string;
  description: string;
  image?: string;
  link?: string;
  badge?: string;
}

interface HighlightsSectionProps {
  highlights: Highlight[];
}

// Icon mapping for highlight types
const highlightIcons = {
  paper: FileText,
  award: Award,
  project: Code,
  news: Users,
};

/**
 * HighlightsSection Component
 * 
 * Featured content grid with:
 * - Visual cards with images
 * - Type indicators
 * - Links to detailed pages
 */
export function HighlightsSection({ highlights }: HighlightsSectionProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {highlights.map((highlight) => (
        <HighlightCard key={highlight.id} highlight={highlight} />
      ))}
    </div>
  );
}

/**
 * HighlightCard Component
 * 
 * Individual highlight card with image and details.
 */
interface HighlightCardProps {
  highlight: Highlight;
}

export function HighlightCard({ highlight }: HighlightCardProps) {
  const Icon = highlightIcons[highlight.type];

  const CardContent = (
    <Card hover padding="none" className="group overflow-hidden">
      {/* Image */}
      {highlight.image && (
        <div className="relative aspect-video overflow-hidden bg-surface-100 dark:bg-surface-800">
          {/* PLACEHOLDER: Replace with actual highlight images */}
          <div className="flex h-full items-center justify-center">
            <Icon className="h-12 w-12 text-surface-400" />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Badge */}
        <div className="mb-2 flex items-center gap-2">
          <Badge variant={highlight.type === 'award' ? 'success' : 'primary'} size="sm">
            {highlight.badge || highlight.type.charAt(0).toUpperCase() + highlight.type.slice(1)}
          </Badge>
        </div>

        {/* Title */}
        <h3 className="mb-2 font-semibold text-surface-900 group-hover:text-primary-600 dark:text-surface-50 dark:group-hover:text-primary-400">
          {highlight.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
          {highlight.description}
        </p>
      </div>
    </Card>
  );

  if (highlight.link) {
    if (highlight.link.startsWith('http')) {
      return (
        <a href={highlight.link} target="_blank" rel="noopener noreferrer">
          {CardContent}
        </a>
      );
    }
    return <Link href={highlight.link}>{CardContent}</Link>;
  }

  return CardContent;
}

/**
 * Default highlights for demo purposes
 * PLACEHOLDER: Replace with actual lab highlights
 */
export const defaultHighlights: Highlight[] = [
  {
    id: 'highlight-1',
    type: 'paper',
    title: 'Best Paper at ISCA 2026',
    description: 'Our research on in-memory computing architectures received the Best Paper Award.',
    badge: 'Award',
    link: '/publications',
  },
  {
    id: 'highlight-2',
    type: 'project',
    title: 'Open-Source RISC-V Core',
    description: 'We released our custom RISC-V processor with security extensions as open-source.',
    badge: 'New Release',
    link: '/resources',
  },
  {
    id: 'highlight-3',
    type: 'news',
    title: 'NSF Grant Awarded',
    description: '$1.2M grant for research on post-quantum cryptography accelerators.',
    badge: 'Funding',
    link: '/blog',
  },
];
