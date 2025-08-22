import api from "./axios";
import { User } from "../types/user";

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await api.get("/api/v1/user/me", { withCredentials: true });
    return res.data;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/api/v1/user/profile", data);
  return res.data.updatedUser;
};

export const updateAvatar = async (data: any) => {
  const res = await api.put("/api/v1/profile/avatar", data);
  return res.data;
};

export const addAddress = async (data: any) => {
  const res = await api.post("/api/v1/addresses", data);
  return res.data;
};

export const updateAddress = async (addressId: string, data: any) => {
  const res = await api.put(`/api/v1/addresses/:${addressId},data`);
  return res.data;
};

export const deleteAddress = async (addressId: string) => {
  const res = await api.delete("/api/v1/addresses/:${addressId}");
  return res.data;
};
