/**
 * People Page
 * 
 * Purpose: Lab members directory with faculty, students, and alumni.
 * Organized by role with profile cards.
 */

import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { FacultyCard, StudentGrid, AlumniList } from '@/components/people';
import type { Person } from '@/types';

// Import data
import peopleData from '@/data/people.json';

const faculty = peopleData.faculty as Person[];
const phdStudents = peopleData.phd as Person[];
const mastersStudents = peopleData.masters as Person[];
const undergraduates = peopleData.undergraduate as Person[];
const alumni = peopleData.alumni as Person[];

export const metadata: Metadata = {
  title: 'People',
  description: 'Meet our team of faculty, students, and researchers working on computer architecture and AI systems.',
};

/**
 * People Page Component
 * 
 * Team directory with:
 * - Faculty/PI section
 * - PhD students
 * - Masters students
 * - Undergraduate researchers
 * - Alumni
 */
export default function PeoplePage() {
  // Combine all current students into one list
  const allStudents = [...phdStudents, ...mastersStudents, ...undergraduates];

  return (
    <>
      <PageHeader
        title="People"
        description="Meet the researchers and students who make up our lab community."
      />

      {/* Faculty Section */}
      <Section>
        <div className="space-y-6">
          {faculty.map((person) => (
            <FacultyCard key={person.id} faculty={person} />
          ))}
        </div>
      </Section>

      {/* All Students - no sub-headers, role shown on individual cards */}
      <Section className="bg-surface-50 dark:bg-surface-900/50">
        <StudentGrid students={allStudents} />
      </Section>

      {/* Alumni */}
      {alumni.length > 0 && (
        <Section>
          <AlumniList alumni={alumni} />
        </Section>
      )}
    </>
  );
}
