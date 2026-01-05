/**
 * Faculty Card Component
 * 
 * Purpose: Display faculty/PI profile with photo, bio, and links.
 * Featured display for principal investigators.
 */

import Image from 'next/image';
import { Card, Badge, EmailButton, SocialLink } from '@/components/ui';
import type { Person } from '@/types';

interface FacultyCardProps {
  faculty: Person;
}

/**
 * FacultyCard Component
 * 
 * Prominent display for faculty/PI with:
 * - Large photo
 * - Name and designation
 * - Bio
 * - Research interests
 * - Social/professional links
 */
export function FacultyCard({ faculty }: FacultyCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col gap-6 md:flex-row">
        {/* Photo */}
        <div className="flex-shrink-0">
          <div className="mx-auto h-48 w-48 overflow-hidden rounded-xl bg-surface-200 dark:bg-surface-700 md:mx-0">
            {faculty.photo ? (
              <Image
                src={faculty.photo}
                alt={faculty.name}
                width={192}
                height={192}
                className="h-full w-full object-cover"
                style={{ objectPosition: faculty.photoPosition || '50% 40%' }}
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-4xl font-bold text-surface-400 dark:text-surface-500">
                {faculty.name.split(' ').map(n => n[0]).join('')}
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <h3 className="text-2xl font-bold text-surface-900 dark:text-surface-50">
            {faculty.name}
          </h3>
          {faculty.designation && (
            <p className="mt-1 text-lg text-primary-600 dark:text-primary-400">
              {faculty.designation}
            </p>
          )}

          {/* Bio */}
          {faculty.bio && (
            <p className="mt-4 text-surface-600 dark:text-surface-400">
              {faculty.bio}
            </p>
          )}

          {/* Research Interests */}
          {faculty.researchInterests && faculty.researchInterests.length > 0 && (
            <div className="mt-4">
              <h4 className="mb-2 text-sm font-semibold text-surface-700 dark:text-surface-300">
                Research Interests
              </h4>
              <div className="flex flex-wrap gap-2">
                {faculty.researchInterests.map((interest) => (
                  <Badge key={interest} variant="primary" size="sm">
                    {interest}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Social Links - Only email, linkedin, google scholar, website */}
          <div className="mt-6 flex flex-wrap gap-2">
            {faculty.links.email && (
              <EmailButton email={faculty.links.email} size="md" showLabel />
            )}
            {faculty.links.linkedin && (
              <SocialLink platform="linkedin" href={faculty.links.linkedin} size="md" showLabel />
            )}
            {faculty.links.googleScholar && (
              <SocialLink platform="googleScholar" href={faculty.links.googleScholar} size="md" showLabel />
            )}
            {faculty.links.website && (
              <SocialLink platform="website" href={faculty.links.website} size="md" showLabel />
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
