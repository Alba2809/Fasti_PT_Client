import { useEffect } from "react";
import { useProduct } from "../hooks/useProduct";
import { usePurchase } from "../hooks/usePurchase";
import { formatDateLong } from "../utils/Date";
import PaginationFooter from "../components/PaginationFooter";

function Purchase() {
  // use the useProduct hook to manage the products functionality
  const { loading: loadingProducts, products, getProducts } = useProduct();
  // use the usePurchase hook to manage the purchases functionality
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

  // get the products and purchases when the component mounts
  useEffect(() => {
    getProducts();
    getPurchases();
  }, []);

  // set the productId to the first product when the products are loaded
  useEffect(() => {
    if (!loadingProducts) {
      setValue("productId", products[0]?.id);
      const prod = products.find((product) => product.id === +products[0]?.id);
      setValue("cost", prod?.purchase_cost);
    }
  }, [loadingProducts]);

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Compras</h2>

      <section className="flex flex-col gap-y-3">
        <h3 className="text-lg">Registrar compra</h3>
        <form onSubmit={createPurchase} className="flex gap-x-3 items-end">
          {loadingProducts ? (
            <p className="h-[66px]">Cargando productos...</p>
          ) : (
            <>
              <div className="flex flex-col">
                <label className="text-md">Producto:</label>
                <select
                  {...register("productId", {
                    required: "Se requiere el producto",
                  })}
                  value={selectedProduct ?? products[0]?.id}
                  onChange={(e) =>
                    handleChangeProduct(
                      +e.target.value,
                      products.find((product) => product.id === +e.target.value)
                    )
                  }
                  className="min-w-[150px] min-h-[42px] rounded-md border p-2 text-gray-500 focus:border-2 focus:outline-none border-gray-300 focus:border-blue-500"
                >
                  {products.map((product) => (
                    <option key={product.id} value={+product.id}>
                      {product.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-md">Cantidad:</label>
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
                  className="rounded-md border p-2 text-gray-500 focus:border-2 focus:outline-none border-gray-300 focus:border-blue-500"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-md">Costo por unidad:</label>
                <input
                  type="number"
                  step={0.01}
                  placeholder="Costo por unidad"
                  {...register("cost", {
                    required: "Se requiere el costo",
                    min: {
                      value: 1,
                      message: "El costo no puede ser menor a 1",
                    },
                  })}
                  className="rounded-md border p-2 text-gray-500 focus:border-2 focus:outline-none border-gray-300 focus:border-blue-500"
                />
              </div>

              <button
                className="rounded-md px-3 py-2 bg-[#4675c1] hover:bg-[#7ba5e0] text-white text-lg h-fit transition duration-300 ease-in-out"
                type="submit"
                disabled={loadingCreatePurchase}
              >
                Registrar
              </button>
            </>
          )}
        </form>
      </section>

      <hr className="border-gray-300 border-dashed" />

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

      <section id="purchasesTable" className="w-full overflow-x-auto grow">
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

      <PaginationFooter
        currentPage={currentPage}
        elementsPerPage={elementsPerPage}
        totalItems={totalPurchases}
        handlePageChange={handlePageChange}
      />
    </article>
  );
}

export default Purchase;
