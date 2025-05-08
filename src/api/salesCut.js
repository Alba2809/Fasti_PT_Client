import axios from "./axios"

export const getSalesCutsRequest = () => axios.get("/salesCut");

export const createSalesCutRequest = (data) => axios.post("/salesCut", data);