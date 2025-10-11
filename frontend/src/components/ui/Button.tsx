import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

/**
 * Button component variants
 * Supports multiple styles and sizes
 */
const buttonVariants = cva(
  // Base styles
  'inline-flex items-center gap-1.5 font-medium rounded-lg transition-all duration-200 hover:scale-105',
  {
    variants: {
      variant: {
        primary:
          'bg-blue-500/10 text-blue-700 dark:text-blue-300 hover:bg-blue-500/20',
        gradient:
          'bg-gradient-to-r from-purple-500/10 to-pink-500/10 text-purple-700 dark:text-purple-300 hover:from-purple-500/20 hover:to-pink-500/20',
        ghost:
          'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800',
      },
      size: {
        sm: 'px-2 py-1 text-xs',
        md: 'px-3 py-1.5 text-xs',
        lg: 'px-4 py-2 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  }
);

export interface ButtonProps
  extends React.AnchorHTMLAttributes<HTMLAnchorElement>,
    VariantProps<typeof buttonVariants> {
  icon?: string;
}

/**
 * Button Component (as link)
 * Styled anchor element with consistent appearance
 * 
 * @example
 * <Button variant="primary" icon="🔗" href="...">Link</Button>
 */
export function Button({
  className,
  variant,
  size,
  icon,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(buttonVariants({ variant, size }), 'font-mono', className)}
      {...props}
    >
      {icon && <span>{icon}</span>}
      {children}
    </a>
  );
}

