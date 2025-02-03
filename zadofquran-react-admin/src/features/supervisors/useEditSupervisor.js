import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSupervisorApi } from "../../services/apiSupervisor";
import { toast } from "react-hot-toast";

export function useEditSupervisor(setError) {
    const queryClient = useQueryClient();

    const { mutate: editSupervisor, isLoading: isEditing } = useMutation({
        mutationFn: ({ newSupervisorData, id }) =>
            updateSupervisorApi(
                newSupervisorData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["supervisors"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editSupervisor };
}
