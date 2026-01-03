/**
 * 404 Not Found Page
 * 
 * Purpose: Custom error page for missing routes.
 */

import Link from 'next/link';
import { Button } from '@/components/ui';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <h1 className="mb-4 text-6xl font-bold text-surface-300 dark:text-surface-700">
        404
      </h1>
      <h2 className="mb-4 text-2xl font-semibold text-surface-900 dark:text-surface-50">
        Page Not Found
      </h2>
      <p className="mb-8 max-w-md text-surface-600 dark:text-surface-400">
        Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been
        moved or doesn&apos;t exist.
      </p>
      <div className="flex gap-4">
        <Button as="link" href="/" leftIcon={<Home className="h-4 w-4" />}>
          Go Home
        </Button>
        <Button
          as="link"
          href="/projects"
          variant="outline"
          leftIcon={<ArrowLeft className="h-4 w-4" />}
        >
          View Research
        </Button>
      </div>
    </div>
  );
}
