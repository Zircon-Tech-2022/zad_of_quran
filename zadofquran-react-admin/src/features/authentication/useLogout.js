import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { mutate: logout, isLoading } = useMutation({
        mutationFn: () => {
            logoutApi(localStorage.getItem("token"));
        },
        onSuccess: (data) => {
            localStorage.removeItem("token");
            queryClient.removeQueries();
            navigate("/login", { replace: true });
            toast.success("تم تسجيل الخروج بنجاح");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { logout, isLoading };
}
