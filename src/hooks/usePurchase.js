import { useForm } from "react-hook-form";
import { createPurchaseRequest, getPurchasesRequest } from "../api/purchase";
import { usePaginate } from "./usePaginate";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { scrollToTop } from "../utils/DomFunctions";

// this hook manages the purchases functionality
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
  } = useForm(); // use the useForm hook to manage the form state

  // get the purchases from the backend
  const getPurchases = async () => {
    try {
      setLoadingGet(true);
      const res = await getPurchasesRequest();

      setPurchases(res.data);

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

  // send the data of the form to the backend to create a new purchase
  const createPurchase = handleSubmit(async (data) => {
    try {
      if (loadingCreate) return;

      setLoadingCreate(true);
      const res = await createPurchaseRequest(data);
      if (res?.statusText === "OK") {
        getPurchases();
        setValue("amount", "");
        toast.success("Compra registrada exitosamente.");
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

  // set the productId to the selected product and the cost to the product's purchase cost
  const handleChangeProduct = (value, product) => {
    setValue("productId", value);
    setSelectedProduct(value);
    setValue("amount", "");
    setValue("cost", +product.purchase_cost);
  };

  // handle the elements per page change
  const handleElementsPerPageChange = (e) => {
    setLoadingGet(true);
    handlePaginate({
      items: purchases,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoadingGet(false);
  };

  // handle the page change
  const handlePageChange = (page) => {
    setLoadingGet(true);
    handlePaginate({
      items: purchases,
      current: page,
      elementsPP: elementsPerPage,
    });

    scrollToTop("purchasesTable");

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
