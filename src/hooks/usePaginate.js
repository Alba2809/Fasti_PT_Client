import { useState } from "react";

export const usePaginate = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [elementsPerPage, setElementsPerPage] = useState(null);

  const [paginatedItems, setPaginatedItems] = useState([]);

  const getIndexes = (current, elements) => {
    const startIndex = (current - 1) * elements;
    const endIndex = startIndex + elements;

    return {
      startIndex,
      endIndex,
    };
  };

  const handlePaginate = ({ items, current, elementsPP }) => {
    setCurrentPage(Number(current));
    setElementsPerPage(Number(elementsPP));

    const { startIndex, endIndex } = getIndexes(Number(current), Number(elementsPP));

    setPaginatedItems(items.slice(startIndex, endIndex));
  };

  return {
    paginatedItems,
    currentPage,
    elementsPerPage,
    handlePaginate,
  };
};
