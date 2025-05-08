import { useState } from "react";
import { usePaginate } from "./usePaginate";
import { getLogsRequest } from "../api/log";
import { scrollToTop } from "../utils/DomFunctions";
import toast from "react-hot-toast";

// this hook manages the logs functionality
export const useLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const elementsToShow = 5;
  const {
    currentPage,
    elementsPerPage,
    handlePaginate,
    paginatedItems: logsToShow,
  } = usePaginate(); // use the usePaginate hook to manage the pagination of the logs

  // get the logs from the backend
  const getLogs = async () => {
    try {
      setLoading(true);

      const res = await getLogsRequest();

      setLogs(res.data);

      // update the pagination
      handlePaginate({
        items: res.data,
        current: 1,
        elementsPP: elementsToShow,
      });
    } catch (error) {
      const errors = error?.response?.data;
      if (errors) {
        errors.map((error) => toast.error(error));
      }
    } finally {
      setLoading(false);
    }
  };

  // handle the elements per page change
  const handleElementsPerPageChange = (e) => {
    setLoading(true);
    handlePaginate({
      items: logs,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoading(false);
  };

  // handle the page change
  const handlePageChange = (page) => {
    setLoading(true);

    handlePaginate({
      items: logs,
      current: page,
      elementsPP: elementsPerPage,
    });

    scrollToTop("logsTable"); // scroll to the top of the table

    setLoading(false);
  };

  return {
    logs,
    totalLogs: logs.length,
    getLogs,
    loading,
    logsToShow,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
  };
};
