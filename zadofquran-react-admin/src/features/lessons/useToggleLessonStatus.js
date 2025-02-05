import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLessonStatus } from "../../services/apiLessons";
import { toast } from "react-hot-toast";

export function useToggleLessonStatus() {
    const queryClient = useQueryClient();

    const { mutate: toggleLesson, isLoading: isToggling } = useMutation({
        mutationFn: ({ id, currentStatus }) =>
            toggleLessonStatus(
                id,
                localStorage.getItem("token"),
                currentStatus
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["lessons"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isToggling, toggleLesson };
}
