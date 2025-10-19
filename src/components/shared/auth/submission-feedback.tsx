import { cn } from '@/lib/utils';
import { CircleX } from 'lucide-react';
import React from 'react';

export default function SubmissionFeedback({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p
      {...props}
      className={cn(
        'relative p-2.5 text-sm flex items-center justify-center text-center gap-2 text-red-600',
        className
      )}
    >
      {/* content */}
      {children}
    </p>
  );
}
