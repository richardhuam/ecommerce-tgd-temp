import React from 'react';

import { IPagination } from '@/shared/models/api.model';

interface PaginationProps {
  pagination: Pick<IPagination, 'currentPage' | 'hasNextPage' | 'totalItems' | 'totalPages' | 'limit'> &
    Partial<Pick<IPagination, 'query'>>;
  onPageChange: (page: number) => void;
  nextPageFunc?: () => void;
  prevPageFunc?: () => void;
}

export default function Paginate({ pagination, onPageChange, nextPageFunc, prevPageFunc }: PaginationProps) {
  const { hasNextPage, currentPage, totalPages } = pagination;

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }

    if (nextPageFunc) nextPageFunc();
  };

  const handleNextPage = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }

    if (prevPageFunc) prevPageFunc();
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
            !hasNextPage
              ? 'bg-gray-200/80 border-gray-200/80 cursor-not-allowed text-gray-500'
              : 'cursor-pointer hover:bg-primary-600 hover:text-white duration-300 transition-colors ease-in-out hover:border-primary-600'
          }`}
          onClick={handleNextPage}
          disabled={!hasNextPage}
        >
          Next {'>'}
        </button>
      </li>
    </ul>
  );
}
