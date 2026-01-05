/**
 * Root Layout
 * 
 * Purpose: Main application layout with theme provider, navbar, and footer.
 * This layout wraps all pages and provides global structure.
 */

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider, Navbar, Footer } from '@/components/layout';
import './globals.css';

// Load Inter font with Latin subset
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// SEO Metadata - PLACEHOLDER: Update with actual lab information
export const metadata: Metadata = {
  title: {
    default: 'SARCS Lab - Systems Architecture Research',
    template: '%s | SARCS Lab',
  },
  description:
    'SARCS Laboratory: Research in computer architecture, in-memory computing, RISC-V, hardware accelerators, and AI systems at Example University.',
  keywords: [
    'computer architecture',
    'in-memory computing',
    'RISC-V',
    'hardware accelerators',
    'AI systems',
    'research lab',
    'academic research',
  ],
  authors: [{ name: 'SARCS Lab' }],
  creator: 'SARCS Lab',
  publisher: 'Example University',
  metadataBase: new URL('https://sarcs-lab.example.edu'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'SARCS Lab',
    title: 'SARCS Lab - Systems Architecture Research',
    description:
      'Research in computer architecture, in-memory computing, RISC-V, and AI systems.',
    // PLACEHOLDER: Add actual OG image
    // images: [{ url: '/images/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SARCS Lab',
    description: 'Sustainable, Advanced and Robust Computing Systems',
    // PLACEHOLDER: Add actual Twitter handle
    // creator: '@sarcs_lab',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  // PLACEHOLDER: Add verification tokens when deploying
  // verification: {
  //   google: 'google-verification-token',
  // },
};

/**
 * Root Layout Component
 * 
 * Provides:
 * - HTML structure with lang attribute
 * - Theme provider for dark mode
 * - Navigation bar
 * - Footer
 * - Font configuration
 */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Prevent flash of wrong theme */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme');
                  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans`}>
        <ThemeProvider>
          {/* Skip to main content link for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary-600 focus:px-4 focus:py-2 focus:text-white"
          >
            Skip to main content
          </a>

          {/* Navigation */}
          <Navbar />

          {/* Main content with top padding for fixed navbar */}
          <main id="main-content" className="min-h-screen pt-16">
            {children}
          </main>

          {/* Footer */}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
