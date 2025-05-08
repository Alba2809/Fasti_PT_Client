import { useState } from "react";
import { getProductsRequest } from "../api/product";
import toast from "react-hot-toast";
import { usePaginate } from "./usePaginate";

export const useProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const elementsToShow = 5;
  const {
    currentPage,
    elementsPerPage,
    handlePaginate,
    paginatedItems: productsToShow,
  } = usePaginate();

  const getProducts = async () => {
    try {
      setLoading(true);
      setSearch("");

      const res = await getProductsRequest();

      setProducts(res.data);
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

  const handleSearch = (e) => {
    setLoading(true);

    const input = e.target.value.toLowerCase();
    setSearch(input);

    if (!input) {
      handlePaginate({
        items: products,
        current: 1,
        elementsPP: elementsToShow,
      });
      return setLoading(false);
    }

    const newProducts = products.filter((product) =>
      product.name.toLowerCase().includes(input)
    );

    console.log(newProducts);

    handlePaginate({
      items: newProducts,
      current: 1,
      elementsPP:
        newProducts.length < elementsPerPage
          ? newProducts.length
          : elementsPerPage,
    });

    setLoading(false);
  };

  const handleElementsPerPageChange = (e) => {
    setLoading(true);
    handlePaginate({
      items: products,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoading(false);
  };

  const handlePageChange = (page) => {
    setLoading(true);
    handlePaginate({
      items: products,
      current: page,
      elementsPP: elementsPerPage,
    });

    scrollToTop("productsTable");

    setLoading(false);
  };

  const scrollToTop = (name) => {
    const table = document.getElementById(name);
    table.scrollTop = 0;
  }

  return {
    products,
    productsToShow,
    getProducts,
    loading,
    handleSearch,
    currentPage,
    elementsPerPage,
    handleElementsPerPageChange,
    handlePageChange,
    totalProducts: products.length,
    search
  };
};
