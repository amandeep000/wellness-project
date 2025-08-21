import { updateProfile } from "../api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProfile,
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(["currentUser"], updatedUser);
    },
  });
};

export default useUpdateProfile;
