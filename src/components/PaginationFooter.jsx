// this component displays the pagination footer and controls the pagination of the table
function PaginationFooter({
  currentPage,
  elementsPerPage,
  totalItems,
  handlePageChange,
}) {
  return (
    <section className="flex gap-x-5 items-center">
      <div className="flex flex-col items-center w-full">
        <span className="text-sm text-gray-700">
          Mostrando de{" "}
          <span className="font-semibold text-gray-900">
            {currentPage * elementsPerPage -
              elementsPerPage +
              (totalItems > 0 ? 1 : 0)}
          </span>{" "}
          <span className="font-semibold">
            a{" "}
            {currentPage * elementsPerPage > totalItems
              ? totalItems
              : currentPage * elementsPerPage}
          </span>{" "}
          de{" "}
          <span className="font-semibold text-gray-900">{totalItems}</span>{" "}
          elementos
        </span>
        <div className="inline-flex mt-2 xs:mt-0">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 rounded-s hover:bg-blue-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-blue-700 border-0 border-s border-gray-500 rounded-e hover:bg-blue-900 disabled:bg-blue-800 disabled:cursor-not-allowed"
            disabled={
              currentPage === Math.ceil(totalItems / elementsPerPage)
            }
          >
            Siguiente
          </button>
        </div>
      </div>
    </section>
  );
}

export default PaginationFooter;
