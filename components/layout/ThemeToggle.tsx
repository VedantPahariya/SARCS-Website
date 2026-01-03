/**
 * Theme Toggle Component
 * 
 * Purpose: Button to toggle between light, dark, and system themes.
 * Displays appropriate icon based on current theme.
 */

'use client';

import { Sun, Moon, Monitor } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import type { Theme } from '@/types';

/**
 * ThemeToggle Component
 * 
 * Cycles through themes: light -> dark -> system -> light
 * Shows icon representing current theme state.
 */
export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  // Cycle through themes on click
  const cycleTheme = () => {
    const themeOrder: Theme[] = ['light', 'dark', 'system'];
    const currentIndex = themeOrder.indexOf(theme);
    const nextIndex = (currentIndex + 1) % themeOrder.length;
    setTheme(themeOrder[nextIndex]);
  };

  // Get icon and label based on current theme
  const getThemeInfo = () => {
    switch (theme) {
      case 'light':
        return {
          icon: <Sun className="h-5 w-5" />,
          label: 'Light mode (click for dark)',
        };
      case 'dark':
        return {
          icon: <Moon className="h-5 w-5" />,
          label: 'Dark mode (click for system)',
        };
      case 'system':
        return {
          icon: <Monitor className="h-5 w-5" />,
          label: 'System theme (click for light)',
        };
    }
  };

  const { icon, label } = getThemeInfo();

  return (
    <button
      onClick={cycleTheme}
      className="rounded-lg p-2 text-surface-600 transition-colors hover:bg-surface-100 hover:text-surface-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 dark:text-surface-400 dark:hover:bg-surface-800 dark:hover:text-surface-100"
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
