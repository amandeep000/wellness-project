import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api/user";
import { login, logout, signup } from "../api/auth";
import { User } from "../types/user";
import { useQueryClient } from "@tanstack/react-query";
import { updateProfile, updateAvatar } from "../api/user";

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

// Profile mutations
export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
  });
};

export const useUpdateAvatar = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["currentUser"] }),
  });
};
