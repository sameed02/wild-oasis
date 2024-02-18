import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateBooking } from "../../services/apiBookings.js";
import { useNavigate } from "react-router";

export function useCheckIn() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateCheckIn, isPending: isCheckingIn } = useMutation({
    mutationKey: ["booking"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-in", isPaid: true }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked-In  `);
      queryClient.invalidateQueries({ active: true });
      navigate("/");
    },
    onError: (err) => toast.error(err.message),
  });

  return { mutateCheckIn, isCheckingIn };
}
