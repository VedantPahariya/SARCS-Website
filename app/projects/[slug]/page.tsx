/**
 * Individual Project/Research Area Page
 * 
 * Purpose: Detailed view of a specific research area.
 * Dynamic route with static generation.
 */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Section } from '@/components/ui';
import { ProjectDetail, ResearchAreaNav } from '@/components/projects';
import type { Project } from '@/types';

// Import data
import projectsData from '@/data/projects.json';

const projects = projectsData as Project[];

// Generate static params for all projects
export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

// Generate metadata for each project
export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.shortDescription,
    openGraph: {
      title: project.title,
      description: project.shortDescription,
    },
  };
}

/**
 * Project Detail Page Component
 * 
 * Individual research area with:
 * - Sidebar navigation
 * - Full project details
 */
export default function ProjectPage({ params }: { params: { slug: string } }) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Section>
      <div className="flex gap-8">
        {/* Sidebar Navigation - Desktop only */}
        <aside className="hidden w-64 flex-shrink-0 lg:block">
          <div className="sticky top-24">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-surface-500 dark:text-surface-400">
              Research Areas
            </h2>
            <ResearchAreaNav projects={projects} />
          </div>
        </aside>

        {/* Main Content */}
        <div className="min-w-0 flex-1">
          <ProjectDetail project={project} />
        </div>
      </div>
    </Section>
  );
}
