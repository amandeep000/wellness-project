import api from "./axios";
import { User } from "../types/user";
import { data } from "react-router-dom";

export const getCurrentUser = async (): Promise<User | null> => {
  const res = await api.get("/user/me");
  return res.data;
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/user/profile", data);
  return res.data.updatedUser;
};

export const updateAvatar = async (data: any) => {
  const res = await api.put("/profile/avatar", data);
  return res.data;
};

export const addAddress = async (data: any) => {
  const res = await api.post("/addresses", data);
  return res.data;
};

export const updateAddress = async (addressId: string, data: any) => {
  const res = await api.put(`addresses/:${addressId},data`);
  return res.data;
};

export const deleteAddress = async (addressId: string) => {
  const res = await api.delete("/addresses/:${addressId}");
  return res.data;
};
