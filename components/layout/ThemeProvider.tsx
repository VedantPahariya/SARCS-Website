/**
 * Theme Provider Component
 * 
 * Purpose: Provides theme context (light/dark mode) to the entire application.
 * Handles localStorage persistence and system preference detection.
 */

'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import type { Theme, ThemeContextType } from '@/types';

// Create context with undefined default (will be set by provider)
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

/**
 * ThemeProvider Component
 * 
 * Wraps the application to provide theme state and toggle functionality.
 * Persists theme choice to localStorage and respects system preferences.
 */
export function ThemeProvider({ children }: ThemeProviderProps) {
  // Initialize with 'system' as default theme
  const [theme, setTheme] = useState<Theme>('system');
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  // Effect to load saved theme and detect system preference
  useEffect(() => {
    setMounted(true);
    
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    
    if (savedTheme && ['light', 'dark', 'system'].includes(savedTheme)) {
      setTheme(savedTheme);
    }
  }, []);

  // Effect to apply theme changes
  useEffect(() => {
    if (!mounted) return;

    const root = document.documentElement;
    
    // Determine actual theme based on setting
    let actualTheme: 'light' | 'dark';
    
    if (theme === 'system') {
      // Check system preference
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      actualTheme = systemPrefersDark ? 'dark' : 'light';
    } else {
      actualTheme = theme;
    }

    // Apply theme class to root element
    if (actualTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }

    setResolvedTheme(actualTheme);
    
    // Save to localStorage
    localStorage.setItem('theme', theme);
  }, [theme, mounted]);

  // Listen for system theme changes
  useEffect(() => {
    if (!mounted || theme !== 'system') return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      const root = document.documentElement;
      const newTheme = e.matches ? 'dark' : 'light';
      
      if (newTheme === 'dark') {
        root.classList.add('dark');
      } else {
        root.classList.remove('dark');
      }
      
      setResolvedTheme(newTheme);
    };

    mediaQuery.addEventListener('change', handleChange);
    
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, mounted]);

  // Prevent hydration mismatch by not rendering until mounted
  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'system', resolvedTheme: 'light', setTheme: () => {} }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * useTheme Hook
 * 
 * Custom hook to access theme context.
 * Must be used within a ThemeProvider.
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  
  return context;
}
