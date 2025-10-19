'use client';
import * as React from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useFormField } from './form';
const PasswordInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const inputType = type === 'password' ? (showPassword ? 'text' : 'password') : type;
    const { error } = useFormField();
    return (
      <div className="relative">
        <input
          type={inputType}
          className={cn(
            'flex h-[3.0625rem] w-full rounded-[0.625rem] border border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500 bg-white dark:bg-zinc-700 p-4 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-zinc-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-maroon-600 focus-visible:border-0 dark:focus-visible:ring-softPink-400 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            type === 'password' && 'pr-10',
            className,
            error && 'border-red-600 dark:border-red-500'
          )}
          ref={ref}
          {...props}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute inset-y-0 right-3 flex items-center text-zinc-400 hover:text-zinc-400"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    );
  }
);
PasswordInput.displayName = 'PasswordInput';
export { PasswordInput };

