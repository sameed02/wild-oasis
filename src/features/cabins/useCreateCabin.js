import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useCreateCabin(onClose) {
  const { reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate: mutateCreateCabin, isPending: isCreating } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: (data) => createCabin({ ...data, image: data.image.item(0) }),
    onSuccess: () => {
      toast.success("New cabin successfully created");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset();
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateCreateCabin, isCreating };
}
