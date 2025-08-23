import axios from "axios";

const api = axios.create({
  baseURL: "https://wellness-backend-production-9a55.up.railway.app",
  withCredentials: true,
});

export default api;
