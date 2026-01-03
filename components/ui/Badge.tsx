/**
 * Badge Component
 * 
 * Purpose: Small label/tag for categorization and status indication.
 * Used for publication tags, project status, research areas, etc.
 */

import { ReactNode } from 'react';

type BadgeVariant = 'primary' | 'secondary' | 'accent' | 'success' | 'warning' | 'error' | 'neutral';
type BadgeSize = 'sm' | 'md';

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  className?: string;
  dot?: boolean; // Show colored dot before text
}

/**
 * Badge Component
 * 
 * Compact label with:
 * - Multiple color variants for different categories
 * - Size options
 * - Optional status dot
 * - Pill-shaped design
 */
export function Badge({
  children,
  variant = 'primary',
  size = 'sm',
  className = '',
  dot = false,
}: BadgeProps) {
  // Variant color mappings
  const variantClasses: Record<BadgeVariant, string> = {
    primary: 'bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-300',
    secondary: 'bg-surface-100 text-surface-700 dark:bg-surface-700 dark:text-surface-300',
    accent: 'bg-accent-100 text-accent-700 dark:bg-accent-900/30 dark:text-accent-300',
    success: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300',
    warning: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    error: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300',
    neutral: 'bg-surface-100 text-surface-600 dark:bg-surface-800 dark:text-surface-400',
  };

  // Dot color mappings
  const dotClasses: Record<BadgeVariant, string> = {
    primary: 'bg-primary-500',
    secondary: 'bg-surface-500',
    accent: 'bg-accent-500',
    success: 'bg-green-500',
    warning: 'bg-amber-500',
    error: 'bg-red-500',
    neutral: 'bg-surface-400',
  };

  // Size classes
  const sizeClasses: Record<BadgeSize, string> = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full font-medium ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotClasses[variant]}`} />}
      {children}
    </span>
  );
}

/**
 * BadgeGroup Component
 * 
 * Container for multiple badges with consistent spacing.
 */
interface BadgeGroupProps {
  children: ReactNode;
  className?: string;
}

export function BadgeGroup({ children, className = '' }: BadgeGroupProps) {
  return <div className={`flex flex-wrap gap-2 ${className}`}>{children}</div>;
}

/**
 * Predefined badge variants for common use cases
 */

// Research area badge colors
export const researchAreaColors: Record<string, BadgeVariant> = {
  'In-Memory Computing': 'primary',
  'RISC-V': 'accent',
  'Hardware Accelerators': 'success',
  'Signal Processing': 'warning',
  'AI Systems': 'error',
  'Deep Learning': 'primary',
  'ReRAM': 'accent',
  'FPGA': 'success',
  'Cryptography': 'warning',
  'Edge Computing': 'secondary',
};

/**
 * Get badge variant for a given tag
 */
export function getTagVariant(tag: string): BadgeVariant {
  return researchAreaColors[tag] || 'neutral';
}
