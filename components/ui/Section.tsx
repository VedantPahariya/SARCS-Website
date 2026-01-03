/**
 * Section Component
 * 
 * Purpose: Consistent section wrapper with heading, description, and content.
 * Used for page sections throughout the site.
 */

import { ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
}

/**
 * Section Component
 * 
 * Page section wrapper with:
 * - Consistent vertical padding
 * - Container width constraints
 * - Optional ID for anchor linking
 */
export function Section({ children, className = '', id }: SectionProps) {
  return (
    <section id={id} className={`py-12 md:py-16 lg:py-20 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}

/**
 * SectionHeader Component
 * 
 * Section heading with optional subtitle and alignment.
 */
interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClasses = {
    left: 'text-left',
    center: 'text-center mx-auto',
  };

  return (
    <div className={`mb-8 max-w-3xl md:mb-12 ${alignClasses[align]} ${className}`}>
      <h2 className="text-2xl font-bold text-surface-900 dark:text-surface-50 md:text-3xl lg:text-4xl">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-lg text-surface-600 dark:text-surface-400">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/**
 * PageHeader Component
 * 
 * Full-width page header for top-level pages.
 */
interface PageHeaderProps {
  title: string;
  description?: string;
  className?: string;
}

export function PageHeader({ title, description, className = '' }: PageHeaderProps) {
  return (
    <div className={`bg-surface-100 dark:bg-surface-900 ${className}`}>
      <div className="container-page py-12 md:py-16">
        <h1 className="text-3xl font-bold text-surface-900 dark:text-surface-50 md:text-4xl lg:text-5xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-3xl text-lg text-surface-600 dark:text-surface-400">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * Divider Component
 * 
 * Horizontal divider for visual separation.
 */
interface DividerProps {
  className?: string;
}

export function Divider({ className = '' }: DividerProps) {
  return (
    <hr className={`border-t border-surface-200 dark:border-surface-700 ${className}`} />
  );
}
