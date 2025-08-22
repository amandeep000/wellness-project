import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";
import { login, logout, signup } from "../api/auth";
import { User } from "../types/user";

export function useAuth({ enabled = true } = {}) {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: async () => {
      try {
        const user = await getCurrentUser();
        return user;
      } catch (err: any) {
        if (err.response?.status === 401) return null;
        throw err;
      }
    },
    retry: false,
    staleTime: 7 * 60 * 1000,
    enabled, // conditionally skip if first-time visitor
  });
}

export const useLogin = () => {
  return useMutation({ mutationFn: login });
};

export const useSignup = () => {
  return useMutation({ mutationFn: signup });
};

export const useLogout = () => {
  return useMutation({ mutationFn: logout });
};
