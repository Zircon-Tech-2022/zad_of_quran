import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteTestimoinal as deleteTestimoinalApi } from "../../services/apiTestimoinal";

export function useDeleteTestimoinal() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteTestimoinal } = useMutation({
        mutationFn: (id) => {
            return deleteTestimoinalApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["testimonials"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteTestimoinal };
}
