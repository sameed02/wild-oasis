import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings.js";

export function useCheckOut() {
  const queryClient = useQueryClient();

  const { mutate: mutateCheckOut, isPending: isCheckingOut } = useMutation({
    mutationKey: ["booking"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked-out  `);
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateCheckOut, isCheckingOut };
}
