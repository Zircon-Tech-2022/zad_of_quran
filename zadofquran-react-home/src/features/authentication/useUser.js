import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useLangContext } from "../../context/LangContext";
import toast from "react-hot-toast";

export function useUser() {
  const { language } = useLangContext();
  const queryClient = useQueryClient();
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (token) {
        return await getCurrentUser(token); // Ensure this function returns data
      }
      return null; // Explicitly return a value when no token exists
    },
    refetchOnReconnect: false,
    retry: 0,
    staleTime: 0,
    refetchOnWindowFocus: false,
  });

  const { mutate: updateTimezone, isUpdateTimezoneLoading } = useMutation({
    mutationFn: (timezone) => getCurrentUser(localStorage.getItem("token"), timezone),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });
  return {
    isLoading,
    isAuth: user?.data,
    user,
    updateTimezone,
    isUpdateTimezoneLoading,
  };
}
