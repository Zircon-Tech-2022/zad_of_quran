import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateLessonApi } from "../../services/apiLessons";
import { toast } from "react-hot-toast";

export function useEditLesson(setError) {
    const queryClient = useQueryClient();

    const { mutate: editLesson, isLoading: isEditing } = useMutation({
        mutationFn: ({ newLessonData, id }) =>
            updateLessonApi(
                newLessonData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["lessons"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editLesson };
}
