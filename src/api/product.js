import axios from "./axios";

// define the path of the endpoint for the products

export const getProductsRequest = () => axios.get("/product");