import { useState, useEffect } from 'react';

export const useCoursePagination = (coursesPerPage: number = 9) => {
  const [currentPage, setCurrentPage] = useState(1);

  const resetPage = () => {
    setCurrentPage(1);
  };

  const getTotalPages = (totalCount: number) => {
    return Math.ceil(totalCount / coursesPerPage);
  };

  const getPaginationRange = (from: number, to: number) => {
    return { from, to };
  };

  const getQueryRange = () => {
    const from = (currentPage - 1) * coursesPerPage;
    const to = from + coursesPerPage - 1;
    return { from, to };
  };

  return {
    currentPage,
    setCurrentPage,
    resetPage,
    getTotalPages,
    getPaginationRange,
    getQueryRange,
    coursesPerPage
  };
};