/**
 * Next.js Configuration
 * 
 * Purpose: Configure Next.js for static site generation.
 * This config enables static export for deployment to static hosts.
 */

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for deployment to GitHub Pages, Vercel, etc.
  output: 'export',
  
  // Disable image optimization for static export (use unoptimized images)
  images: {
    unoptimized: true,
  },
  
  // Trailing slashes for better static hosting compatibility
  trailingSlash: true,
  
  // Strict mode for better React development experience
  reactStrictMode: true,
};

module.exports = nextConfig;
