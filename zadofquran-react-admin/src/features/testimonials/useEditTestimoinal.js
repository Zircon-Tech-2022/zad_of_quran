import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTestimoinalApi } from "../../services/apiTestimoinal";
import { toast } from "react-hot-toast";

export function useEditTestimoinal(setError) {
    const queryClient = useQueryClient();

    const { mutate: editTestimoinal, isLoading: isEditing } = useMutation({
        mutationFn: ({ newTestimoinalData, id }) =>
            updateTestimoinalApi(
                newTestimoinalData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["testimonials"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editTestimoinal };
}
