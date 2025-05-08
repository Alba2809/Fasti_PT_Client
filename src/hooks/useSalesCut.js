import { useEffect, useState } from "react";
import { usePaginate } from "./usePaginate";
import { useForm } from "react-hook-form";
import { createSalesCutRequest, getSalesCutsRequest } from "../api/salesCut";
import { scrollToTop } from "../utils/DomFunctions";
import toast from "react-hot-toast";

// this hook manages the sales cuts functionality
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
  } = usePaginate(); // use the usePaginate hook to manage the pagination of the sales cuts
  const elementsToShow = 5;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    reset,
  } = useForm(); // use the useForm hook to manage the form state

  // get the sales cuts from the backend
  const getCuts = async () => {
    try {
      setLoadingGet(true);

      const resCuts = await getSalesCutsRequest();
      setCuts(resCuts.data);

      // update the pagination
      handlePaginate({
        items: resCuts.data,
        current: 1,
        elementsPP: elementsToShow,
      });

      // set the date to the current date
      setValue("date", new Date().toISOString().split("T")[0]);
    } catch (error) {
      // if there is an error, display the error messages
      const errors = error?.response?.data;
      if (errors) {
        errors.map((error) => toast.error(error));
      }
    } finally {
      setLoadingGet(false);
    }
  };

  // send the data of the form to the backend to create a new sales cut
  const createCut = handleSubmit(async (data) => {
    try {
      if (loadingCreate) return;

      setLoadingCreate(true);
      const res = await createSalesCutRequest(data);

      if (res?.statusText === "OK") {
        getCuts();
        reset();
        toast.success("Corte registrado exitosamente.");
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

  // set the shiftId to the selected shift
  const handleChangeShift = (e) => {
    setValue("shiftId", e.target.value);
    setSelectedShift(e.target.value);
  };

  // handle the elements per page change
  const handleElementsPerPageChange = (e) => {
    setLoadingGet(true);
    handlePaginate({
      items: cuts,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoadingGet(false);
  };

  // handle the page change
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

  // check if there are errors in the form and display them
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
