import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";

export function useSignup(setError) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { language } = useLangContext();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: (data) => signupApi(data, setError),
    onSuccess: (user) => {
      localStorage.setItem("token", user.data.token);
      queryClient.setQueryData(["user"], user.data.user);
      if (user.data.user.availabilities) {
        localStorage.setItem("user-type", "teacher");
        navigate(`/${language}/teacher`, { replace: true });
      } else {
        localStorage.removeItem("user-type");
        navigate(`/${language}`, { replace: true });
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { signup, isLoading };
}
