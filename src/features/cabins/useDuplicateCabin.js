import { useMutation, useQueryClient } from "@tanstack/react-query";
import { duplicateCabin } from "../../services/apiCabins.js";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

export function useDuplicateCabin() {
  const { reset } = useForm();
  const queryClient = useQueryClient();

  const { mutate: mutateDuplicateCabin, isPending: isDuplicating } =
    useMutation({
      mutationKey: ["cabin"],
      mutationFn: async (data) => await duplicateCabin(data),
      onSuccess: () => {
        toast.success("Cabin duplicated successfully ");
        queryClient.invalidateQueries({ queryKey: ["cabins"] });
        reset();
      },
      onError: (err) => toast.error(err.message),
    });

  return { mutateDuplicateCabin, isDuplicating };
}
