import { useForm } from "react-hook-form";
import { createPurchaseRequest, getPurchasesRequest } from "../api/purchase";
import { usePaginate } from "./usePaginate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const usePurchase = () => {
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [purchases, setPurchases] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const {
    currentPage,
    elementsPerPage,
    handlePaginate,
    paginatedItems: purchasesToShow,
  } = usePaginate();
  const elementsToShow = 5;
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    setValue,
    reset
  } = useForm();

  const getPurchases = async () => {
    try {
      setLoadingGet(true);
      const res = await getPurchasesRequest();

      setPurchases(res.data);
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

  const createPurchase = handleSubmit(async (data) => {
    try {
      if (loadingCreate) return;

      setLoadingCreate(true);
      const res = await createPurchaseRequest(data);
      if (res?.statusText === "OK") {
        getPurchases();
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
      items: purchases,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoadingGet(false);
  };

  const handlePageChange = (page) => {
    setLoadingGet(true);
    handlePaginate({
      items: purchases,
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
    purchases,
    totalPurchases: purchases.length,
    purchasesToShow,
    getPurchases,
    loadingGet,
    loadingCreate,
    createPurchase,
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
