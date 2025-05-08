import { useEffect } from "react";
import { useSalesCut } from "../hooks/useSalesCut";
import { useShift } from "../hooks/useShift";
import { formatDateLong } from "../utils/Date";

function SalesCut() {
  const { loading: loadingShifts, shifts, getShifts } = useShift();
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

  useEffect(() => {
    getCuts();
    getShifts();
  }, []);

  useEffect(() => {
    if (!loadingShifts) {
      setValue("shiftId", shifts[0]?.id);
    }
  }, [loadingShifts]);

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Cortes de ventas</h2>

      <section className="flex gap-x-3 items-center">
        <h3 className="text-lg">Realizar corte:</h3>
        <form onSubmit={createCut} className="flex gap-x-3">
          {loadingGetCuts ? (
            <p>Cargando...</p>
          ) : (
            <select
              {...register("shiftId", {
                required: "Se requiere el turno",
              })}
              value={selectedShift ?? shifts[0]?.id}
              onChange={handleChangeShift}
              className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
            >
              {shifts.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name} - {item.start_time} : {item.end_time}
                </option>
              ))}
            </select>
          )}

          <input
            type="date"
            placeholder="Fecha de ventas"
            {...register("date", {
              required: "Se requiere la fecha de ventas",
            })}
            className="rounded-md border border-gray-300 p-2 text-gray-500 focus:border-blue-500 focus:border-2 focus:outline-none"
          />

          <button
            className="rounded-md px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 text-lg"
            type="submit"
            disabled={loadingCreateCut}
          >
            Registrar
          </button>
        </form>
        <p></p>
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
                  <td className="px-6 py-4">{formatDateLong(item.date, false)}</td>
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
                (totalCuts > 0 ? 1 : 0)}
            </span>{" "}
            <span className="font-semibold">
              a{" "}
              {currentPage * elementsPerPage > totalCuts
                ? totalCuts
                : currentPage * elementsPerPage}
            </span>{" "}
            de <span className="font-semibold text-gray-900">{totalCuts}</span>{" "}
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
              disabled={currentPage === Math.ceil(totalCuts / elementsPerPage)}
            >
              Siguiente
            </button>
          </div>
        </div>
      </section>
    </article>
  );
}

export default SalesCut;
