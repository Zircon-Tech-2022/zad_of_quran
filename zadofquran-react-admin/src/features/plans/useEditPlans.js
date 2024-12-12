import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updatePlansApi } from "../../services/apiPlans";
import { toast } from "react-hot-toast";

export function useEditPlans(setError) {
    const queryClient = useQueryClient();

    const { mutate: editPlans, isLoading: isEditing } = useMutation({
        mutationFn: ({ newPlansData, id }) =>
            updatePlansApi(
                newPlansData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["plans"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editPlans };
}
