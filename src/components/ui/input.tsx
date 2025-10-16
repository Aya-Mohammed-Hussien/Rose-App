'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

// Props
declare type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      <input
        type={type}
        ref={ref}
        className={cn(
          // base
          'flex h-12 w-80 rounded-lg border px-3 py-2 text-base placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:outline-none  transition-colors',

          // background and text (light/dark)
          'bg-white text-zinc-800 placeholder:text-zinc-400',
          'dark:bg-zinc-700 dark:text-zinc-100 dark:placeholder:text-zinc-400',

          // focus (light/dark)
          !error &&
            'border-[1.5px] border-zinc-300 focus-visible:border-zinc-400 dark:border-zinc-600 dark:focus-visible:border-zinc-500',

          // error state (light/dark)
          error &&
            'border-[1.5px] border-red-600 focus-visible:border-maroon-600 dark:border-red-500 dark:focus-visible:border-pink-400',

          className
        )}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

// Password Input
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    // State
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <div className="relative w-80">
        {/* default button */}
        <Input
          ref={ref}
          error={error}
          type={showPassword ? 'text' : 'password'}
          className={cn('pr-10', className)}
          {...props}
        />

        {/* eye button */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className={cn(
            'absolute inset-y-0 right-3 flex items-center h-full',
            // light
            'text-zinc-400 hover:text-zinc-900',

            // dark
            'dark:text-zinc-400 dark:hover:text-zinc-300'
          )}
          tabIndex={-1}
          aria-label={showPassword ? 'Hide password' : 'Show password'}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
