import axios from "./axios"

// define the path of the endpoint for the sales

export const getSalesRequest = () => axios.get("/sale");

export const createSaleRequest = (data) => axios.post("/sale", data);