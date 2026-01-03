/**
 * Research Stats Component
 * 
 * Purpose: Display key lab statistics and metrics.
 * Shows publications count, projects, students, etc.
 */

import { BookOpen, Users, Cpu, Award } from 'lucide-react';

interface Stat {
  label: string;
  value: string | number;
  icon: typeof BookOpen;
  description?: string;
}

interface ResearchStatsProps {
  stats?: Stat[];
}

/**
 * Default stats - PLACEHOLDER: Update with actual lab metrics
 */
const defaultStats: Stat[] = [
  {
    label: 'Publications',
    value: '100+',
    icon: BookOpen,
    description: 'In top venues',
  },
  {
    label: 'Research Projects',
    value: '15+',
    icon: Cpu,
    description: 'Active projects',
  },
  {
    label: 'Lab Members',
    value: '20+',
    icon: Users,
    description: 'Students & researchers',
  },
  {
    label: 'Awards',
    value: '10+',
    icon: Award,
    description: 'Best paper awards',
  },
];

/**
 * ResearchStats Component
 * 
 * Grid of key metrics with:
 * - Large numbers
 * - Icons for visual appeal
 * - Optional descriptions
 */
export function ResearchStats({ stats = defaultStats }: ResearchStatsProps) {
  return (
    <div className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
      {stats.map((stat) => (
        <StatCard key={stat.label} stat={stat} />
      ))}
    </div>
  );
}

/**
 * StatCard Component
 * 
 * Individual stat display.
 */
interface StatCardProps {
  stat: Stat;
}

function StatCard({ stat }: StatCardProps) {
  const Icon = stat.icon;

  return (
    <div className="text-center">
      {/* Icon */}
      <div className="mb-3 flex justify-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400">
          <Icon className="h-6 w-6" />
        </div>
      </div>

      {/* Value */}
      <div className="text-3xl font-bold text-surface-900 dark:text-surface-50 md:text-4xl">
        {stat.value}
      </div>

      {/* Label */}
      <div className="mt-1 font-medium text-surface-700 dark:text-surface-300">
        {stat.label}
      </div>

      {/* Description */}
      {stat.description && (
        <div className="mt-0.5 text-sm text-surface-500 dark:text-surface-400">
          {stat.description}
        </div>
      )}
    </div>
  );
}
