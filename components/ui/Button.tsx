/**
 * Button Component
 * 
 * Purpose: Reusable button with multiple variants, sizes, and states.
 * Supports both button and link rendering for flexibility.
 */

import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react';
import Link from 'next/link';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link';
type ButtonSize = 'sm' | 'md' | 'lg';

interface BaseButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

interface ButtonAsButton extends BaseButtonProps, ButtonHTMLAttributes<HTMLButtonElement> {
  as?: 'button';
  href?: never;
}

interface ButtonAsLink extends BaseButtonProps {
  as: 'link';
  href: string;
  external?: boolean;
  children: ReactNode;
}

type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button Component
 * 
 * Versatile button component with:
 * - Multiple visual variants (primary, secondary, ghost, outline, link)
 * - Size options (sm, md, lg)
 * - Icon support (left and right)
 * - Can render as button or link
 * - Accessible focus states
 */
export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) {
  // Base styles
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

  // Variant styles
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600',
    secondary: 'bg-surface-100 text-surface-700 hover:bg-surface-200 dark:bg-surface-700 dark:text-surface-200 dark:hover:bg-surface-600',
    ghost: 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100',
    outline: 'border border-surface-300 text-surface-700 hover:bg-surface-50 dark:border-surface-600 dark:text-surface-300 dark:hover:bg-surface-800',
    link: 'text-primary-600 hover:text-primary-700 hover:underline dark:text-primary-400 dark:hover:text-primary-300 p-0',
  };

  // Size styles
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-sm gap-2',
    lg: 'px-6 py-3 text-base gap-2',
  };

  // Combine classes
  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${variant !== 'link' ? sizeClasses[size] : ''} ${className}`;

  // Render content with icons
  const content = (
    <>
      {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
    </>
  );

  // Render as link
  if (props.as === 'link') {
    const { href, external, as: _, ...linkProps } = props;
    
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
          {...(linkProps as AnchorHTMLAttributes<HTMLAnchorElement>)}
        >
          {content}
        </a>
      );
    }

    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  // Render as button
  const { as: _, ...buttonProps } = props;
  return (
    <button className={combinedClasses} {...buttonProps}>
      {content}
    </button>
  );
}
