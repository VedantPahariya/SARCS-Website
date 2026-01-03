/**
 * Resource Card Component
 * 
 * Purpose: Display resource items grouped by category.
 */

import { Card, Badge } from '@/components/ui';
import { Github, FileText, Database, Wrench, BookOpen, ExternalLink } from 'lucide-react';
import type { Resource, ResourceCategory } from '@/types';

interface ResourceCardProps {
  resource: Resource;
}

// Icon mapping for resource types
const typeIcons: Record<Resource['type'], typeof Github> = {
  github: Github,
  pdf: FileText,
  dataset: Database,
  tool: Wrench,
  documentation: BookOpen,
  external: ExternalLink,
};

/**
 * ResourceCard Component
 * 
 * Resource display with:
 * - Title and description
 * - Type icon
 * - Tags
 * - External link
 */
export function ResourceCard({ resource }: ResourceCardProps) {
  const Icon = typeIcons[resource.type];

  return (
    <Card hover className="group">
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-100 dark:bg-primary-900/30">
          <Icon className="h-6 w-6 text-primary-600 dark:text-primary-400" />
        </div>

        {/* Content */}
        <div className="min-w-0 flex-1">
          {/* Title */}
          <h4 className="font-semibold text-surface-900 group-hover:text-primary-600 dark:text-surface-50 dark:group-hover:text-primary-400">
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:no-underline"
            >
              {resource.title}
            </a>
          </h4>

          {/* Description */}
          <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">
            {resource.description}
          </p>

          {/* Tags */}
          {resource.tags && resource.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {resource.tags.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* External link icon */}
        <a
          href={resource.link}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 text-surface-400 transition-colors group-hover:text-primary-600 dark:group-hover:text-primary-400"
          aria-label={`Open ${resource.title}`}
        >
          <ExternalLink className="h-5 w-5" />
        </a>
      </div>
    </Card>
  );
}

/**
 * ResourceGroup Component
 * 
 * Group resources by category.
 */
interface ResourceGroupProps {
  category: ResourceCategory;
  resources: Resource[];
}

export function ResourceGroup({ category, resources }: ResourceGroupProps) {
  if (resources.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-50">
        {category}
      </h3>
      <div className="space-y-4">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </div>
  );
}

/**
 * ResourceList Component
 * 
 * List all resources grouped by category.
 */
interface ResourceListProps {
  resources: Resource[];
}

export function ResourceList({ resources }: ResourceListProps) {
  // Group resources by category
  const grouped = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<ResourceCategory, Resource[]>);

  // Define category order
  const categoryOrder: ResourceCategory[] = [
    'Open Source Tools',
    'Code Repositories',
    'Datasets',
    'Publications',
    'Tutorials',
    'Documentation',
  ];

  return (
    <div className="space-y-12">
      {categoryOrder.map((category) =>
        grouped[category] ? (
          <ResourceGroup
            key={category}
            category={category}
            resources={grouped[category]}
          />
        ) : null
      )}
    </div>
  );
}
