import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationEllipsis,
  PaginationNext,
  PaginationFirst,
  PaginationLast,
} from '@/components/ui/pagination';
import React from 'react';

// Props
type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function PaginationSection({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (!totalPages || totalPages < 1) return null;
  //Function
  const goToPage = (page: number) => {
    // navigate to pages
    if (page < 1 || page > totalPages) return;
    onPageChange(page);
  };

  const getVisiblePage = () => {
    const pages: (number | string)[] = [];
    const startPage = currentPage - 2;
    const endPage = currentPage + 2;

    //  4 5 '6' 7 8
    //example: startPage = 4 , endPage = 8 , currentPage = 6
    if (startPage > 1) {
      pages.push(1);
      // startPage = 4 then there is a gap(numbers) between startPage and 1 (firstPage) => ...
      if (startPage > 2) {
        pages.push('...');
      }
    }

    // loop from startPage to endPage and push the range in page array
    for (let i = Math.max(1, startPage); i <= Math.min(totalPages, endPage); i++) {
      pages.push(i);
    }

    // endPage = 8 and totalPages - 1 = 21 then there is a gap(numbers) between endPage and totalPage -1 => ...
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push('...');
      }
      pages.push(totalPages);
    }

    return pages;
  };

  const visiblePages = getVisiblePage();

  return (
    <Pagination>
      <PaginationContent>
        {/* first */}
        <PaginationItem>
          <PaginationFirst
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(1);
            }}
            className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        {/* prev */}
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage - 1);
            }}
            className={currentPage === 1 ? 'opacity-50 pointer-events-none' : ''}
            aria-disabled={currentPage === 1}
          ></PaginationPrevious>
        </PaginationItem>

        {/* page numbers with ellipsis */}
        {visiblePages.map((page, index) => (
          <PaginationItem key={`${page}-${index}`}>
            {page === '...' ? (
              <PaginationEllipsis />
            ) : (
              <PaginationLink
                href="#"
                isActive={currentPage === Number(page)}
                onClick={(e) => {
                  e.preventDefault();
                  if (typeof page === 'number') {
                    goToPage(page);
                  }
                }}
                className={currentPage === page ? 'pointer-events-none  cursor-default' : ''}
                {...(currentPage === Number(page) ? { 'aria-current': 'page' } : {})}
              >
                {page}
              </PaginationLink>
            )}
          </PaginationItem>
        ))}

        {/* next */}
        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(currentPage + 1);
            }}
            aria-disabled={currentPage === totalPages}
            className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}
          ></PaginationNext>
        </PaginationItem>

        {/* last */}
        <PaginationItem>
          <PaginationLast
            href="#"
            onClick={(e) => {
              e.preventDefault();
              goToPage(totalPages);
            }}
            className={currentPage === totalPages ? 'opacity-50 pointer-events-none' : ''}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
