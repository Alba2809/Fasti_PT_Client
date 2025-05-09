import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { formatDateLong } from "../utils/Date";
import { IoMdRefresh } from "react-icons/io";
import PaginationFooter from "../components/PaginationFooter";

function Product() {
  // use the useProduct hook to manage the products functionality
  const {
    productsToShow,
    totalProducts,
    getProducts,
    loading,
    handleSearch,
    currentPage,
    elementsPerPage,
    handlePageChange,
    search,
    handleElementsPerPageChange,
  } = useProduct();

  // get the products when the component mounts
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Productos</h2>

      <section className="flex gap-x-5 items-center">
        <h3 className="text-lg">Buscar producto:</h3>
        <input
          type="text"
          value={search}
          placeholder="Nombre de producto"
          className="w-full max-w-[300px] rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
          onChange={handleSearch}
        />
        <button
          className="rounded-full hover:bg-gray-100 text-white text-lg"
          onClick={getProducts}
        >
          <IoMdRefresh color="green" size="2.5em" />
        </button>
      </section>

      <hr className="border-gray-300 border-dashed" />

      <section id="productsTable" className="flex gap-x-5 items-center">
        <label className="text-sm text-gray-700">
          Mostrar{" "}
          <select
            value={elementsPerPage ?? 5}
            onChange={handleElementsPerPageChange}
            className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>{" "}
          elementos por página
        </label>
      </section>

      <section className="w-full overflow-x-auto grow">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-w-max">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Clave
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                Nombre
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Piezas existentes
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                Fecha de registro
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Entradas
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Salidas
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Costo de compra
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Precio de venta
              </th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr className="bg-white border-b border-gray-200">
                <td colSpan="7" className="p-2">
                  Cargando...
                </td>
              </tr>
            ) : (
              productsToShow?.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <th scope="row" className="px-6 py-4">
                    {product.id}
                  </th>
                  <td className="px-6 py-4">{product.name}</td>
                  <td className="px-6 py-4">{product.current_stock}</td>
                  <td className="px-6 py-4">
                    {formatDateLong(product.createdAt)}
                  </td>
                  <td className="px-6 py-4">{product.entrances}</td>
                  <td className="px-6 py-4">{product.exits}</td>
                  <td className="px-6 py-4">{product.purchase_cost}</td>
                  <td className="px-6 py-4">{product.sale_cost}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <PaginationFooter
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalItems={totalProducts}
        handlePageChange={handlePageChange}
      />
      
    </article>
  );
}

export default Product;
