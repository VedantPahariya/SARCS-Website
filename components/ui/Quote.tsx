/**
 * Quote Component
 * 
 * Purpose: Display inspiring research quotes from pioneers in the field.
 * Used to make the website more lively and research-themed.
 */

import { Quote as QuoteIcon } from 'lucide-react';

interface QuoteProps {
  text: string;
  author: string;
  title?: string;
  className?: string;
  variant?: 'default' | 'centered' | 'minimal';
}

/**
 * Quote Component
 * 
 * Displays inspirational quotes with:
 * - Quote text with decorative quotation marks
 * - Author attribution with optional title
 * - Multiple styling variants
 */
export function Quote({ 
  text, 
  author, 
  title, 
  className = '',
  variant = 'default' 
}: QuoteProps) {
  if (variant === 'minimal') {
    return (
      <blockquote className={`border-l-4 border-primary-300 pl-4 italic dark:border-primary-600 ${className}`}>
        <p className="text-surface-600 dark:text-surface-400">
          &ldquo;{text}&rdquo;
        </p>
        <footer className="mt-2 text-sm text-surface-500 dark:text-surface-500">
          — {author}{title && `, ${title}`}
        </footer>
      </blockquote>
    );
  }

  if (variant === 'centered') {
    return (
      <blockquote className={`text-center ${className}`}>
        <QuoteIcon className="mx-auto mb-2 h-8 w-8 text-primary-300 dark:text-primary-600" />
        <p className="mx-auto max-w-3xl text-xl italic text-surface-700 dark:text-surface-300 md:text-2xl">
          &ldquo;{text}&rdquo;
        </p>
        <footer className="mt-2 text-surface-500 dark:text-surface-400">
          <cite className="not-italic font-medium text-surface-900 dark:text-surface-100">
            {author}
          </cite>
          {title && (
            <span className="block text-sm mt-1">{title}</span>
          )}
        </footer>
      </blockquote>
    );
  }

  // Default variant
  return (
    <blockquote className={`relative rounded-xl bg-gradient-to-br from-primary-50 to-accent-50 p-6 dark:from-primary-900/20 dark:to-accent-900/20 ${className}`}>
      <QuoteIcon className="absolute top-4 left-4 h-6 w-6 text-primary-300 dark:text-primary-600 opacity-50" />
      <div className="ml-8">
        <p className="text-lg italic text-surface-700 dark:text-surface-300">
          &ldquo;{text}&rdquo;
        </p>
        <footer className="mt-4 flex items-center gap-2">
          <div className="h-px flex-1 bg-primary-200 dark:bg-primary-700" />
          <cite className="not-italic text-sm font-medium text-surface-600 dark:text-surface-400">
            {author}{title && `, ${title}`}
          </cite>
        </footer>
      </div>
    </blockquote>
  );
}

/**
 * QuoteCarousel Component
 * 
 * Displays multiple quotes - can be used to cycle through quotes.
 */
interface QuoteCarouselProps {
  quotes: Array<{
    text: string;
    author: string;
    title?: string;
  }>;
  className?: string;
}

export function QuoteCarousel({ quotes, className = '' }: QuoteCarouselProps) {
  // For static site, show a random quote based on the number of quotes
  const quote = quotes[0]; // In SSG, just show the first quote

  return (
    <Quote
      text={quote.text}
      author={quote.author}
      title={quote.title}
      variant="centered"
      className={className}
    />
  );
}
