/**
 * Publication Card Component
 * 
 * Purpose: Display individual publication with expandable abstract.
 * Includes links to external resources and tag filtering support.
 */

import { Card, Badge, BadgeGroup, ExpandableText, getTagVariant } from '@/components/ui';
import { FileText, ExternalLink, Github, Video, Presentation } from 'lucide-react';
import type { Publication } from '@/types';

interface PublicationCardProps {
  publication: Publication;
}

/**
 * PublicationCard Component
 * 
 * Academic publication display with:
 * - Title and author list
 * - Venue and year
 * - Expandable abstract
 * - Color-coded tags
 * - External links (PDF, arXiv, code, etc.)
 */
export function PublicationCard({ publication }: PublicationCardProps) {
  // Format author list (show first 3, then "et al.")
  const formatAuthors = (authors: string[]) => {
    if (authors.length <= 3) {
      return authors.join(', ');
    }
    return `${authors.slice(0, 3).join(', ')}, et al.`;
  };

  // Publication type badge colors
  const typeColors: Record<Publication['type'], 'primary' | 'accent' | 'success' | 'warning' | 'neutral'> = {
    conference: 'primary',
    journal: 'success',
    workshop: 'accent',
    preprint: 'warning',
    thesis: 'neutral',
  };

  return (
    <Card className="group">
      {/* Header with type and year */}
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <Badge variant={typeColors[publication.type]} size="sm">
          {publication.type.charAt(0).toUpperCase() + publication.type.slice(1)}
        </Badge>
        <span className="text-sm text-surface-500 dark:text-surface-400">
          {publication.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="mb-2 text-lg font-semibold text-surface-900 dark:text-surface-50">
        {publication.links.pdf ? (
          <a
            href={publication.links.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            {publication.title}
          </a>
        ) : publication.links.arxiv ? (
          <a
            href={publication.links.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary-600 dark:hover:text-primary-400"
          >
            {publication.title}
          </a>
        ) : (
          publication.title
        )}
      </h3>

      {/* Authors */}
      <p className="mb-2 text-sm text-surface-600 dark:text-surface-400">
        {formatAuthors(publication.authors)}
      </p>

      {/* Venue */}
      <p className="mb-4 text-sm font-medium text-primary-600 dark:text-primary-400">
        {publication.venue}
      </p>

      {/* Abstract (expandable) */}
      <ExpandableText
        text={publication.abstract}
        maxLines={2}
        className="mb-4"
        expandLabel="Show abstract"
        collapseLabel="Hide abstract"
      />

      {/* Tags */}
      <BadgeGroup className="mb-4">
        {publication.tags.map((tag) => (
          <Badge key={tag} variant={getTagVariant(tag)} size="sm">
            {tag}
          </Badge>
        ))}
      </BadgeGroup>

      {/* External Links */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-surface-100 dark:border-surface-700">
        {publication.links.pdf && (
          <a
            href={publication.links.pdf}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <FileText className="h-4 w-4" />
            PDF
          </a>
        )}
        {publication.links.arxiv && (
          <a
            href={publication.links.arxiv}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <ExternalLink className="h-4 w-4" />
            arXiv
          </a>
        )}
        {publication.links.googleScholar && (
          <a
            href={publication.links.googleScholar}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <ExternalLink className="h-4 w-4" />
            Scholar
          </a>
        )}
        {publication.links.doi && (
          <a
            href={publication.links.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <ExternalLink className="h-4 w-4" />
            DOI
          </a>
        )}
        {publication.links.code && (
          <a
            href={publication.links.code}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <Github className="h-4 w-4" />
            Code
          </a>
        )}
        {publication.links.slides && (
          <a
            href={publication.links.slides}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <Presentation className="h-4 w-4" />
            Slides
          </a>
        )}
        {publication.links.video && (
          <a
            href={publication.links.video}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
          >
            <Video className="h-4 w-4" />
            Video
          </a>
        )}
      </div>
    </Card>
  );
}

/**
 * PublicationList Component
 * 
 * List of publication cards.
 */
interface PublicationListProps {
  publications: Publication[];
}

export function PublicationList({ publications }: PublicationListProps) {
  if (publications.length === 0) {
    return (
      <div className="rounded-lg border border-surface-200 bg-surface-50 p-8 text-center dark:border-surface-700 dark:bg-surface-800/50">
        <p className="text-surface-600 dark:text-surface-400">
          No publications found matching your search criteria.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {publications.map((publication) => (
        <PublicationCard key={publication.id} publication={publication} />
      ))}
    </div>
  );
}
