import axios from "axios";

const api = axios.create({
  baseURL: "https://wellness-backend-production-9a55.up.railway.app",
  withCredentials: true,
});

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, success: boolean = false) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      // Case 1: try refresh if user *might* have a refresh token
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => api(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await api.post("/auth/refresh-token", {}, { withCredentials: true });
        processQueue(null, true);
        return api(originalRequest); // retry the failed request
      } catch (refreshError: any) {
        processQueue(refreshError, false);

        // Case 2: no refresh token / first-time visitor
        // 👉 Just reject, don't force redirect
        // Your route guard can decide when to show login page
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
