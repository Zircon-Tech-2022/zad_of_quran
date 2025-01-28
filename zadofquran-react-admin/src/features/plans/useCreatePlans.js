import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createPlansApi } from "../../services/apiPlans";

export function useCreatePlans(setError) {
    const queryClient = useQueryClient();
    const { mutate: createPlans, isLoading: isCreating } = useMutation({
        mutationFn: (plansData) => {
            return createPlansApi(
                plansData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم الإضافة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["plans"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createPlans };
}
// create function to add two numbers
