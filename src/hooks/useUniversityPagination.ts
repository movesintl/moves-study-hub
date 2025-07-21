import { useState } from 'react';

export const useUniversityPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const universitiesPerPage = 9;

  const resetPage = () => setCurrentPage(1);

  const getTotalPages = (totalCount: number) => {
    return Math.ceil(totalCount / universitiesPerPage);
  };

  const getQueryRange = () => {
    const from = (currentPage - 1) * universitiesPerPage;
    const to = from + universitiesPerPage - 1;
    return { from, to };
  };

  return {
    currentPage,
    setCurrentPage,
    resetPage,
    getTotalPages,
    getQueryRange,
    universitiesPerPage,
  };
};