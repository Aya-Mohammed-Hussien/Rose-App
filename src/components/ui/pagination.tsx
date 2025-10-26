'use client';

import * as React from 'react';
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import { ButtonProps, buttonVariants } from '@/components/ui/button';

const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn('mx-auto flex w-full justify-center', className)}
    {...props}
  />
);
Pagination.displayName = 'Pagination';

const PaginationContent = React.forwardRef<HTMLUListElement, React.ComponentProps<'ul'>>(
  ({ className, ...props }, ref) => (
    <ul ref={ref} className={cn('flex flex-row items-center gap-2', className)} {...props} />
  )
);
PaginationContent.displayName = 'PaginationContent';

const PaginationItem = React.forwardRef<HTMLLIElement, React.ComponentProps<'li'>>(
  ({ className, ...props }, ref) => <li ref={ref} className={cn('', className)} {...props} />
);
PaginationItem.displayName = 'PaginationItem';

type PaginationLinkProps = {
  isActive?: boolean;
} & Pick<ButtonProps, 'size'> &
  React.ComponentProps<'a'>;

const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => {
  // base shadcn-like button classes for square page buttons
  const base = buttonVariants({ variant: 'ghost', size });

  const visual = cn(
    base,
    'h-8 w-8  flex items-center justify-center rounded-lg  border border-zinc-100 shadow-sm ',
    isActive
      ? 'bg-maroon-600  text-white hover:text-white  hover:bg-maroon-600'
      : 'bg-white text-gray-700 ',
    className
  );

  return <a aria-current={isActive ? 'page' : undefined} className={visual} {...props} />;
};
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to previous page"
    size="icon"
    className={cn('pl-0', className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4  " />
    <span className="sr-only">Previous</span>
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink
    aria-label="Go to next page"
    size="icon"
    className={cn('pr-0', className)}
    {...props}
  >
    <ChevronRight className="h-4 w-4" />
    <span className="sr-only">Next</span>
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationFirst = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to first page" size="icon" className={cn(className)} {...props}>
    <ChevronsLeft className="h-4 w-4" />
    <span className="sr-only">First</span>
  </PaginationLink>
);
PaginationFirst.displayName = 'PaginationFirst';

const PaginationLast = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => (
  <PaginationLink aria-label="Go to last page" size="icon" className={cn(className)} {...props}>
    <ChevronsRight className="h-4 w-4" />
    <span className="sr-only">Last</span>
  </PaginationLink>
);
PaginationLast.displayName = 'PaginationLast';

const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => (
  <span
    aria-hidden
    className={cn(
      // keep the same size as page buttons but without border
      'flex h-10 w-10 min-w-[40px] items-center justify-center',
      className
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4 text-zinc-800" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

export {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationFirst,
  PaginationLast,
};
