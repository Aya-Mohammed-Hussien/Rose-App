import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from './form';
// Reusable Input component with dynamic styling and error handling
const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    // Access field state (to detect validation errors)
    const { error } = useFormField();
    return (
      <input
        type={type}
        ref={ref}
        {...props}
        className={cn(
          // --- Base layout and sizing ---
          'flex h-[3.0625rem] w-full rounded-[0.625rem] p-4 text-base md:text-sm',
          // --- Border and background (default) ---
          'border border-zinc-300 dark:border-zinc-600 bg-white dark:bg-zinc-700',
          // --- Hover states ---
          'hover:border-zinc-400 dark:hover:border-zinc-500',
          // --- Focus states ---
          'focus-visible:outline-none focus-visible:border-maroon-600 dark:focus-visible:border-softPink-400',
          // --- Placeholder text color ---
          'placeholder:text-zinc-400',
          // --- Disabled states ---
          'disabled:cursor-not-allowed disabled:opacity-50',
          // --- File input styling (removes default file input look) ---
          'file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground',
          // --- Error state  ---
          error && 'border-red-600 dark:border-red-500',
          // --- Additional custom styles passed as props ---
          className
        )}
      />
    );
  }
);
Input.displayName = 'Input';
export { Input };


