import toast from "react-hot-toast";
import { logout } from "../../services/apiAuth.js";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateLogout, isPending: isLoggingOut } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("Logged out");
      queryClient.removeQueries();
      navigate("/login", { replace: true });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });
  return { mutateLogout, isLoggingOut };
}
