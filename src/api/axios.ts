import axios from "axios";

const baseURL =
  import.meta.env.MODE === "development"
    ? "http://localhost:7000"
    : "https://wellness-backend-05kx.onrender.com";
const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
});

export default api;
