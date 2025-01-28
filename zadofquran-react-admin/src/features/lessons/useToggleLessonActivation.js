import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleDeactivateLesson } from "../../services/apiLessons";
import { toast } from "react-hot-toast";

export function useToggleLessonActivation() {
    const queryClient = useQueryClient();

    const { mutate: toggleLesson, isLoading: isToggling } = useMutation({
        mutationFn: ({ id, isActive }) =>
            toggleDeactivateLesson(
                id,
                localStorage.getItem("token"),
                isActive
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["lessons"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isToggling, toggleLesson };
}
