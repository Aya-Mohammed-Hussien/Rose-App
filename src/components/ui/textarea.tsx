import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from './form';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<'textarea'>>(
  ({ className, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <textarea
        ref={ref}
        {...props}
        className={cn(
          // --- Base layout and sizing ---
          'flex min-h-[3.0625rem] w-full rounded-[0.625rem] p-4 text-base md:text-sm',
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
          // --- Error state  ---
          error && 'border-red-600 dark:border-red-500',
          // --- Additional custom styles passed as props ---
          className
        )}
      />
    );
  }
);

Textarea.displayName = 'Textarea';

export { Textarea };
