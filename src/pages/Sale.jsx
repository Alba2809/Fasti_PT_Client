import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { useSale } from "../hooks/useSale";
import { formatDateLong } from "../utils/Date";
import PaginationFooter from "../components/PaginationFooter";

function Sale() {
  // use the useProduct hook to manage the products functionality
  const { loading: loadingProducts, products, getProducts } = useProduct();
  // use the useSale hook to manage the sales functionality
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

  // get the products and sales when the component mounts
  useEffect(() => {
    getProducts();
    getSales();
  }, []);

  // set the productId to the first product when the products are loaded
  useEffect(() => {
    if (!loadingProducts) {
      setValue("productId", products[0]?.id);
    }
  }, [loadingProducts]);

  // set the total amount based on the amount and the product's sale cost
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

      <PaginationFooter
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalItems={totalSales}
        handlePageChange={handlePageChange}
      />
      
    </article>
  );
}

export default Sale;
