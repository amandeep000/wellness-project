import { addAddress, updateAddress, deleteAddress } from "../api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useAddAddress() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addAddress,
    onSuccess: (newAddress) => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}

// export function useUpdateAddress() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: ({id,data}:{id:string,data:any})=>updateAddress(),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["currentUser"] });
//     },
//   });
// }
