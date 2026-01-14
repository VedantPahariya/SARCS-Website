/**
 * Footer Component
 * 
 * Purpose: Global footer with lab info, contact details, social links,
 * and copyright notice. Consistent across all pages.
 */

import Link from 'next/link';
import { Mail, MapPin } from 'lucide-react';
import { SocialLink, EmailButton } from '@/components/ui';

// PLACEHOLDER: Import actual lab info data
// In production, this would come from data/lab-info.json
const labInfo = {
  name: 'SARCS Lab',
  fullName: 'Sustainable, Advanced and Robust Computing Systems',
  address: [
    'Room 318, Vindhya Building, Research Street,',
    'Center for VLSI and Embedded Systems Technologies,',
    'International Institute of Information Technology Hyderabad,',
    'Telangana 500032',
  ],
  email: 'priyesh.shukla@iiit.ac.in',
  socialLinks: {
    linkedin: 'https://www.linkedin.com/in/priyesh-shukla-97b278218/',
    github: 'https://github.com/SARCS-Research-Group-IIITH',
    googleScholar: 'https://scholar.google.com/citations?user=on_nvPYAAAAJ',
  },
};

// Quick links for footer navigation (merged)
const quickLinks = [
  { label: 'Research', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Media', href: '/media' },
  { label: 'People', href: '/people' },
];

/**
 * Footer Component
 * 
 * Displays:
 * - Lab name and mission
 * - Contact information
 * - Quick navigation links
 * - Social media icons
 * - Last updated timestamp
 * - Copyright notice
 */
export function Footer() {
  // PLACEHOLDER: In production, this would be generated at build time
  const lastUpdated = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900">
      <div className="container-page py-8">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Lab Info Section */}
          <div>
            <Link
              href="/"
              className="mb-3 flex items-center gap-2 text-lg font-semibold text-surface-900 hover:no-underline dark:text-surface-50"
            >
              {/* PLACEHOLDER: Replace with actual lab logo */}
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-600 text-white text-sm">
                S
              </div>
              {labInfo.name}
            </Link>
            <p className="mb-3 text-sm text-surface-600 dark:text-surface-400">
              {labInfo.fullName}
            </p>
            
            {/* Social Links with pastel colors */}
            <div className="flex gap-1">
              <SocialLink platform="linkedin" href={labInfo.socialLinks.linkedin} size="sm" />
              <SocialLink platform="github" href={labInfo.socialLinks.github} size="sm" />
              <SocialLink platform="googleScholar" href={labInfo.socialLinks.googleScholar} size="sm" />
            </div>
          </div>

          {/* Quick Links (merged) */}
          <div className="text-center">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-surface-100">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-surface-900 dark:text-surface-100">
              Contact
            </h3>
            <div className="space-y-2">
              {/* Address */}
              <div className="flex gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-surface-400" />
                <address className="text-sm not-italic text-surface-600 dark:text-surface-400">
                  {labInfo.address.map((line, index) => (
                    <span key={index}>
                      {line}
                      {index < labInfo.address.length - 1 && <br />}
                    </span>
                  ))}
                </address>
              </div>
              
              {/* Email */}
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 flex-shrink-0 text-surface-400" />
                <a
                  href={`mailto:${labInfo.email}`}
                  className="text-sm text-surface-600 transition-colors hover:text-primary-600 dark:text-surface-400 dark:hover:text-primary-400"
                >
                  {labInfo.email}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 border-t border-surface-200 pt-6 dark:border-surface-700">
          <div className="flex flex-col items-center justify-between gap-2 text-xs text-surface-500 dark:text-surface-400 sm:flex-row">
            <p>
              © {currentYear} {labInfo.name}. All rights reserved.
            </p>
            <p>
              Last updated: {lastUpdated}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
