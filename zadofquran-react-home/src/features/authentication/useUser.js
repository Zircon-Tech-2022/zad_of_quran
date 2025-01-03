import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useLangContext } from "../../context/LangContext";

export function useUser() {
  const { language } = useLangContext();
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
  return { isLoading, isAuth: user?.data, user };
}
