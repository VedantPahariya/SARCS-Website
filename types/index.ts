/**
 * Type Definitions
 * 
 * Purpose: Central TypeScript interfaces for all data models used across the website.
 * These types ensure type safety and consistency throughout the application.
 */

// ============================================================================
// PUBLICATION TYPES
// ============================================================================

/**
 * Publication entry for academic papers, articles, etc.
 */
export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string; // Conference or journal name
  year: number;
  abstract: string;
  tags: string[]; // Interest/topic tags for filtering
  links: PublicationLinks;
  type: 'conference' | 'journal' | 'workshop' | 'preprint' | 'thesis';
}

export interface PublicationLinks {
  pdf?: string;
  arxiv?: string;
  googleScholar?: string;
  doi?: string;
  code?: string; // GitHub repository
  slides?: string;
  video?: string;
  project?: string; // Project page URL
}

// ============================================================================
// PEOPLE TYPES
// ============================================================================

/**
 * Person entry for faculty, students, and alumni
 */
export interface Person {
  id: string;
  name: string;
  photo: string; // Path to image
  photoPosition?: string; // CSS object-position value, e.g., '50% 33%', '50% 0%', 'center'
  role: PersonRole;
  designation?: string; // e.g., "PhD Candidate", "Assistant Professor"
  bio?: string;
  researchInterests?: string[];
  links: PersonLinks;
  // For alumni
  graduationYear?: number;
  currentAffiliation?: string;
  // For students
  program?: 'PhD' | 'MS' | 'MTech' | 'BTech' | 'Undergraduate' | 'Research Intern';
  yearJoined?: number;
}

export type PersonRole = 'faculty' | 'phd' | 'masters' | 'undergraduate' | 'intern' | 'alumni';

export interface PersonLinks {
  email?: string;
  linkedin?: string;
  googleScholar?: string;
  github?: string;
  twitter?: string;
  website?: string;
  orcid?: string;
}

// ============================================================================
// PROJECT / RESEARCH TYPES
// ============================================================================

/**
 * Research area or project
 */
export interface Project {
  id: string;
  slug: string; // URL-friendly identifier
  title: string;
  shortDescription: string;
  fullDescription: string;
  image?: string; // Featured image
  topics: string[]; // Bullet list of focus topics
  links: ProjectLinks;
  publications?: string[]; // IDs of related publications
  team?: string[]; // IDs of team members
  status: 'active' | 'completed' | 'ongoing';
  startYear?: number;
  endYear?: number;
}

export interface ProjectLinks {
  github?: string;
  documentation?: string;
  demo?: string;
  paper?: string;
  website?: string;
}

// ============================================================================
// NEWS TYPES
// ============================================================================

/**
 * News or update entry
 */
export interface NewsItem {
  id: string;
  date: string; // ISO date string
  title: string;
  description: string;
  link?: string; // External link for more info
  type: 'publication' | 'award' | 'event' | 'announcement' | 'talk' | 'media';
  pinned?: boolean; // Show at top
}

// ============================================================================
// MEDIA / GALLERY TYPES
// ============================================================================

/**
 * Media item for gallery
 */
export interface MediaItem {
  id: string;
  src: string; // Image path
  alt: string; // Accessibility description
  caption: string;
  category: 'event' | 'talk' | 'group' | 'lab' | 'conference' | 'award';
  date?: string;
  event?: string; // Event name
}

// ============================================================================
// BLOG TYPES
// ============================================================================

/**
 * Blog post entry
 */
export interface BlogPost {
  id: string;
  title: string;
  date: string; // ISO date string
  description: string;
  link: string; // External link to full post
  author?: string;
  tags?: string[];
}

// ============================================================================
// RESOURCE TYPES
// ============================================================================

/**
 * Resource item (tools, datasets, code, etc.)
 */
export interface Resource {
  id: string;
  title: string;
  description: string;
  category: ResourceCategory;
  link: string;
  type: 'github' | 'pdf' | 'dataset' | 'tool' | 'documentation' | 'external';
  tags?: string[];
}

export type ResourceCategory = 
  | 'Open Source Tools'
  | 'Datasets'
  | 'Publications'
  | 'Tutorials'
  | 'Code Repositories'
  | 'Documentation';

// ============================================================================
// CONTACT / LAB INFO TYPES
// ============================================================================

/**
 * Lab contact information
 */
export interface LabInfo {
  name: string;
  fullName: string;
  logo: string;
  mission: string;
  address: string[];
  email: string;
  phone?: string;
  socialLinks: SocialLinks;
  affiliations: Affiliation[];
}

export interface SocialLinks {
  linkedin?: string;
  twitter?: string;
  github?: string;
  youtube?: string;
  googleScholar?: string;
  website?: string;
}

export interface Affiliation {
  name: string;
  logo: string;
  url: string;
}

// ============================================================================
// OPENING / POSITION TYPES
// ============================================================================

/**
 * Open position at the lab
 */
export interface Opening {
  id: string;
  title: string;
  type: 'PhD' | 'Masters' | 'Internship' | 'PostDoc' | 'Research Assistant' | 'Collaboration';
  description: string;
  requirements?: string[];
  deadline?: string;
  isOpen: boolean;
  contactEmail?: string;
}

// ============================================================================
// NAVIGATION TYPES
// ============================================================================

/**
 * Navigation item for menu
 */
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[]; // For dropdown menus
  indent?: boolean; // For indented sub-items in dropdown
  isHeader?: boolean; // For header items in dropdown
}

// ============================================================================
// COMPONENT PROP TYPES
// ============================================================================

/**
 * Common props for card components
 */
export interface CardProps {
  className?: string;
  children: React.ReactNode;
}

/**
 * Theme context type
 */
export type Theme = 'light' | 'dark' | 'system';

export interface ThemeContextType {
  theme: Theme;
  resolvedTheme: 'light' | 'dark';
  setTheme: (theme: Theme) => void;
}
