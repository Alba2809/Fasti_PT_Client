import axios from "./axios";

export const getShiftsRequest = () => axios.get("/shift");