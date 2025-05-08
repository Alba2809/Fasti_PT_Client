import axios from "./axios";

export const getPurchasesRequest = () => axios.get("/purchase");

export const createPurchaseRequest = (data) => axios.post("/purchase", data);