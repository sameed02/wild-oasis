import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateCabin } from "../../services/apiCabins.js";

export function useUpdateCabin(editId, onClose) {
  let hasNewImage = false;
  const queryClient = useQueryClient();
  const { reset, getValues } = useForm();
  const { mutate: mutateUpdateCabin, isPending: isUpdating } = useMutation({
    mutationKey: ["cabin"],
    mutationFn: async (updatedData) => {
      if (updatedData.image instanceof FileList) {
        console.log("image is updated by user");
        hasNewImage = true;
        await updateCabin(
          { ...updatedData, image: updatedData.image.item(0) },
          hasNewImage,
          editId
        );
      } else {
        console.log("image is not updated by user");
        hasNewImage = false;
        await updateCabin(updatedData, hasNewImage, editId);
      }
    },
    onSuccess: () => {
      toast.success("Cabin updated successfully ");
      queryClient.invalidateQueries({ queryKey: ["cabins"] });
      reset(getValues());
      onClose();
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateUpdateCabin, isUpdating };
}
