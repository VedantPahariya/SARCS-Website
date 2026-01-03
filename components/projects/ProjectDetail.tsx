/**
 * Project Detail Component
 * 
 * Purpose: Full project/research area detail view.
 * Shows complete information about a research area.
 */

import Link from 'next/link';
import { Badge, BadgeGroup, Button } from '@/components/ui';
import { Github, FileText, ExternalLink, BookOpen, ArrowLeft } from 'lucide-react';
import type { Project } from '@/types';

interface ProjectDetailProps {
  project: Project;
}

/**
 * ProjectDetail Component
 * 
 * Complete research area view with:
 * - Full description
 * - Topic list
 * - External links
 * - Related publications
 */
export function ProjectDetail({ project }: ProjectDetailProps) {
  const statusColors = {
    active: 'success',
    ongoing: 'warning',
    completed: 'neutral',
  } as const;

  return (
    <article className="max-w-4xl">
      {/* Back link */}
      <Link
        href="/projects"
        className="mb-6 inline-flex items-center gap-2 text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to all research areas
      </Link>

      {/* Header */}
      <header className="mb-8">
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <Badge variant={statusColors[project.status]} size="md" dot>
            {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
          </Badge>
          {project.startYear && (
            <span className="text-sm text-surface-500 dark:text-surface-400">
              Since {project.startYear}
              {project.endYear && ` - ${project.endYear}`}
            </span>
          )}
        </div>

        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-50 md:text-4xl">
          {project.title}
        </h1>

        <p className="mt-4 text-lg text-surface-600 dark:text-surface-400">
          {project.shortDescription}
        </p>
      </header>

      {/* External Links */}
      <div className="mb-8 flex flex-wrap gap-3">
        {project.links.github && (
          <Button
            as="link"
            href={project.links.github}
            external
            variant="outline"
            size="md"
            leftIcon={<Github className="h-4 w-4" />}
          >
            GitHub Repository
          </Button>
        )}
        {project.links.documentation && (
          <Button
            as="link"
            href={project.links.documentation}
            external
            variant="outline"
            size="md"
            leftIcon={<BookOpen className="h-4 w-4" />}
          >
            Documentation
          </Button>
        )}
        {project.links.paper && (
          <Button
            as="link"
            href={project.links.paper}
            external
            variant="outline"
            size="md"
            leftIcon={<FileText className="h-4 w-4" />}
          >
            Paper
          </Button>
        )}
        {project.links.demo && (
          <Button
            as="link"
            href={project.links.demo}
            external
            variant="outline"
            size="md"
            leftIcon={<ExternalLink className="h-4 w-4" />}
          >
            Demo
          </Button>
        )}
        {project.links.website && (
          <Button
            as="link"
            href={project.links.website}
            external
            variant="outline"
            size="md"
            leftIcon={<ExternalLink className="h-4 w-4" />}
          >
            Project Website
          </Button>
        )}
      </div>

      {/* Full Description */}
      <section className="mb-8">
        <h2 className="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-50">
          Overview
        </h2>
        <div className="prose prose-surface dark:prose-invert max-w-none">
          <p className="text-surface-600 dark:text-surface-400 leading-relaxed">
            {project.fullDescription}
          </p>
        </div>
      </section>

      {/* Focus Topics */}
      {project.topics.length > 0 && (
        <section className="mb-8">
          <h2 className="mb-4 text-xl font-semibold text-surface-900 dark:text-surface-50">
            Research Focus Areas
          </h2>
          <ul className="space-y-2">
            {project.topics.map((topic, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-surface-600 dark:text-surface-400"
              >
                <span className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary-500" />
                {topic}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Links Section */}
      <section className="rounded-lg bg-surface-100 p-6 dark:bg-surface-800/50">
        <h2 className="mb-4 text-lg font-semibold text-surface-900 dark:text-surface-50">
          Explore More
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/publications"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <FileText className="h-4 w-4" />
            View Related Publications
          </Link>
          <Link
            href="/people"
            className="inline-flex items-center gap-2 text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          >
            <ExternalLink className="h-4 w-4" />
            Meet the Team
          </Link>
        </div>
      </section>
    </article>
  );
}
