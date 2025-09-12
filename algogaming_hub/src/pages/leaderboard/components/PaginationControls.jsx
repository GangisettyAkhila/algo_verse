import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PaginationControls = ({ 
  currentPage, 
  totalPages, 
  totalItems, 
  itemsPerPage, 
  onPageChange, 
  className = '' 
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getVisiblePages = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, currentPage - delta); 
         i <= Math.min(totalPages - 1, currentPage + delta); 
         i++) {
      range?.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots?.push(1, '...');
    } else {
      rangeWithDots?.push(1);
    }

    rangeWithDots?.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots?.push('...', totalPages);
    } else if (totalPages > 1) {
      rangeWithDots?.push(totalPages);
    }

    return rangeWithDots;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className={`w-full ${className}`}>
      {/* Desktop Pagination */}
      <div className="hidden md:flex items-center justify-between bg-card border border-border rounded-lg p-4">
        <div className="flex items-center space-x-2 text-sm text-text-secondary">
          <span>Showing</span>
          <span className="font-medium text-foreground">{startItem}-{endItem}</span>
          <span>of</span>
          <span className="font-medium text-foreground">{totalItems}</span>
          <span>players</span>
        </div>

        <div className="flex items-center space-x-1">
          {/* Previous Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
            className="mr-2"
          >
            Previous
          </Button>

          {/* Page Numbers */}
          {getVisiblePages()?.map((page, index) => (
            <React.Fragment key={index}>
              {page === '...' ? (
                <span className="px-3 py-2 text-text-secondary">...</span>
              ) : (
                <Button
                  variant={currentPage === page ? "default" : "outline"}
                  size="sm"
                  onClick={() => handlePageChange(page)}
                  className="min-w-[40px]"
                >
                  {page}
                </Button>
              )}
            </React.Fragment>
          ))}

          {/* Next Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
            className="ml-2"
          >
            Next
          </Button>
        </div>
      </div>
      {/* Mobile Pagination */}
      <div className="md:hidden bg-card border border-border rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="text-sm text-text-secondary">
            <span className="font-medium text-foreground">{startItem}-{endItem}</span>
            <span> of </span>
            <span className="font-medium text-foreground">{totalItems}</span>
          </div>
          <div className="text-sm text-text-secondary">
            Page <span className="font-medium text-foreground">{currentPage}</span> of{' '}
            <span className="font-medium text-foreground">{totalPages}</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          {/* Page Input for Mobile */}
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(1)}
              disabled={currentPage === 1}
            >
              1
            </Button>
            
            {currentPage > 3 && <span className="text-text-secondary">...</span>}
            
            {currentPage > 2 && currentPage < totalPages - 1 && (
              <Button variant="default" size="sm" disabled>
                {currentPage}
              </Button>
            )}
            
            {currentPage < totalPages - 2 && <span className="text-text-secondary">...</span>}
            
            {totalPages > 1 && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
              >
                {totalPages}
              </Button>
            )}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            iconName="ChevronRight"
            iconPosition="right"
          >
            Next
          </Button>
        </div>
      </div>
      {/* Quick Jump Options */}
      <div className="mt-4 flex items-center justify-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="text-xs"
        >
          <Icon name="ChevronsLeft" size={14} className="mr-1" />
          First
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="text-xs"
        >
          Last
          <Icon name="ChevronsRight" size={14} className="ml-1" />
        </Button>
      </div>
    </div>
  );
};

export default PaginationControls;