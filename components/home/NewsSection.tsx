/**
 * News Section Component
 * 
 * Purpose: Display recent news and updates on the home page.
 * Shows latest announcements with date and links.
 */

import Link from 'next/link';
import { Calendar, ExternalLink, Award, BookOpen, Mic, Megaphone, Users, Newspaper } from 'lucide-react';
import { Card, Badge, Button } from '@/components/ui';
import type { NewsItem } from '@/types';

interface NewsSectionProps {
  news: NewsItem[];
  maxItems?: number;
}

// Icon mapping for news types
const newsTypeIcons: Record<NewsItem['type'], typeof Award> = {
  publication: BookOpen,
  award: Award,
  event: Users,
  announcement: Megaphone,
  talk: Mic,
  media: Newspaper,
};

// Badge variants for news types
const newsTypeBadges: Record<NewsItem['type'], 'primary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral'> = {
  publication: 'primary',
  award: 'success',
  event: 'accent',
  announcement: 'neutral',
  talk: 'warning',
  media: 'error',
};

/**
 * NewsSection Component
 * 
 * Displays recent news items with:
 * - Date and type indicator
 * - Title and description
 * - Optional external links
 * - "View All" button
 */
export function NewsSection({ news, maxItems = 5 }: NewsSectionProps) {
  // Sort by date (most recent first) and filter pinned first
  const sortedNews = [...news]
    .sort((a, b) => {
      if (a.pinned && !b.pinned) return -1;
      if (!a.pinned && b.pinned) return 1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    })
    .slice(0, maxItems);

  return (
    <div>
      <div className="space-y-4">
        {sortedNews.map((item) => (
          <NewsCard key={item.id} item={item} />
        ))}
      </div>

      {/* View All Button */}
      {news.length > maxItems && (
        <div className="mt-6 text-center">
          <Button as="link" href="/blog#news" variant="ghost">
            View All News
          </Button>
        </div>
      )}
    </div>
  );
}

/**
 * NewsCard Component
 * 
 * Individual news item card.
 */
interface NewsCardProps {
  item: NewsItem;
}

export function NewsCard({ item }: NewsCardProps) {
  const Icon = newsTypeIcons[item.type];
  const badgeVariant = newsTypeBadges[item.type];

  // Format date
  const formattedDate = new Date(item.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card hover className="group">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex-shrink-0">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Header with date and badge */}
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1 text-sm text-surface-500 dark:text-surface-400">
              <Calendar className="h-3.5 w-3.5" />
              {formattedDate}
            </span>
            <Badge variant={badgeVariant} size="sm">
              {item.type.charAt(0).toUpperCase() + item.type.slice(1)}
            </Badge>
            {item.pinned && (
              <Badge variant="warning" size="sm">
                Featured
              </Badge>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-surface-900 dark:text-surface-50">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-primary-600 dark:hover:text-primary-400"
              >
                {item.title}
              </a>
            ) : (
              item.title
            )}
          </h3>

          {/* Description */}
          <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">
            {item.description}
          </p>

          {/* Link */}
          {item.link && (
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-sm text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
            >
              Learn more
              <ExternalLink className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
}
