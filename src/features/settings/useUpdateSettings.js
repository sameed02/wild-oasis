import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateSettings } from "../../services/apiSettings.js";

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  const { reset, getValues } = useForm();
  const { mutate: mutateUpdateSettings, isPending: isUpdating } = useMutation({
    mutationKey: ["settings"],
    mutationFn: async (updatedData) => await updateSettings({ ...updatedData }),
    onSuccess: () => {
      toast.success("Settings updated successfully ");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      reset(getValues());
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateUpdateSettings, isUpdating };
}
