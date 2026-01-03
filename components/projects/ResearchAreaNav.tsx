/**
 * Research Area Navigation Component
 * 
 * Purpose: Side navigation for research areas/projects.
 * Allows quick navigation between different research topics.
 */

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Project } from '@/types';

interface ResearchAreaNavProps {
  projects: Project[];
  className?: string;
}

/**
 * ResearchAreaNav Component
 * 
 * Vertical navigation for research areas with:
 * - Active state highlighting
 * - Status indicators
 * - Smooth hover effects
 */
export function ResearchAreaNav({ projects, className = '' }: ResearchAreaNavProps) {
  const pathname = usePathname();

  return (
    <nav className={`space-y-1 ${className}`} aria-label="Research areas">
      <Link
        href="/projects"
        className={`block rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
          pathname === '/projects'
            ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
        }`}
      >
        All Research Areas
      </Link>

      <div className="my-2 border-t border-surface-200 dark:border-surface-700" />

      {projects.map((project) => {
        const isActive = pathname === `/projects/${project.slug}`;
        const statusDot = {
          active: 'bg-green-500',
          ongoing: 'bg-amber-500',
          completed: 'bg-surface-400',
        };

        return (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className={`flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-colors ${
              isActive
                ? 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300'
                : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
            }`}
          >
            <span className={`h-2 w-2 rounded-full ${statusDot[project.status]}`} />
            <span className="truncate">{project.title}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * ResearchAreaTabs Component
 * 
 * Horizontal tabs for research areas (mobile-friendly).
 */
interface ResearchAreaTabsProps {
  projects: Project[];
  className?: string;
}

export function ResearchAreaTabs({ projects, className = '' }: ResearchAreaTabsProps) {
  const pathname = usePathname();

  return (
    <div className={`flex gap-2 overflow-x-auto pb-2 scrollbar-hide ${className}`}>
      <Link
        href="/projects"
        className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
          pathname === '/projects'
            ? 'bg-primary-600 text-white'
            : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
        }`}
      >
        All
      </Link>

      {projects.map((project) => {
        const isActive = pathname === `/projects/${project.slug}`;

        return (
          <Link
            key={project.id}
            href={`/projects/${project.slug}`}
            className={`flex-shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'bg-primary-600 text-white'
                : 'bg-surface-100 text-surface-600 hover:bg-surface-200 dark:bg-surface-800 dark:text-surface-400 dark:hover:bg-surface-700'
            }`}
          >
            {project.title}
          </Link>
        );
      })}
    </div>
  );
}
