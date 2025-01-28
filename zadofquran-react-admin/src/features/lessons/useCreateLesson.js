import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createLessonApi } from "../../services/apiLessons";

export function useCreateLesson(setError) {
    const queryClient = useQueryClient();
    const { mutate: createLesson, isLoading: isCreating } = useMutation({
        mutationFn: (lessonsData) => {
            return createLessonApi(
                lessonsData,
                localStorage.getItem("token"),
                setError
            );
        },
        onSuccess: () => {
            toast.success("تم الإضافة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["lessons"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createLesson };
}
