/**
 * Blog Page
 * 
 * Purpose: Blog posts, tutorials, and lab updates.
 * Center-aligned for better readability.
 */

import type { Metadata } from 'next';
import { PageHeader, Section } from '@/components/ui';
import { BlogList } from '@/components/blog';
import type { BlogPost } from '@/types';

// Import data
import blogData from '@/data/blog.json';

const blogPosts = blogData as BlogPost[];

export const metadata: Metadata = {
  title: 'Blogs',
  description: 'Read our blog posts, tutorials, research insights, and lab updates.',
};

/**
 * Blog Page Component
 * 
 * Center-aligned blog with:
 * - Blog posts
 * - Tutorials and updates
 */
export default function BlogPage() {
  return (
    <>
      <PageHeader
        title="Blogs"
        description="Tutorials, research insights, and updates from our lab."
      />

      {/* Blog Section - Center Aligned */}
      <Section>
        <div className="mx-auto max-w-5xl">
          <BlogList posts={blogPosts} />
        </div>
      </Section>
    </>
  );
}
