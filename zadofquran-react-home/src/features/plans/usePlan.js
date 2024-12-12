import { useMutation } from "@tanstack/react-query";
import { plan as planApi } from "../../services/apiPlan";
import { toast } from "react-hot-toast";
export function usePlan(setError) {
    const { mutate: plan, isLoading } = useMutation({
        mutationFn: (data) =>
            planApi(data, setError, localStorage.getItem("token")),
        onSuccess: (user) => {
            toast.success("تم الاشتراك بنجاح");
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return { plan, isLoading };
}
