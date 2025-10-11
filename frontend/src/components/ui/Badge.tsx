import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Badge component variants
 * Used for labels, tags, and status indicators
 */
const badgeVariants = cva(
  // Base styles
  'inline-flex items-center justify-center rounded-lg font-mono font-semibold text-white shadow-md transition-all duration-200',
  {
    variants: {
      color: {
        blue: 'bg-gradient-to-r from-blue-600 to-blue-500',
        purple: 'bg-gradient-to-r from-slate-600 to-blue-600',
        orange: 'bg-gradient-to-r from-slate-600 to-gray-600',
        green: 'bg-gradient-to-r from-emerald-600 to-teal-600',
        indigo: 'bg-gradient-to-r from-indigo-600 to-blue-600',
      },
      size: {
        sm: 'px-2 py-0.5 text-xs',
        md: 'px-3 py-1 text-xs',
        lg: 'px-4 py-1.5 text-sm',
      },
    },
    defaultVariants: {
      color: 'blue',
      size: 'md',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

/**
 * Badge Component
 * Displays colored labels with gradient backgrounds
 * 
 * @example
 * <Badge color="purple" size="md">:4000</Badge>
 */
export function Badge({ className, color, size, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ color, size }), className)} {...props} />
  );
}

