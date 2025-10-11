import { cn } from '@/lib/utils';

/**
 * Reusable style constants
 * Professional color scheme: blues, grays, and subtle accents
 */

// Subtle glow effect (hover)
export const gradientGlow = (gradient: string) =>
  cn(
    'absolute -inset-0.5 rounded-2xl opacity-0 group-hover:opacity-15 blur transition duration-500',
    `bg-gradient-to-r ${gradient}`
  );

// Card title with subtle color change on hover
export const cardTitle = cn(
  'font-bold text-lg text-gray-900 dark:text-white',
  'group-hover:text-blue-600 dark:group-hover:text-blue-400',
  'transition-all duration-300'
);

// Section title with subtle gradient
export const sectionTitle = (gradient: string) =>
  cn('text-3xl font-bold bg-gradient-to-r bg-clip-text text-transparent', gradient);

// Icon badge container (blue theme)
export const iconBadge = cn(
  'w-10 h-10 rounded-xl flex items-center justify-center',
  'bg-gradient-to-br from-blue-500 to-slate-600',
  'shadow-lg shadow-blue-500/30'
);

// Professional gradient maps
export const gradients = {
  frontend: 'from-blue-600 to-indigo-600',
  backend: 'from-slate-600 to-blue-600',
  database: 'from-emerald-600 to-teal-600',
  infrastructure: 'from-slate-600 to-gray-600',
} as const;

