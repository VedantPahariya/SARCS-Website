/**
 * Blog Card Component
 * 
 * Purpose: Display blog post entries with links to external content.
 */

import Image from 'next/image';
import { Card, Badge, BadgeGroup } from '@/components/ui';
import { Calendar, ExternalLink, User } from 'lucide-react';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  imagePosition?: 'left' | 'right';
}

/**
 * BlogCard Component
 * 
 * Blog post preview with:
 * - Title and description
 * - Date and author
 * - Tags
 * - External link
 * - Alternating image position
 */
export function BlogCard({ post, imagePosition = 'left' }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const isRight = imagePosition === 'right';

  return (
    <Card hover className="group overflow-hidden">
      <div className={`flex flex-col gap-6 md:flex-row ${isRight ? 'md:flex-row-reverse' : ''}`}>
        {/* Image Section */}
        <div className="relative h-64 w-full flex-shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 md:h-auto md:w-80">
          {post.image ? (
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="flex h-full min-h-[16rem] w-full items-center justify-center">
              <span className="text-5xl font-bold text-primary-600/30 dark:text-primary-400/30">
                {post.title.charAt(0)}
              </span>
            </div>
          )}
        </div>

        {/* Content Section */}
        <div className="flex flex-1 flex-col">
          {/* Header */}
          <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-surface-500 dark:text-surface-400">
            <span className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              {formattedDate}
            </span>
            {post.author && (
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                {post.author}
              </span>
            )}
          </div>

          {/* Title */}
          <h3 className="mb-2 text-lg font-semibold text-surface-900 dark:text-surface-50">
            <a
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-600 dark:hover:text-primary-400"
            >
              {post.title}
            </a>
          </h3>

          {/* Description */}
          <p className="mb-4 flex-1 text-surface-600 dark:text-surface-400">
            {post.description}
          </p>

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <BadgeGroup className="mb-4">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </BadgeGroup>
          )}

          {/* Link */}
          <a
            href={post.link}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            Read more
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </div>
    </Card>
  );
}

/**
 * BlogList Component
 * 
 * List of blog post cards with alternating image positions.
 */
interface BlogListProps {
  posts: BlogPost[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-lg border border-surface-200 bg-surface-50 p-8 text-center dark:border-surface-700 dark:bg-surface-800/50">
        <p className="text-surface-600 dark:text-surface-400">
          No blog posts available yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post, index) => (
        <BlogCard 
          key={post.id} 
          post={post} 
          imagePosition={index % 2 === 0 ? 'left' : 'right'}
        />
      ))}
    </div>
  );
}
