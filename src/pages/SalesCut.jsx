import { useEffect } from "react";
import { useSalesCut } from "../hooks/useSalesCut";
import { useShift } from "../hooks/useShift";
import { formatDateLong } from "../utils/Date";
import PaginationFooter from "../components/PaginationFooter";

function SalesCut() {
  // use the useShift hook to manage the shifts functionality
  const { loading: loadingShifts, shifts, getShifts } = useShift();
  // use the useSalesCut hook to manage the sales cuts functionality
  const {
    createCut,
    loadingGET: loadingGetCuts,
    loadingCREATE: loadingCreateCut,
    getCuts,

    register,
    setValue,
    selectedShift,
    handleChangeShift,

    cutsToShow,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
    totalCuts,
  } = useSalesCut();

  // get the shifts and sales cuts when the component mounts
  useEffect(() => {
    getCuts();
    getShifts();
  }, []);

  // set the shiftId to the first shift when the shifts are loaded
  useEffect(() => {
    if (!loadingShifts) {
      setValue("shiftId", shifts[0]?.id);
    }
  }, [loadingShifts]);

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Cortes de ventas</h2>

      <section className="flex flex-col gap-y-3">
        <h3 className="text-lg">Realizar corte</h3>
        <form onSubmit={createCut} className="flex gap-x-3 items-end">
          {loadingGetCuts ? (
            <p className="h-[66px]">Cargando cortes...</p>
          ) : (
            <>
              <div className="flex flex-col">
                <label className="text-md">Turno:</label>
                <select
                  {...register("shiftId", {
                    required: "Se requiere el turno",
                  })}
                  value={selectedShift ?? shifts[0]?.id}
                  onChange={handleChangeShift}
                  className="min-h-[42px] rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
                >
                  {shifts.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.name} - {item.start_time} : {item.end_time}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label className="text-md">Fecha de ventas:</label>
                <input
                  type="date"
                  placeholder="Fecha de ventas"
                  {...register("date", {
                    required: "Se requiere la fecha de ventas",
                  })}
                  className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
                />
              </div>

              <button
                className="rounded-md px-3 py-2 bg-[#4675c1] hover:bg-[#7ba5e0] text-white text-lg h-fit transition duration-300 ease-in-out"
                type="submit"
                disabled={loadingCreateCut}
              >
                Registrar
              </button>
            </>
          )}
        </form>
        <p></p>
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
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Turno
              </th>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Total
              </th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Fecha de corte
              </th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Fecha de registro
              </th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {loadingGetCuts ? (
              <tr className="bg-white border-b border-gray-200">
                <td colSpan="7" className="p-2">
                  Cargando...
                </td>
              </tr>
            ) : (
              cutsToShow?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <th scope="row" className="px-6 py-4">
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.user.username}</td>
                  <td className="px-6 py-4">{item.user.role.name}</td>
                  <td className="px-6 py-4">{item.shift.name}</td>
                  <td className="px-6 py-4">{item.totalSold ?? 0}</td>
                  <td className="px-6 py-4">
                    {formatDateLong(item.date, false)}
                  </td>
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
        totalItems={totalCuts}
        handlePageChange={handlePageChange}
      />
    </article>
  );
}

export default SalesCut;
