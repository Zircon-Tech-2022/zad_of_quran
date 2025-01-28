import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createTestimoinalApi } from "../../services/apiTestimoinal";

export function useCreateTestimoinal(setError) {
    const queryClient = useQueryClient();
    const { mutate: createTestimoinal, isLoading: isCreating } = useMutation({
        mutationFn: (testimoinalData) => {
            return createTestimoinalApi(
                testimoinalData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم الإضافة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["testimonials"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createTestimoinal };
}
// create function to add two numbers
