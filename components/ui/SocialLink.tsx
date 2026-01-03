/**
 * SocialLink Component
 * 
 * Purpose: Individual social media link with platform-specific pastel colors.
 * Implements consistent color coding across the platform.
 */

'use client';

import {
  Linkedin,
  Github,
  Twitter,
  Globe,
  ExternalLink,
  Youtube,
  MessageCircle,
} from 'lucide-react';

type SocialPlatform = 
  | 'linkedin'
  | 'github'
  | 'twitter'
  | 'website'
  | 'googleScholar'
  | 'youtube'
  | 'orcid'
  | 'whatsapp';

interface SocialLinkProps {
  platform: SocialPlatform;
  href: string;
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  className?: string;
}

/**
 * Platform color configuration
 * Using pastel versions of brand colors
 */
const platformConfig: Record<SocialPlatform, {
  icon: typeof Linkedin;
  label: string;
  colors: {
    bg: string;
    bgDark: string;
    text: string;
    textDark: string;
  };
}> = {
  linkedin: {
    icon: Linkedin,
    label: 'LinkedIn',
    colors: {
      bg: 'hover:bg-blue-100',
      bgDark: 'dark:hover:bg-blue-900/30',
      text: 'hover:text-blue-600',
      textDark: 'dark:hover:text-blue-400',
    },
  },
  github: {
    icon: Github,
    label: 'GitHub',
    colors: {
      bg: 'hover:bg-gray-100',
      bgDark: 'dark:hover:bg-gray-800',
      text: 'hover:text-gray-800',
      textDark: 'dark:hover:text-gray-200',
    },
  },
  twitter: {
    icon: Twitter,
    label: 'Twitter',
    colors: {
      bg: 'hover:bg-sky-100',
      bgDark: 'dark:hover:bg-sky-900/30',
      text: 'hover:text-sky-500',
      textDark: 'dark:hover:text-sky-400',
    },
  },
  youtube: {
    icon: Youtube,
    label: 'YouTube',
    colors: {
      bg: 'hover:bg-red-100',
      bgDark: 'dark:hover:bg-red-900/30',
      text: 'hover:text-red-600',
      textDark: 'dark:hover:text-red-400',
    },
  },
  whatsapp: {
    icon: MessageCircle,
    label: 'WhatsApp',
    colors: {
      bg: 'hover:bg-green-100',
      bgDark: 'dark:hover:bg-green-900/30',
      text: 'hover:text-green-600',
      textDark: 'dark:hover:text-green-400',
    },
  },
  googleScholar: {
    icon: ExternalLink,
    label: 'Google Scholar',
    colors: {
      bg: 'hover:bg-blue-100',
      bgDark: 'dark:hover:bg-blue-900/30',
      text: 'hover:text-blue-700',
      textDark: 'dark:hover:text-blue-300',
    },
  },
  website: {
    icon: Globe,
    label: 'Website',
    colors: {
      bg: 'hover:bg-purple-100',
      bgDark: 'dark:hover:bg-purple-900/30',
      text: 'hover:text-purple-600',
      textDark: 'dark:hover:text-purple-400',
    },
  },
  orcid: {
    icon: ExternalLink,
    label: 'ORCID',
    colors: {
      bg: 'hover:bg-lime-100',
      bgDark: 'dark:hover:bg-lime-900/30',
      text: 'hover:text-lime-600',
      textDark: 'dark:hover:text-lime-400',
    },
  },
};

/**
 * SocialLink Component
 * 
 * Features:
 * - Platform-specific pastel colors
 * - Consistent sizing options
 * - Optional label display
 */
export function SocialLink({ 
  platform, 
  href, 
  size = 'md', 
  showLabel = false,
  className = '' 
}: SocialLinkProps) {
  const config = platformConfig[platform];
  const Icon = config.icon;

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

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-lg text-surface-500 transition-all duration-200
        ${config.colors.bg} ${config.colors.bgDark} 
        ${config.colors.text} ${config.colors.textDark}
        dark:text-surface-400
        ${sizeClasses[size]} ${className}`}
      aria-label={config.label}
      title={config.label}
    >
      <Icon className={iconSizes[size]} />
      {showLabel && (
        <span className="text-sm">{config.label}</span>
      )}
    </a>
  );
}

/**
 * Helper to get platform from link key
 */
export function getPlatformFromKey(key: string): SocialPlatform | null {
  const mapping: Record<string, SocialPlatform> = {
    linkedin: 'linkedin',
    github: 'github',
    twitter: 'twitter',
    youtube: 'youtube',
    googleScholar: 'googleScholar',
    website: 'website',
    orcid: 'orcid',
    whatsapp: 'whatsapp',
  };
  return mapping[key] || null;
}
