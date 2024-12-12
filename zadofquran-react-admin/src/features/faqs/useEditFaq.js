import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateFaqApi } from "../../services/apiFaq";
import { toast } from "react-hot-toast";

export function useEditFaq(setError) {
    const queryClient = useQueryClient();

    const { mutate: editFaq, isLoading: isEditing } = useMutation({
        mutationFn: ({ newFaqData, id }) =>
            updateFaqApi(
                newFaqData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["faqs"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editFaq };
}
