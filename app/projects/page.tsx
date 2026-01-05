/**
 * Projects/Research Page
 * 
 * Purpose: List all research areas and projects.
 * Main entry point for exploring lab research.
 */

import type { Metadata } from 'next';
import { PageHeader, Section, Quote } from '@/components/ui';
import { ProjectGrid, ResearchAreaTabs } from '@/components/projects';
import type { Project } from '@/types';

// Import data
import projectsData from '@/data/projects.json';

const projects = projectsData as Project[];

export const metadata: Metadata = {
  title: 'Research',
  description: 'Explore our research areas including in-memory computing, RISC-V architectures, hardware accelerators, and AI systems.',
};

/**
 * Projects Page Component
 * 
 * Research overview with:
 * - Page header
 * - Research area navigation
 * - Project grid
 */
export default function ProjectsPage() {
  return (
    <>
      <PageHeader
        title="Research"
        description="Our lab focuses on advancing computer architecture and hardware-software co-design across multiple domains. Explore our research areas below."
      />

      <Section>
        {/* Mobile-friendly tabs */}
        <div className="mb-8 lg:hidden">
          <ResearchAreaTabs projects={projects} />
        </div>

        {/* Project Grid */}
        <ProjectGrid projects={projects} />
      </Section>

      {/* Inspirational Quote */}
      <Section className="py-8 md:py-12">
        <Quote
          text="The science of today is the technology of tomorrow."
          author="Edward Teller"
          title="Theoretical Physicist"
          variant="centered"
        />
      </Section>
    </>
  );
}
