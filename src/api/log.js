import axios from "./axios";

// define the path of the endpoint for the logs

export const getLogsRequest = () => axios.get("/log");