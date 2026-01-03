/**
 * EmailButton Component
 * 
 * Purpose: Email link with hover tooltip showing email address
 * and copy-to-clipboard functionality on click.
 */

'use client';

import { useState, useRef } from 'react';
import { Mail, Check, Copy } from 'lucide-react';

interface EmailButtonProps {
  email: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

/**
 * EmailButton Component
 * 
 * Features:
 * - Hover tooltip showing full email
 * - Click to copy email to clipboard
 * - Visual feedback on successful copy
 * - Pastel color styling
 */
export function EmailButton({ 
  email, 
  size = 'md', 
  showLabel = false,
  className = '' 
}: EmailButtonProps) {
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const sizeClasses = {
    sm: showLabel ? 'px-2 py-1.5' : 'p-1.5',
    md: showLabel ? 'px-3 py-2' : 'p-2',
    lg: showLabel ? 'px-4 py-2.5' : 'p-2.5',
  };

  const iconSizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      
      // Clear any existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset after 2 seconds
      timeoutRef.current = setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (err) {
      // Fallback: open mailto
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="relative inline-flex">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`inline-flex items-center gap-1.5 rounded-lg transition-all duration-200
          ${copied 
            ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400' 
            : 'text-surface-500 hover:bg-red-100 hover:text-red-600 dark:text-surface-400 dark:hover:bg-red-900/30 dark:hover:text-red-400'
          }
          ${sizeClasses[size]} ${className}`}
        aria-label={copied ? 'Email copied!' : `Copy email: ${email}`}
        title={copied ? 'Copied!' : email}
      >
        {copied ? (
          <Check className={iconSizes[size]} />
        ) : (
          <Mail className={iconSizes[size]} />
        )}
        {showLabel && (
          <span className="text-sm">{copied ? 'Copied!' : 'Email'}</span>
        )}
      </button>

      {/* Tooltip */}
      {showTooltip && !copied && (
        <div className="absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded-lg bg-surface-900 px-3 py-1.5 text-xs text-white shadow-lg dark:bg-surface-700">
          <div className="flex items-center gap-2">
            <span>{email}</span>
            <Copy className="h-3 w-3 opacity-60" />
          </div>
          {/* Arrow */}
          <div className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-surface-900 dark:border-t-surface-700" />
        </div>
      )}
    </div>
  );
}
