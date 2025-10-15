import * as React from 'react';
import { cn } from '@/lib/utils';
import { useFormField } from './form';
import { Eye, EyeOff } from 'lucide-react';
import { Button } from './button';

const TextInput = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, type, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <input
        type={type}
        className={cn(
          'flex h-11 w-full rounded-md border border-zinc-300 bg-transparent px-3 py-2 text-sm text-zinc-700 placeholder:text-zinc-400 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#A6252A] focus:border-[#A6252A] disabled:cursor-not-allowed disabled:opacity-50',
          error && 'border-red-600 focus-visible:ring-red-600',
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
TextInput.displayName = 'TextInput';

const PasswordInput = React.forwardRef<
  HTMLInputElement,
  Omit<React.ComponentProps<'input'>, 'type'>
>(({ ...props }, ref) => {
  const [isVisible, setIsVisible] = React.useState(false);

  return (
    <div className="relative overflow-visible">
      <TextInput type={isVisible ? 'text' : 'password'} ref={ref} {...props} className="pr-10" />
      <Button
        type="button"
        variant="ghost"
        onClick={() => setIsVisible((prev) => !prev)}
        className="absolute right-3 top-1/2 -translate-y-1/2 p-1 h-6 w-6 text-zinc-700 hover:text-[#A6252A] hover:bg-transparent flex items-center justify-center"
      >
        {isVisible ? <Eye strokeWidth={1.5} size={18} /> : <EyeOff strokeWidth={1.5} size={18} />}
      </Button>
    </div>
  );
});
PasswordInput.displayName = 'PasswordInput';

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ type, ...props }, ref) => {
    switch (type) {
      case 'password':
        return <PasswordInput {...props} ref={ref} />;

      default:
        return <TextInput type={type} {...props} ref={ref} />;
    }
  }
);
Input.displayName = 'Input';

export { Input };
