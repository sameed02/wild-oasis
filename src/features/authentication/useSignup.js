import { useMutation } from "@tanstack/react-query";
import { signUp } from "../../services/apiAuth.js";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: mutateSignup, isPending: isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signUp({ fullName, email, password }),
    onSuccess: (user) => {
      console.log(user);
      toast.success(
        "Account successfully created! An email has been sent to your given email address for verification."
      );
    },
    onError: (err) => {
      toast.error(err.message || "An error occurred during registration");
    },
  });
  return { mutateSignup, isLoading };
}
