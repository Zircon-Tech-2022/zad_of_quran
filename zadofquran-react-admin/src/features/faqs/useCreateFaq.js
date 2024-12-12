import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createFaqApi } from "../../services/apiFaq";

export function useCreateFaq(setError) {
    const queryClient = useQueryClient();
    const { mutate: createFaq, isLoading: isCreating } = useMutation({
        mutationFn: (faqData) => {
            return createFaqApi(
                faqData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم الاضافة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["faqs"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createFaq };
}
// create function to add two numbers
