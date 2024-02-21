import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth.js";

export function useFetchUser() {
  const { data: currentUser, isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
  });
  return {
    currentUser,
    isLoading,
    isAuthenticated: currentUser?.role === "authenticated",
  };
}
