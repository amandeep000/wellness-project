import api from "./axios";
import { User } from "../types/user";

export const getCurrentUser = async (): Promise<User | null> => {
  try {
    const res = await api.get("/api/v1/user/me");
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
  return res.data;
};

export const updateAvatar = async (file: File) => {
  const formData = new FormData();
  formData.append("avatar", file);
  const res = await api.put("/api/v1/user/profile/avatar", formData, {
    withCredentials: true,
  });
  console.log("this is avatar:", res.data);
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
  try {
    const res = await api.delete(`/api/v1/addresses/${addressId}`);
    return res.data;
  } catch (error: any) {
    throw error;
  }
};
// export const deleteAddress = async (addressId: string) => {
//   const res = await api.delete(`/api/v1/addresses/${addressId}`);
//   return res.data;
// };

export const getAllAddresses = async () => {
  const res = await api.get("/api/v1/addresses");
  console.log("All addresses:", res.data);
  return res.data.data;
};
