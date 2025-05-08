import axios from "./axios";

export const loginRequest = (user) => axios.post("/auth/login", user);

export const verifyTokenRequest = () => axios.post(`/auth/verify`);

export const getUserRequest = () => axios.get("/auth/user");

export const logoutRequest = () => axios.post("/auth/logout");