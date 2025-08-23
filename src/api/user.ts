import api from "./axios";
import { User } from "../types/user";

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await api.get("/api/v1/user/me");
    console.log(
      "This is getCurrentUser endpoint and currentUser is: ",
      res.data
    );
    return res.data.data.currentUser;
  } catch (error: any) {
    if (error.response?.status === 401) {
      return null;
    }
    throw error;
  }
};

export const updateProfile = async (data: any) => {
  const res = await api.put("/api/v1/user/profile", data);
  console.log("this is profile image data ", res.data);
  return res.data;
};

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await api.put("/api/v1/user/profile/avatar", formData, {
    withCredentials: true,
  });
  console.log("this is the avatar data", res.data.currentUser.avatar);
  return res.data;
};

export const addAddress = async (data: any) => {
  const res = await api.post("/api/v1/addresses", data);
  return res.data;
};

export const updateAddress = async (addressId: string, data: any) => {
  const res = await api.put(`/api/v1/addresses/${addressId}`, data);
  return res.data;
};

export const deleteAddress = async (addressId: string) => {
  const res = await api.delete(`/api/v1/addresses/${addressId}`);
  return res.data;
};
