import { useForm } from "react-hook-form";
import { usePaginate } from "./usePaginate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createSaleRequest, getSalesRequest } from "../api/sale";
import { scrollToTop } from "../utils/DomFunctions";

// this hook manages the sales functionality
export const useSale = () => {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [sales, setSales] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    currentPage,
    elementsPerPage,
    handlePaginate,
    paginatedItems: salesToShow,
  } = usePaginate(); // use the usePaginate hook to manage the pagination of the sales
  const elementsToShow = 5;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    getValues
  } = useForm();

  // get the sales from the backend
  const getSales = async () => {
    try {
      setLoadingGet(true);
      const res = await getSalesRequest();

      setSales(res.data);

      // update the pagination
      handlePaginate({
        items: res.data,
        current: 1,
        elementsPP: elementsToShow,
      });
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

  // send the data of the form to the backend to create a new sale
  const createSale = handleSubmit(async (data) => {
    try {
      if (loadingCreate) return;

      setLoadingCreate(true);
      const res = await createSaleRequest(data);
      if (res?.statusText === "OK") {
        getSales(); // refresh the sales
        setValue("amount", "");
        setValue("total", "");
        toast.success("Venta registrada exitosamente.");
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

  // set the productId to the selected product
  const handleChangeProduct = (e) => {
    setValue("productId", e.target.value);
    setSelectedProduct(e.target.value);

    // reset the amount and total
    setValue("amount", "");
    setValue("total", "");
  };

  // handle the elements per page change 
  const handleElementsPerPageChange = (e) => {
    setLoadingGet(true);
    handlePaginate({
      items: sales,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoadingGet(false);
  };

  // handle the page change 
  const handlePageChange = (page) => {
    setLoadingGet(true);
    handlePaginate({
      items: sales,
      current: page,
      elementsPP: elementsPerPage,
    });

    scrollToTop("salesTable");

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
    sales,
    totalSales: sales.length,
    salesToShow,
    getSales,
    loadingGet,
    loadingCreate,
    createSale,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
    register,
    setValue,
    getValues,
    formErrors,
    selectedProduct,
    handleChangeProduct,
  };
};
