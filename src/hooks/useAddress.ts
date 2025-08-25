import {
  addAddress,
  updateAddress,
  deleteAddress,
  getAllAddresses,
} from "../api/user";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";

// Get all addresses hook
export function useGetAddresses() {
  return useQuery({
    queryKey: ["addresses"],
    queryFn: getAllAddresses,
  });
}

// Add address hook
export function useAddAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: (newAddress) => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// Update address hook
export function useUpdateAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      addressId,
      addressData,
    }: {
      addressId: string;
      addressData: any;
    }) => updateAddress(addressId, addressData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// Delete address hook
export function useDeleteAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (addressId: string) => deleteAddress(addressId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["addresses"] });
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
