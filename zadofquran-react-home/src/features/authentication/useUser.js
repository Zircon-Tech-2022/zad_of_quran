import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../services/apiAuth";
import { useLangContext } from "../../context/LangContext";

export function useUser() {
    const { language } = useLangContext();
    const { isLoading, data: user } = useQuery({
        queryKey: ["user"],
        queryFn: () => {
            if (localStorage.getItem("token")) {
                return getCurrentUser(localStorage.getItem("token"));
            }
        },
        refetchOnReconnect: false,
        retry: 0,
        staleTime: 0,
        refetchOnWindowFocus: false,
    });
    console.log(user);
    return { isLoading, isAuth: user?.data ? true : false, user };
}
