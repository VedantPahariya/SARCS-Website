/**
 * Project Card Component
 * 
 * Purpose: Display individual research project/area cards.
 * Used on the projects listing and home page.
 */

import Link from 'next/link';
import Image from 'next/image';
import { Card, Badge, BadgeGroup } from '@/components/ui';
import { ArrowRight, Github, FileText, ExternalLink } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  variant?: 'default' | 'compact';
}

/**
 * ProjectCard Component
 * 
 * Research area/project card with:
 * - Title and description
 * - Status badge
 * - Topic tags
 * - Links to resources
 */
export function ProjectCard({ project, variant = 'default' }: ProjectCardProps) {
  const statusColors = {
    active: 'success',
    ongoing: 'warning',
    completed: 'neutral',
  } as const;

  if (variant === 'compact') {
    return (
      <Link href={`/projects/${project.slug}`}>
        <Card hover className="group h-full">
          <div className="flex items-start gap-4">
            {/* Image placeholder */}
            <div className="relative h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-primary-100 dark:bg-primary-900/30">
              {project.image ? (
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              ) : (
                // PLACEHOLDER: Replace with actual project image
                <div className="flex h-full w-full items-center justify-center">
                  <span className="text-lg font-bold text-primary-600 dark:text-primary-400">
                    {project.title.charAt(0)}
                  </span>
                </div>
              )}
            </div>

            <div className="min-w-0 flex-1">
              <h3 className="font-semibold text-surface-900 dark:text-surface-50">
                {project.title}
              </h3>
              <p className="mt-1 text-sm text-surface-600 dark:text-surface-400 line-clamp-2">
                {project.shortDescription}
              </p>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/projects/${project.slug}`}>
      <Card hover className="group h-full">
        {/* Header with Image */}
        <div className="mb-4">
          <div className="relative h-40 w-full overflow-hidden rounded-xl bg-primary-100 dark:bg-primary-900/30">
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
            ) : (
              // PLACEHOLDER: Replace with actual project image
              <div className="flex h-full w-full items-center justify-center">
                <span className="text-4xl font-bold text-primary-600/50 dark:text-primary-400/50">
                  {project.title.charAt(0)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Title */}
        <h3 className="mb-2 text-xl font-semibold text-surface-900 dark:text-surface-50">
          {project.title}
        </h3>

        {/* Description */}
        <p className="mb-4 text-surface-600 dark:text-surface-400 line-clamp-3">
          {project.shortDescription}
        </p>

        {/* Topics preview */}
        {project.topics.length > 0 && (
          <div className="mb-4">
            <BadgeGroup>
              {project.topics.slice(0, 3).map((topic) => (
                <Badge key={topic} variant="neutral" size="sm">
                  {topic.length > 25 ? topic.slice(0, 25) + '...' : topic}
                </Badge>
              ))}
              {project.topics.length > 3 && (
                <Badge variant="neutral" size="sm">
                  +{project.topics.length - 3} more
                </Badge>
              )}
            </BadgeGroup>
          </div>
        )}

        {/* Footer links */}
        <div className="flex items-center justify-between pt-4 border-t border-surface-100 dark:border-surface-700">
          <div className="flex gap-2">
            {project.links.github && (
              <span className="rounded p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-700 dark:hover:text-surface-300">
                <Github className="h-4 w-4" />
              </span>
            )}
            {project.links.paper && (
              <span className="rounded p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-700 dark:hover:text-surface-300">
                <FileText className="h-4 w-4" />
              </span>
            )}
            {project.links.website && (
              <span className="rounded p-1.5 text-surface-400 hover:bg-surface-100 hover:text-surface-600 dark:hover:bg-surface-700 dark:hover:text-surface-300">
                <ExternalLink className="h-4 w-4" />
              </span>
            )}
          </div>
          <span className="inline-flex items-center gap-1 text-sm font-medium text-surface-600 dark:text-surface-400">
            Learn more
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
      </Card>
    </Link>
  );
}

/**
 * ProjectGrid Component
 * 
 * Grid layout for project cards.
 */
interface ProjectGridProps {
  projects: Project[];
  variant?: 'default' | 'compact';
}

export function ProjectGrid({ projects, variant = 'default' }: ProjectGridProps) {
  const gridCols = variant === 'compact' 
    ? 'grid-cols-1 md:grid-cols-2' 
    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid gap-6 ${gridCols}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} variant={variant} />
      ))}
    </div>
  );
}
