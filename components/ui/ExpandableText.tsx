/**
 * ExpandableText Component
 * 
 * Purpose: Collapsible text block for long content like abstracts.
 * Shows truncated version with "Show more" toggle.
 */

'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface ExpandableTextProps {
  text: string;
  maxLines?: number;
  className?: string;
  expandLabel?: string;
  collapseLabel?: string;
}

/**
 * ExpandableText Component
 * 
 * Features:
 * - Truncates text to specified number of lines
 * - Smooth expand/collapse animation
 * - Toggle button with icons
 * - Accessible controls
 */
export function ExpandableText({
  text,
  maxLines = 3,
  className = '',
  expandLabel = 'Show more',
  collapseLabel = 'Show less',
}: ExpandableTextProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [needsExpansion, setNeedsExpansion] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  // Check if text needs expansion (exceeds max lines)
  useEffect(() => {
    const checkOverflow = () => {
      if (contentRef.current) {
        const lineHeight = parseFloat(getComputedStyle(contentRef.current).lineHeight);
        const maxHeight = lineHeight * maxLines;
        setNeedsExpansion(contentRef.current.scrollHeight > maxHeight + 2);
      }
    };

    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [text, maxLines]);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={className}>
      {/* Text content */}
      <p
        ref={contentRef}
        className={`text-surface-600 dark:text-surface-400 transition-all duration-300 ${
          !isExpanded && needsExpansion ? `line-clamp-${maxLines}` : ''
        }`}
        style={
          !isExpanded && needsExpansion
            ? {
                display: '-webkit-box',
                WebkitLineClamp: maxLines,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }
            : {}
        }
      >
        {text}
      </p>

      {/* Toggle button */}
      {needsExpansion && (
        <button
          onClick={toggleExpanded}
          className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300"
          aria-expanded={isExpanded}
        >
          {isExpanded ? (
            <>
              {collapseLabel}
              <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              {expandLabel}
              <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
      )}
    </div>
  );
}

/**
 * TruncatedText Component
 * 
 * Simple text truncation without expand/collapse.
 */
interface TruncatedTextProps {
  text: string;
  maxLength?: number;
  className?: string;
}

export function TruncatedText({
  text,
  maxLength = 150,
  className = '',
}: TruncatedTextProps) {
  const truncated = text.length > maxLength ? `${text.slice(0, maxLength)}...` : text;

  return (
    <p className={`text-surface-600 dark:text-surface-400 ${className}`}>
      {truncated}
    </p>
  );
}
