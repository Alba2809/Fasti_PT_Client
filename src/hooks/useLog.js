import { useState } from "react";
import { usePaginate } from "./usePaginate";
import { getLogsRequest } from "../api/log";
import toast from "react-hot-toast";

export const useLog = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const elementsToShow = 5;
  const {
    currentPage,
    elementsPerPage,
    handlePaginate,
    paginatedItems: logsToShow,
  } = usePaginate();

  const getLogs = async () => {
    try {
      setLoading(true);

      const res = await getLogsRequest();

      setLogs(res.data);
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

  const handleElementsPerPageChange = (e) => {
    setLoading(true);
    handlePaginate({
      items: logs,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setLoading(true);

    handlePaginate({
      items: logs,
      current: page,
      elementsPP: elementsPerPage,
    });

    const table = document.getElementById("logsTable");
    table.scrollTop = 0;

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
