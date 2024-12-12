import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteFaq as deleteFaqApi } from "../../services/apiFaq";

export function useDeleteFaq() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteFaq } = useMutation({
        mutationFn: (id) => {
            return deleteFaqApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["faqs"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteFaq };
}
