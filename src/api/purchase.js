import axios from "./axios";

// define the path of the endpoint for the purchases

export const getPurchasesRequest = () => axios.get("/purchase");

export const createPurchaseRequest = (data) => axios.post("/purchase", data);