import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings.js";
import { useParams } from "react-router";

export function useFetchBooking() {
  const { bookingId } = useParams(); // reading params from url
  const { data, isLoading } = useQuery({
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });
  return { data, isLoading };
}
