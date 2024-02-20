import { useMutation } from "@tanstack/react-query";
import { login } from "../../services/apiAuth.js";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: mutateLogin, isPending: isLogging } = useMutation({
    mutationKey: "",
    mutationFn: ({ email, password }) => login({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard");
    },
    onError: (err) => {
      toast.error(`${err.message}`);
    },
  });
  return { mutateLogin, isLogging };
}
