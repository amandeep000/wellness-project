import { getAllOrders, updateProfile } from "../api/user";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Order from "../types/orders";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
    },
  });
};

export const useGetUserOrders = () => {
  return useQuery<Order[]>({
    queryKey: ["userOrders"],
    queryFn: getAllOrders,
    staleTime: 3 * 60 * 1000,
  });
};
export default useUpdateProfile;
