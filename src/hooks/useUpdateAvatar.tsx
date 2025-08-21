import { updateAvatar } from "../api/user";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useUpdateAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateAvatar,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentUser"] });
    },
  });
}
