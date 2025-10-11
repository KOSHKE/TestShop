import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Card component variants using CVA
 * Provides consistent styling across the application
 */
const cardVariants = cva(
  // Base styles (always applied)
  'rounded-2xl border transition-all duration-300',
  {
    variants: {
      variant: {
        default:
          'bg-white dark:bg-gray-900/50 border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700',
        gradient:
          'bg-gradient-to-br from-gray-50 to-gray-100/50 dark:from-gray-900/50 dark:to-gray-800/50 border-gray-200/50 dark:border-gray-700/50 backdrop-blur-sm hover:border-gray-300 dark:hover:border-gray-600',
        glass:
          'bg-white/50 dark:bg-gray-950/50 border-gray-200/50 dark:border-gray-800/50 backdrop-blur-md',
      },
      padding: {
        none: '',
        sm: 'p-4',
        md: 'p-6',
        lg: 'p-8',
      },
      hover: {
        none: '',
        lift: 'hover:scale-[1.01] hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-gray-900/50',
        glow: 'hover:shadow-2xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      padding: 'md',
      hover: 'none',
    },
  }
);

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {}

/**
 * Card Component
 * Flexible container with multiple style variants
 * 
 * @example
 * <Card variant="gradient" padding="lg" hover="lift">
 *   Content
 * </Card>
 */
export function Card({
  className,
  variant,
  padding,
  hover,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ variant, padding, hover }), className)}
      {...props}
    />
  );
}

