/**
 * SocialIcons Component
 * 
 * Purpose: Reusable social media icon links for people profiles and contact.
 * Includes common academic and professional platforms.
 */

import {
  Linkedin,
  Github,
  Twitter,
  Mail,
  Globe,
  ExternalLink,
  Youtube,
} from 'lucide-react';
import type { PersonLinks, SocialLinks } from '@/types';

interface SocialIconsProps {
  links: PersonLinks | SocialLinks;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  showLabels?: boolean;
}

/**
 * SocialIcons Component
 * 
 * Displays social media and professional links with:
 * - Appropriate icons for each platform
 * - Hover effects and transitions
 * - Accessibility labels
 * - Optional text labels
 */
export function SocialIcons({
  links,
  size = 'md',
  className = '',
  showLabels = false,
}: SocialIconsProps) {
  // Size mappings
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  const buttonSizeClasses = {
    sm: 'p-1.5',
    md: 'p-2',
    lg: 'p-2.5',
  };

  const iconSize = sizeClasses[size];
  const buttonSize = buttonSizeClasses[size];

  // Define icon mapping for each link type with pastel colors
  const socialConfig: {
    key: keyof (PersonLinks & SocialLinks);
    icon: typeof Linkedin;
    label: string;
    prefix?: string;
    colors: string;
  }[] = [
    { key: 'email', icon: Mail, label: 'Email', prefix: 'mailto:', colors: 'hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400' },
    { key: 'linkedin', icon: Linkedin, label: 'LinkedIn', colors: 'hover:bg-blue-100 hover:text-blue-600 dark:hover:bg-blue-900/30 dark:hover:text-blue-400' },
    { key: 'github', icon: Github, label: 'GitHub', colors: 'hover:bg-gray-100 hover:text-gray-800 dark:hover:bg-gray-800 dark:hover:text-gray-200' },
    { key: 'twitter', icon: Twitter, label: 'Twitter', colors: 'hover:bg-sky-100 hover:text-sky-500 dark:hover:bg-sky-900/30 dark:hover:text-sky-400' },
    { key: 'googleScholar', icon: ExternalLink, label: 'Google Scholar', colors: 'hover:bg-blue-100 hover:text-blue-700 dark:hover:bg-blue-900/30 dark:hover:text-blue-300' },
    { key: 'website', icon: Globe, label: 'Website', colors: 'hover:bg-purple-100 hover:text-purple-600 dark:hover:bg-purple-900/30 dark:hover:text-purple-400' },
    { key: 'youtube', icon: Youtube, label: 'YouTube', colors: 'hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900/30 dark:hover:text-red-400' },
    { key: 'orcid', icon: ExternalLink, label: 'ORCID', colors: 'hover:bg-lime-100 hover:text-lime-600 dark:hover:bg-lime-900/30 dark:hover:text-lime-400' },
  ];

  // Filter to only show links that exist
  const activeLinks = socialConfig.filter(
    (config) => links[config.key as keyof typeof links]
  );

  if (activeLinks.length === 0) return null;

  return (
    <div className={`flex flex-wrap items-center gap-1 ${className}`}>
      {activeLinks.map((config) => {
        const href = config.prefix
          ? `${config.prefix}${links[config.key as keyof typeof links]}`
          : (links[config.key as keyof typeof links] as string);

        const Icon = config.icon;

        return (
          <a
            key={config.key}
            href={href}
            target={config.key === 'email' ? undefined : '_blank'}
            rel={config.key === 'email' ? undefined : 'noopener noreferrer'}
            className={`inline-flex items-center gap-1.5 rounded-lg text-surface-500 transition-all duration-200 dark:text-surface-400 ${config.colors} ${buttonSize}`}
            aria-label={config.label}
            title={config.label}
          >
            <Icon className={iconSize} />
            {showLabels && (
              <span className="text-sm">{config.label}</span>
            )}
          </a>
        );
      })}
    </div>
  );
}

/**
 * SingleSocialLink Component
 * 
 * Individual social link with icon and optional label.
 */
interface SingleSocialLinkProps {
  href: string;
  icon: 'linkedin' | 'github' | 'twitter' | 'email' | 'website' | 'scholar' | 'youtube';
  label?: string;
  className?: string;
}

export function SingleSocialLink({
  href,
  icon,
  label,
  className = '',
}: SingleSocialLinkProps) {
  const icons = {
    linkedin: Linkedin,
    github: Github,
    twitter: Twitter,
    email: Mail,
    website: Globe,
    scholar: ExternalLink,
    youtube: Youtube,
  };

  const labels = {
    linkedin: 'LinkedIn',
    github: 'GitHub',
    twitter: 'Twitter',
    email: 'Email',
    website: 'Website',
    scholar: 'Google Scholar',
    youtube: 'YouTube',
  };

  const Icon = icons[icon];
  const defaultLabel = labels[icon];
  const isEmail = icon === 'email';

  return (
    <a
      href={isEmail ? `mailto:${href}` : href}
      target={isEmail ? undefined : '_blank'}
      rel={isEmail ? undefined : 'noopener noreferrer'}
      className={`inline-flex items-center gap-2 text-sm text-primary-600 transition-colors hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 ${className}`}
    >
      <Icon className="h-4 w-4" />
      <span>{label || defaultLabel}</span>
    </a>
  );
}
