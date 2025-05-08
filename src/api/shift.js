import axios from "./axios";

// define the path of the endpoint for the shifts

export const getShiftsRequest = () => axios.get("/shift");