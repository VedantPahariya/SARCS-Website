/**
 * Student Grid Component
 * 
 * Purpose: Grid display for students (PhD, MS, undergraduate).
 * Shows circular photos with names and roles.
 */

import Image from 'next/image';
import { Card, Badge, EmailButton, SocialLink } from '@/components/ui';
import type { Person } from '@/types';

interface StudentGridProps {
  students: Person[];
  title?: string; // Optional section title
}

/**
 * StudentGrid Component
 * 
 * Grid layout for students with:
 * - Circular profile photos
 * - Names and program info
 * - Research interests
 * - LinkedIn link only (for students)
 */
export function StudentGrid({ students, title }: StudentGridProps) {
  if (students.length === 0) return null;

  return (
    <div>
      {title && (
        <h3 className="mb-6 text-xl font-semibold text-surface-900 dark:text-surface-50">
          {title}
        </h3>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {students.map((student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

/**
 * StudentCard Component
 * 
 * Individual student card.
 */
interface StudentCardProps {
  student: Person;
}

export function StudentCard({ student }: StudentCardProps) {
  return (
    <Card hover className="text-center">
      {/* Photo */}
      <div className="mb-4 flex justify-center">
        <div className="h-24 w-24 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
          {student.photo ? (
            <Image
              src={student.photo}
              alt={student.name}
              width={96}
              height={96}
              className="h-full w-full object-cover"
              style={{ objectPosition: student.photoPosition || '50% 40%' }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-2xl font-bold text-surface-400 dark:text-surface-500">
              {student.name.split(' ').map(n => n[0]).join('')}
            </div>
          )}
        </div>
      </div>

      {/* Name */}
      <h4 className="font-semibold text-surface-900 dark:text-surface-50">
        {student.name}
      </h4>

      {/* Designation */}
      {student.designation && (
        <p className="mt-1 text-sm text-surface-600 dark:text-surface-400">
          {student.designation}
        </p>
      )}

      {/* Year Joined */}
      {student.yearJoined && (
        <p className="mt-1 text-xs text-surface-500 dark:text-surface-500">
          Since {student.yearJoined}
        </p>
      )}

      {/* Research Interests */}
      {student.researchInterests && student.researchInterests.length > 0 && (
        <div className="mt-3 flex flex-wrap justify-center gap-1">
          {student.researchInterests.map((interest) => (
            <Badge key={interest} variant="neutral" size="sm">
              {interest}
            </Badge>
          ))}
        </div>
      )}

      {/* Social Links */}
      <div className="mt-4 flex flex-wrap justify-center gap-1">
        {student.links.email && (
          <EmailButton email={student.links.email} size="sm" />
        )}
        {student.links.linkedin && (
          <SocialLink platform="linkedin" href={student.links.linkedin} size="sm" />
        )}
        {student.links.googleScholar && (
          <SocialLink platform="googleScholar" href={student.links.googleScholar} size="sm" />
        )}
        {student.links.github && (
          <SocialLink platform="github" href={student.links.github} size="sm" />
        )}
        {student.links.website && (
          <SocialLink platform="website" href={student.links.website} size="sm" />
        )}
        {student.links.twitter && (
          <SocialLink platform="twitter" href={student.links.twitter} size="sm" />
        )}
        {student.links.orcid && (
          <SocialLink platform="orcid" href={student.links.orcid} size="sm" />
        )}
      </div>
    </Card>
  );
}

/**
 * StudentListCompact Component
 * 
 * Compact list view for students (alternative to grid).
 */
interface StudentListCompactProps {
  students: Person[];
}

export function StudentListCompact({ students }: StudentListCompactProps) {
  return (
    <div className="space-y-4">
      {students.map((student) => (
        <div
          key={student.id}
          className="flex items-center gap-4 rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-800"
        >
          {/* Photo */}
          <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
            {student.photo ? (
              <Image
                src={student.photo}
                alt={student.name}
                width={48}
                height={48}
                className="h-full w-full object-cover"
                style={{ objectPosition: student.photoPosition || '50% 40%' }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-sm font-bold text-surface-400 dark:text-surface-500">
                {student.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="min-w-0 flex-1">
            <h4 className="font-medium text-surface-900 dark:text-surface-50">
              {student.name}
            </h4>
            {student.designation && (
              <p className="text-sm text-surface-600 dark:text-surface-400">
                {student.designation}
              </p>
            )}
          </div>

          {/* Links - Email and LinkedIn */}
          <div className="flex gap-1">
            {student.links.email && (
              <EmailButton email={student.links.email} size="sm" />
            )}
            {student.links.linkedin && (
              <SocialLink platform="linkedin" href={student.links.linkedin} size="sm" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
