import { useState } from "react";
import { getProductsRequest } from "../api/product";
import toast from "react-hot-toast";
import { usePaginate } from "./usePaginate";
import { scrollToTop } from "../utils/DomFunctions";

// this hook manages the products functionality
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
  } = usePaginate(); // use the usePaginate hook to manage the pagination of the products

  const getProducts = async () => {
    try {
      setLoading(true);
      setSearch("");

      const res = await getProductsRequest(); // get the products from the backend

      setProducts(res.data);

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
      setLoading(false);
    }
  };

  // handle the search input change
  const handleSearch = (e) => {
    setLoading(true);

    const input = e.target.value.toLowerCase();
    setSearch(input);

    // if the input is empty, reset the pagination
    if (!input) {
      handlePaginate({
        items: products,
        current: 1,
        elementsPP: elementsToShow,
      });
      return setLoading(false);
    }

    // filter the products by the input
    const newProducts = products.filter((product) =>
      product.name.toLowerCase().includes(input)
    );

    console.log(newProducts);

    // update the pagination
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

  // handle the elements per page change
  const handleElementsPerPageChange = (e) => {
    setLoading(true);
    handlePaginate({
      items: products,
      current: 1,
      elementsPP: e.target.value,
    });
    setLoading(false);
  };

  // handle the page change
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
    search,
  };
};
