import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";

export function useUser() {
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => getCurrentUser(localStorage.getItem("token")),
        refetchOnReconnect: false,
        retry: 0,
        staleTime: Infinity,
        refetchOnWindowFocus: false,
    });

    return { isLoading, isAuth: user ? true : false };
}
