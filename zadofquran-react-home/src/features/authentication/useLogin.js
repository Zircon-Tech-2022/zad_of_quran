import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";

export function useLogin(setError) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { language } = useLangContext();
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password, type }) =>
      loginApi({ email, password, type }, setError),
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

  return { login, isLoading };
}
