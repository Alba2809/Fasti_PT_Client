import axios from "./axios"

export const getSalesRequest = () => axios.get("/sale");

export const createSaleRequest = (data) => axios.post("/sale", data);