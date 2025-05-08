import axios from "./axios"

// define the path of the endpoint for the sales cuts

export const getSalesCutsRequest = () => axios.get("/salesCut");

export const createSalesCutRequest = (data) => axios.post("/salesCut", data);