import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";
import { login, logout, signup } from "../api/auth";
import { User } from "../types/user";

export function useAuth() {
  return useQuery<User | null>({
    queryKey: ["currentUser"],
    queryFn: getCurrentUser,
    retry: false,
    staleTime: 7 * 60 * 1000,
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
