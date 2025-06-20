'use client'

import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react'

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  // Generate page numbers to display - responsive version
  const getPageNumbers = (isMobile: boolean = false) => {
    const pages: (number | string)[] = []
    const showPages = isMobile ? 3 : 5 // Fewer pages on mobile
    
    if (totalPages <= showPages + 2) {
      // Show all pages if total is small
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always show first page
      pages.push(1)
      
      if (currentPage <= 2) {
        // Show pages 1, 2, 3, ..., last (mobile) or 1, 2, 3, 4, 5, ..., last (desktop)
        for (let i = 2; i <= (isMobile ? 3 : 5); i++) {
          pages.push(i)
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 1) {
        // Show 1, ..., last-2, last-1, last (mobile) or 1, ..., last-4, last-3, last-2, last-1, last (desktop)
        pages.push('ellipsis')
        for (let i = totalPages - (isMobile ? 2 : 4); i <= totalPages; i++) {
          if (i > 1) pages.push(i)
        }
      } else {
        // Show 1, ..., current, ..., last (mobile) or 1, ..., current-1, current, current+1, ..., last (desktop)
        pages.push('ellipsis')
        if (isMobile) {
          pages.push(currentPage)
        } else {
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i)
          }
        }
        pages.push('ellipsis')
        pages.push(totalPages)
      }
    }
    
    return pages
  }

  const mobilePageNumbers = getPageNumbers(true)
  const desktopPageNumbers = getPageNumbers(false)

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1)
    }
  }

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1)
    }
  }

  const handlePageClick = (page: number | string) => {
    if (typeof page === 'number') {
      onPageChange(page)
    }
  }

  return (
    <div className="py-6">
      {/* Mobile Pagination */}
      <div className="flex sm:hidden items-center justify-between px-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === 1
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          <ChevronLeft size={16} className="mr-1" />
          Prev
        </button>

        <div className="flex items-center space-x-1">
          {mobilePageNumbers.map((page, index) => (
            <div key={index}>
              {page === 'ellipsis' ? (
                <div className="flex items-center justify-center w-8 h-8">
                  <MoreHorizontal size={14} className="text-gray-400 dark:text-gray-600" />
                </div>
              ) : (
                <button
                  onClick={() => handlePageClick(page)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    currentPage === page
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                  }`}
                >
                  {page}
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            currentPage === totalPages
              ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
          }`}
        >
          Next
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      {/* Desktop Pagination */}
      <div className="hidden sm:flex items-center justify-center space-x-2">
        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <button
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === 1
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            <ChevronLeft size={16} className="mr-1" />
            Previous
          </button>

          {/* Page Numbers */}
          <div className="flex items-center space-x-1 mx-3">
            {desktopPageNumbers.map((page, index) => (
              <div key={index}>
                {page === 'ellipsis' ? (
                  <div className="flex items-center justify-center w-10 h-10">
                    <MoreHorizontal size={16} className="text-gray-400 dark:text-gray-600" />
                  </div>
                ) : (
                  <button
                    onClick={() => handlePageClick(page)}
                    className={`w-10 h-10 rounded-md text-sm font-medium transition-colors ${
                      currentPage === page
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
                    }`}
                  >
                    {page}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Next Button */}
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages}
            className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              currentPage === totalPages
                ? 'text-gray-400 dark:text-gray-600 cursor-not-allowed'
                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100'
            }`}
          >
            Next
            <ChevronRight size={16} className="ml-1" />
          </button>
        </div>
      </div>

      {/* Page Info - Mobile */}
      <div className="flex sm:hidden justify-center mt-3">
        <span className="text-xs text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>

      {/* Page Info - Desktop */}
      <div className="hidden sm:flex justify-center mt-4">
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Page {currentPage} of {totalPages}
        </span>
      </div>
    </div>
  )
} 