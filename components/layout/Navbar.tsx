/**
 * Navigation Bar Component
 * 
 * Purpose: Fixed top navigation with responsive menu, dropdown for research areas,
 * and theme toggle. Supports both desktop and mobile layouts.
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ChevronDown } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import type { NavItem } from '@/types';

// Navigation items configuration
// Order: Home, Research, Publications, Resources, Blog, Media, People, Contact
const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Research',
    href: '/projects',
    children: [
      { label: 'All Research Areas', href: '/projects', isHeader: true },
      { label: 'In-Memory Computing', href: '/projects/in-memory-computing', indent: true },
      { label: 'RISC-V Architectures', href: '/projects/riscv-architectures', indent: true },
      { label: 'Hardware Accelerators', href: '/projects/hardware-accelerators', indent: true },
      { label: 'Signal Processing', href: '/projects/signal-processing', indent: true },
      { label: 'AI Systems', href: '/projects/ai-systems', indent: true },
    ],
  },
  { label: 'Publications', href: '/publications' },
  { label: 'Resources', href: '/resources' },
  { label: 'Blogs', href: '/blog' },
  { label: 'Media', href: '/media' },
  { label: 'People', href: '/people' },
  { label: 'Contact', href: '/contact' },
];

/**
 * Navbar Component
 * 
 * Responsive navigation bar with:
 * - Desktop: Horizontal menu with dropdown
 * - Mobile: Hamburger menu with slide-out panel
 * - Theme toggle button
 * - Scroll-aware background blur
 */
export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsDropdownOpen(false);
  }, [pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check if a nav item is active
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/80 shadow-sm backdrop-blur-lg dark:bg-surface-950/80'
          : 'bg-transparent'
      }`}
    >
      <nav className="container-page" aria-label="Main navigation">
        <div className="flex h-16 items-center justify-between">
          {/* Logo / Lab Name */}
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold text-surface-900 hover:no-underline dark:text-surface-50"
          >
            {/* PLACEHOLDER: Replace with actual lab logo */}
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-600 text-white">
              S
            </div>
            <span className="hidden sm:inline">SARCS Lab</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 lg:flex">
            {navItems.map((item) => (
              <div key={item.href} className="relative" ref={item.children ? dropdownRef : undefined}>
                {item.children ? (
                  // Dropdown menu item
                  <>
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                        isActive(item.href)
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
                      }`}
                      aria-expanded={isDropdownOpen}
                      aria-haspopup="true"
                    >
                      {item.label}
                      <ChevronDown
                        className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                      />
                    </button>
                    
                    {/* Dropdown panel */}
                    {isDropdownOpen && (
                      <div className="absolute left-0 top-full mt-1 w-56 animate-slide-down rounded-lg border border-surface-200 bg-white py-2 shadow-lg dark:border-surface-700 dark:bg-surface-800">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className={`block py-2 text-sm transition-colors hover:no-underline ${
                              child.indent ? 'pl-8 pr-4' : 'px-4 font-medium'
                            } ${
                              pathname === child.href
                                ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/20 dark:text-primary-400'
                                : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-700 dark:hover:text-surface-100'
                            }`}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  // Regular nav item
                  <Link
                    href={item.href}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:no-underline ${
                      isActive(item.href)
                        ? 'text-primary-600 dark:text-primary-400'
                        : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-2">
            <ThemeToggle />
            
            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="rounded-lg p-2 text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100 lg:hidden"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="animate-slide-down border-t border-surface-200 bg-white pb-4 dark:border-surface-700 dark:bg-surface-900 lg:hidden">
            <div className="space-y-1 pt-4">
              {navItems.map((item) => (
                <div key={item.href}>
                  {item.children ? (
                    // Mobile dropdown
                    <>
                      <button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`flex w-full items-center justify-between rounded-lg px-4 py-2 text-sm font-medium ${
                          isActive(item.href)
                            ? 'text-primary-600 dark:text-primary-400'
                            : 'text-surface-600 dark:text-surface-400'
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                        />
                      </button>
                      
                      {isDropdownOpen && (
                        <div className="ml-4 space-y-1 border-l-2 border-surface-200 pl-4 dark:border-surface-700">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              className={`block rounded-lg px-3 py-2 text-sm hover:no-underline ${
                                pathname === child.href
                                  ? 'text-primary-600 dark:text-primary-400'
                                  : 'text-surface-500 hover:text-surface-900 dark:text-surface-500 dark:hover:text-surface-100'
                              }`}
                            >
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block rounded-lg px-4 py-2 text-sm font-medium hover:no-underline ${
                        isActive(item.href)
                          ? 'text-primary-600 dark:text-primary-400'
                          : 'text-surface-600 hover:bg-surface-50 hover:text-surface-900 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100'
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
