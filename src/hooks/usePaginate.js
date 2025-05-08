import { useState } from "react";

// this hook manages the pagination of the items in the table
export const usePaginate = () => {
  const [currentPage, setCurrentPage] = useState(null);
  const [elementsPerPage, setElementsPerPage] = useState(null);

  const [paginatedItems, setPaginatedItems] = useState([]);

  // get the indexes of the items to show in the table based on the current page and elements per page
  const getIndexes = (current, elements) => {
    const startIndex = (current - 1) * elements;
    const endIndex = startIndex + elements;

    return {
      startIndex,
      endIndex,
    };
  };

  //handle the pagination of the items in the table based on the current page and elements per page
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
