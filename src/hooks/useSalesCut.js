import { useEffect, useState } from "react";
import { usePaginate } from "./usePaginate";
import { useForm } from "react-hook-form";
import { createSalesCutRequest, getSalesCutsRequest } from "../api/salesCut";
import toast from "react-hot-toast";

export const useSalesCut = () => {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [cuts, setCuts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const {
    currentPage,
    elementsPerPage,
    handlePaginate,
    paginatedItems: cutsToShow,
  } = usePaginate();
  const elementsToShow = 5;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    reset,
  } = useForm();
  const [warning, setWarning] = useState(null);

  const getCuts = async () => {
    try {
      setLoadingGet(true);

      const resCuts = await getSalesCutsRequest();
      setCuts(resCuts.data);

      handlePaginate({
        items: resCuts.data,
        current: 1,
        elementsPP: elementsToShow,
      });

      setValue("date", new Date().toISOString().split("T")[0]);
    } catch (error) {
      const errors = error?.response?.data;
      if (errors) {
        errors.map((error) => toast.error(error));
      }
    } finally {
      setLoadingGet(false);
    }
  };

  const createCut = handleSubmit(async (data) => {
    try {
      if (loadingCreate) return;

      setLoadingCreate(true);
      const res = await createSalesCutRequest(data);

      if (res?.statusText === "OK") {
        getCuts();
        reset();
      }
    } catch (error) {
      const errors = error?.response?.data;
      if (errors) {
        errors.map((error) => toast.error(error));
      }
    } finally {
      setLoadingCreate(false);
    }
  });

  const handleChangeShift = (e) => {
    setValue("shiftId", e.target.value);
    setSelectedShift(e.target.value);
  };

  const handleElementsPerPageChange = (e) => {
    setLoadingGet(true);
    handlePaginate({
      items: cuts,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoadingGet(false);
  };

  const handlePageChange = (page) => {
    setLoadingGet(true);
    handlePaginate({
      items: cuts,
      current: page,
      elementsPP: elementsPerPage,
    });

    scrollToTop("cutsTable");

    setLoadingGet(false);
  };

  const scrollToTop = (name) => {
    const table = document.getElementById(name);
    table.scrollTop = 0;
  };

  useEffect(() => {
    const errorsArray = Object.values(formErrors);
    if (errorsArray.length > 0) {
      errorsArray.forEach((error) => toast.error(error.message));
    }
  }, [formErrors]);

  return {
    cuts,
    totalCuts: cuts.length,
    cutsToShow,
    getCuts,
    loadingGet,
    loadingCreate,
    createCut,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
    register,
    setValue,
    formErrors,
    selectedShift,
    handleChangeShift,
  };
};
