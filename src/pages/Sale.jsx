import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSale } from "../hooks/useSale";
import { formatDateLong } from "../utils/Date";

function Sale() {
  const { loading: loadingProducts, products, getProducts } = useProduct();
  const {
    createSale,
    loadingGET: loadingGetSales,
    loadingCREATE: loadingCreateSale,
    getSales,

    register,
    setValue,
    getValues,
    selectedProduct,
    handleChangeProduct,

    salesToShow,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
    totalSales,
  } = useSale();

  useEffect(() => {
    getProducts();
    getSales();
  }, []);

  useEffect(() => {
    if (!loadingProducts) {
      setValue("productId", products[0]?.id);
    }
  }, [loadingProducts]);

  const handleChangeAmount = (e) => {
    const value = !e.target.value || e.target.value === "" ? 0 : e.target.value;
    const total = parseInt(value);
    const product = products.find(
      (product) => product.id === +getValues("productId")
    );
    console.log(value, total, product, getValues("productId"));
    setValue("total", total * (product?.sale_cost ?? 0));
  };

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Ventas</h2>

      <section className="flex gap-x-3 items-center">
        <h3 className="text-lg">Registrar venta:</h3>
        <form onSubmit={createSale} className="flex gap-x-3">
          {loadingProducts ? (
            <p>Cargando...</p>
          ) : (
            <select
              {...register("productId", {
                required: "Se requiere el producto",
              })}
              value={selectedProduct ?? products[0]?.id}
              onChange={handleChangeProduct}
              className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
            >
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
          )}

          <input
            type="number"
            placeholder="Cantidad"
            {...register("amount", {
              required: "Se requiere la cantidad",
              min: {
                value: 1,
                message: "La cantidad no puede ser menor a 1",
              },
            })}
            onChange={handleChangeAmount}
            className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
          />

          <input
            type="number"
            placeholder="Total"
            {...register("total")}
            className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none disabled:bg-gray-200"
            disabled
          />

          <button
            className="rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-lg"
            type="submit"
            disabled={loadingCreateSale}
          >
            Registrar
          </button>
        </form>
      </section>

      <section className="flex gap-x-5 items-center">
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

      <section id="salesTable" className="w-full overflow-x-auto grow">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-w-max">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Clave
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                Realizado por:
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                Rol de usuario
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Clave producto
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                Producto
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Cantidad
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Total
              </th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Fecha de registro
              </th>
            </tr>
          </thead>
          <tbody>
            {loadingGetSales ? (
              <tr className="bg-white border-b border-gray-200">
                <td colSpan="7" className="p-2">
                  Cargando...
                </td>
              </tr>
            ) : (
              salesToShow?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <th scope="row" className="px-6 py-4">
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.user.username}</td>
                  <td className="px-6 py-4">{item.user.role.name}</td>
                  <td className="px-6 py-4">{item.product.id}</td>
                  <td className="px-6 py-4">{item.product.name}</td>
                  <td className="px-6 py-4">{item.amount}</td>
                  <td className="px-6 py-4">{item.total}</td>
                  <td className="px-6 py-4">
                    {formatDateLong(item.createdAt)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      <section className="flex gap-x-5 items-center">
        <div className="flex flex-col items-center w-full">
          <span className="text-sm text-gray-700">
            Mostrando de{" "}
            <span className="font-semibold text-gray-900">
              {currentPage * elementsPerPage -
                elementsPerPage +
                (totalSales > 0 ? 1 : 0)}
            </span>{" "}
            <span className="font-semibold">
              a{" "}
              {currentPage * elementsPerPage > totalSales
                ? totalSales
                : currentPage * elementsPerPage}
            </span>{" "}
            de <span className="font-semibold text-gray-900">{totalSales}</span>{" "}
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
              disabled={currentPage === Math.ceil(totalSales / elementsPerPage)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Sale;
