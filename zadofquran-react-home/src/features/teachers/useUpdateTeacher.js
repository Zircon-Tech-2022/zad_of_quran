import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateProfile as updateProfileApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useLangContext } from "../../context/LangContext";

export function useUpdateTeacher(setError) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { language } = useLangContext();
  const { mutate: updateProfile, isLoading } = useMutation({
    mutationFn: (data) =>
      updateProfileApi(data, setError, localStorage.getItem("token")),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.data.user);
      navigate(`/${language}/teacher`, { replace: true });
    },
    onError: (err) => {
      if (err.response.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user-type");
        queryClient.setQueryData(["user"], null);
        navigate(`/${language}/teacher/login`, { replace: true });
      }

      toast.error(err.message);
    },
  });

  return { updateProfile, isLoading };
}
