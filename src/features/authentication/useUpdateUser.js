import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth.js";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { reset, getValues } = useForm();
  const { mutate: mutateUpdateUser, isPending: isUpdating } = useMutation({
    mutationKey: ["user"],
    mutationFn: (updatedUserData) => updateCurrentUser(updatedUserData),
    onSuccess: () => {
      toast.success("User account successfully updated ");
      queryClient.invalidateQueries({ active: true });
      reset(getValues());
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateUpdateUser, isUpdating };
}
