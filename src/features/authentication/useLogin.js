import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../services/apiAuth.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: mutateLogin, isPending: isLogging } = useMutation({
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });
  return { mutateLogin, isLogging };
}
