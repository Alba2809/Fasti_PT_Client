import { useEffect } from "react";
import { useLog } from "../hooks/useLog";
import { formatDateLong } from "../utils/Date";
import PaginationFooter from "../components/PaginationFooter";

function Logs() {
  // use the useLog hook to manage the logs functionality
  const {
    getLogs,
    logsToShow,
    currentPage,
    elementsPerPage,
    loading,
    totalLogs,
    handleElementsPerPageChange,
    handlePageChange,
  } = useLog();

  // get the logs when the component mounts
  useEffect(() => {
    getLogs();
  }, []);

  return (
    <article className="flex flex-col gap-y-5 size-full">
      <h2 className="text-xl">Historial de logs</h2>

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

      <section id="logsTable" className="w-full overflow-x-auto grow">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 min-w-max">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 min-w-[20px]">
                Clave
              </th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Usuario
              </th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Rol de usuario
              </th>
              <th scope="col" className="px-6 py-3 min-w-[300px]">
                Acción
              </th>
              <th scope="col" className="px-6 py-3 min-w-[150px]">
                Fecha de registro
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
              logsToShow?.map((item) => (
                <tr
                  key={item.id}
                  className="bg-white border-b border-gray-200 hover:bg-gray-100"
                >
                  <th scope="row" className="px-6 py-4">
                    {item.id}
                  </th>
                  <td className="px-6 py-4">{item.user.username}</td>
                  <td className="px-6 py-4">{item.user.role.name}</td>
                  <td className="px-6 py-4">{item.action}</td>
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
        totalItems={totalLogs}
        handlePageChange={handlePageChange}
      />
    </article>
  );
}

export default Logs;
