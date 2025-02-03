import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
export function useLogin(setError) {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const { mutate: login, isLoading } = useMutation({
        mutationFn: ({ email, password }) =>
            loginApi({ email, password }, setError),
        onSuccess: (user) => {
            localStorage.setItem("token", user.data.token);
            localStorage.setItem("permissions", JSON.stringify(user.data.user.permissions));
            queryClient.setQueryData(["user"], user.user);
            navigate("/users", { replace: true });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { login, isLoading };
}
