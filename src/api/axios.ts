import axios from "axios";

const api = axios.create({
  // baseURL: "https://wellness-backend-05kx.onrender.com",
  baseURL: "http://localhost:7000/",
  withCredentials: true,
});

export default api;
