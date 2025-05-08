import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { usePurchase } from "../hooks/usePurchase";
import { formatDateLong } from "../utils/Date";

function Purchase() {
  const { loading: loadingProducts, products, getProducts } = useProduct();
  const {
    getPurchases,
    createPurchase,
    loadingGET: loadingGetPurchase,
    loadingCREATE: loadingCreatePurchase,
    totalPurchases,
    
    register,
    setValue,
    selectedProduct,
    handleChangeProduct,

    purchasesToShow,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
  } = usePurchase();

  useEffect(() => {
    getProducts();
    getPurchases();
  }, []);

  useEffect(() => {
    if (loadingProducts) {
      setValue("productId", products[0]?.id);
    }
  }, [loadingProducts]);

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Compras</h2>

      <section className="flex gap-x-3 items-center">
        <h3 className="text-lg">Registrar compra:</h3>
        <form onSubmit={createPurchase} className="flex gap-x-3">
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
              validate: (value) =>
                Number.isInteger(Number(value)) ||
                "La cantidad debe ser un número entero",
            })}
            className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
          />

          <input
            type="number"
            step={0.01}
            placeholder="Costo"
            {...register("cost", {
              required: "Se requiere el costo",
              min: {
                value: 1,
                message: "El costo no puede ser menor a 1",
              },
            })}
            className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
          />

          <button
            className="rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-lg"
            type="submit"
            disabled={loadingCreatePurchase}
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

      <section className="w-full overflow-x-auto grow">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-w-max">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Clave
              </th>
              <th scope="col" className="px-6 py-3 min-w-[200px]">
                Usuario
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
                Costo
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
            {loadingGetPurchase ? (
              <tr className="bg-white border-b border-gray-200">
                <td colSpan="7" className="p-2">
                  Cargando...
                </td>
              </tr>
            ) : (
              purchasesToShow?.map((item) => (
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
                  <td className="px-6 py-4">{item.cost}</td>
                  <td className="px-6 py-4">{item.cost * item.amount}</td>
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
                (totalPurchases > 0 ? 1 : 0)}
            </span>{" "}
            <span className="font-semibold">
              a{" "}
              {currentPage * elementsPerPage > totalPurchases
                ? totalPurchases
                : currentPage * elementsPerPage}
            </span>{" "}
            de{" "}
            <span className="font-semibold text-gray-900">
              {totalPurchases}
            </span>{" "}
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
                currentPage === Math.ceil(totalPurchases / elementsPerPage)
              }
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default Purchase;
