import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateCourseApi } from "../../services/apiCourse";
import { toast } from "react-hot-toast";

export function useEditCourse(setError) {
    const queryClient = useQueryClient();

    const { mutate: editCourse, isLoading: isEditing } = useMutation({
        mutationFn: ({ newCourseData, id }) =>
            updateCourseApi(
                newCourseData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editCourse };
}
