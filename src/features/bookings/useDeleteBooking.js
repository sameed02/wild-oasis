import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteBooking } from "../../services/apiBookings.js";

export function useDeleteBooking() {
  const { mutate: mutateDeleteBooking, isPending: isDeleting } = useMutation({
    mutationKey: ["booking"],
    mutationFn: (id) => deleteBooking(id),
    onSuccess: () => {
      toast.success("Booking successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateDeleteBooking, isDeleting };
}
