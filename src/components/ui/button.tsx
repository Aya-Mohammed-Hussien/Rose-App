import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
import { LoaderCircle } from 'lucide-react';

const buttonVariants = cva(
  //  Base styles (applied to all button types)
  'inline-flex items-center justify-center gap-2 whitespace-nowrap capitalize rounded-[0.625rem] text-base font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default:
          'bg-maroon-600 text-white ' + // default background and text
          'hover:bg-maroon-700 ' + // hover state
          'dark:bg-softPink-300 dark:hover:bg-softPink-400 ' + // dark mode hover styles
          'disabled:bg-zinc-300 disabled:text-zinc-500 ' + // disabled
          'dark:disabled:bg-zinc-700 dark:disabled:bg-zinc-600', // dark mode disabled

        destructive:
          'bg-maroon-50 text-maroon-600 ' +
          'hover:bg-maroon-100 ' + // hover
          'dark:text-softPink-300 dark:bg-zinc-700 dark:hover:bg-zinc-600 ' + // dark mode background and hover
          'disabled:bg-zinc-300 disabled:text-zinc-500 ' + // disabled
          'dark:disabled:bg-zinc-700 dark:disabled:bg-zinc-600', // dark mode disabled

        outline:
          'border border-maroon-600 bg-white ' +
          'hover:bg-maroon-50 ' + // hover
          'dark:text-softPink-300 dark:bg-zinc-800 dark:border-softPink-300 dark:hover:bg-zinc-700 ' + // dark mode border and hover
          'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-300 ' + // disabled
          'dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:border-zinc-600', // dark mode disabled

        secondary:
          'bg-zinc-50 text-zinc-800 border border-zinc-400 ' +
          'hover:bg-zinc-100 ' + // hover
          'dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-500 dark:hover:bg-zinc-700 ' + // dark mode
          'disabled:bg-zinc-100 disabled:text-zinc-400 disabled:border-zinc-300 ' + // disabled
          'dark:disabled:bg-zinc-800 dark:disabled:text-zinc-600 dark:disabled:border-zinc-600', // dark mode disabled

        ghost:
          'bg-transparent text-zinc-800 ' +
          'hover:bg-zinc-100 ' + // hover:
          'dark:text-zinc-50 dark:hover:bg-zinc-700 ' + // dark mode hover
          'disabled:bg-zinc-100 disabled:text-zinc-400 ' + // disabled
          'dark:disabled:bg-zinc-700 dark:disabled:bg-zinc-600', // dark mode disabled

        link:
          'bg-red-600 text-white ' +
          'hover:bg-red-700 ' + // hover
          'dark:bg-red-500 dark:hover:bg-red-600 ' + // dark mode
          'disabled:bg-zinc-300 disabled:text-zinc-500 ' + // disabled
          'dark:disabled:bg-zinc-700 dark:disabled:bg-zinc-600', // dark mode disabled

        subscribe:
          'rounded-full transition-none hover:none font-medium text-sm ' +
          'bg-maroon-50 text-maroon-700 ' +
          'dark:bg-maroon-300 dark:text-zinc-800', // dark mode
      },

      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

// 💡 Button component definition
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, loading, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props}>
        {children}
        {/* Show loader icon when loading */}
        {loading && <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
