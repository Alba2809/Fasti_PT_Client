import { useForm } from "react-hook-form";
import { usePaginate } from "./usePaginate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { createSaleRequest, getSalesRequest } from "../api/sale";

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
  } = usePaginate();
  const elementsToShow = 5;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    reset,
  } = useForm();

  const getSales = async () => {
    try {
      setLoadingGet(true);
      const res = await getSalesRequest();

      setSales(res.data);
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
      setLoadingGet(false);
    }
  };

  const createSale = handleSubmit(async (data) => {
    try {
      if (loadingCreate) return;

      setLoadingCreate(true);
      const res = await createSaleRequest(data);
      if (res?.statusText === "OK") {
        getSales();
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

  const handleChangeProduct = (e) => {
    setValue("productId", e.target.value);
    setSelectedProduct(e.target.value);
  };

  const handleElementsPerPageChange = (e) => {
    setLoadingGet(true);
    handlePaginate({
      items: sales,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoadingGet(false);
  };

  const handlePageChange = (page) => {
    setLoadingGet(true);
    handlePaginate({
      items: sales,
      current: page,
      elementsPP: elementsPerPage,
    });
    setLoadingGet(false);
  };

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
    formErrors,
    selectedProduct,
    handleChangeProduct,
  };
};
