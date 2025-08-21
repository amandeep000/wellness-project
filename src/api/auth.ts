import api from "./axios.ts";

export const login = async (data: { email: string; password: string }) => {
  const res = await api.post("/api/v1/auth/login", data);
  return res.data;
};

export const signup = async (data: {
  fullname: string;
  email: string;
  password: string;
}) => {
  const res = await api.post("/api/v1/auth/register", data);
  return res.data;
};
export const logout = async () => {
  const res = await api.post("/api/v1/auth/logout");
  return res.data;
};
