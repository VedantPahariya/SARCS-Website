/**
 * Alumni List Component
 * 
 * Purpose: Display list of lab alumni with graduation info.
 * Shows where alumni are now.
 */

import Image from 'next/image';
import { SocialIcons } from '@/components/ui';
import type { Person } from '@/types';

interface AlumniListProps {
  alumni: Person[];
}

/**
 * AlumniList Component
 * 
 * Alumni display with:
 * - Name and graduation year
 * - Current affiliation
 * - Social/professional links
 */
export function AlumniList({ alumni }: AlumniListProps) {
  if (alumni.length === 0) return null;

  return (
    <div>
      <h3 className="mb-6 text-xl font-semibold text-surface-900 dark:text-surface-50">
        Alumni
      </h3>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {alumni.map((person) => (
          <AlumniCard key={person.id} alumni={person} />
        ))}
      </div>
    </div>
  );
}

/**
 * AlumniCard Component
 * 
 * Individual alumni display.
 */
interface AlumniCardProps {
  alumni: Person;
}

export function AlumniCard({ alumni }: AlumniCardProps) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-surface-200 bg-white p-4 dark:border-surface-700 dark:bg-surface-800">
      {/* Photo */}
      <div className="h-10 w-10 flex-shrink-0 overflow-hidden rounded-full bg-surface-200 dark:bg-surface-700">
        {alumni.photo ? (
          <Image
            src={alumni.photo}
            alt={alumni.name}
            width={40}
            height={40}
            className="h-full w-full object-cover"
            style={{ objectPosition: alumni.photoPosition || '50% 40%' }}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-surface-400 dark:text-surface-500">
            {alumni.name.split(' ').map(n => n[0]).join('')}
          </div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <h4 className="font-medium text-surface-900 dark:text-surface-50">
            {alumni.name}
          </h4>
          {alumni.graduationYear && (
            <span className="text-xs text-surface-500 dark:text-surface-400">
              ({alumni.graduationYear})
            </span>
          )}
        </div>
        
        {alumni.designation && (
          <p className="text-sm text-surface-600 dark:text-surface-400">
            {alumni.designation}
          </p>
        )}

        {alumni.currentAffiliation && (
          <p className="mt-1 text-sm text-primary-600 dark:text-primary-400">
            {alumni.currentAffiliation}
          </p>
        )}

        {/* Links */}
        <div className="mt-2">
          <SocialIcons links={alumni.links} size="sm" />
        </div>
      </div>
    </div>
  );
}

/**
 * AlumniTable Component
 * 
 * Table view for alumni (alternative layout).
 */
interface AlumniTableProps {
  alumni: Person[];
}

export function AlumniTable({ alumni }: AlumniTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-surface-200 dark:border-surface-700">
          <tr>
            <th className="pb-3 font-semibold text-surface-900 dark:text-surface-100">
              Name
            </th>
            <th className="pb-3 font-semibold text-surface-900 dark:text-surface-100">
              Degree
            </th>
            <th className="pb-3 font-semibold text-surface-900 dark:text-surface-100">
              Year
            </th>
            <th className="pb-3 font-semibold text-surface-900 dark:text-surface-100">
              Current Position
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-surface-100 dark:divide-surface-800">
          {alumni.map((person) => (
            <tr key={person.id}>
              <td className="py-3 font-medium text-surface-900 dark:text-surface-100">
                {person.name}
              </td>
              <td className="py-3 text-surface-600 dark:text-surface-400">
                {person.designation || '-'}
              </td>
              <td className="py-3 text-surface-600 dark:text-surface-400">
                {person.graduationYear || '-'}
              </td>
              <td className="py-3 text-surface-600 dark:text-surface-400">
                {person.currentAffiliation || '-'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
