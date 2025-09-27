import axios from "axios";

const api = axios.create({
  baseURL: "https://wellness-backend-05kx.onrender.com",
  withCredentials: true,
});

export default api;
