import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTeacherApi } from "../../services/apiTeacher";
import { toast } from "react-hot-toast";

export function useEditTeacher(setError) {
    const queryClient = useQueryClient();

    const { mutate: editTeacher, isLoading: isEditing } = useMutation({
        mutationFn: ({ newTeacherData, id }) =>
            updateTeacherApi(
                newTeacherData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editTeacher };
}
