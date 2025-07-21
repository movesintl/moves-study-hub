import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UniversityPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export const UniversityPagination = ({ currentPage, totalPages, onPageChange }: UniversityPaginationProps) => {
  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages = [];
    const showPages = 5; // Number of page buttons to show
    
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2));
    let endPage = Math.min(totalPages, startPage + showPages - 1);
    
    // Adjust if we're near the end
    if (endPage - startPage + 1 < showPages) {
      startPage = Math.max(1, endPage - showPages + 1);
    }
    
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center gap-2 mt-12">
      {/* Previous Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-10 w-10"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {/* First page */}
      {pages[0] > 1 && (
        <>
          <Button
            variant={1 === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(1)}
            className="h-10 w-10"
          >
            1
          </Button>
          {pages[0] > 2 && (
            <span className="px-2 text-muted-foreground">...</span>
          )}
        </>
      )}

      {/* Page numbers */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "default" : "outline"}
          onClick={() => onPageChange(page)}
          className="h-10 w-10"
        >
          {page}
        </Button>
      ))}

      {/* Last page */}
      {pages[pages.length - 1] < totalPages && (
        <>
          {pages[pages.length - 1] < totalPages - 1 && (
            <span className="px-2 text-muted-foreground">...</span>
          )}
          <Button
            variant={totalPages === currentPage ? "default" : "outline"}
            onClick={() => onPageChange(totalPages)}
            className="h-10 w-10"
          >
            {totalPages}
          </Button>
        </>
      )}

      {/* Next Button */}
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-10 w-10"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  );
};