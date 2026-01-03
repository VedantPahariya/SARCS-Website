/**
 * Card Component
 * 
 * Purpose: Reusable card container with consistent styling, hover effects,
 * and optional interactive features. Base building block for content display.
 */

import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  as?: 'div' | 'article' | 'section';
}

/**
 * Card Component
 * 
 * Flexible card wrapper with:
 * - Consistent border, background, and shadow styling
 * - Optional hover effects for interactive cards
 * - Customizable padding
 * - Semantic HTML element options
 */
export function Card({
  children,
  className = '',
  hover = false,
  padding = 'md',
  as: Component = 'div',
}: CardProps) {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    md: 'p-6',
    lg: 'p-8',
  };

  const baseClasses = 'rounded-lg border border-surface-200 bg-white dark:border-surface-700 dark:bg-surface-800';
  const shadowClasses = 'shadow-card';
  const hoverClasses = hover
    ? 'transition-all duration-200 hover:shadow-card-hover hover:border-surface-300 dark:hover:border-surface-600'
    : '';

  return (
    <Component
      className={`${baseClasses} ${shadowClasses} ${hoverClasses} ${paddingClasses[padding]} ${className}`}
    >
      {children}
    </Component>
  );
}

/**
 * CardHeader Component
 * 
 * Optional header section for cards with title and description.
 */
interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = '' }: CardHeaderProps) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

/**
 * CardTitle Component
 * 
 * Title element for card headers.
 */
interface CardTitleProps {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function CardTitle({ children, className = '', as: Component = 'h3' }: CardTitleProps) {
  return (
    <Component className={`text-lg font-semibold text-surface-900 dark:text-surface-50 ${className}`}>
      {children}
    </Component>
  );
}

/**
 * CardDescription Component
 * 
 * Subtitle or description text for cards.
 */
interface CardDescriptionProps {
  children: ReactNode;
  className?: string;
}

export function CardDescription({ children, className = '' }: CardDescriptionProps) {
  return (
    <p className={`mt-1 text-sm text-surface-600 dark:text-surface-400 ${className}`}>
      {children}
    </p>
  );
}

/**
 * CardContent Component
 * 
 * Main content area of a card.
 */
interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = '' }: CardContentProps) {
  return <div className={className}>{children}</div>;
}

/**
 * CardFooter Component
 * 
 * Footer section for cards, typically containing actions or links.
 */
interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = '' }: CardFooterProps) {
  return (
    <div className={`mt-4 flex items-center gap-4 pt-4 border-t border-surface-100 dark:border-surface-700 ${className}`}>
      {children}
    </div>
  );
}
