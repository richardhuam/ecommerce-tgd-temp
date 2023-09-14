import React from 'react';

interface LocalPaginationProps {
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
  totalPages: number;
}

export default function LocalPagination({ currentPage, setCurrentPage, totalPages }: LocalPaginationProps) {
  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ul className="flex items-center justify-center gap-1">
      <li>
        <button
          className={`h-8 px-3 text-15 flex items-center justify-center rounded-md border-1 ${
            currentPage === 1
              ? 'bg-gray-200/80 border-gray-200/80 cursor-not-allowed text-gray-500'
              : 'cursor-pointer hover:bg-primary-600 hover:text-white duration-300 transition-colors ease-in-out hover:border-primary-600'
          }`}
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          {'<'} Prev
        </button>
      </li>
      <li className="px-1 flex gap-2 items-center justify-center">
        <p className="text-gray-600 mx-3">
          {currentPage}&nbsp;&nbsp;of&nbsp;&nbsp;{totalPages}
        </p>
      </li>
      <li>
        <button
          className={`h-8 px-3 text-15 flex items-center justify-center rounded-md border-1 ${
            currentPage === totalPages
              ? 'bg-gray-200/80 border-gray-200/80 cursor-not-allowed text-gray-500'
              : 'cursor-pointer hover:bg-primary-600 hover:text-white duration-300 transition-colors ease-in-out hover:border-primary-600'
          }`}
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next {'>'}
        </button>
      </li>
    </ul>
  );
}
