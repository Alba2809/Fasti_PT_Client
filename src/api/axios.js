import { VITE_BACKEND_URL } from "../config"
import axios from "axios";

// create an axios instance with the backend URL and withCredentials
const instance = axios.create({
  baseURL: `${VITE_BACKEND_URL}/api`,
  withCredentials: true,
});

export default instance;
