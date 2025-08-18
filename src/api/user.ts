import api from "./axios";
import { User } from "../types/user";

export const getCurrentUser = async (): Promise<User | null> => {
  const res = await api.get("/user/me");
  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/user/profile", data);
  return res.data;
};
