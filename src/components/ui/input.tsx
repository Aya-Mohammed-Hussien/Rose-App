'use client';

import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

declare type InputProps = React.ComponentProps<'input'> & {
  error?: boolean;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, error, ...props }, ref) => {
    return (
      // default input
      <input
        type={type}
        className={cn(
          'flex h-12 w-80 rounded-lg border  bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground    disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:outline-none',
          !error && 'border-[1.5px] border-zinc-300  focus-visible:border-zinc-400',
          error && 'border-[1.5px] border-red-600 focus-visible:border-maroon-600'
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, ...props }, ref) => {
    // State
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      // password input
      <div className="relative w-80">
        {/* default input */}
        <Input ref={ref} error={error} type={showPassword ? 'text' : 'password'} {...props} />

        {/* eye button */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-3 flex items-center text-muted-foreground hover:text-foreground"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';

export { Input, PasswordInput };
