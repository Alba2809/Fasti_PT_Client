import axios from "./axios";

export const getLogsRequest = () => axios.get("/log");