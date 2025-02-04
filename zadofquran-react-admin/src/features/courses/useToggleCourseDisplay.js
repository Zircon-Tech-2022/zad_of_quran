import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleDisplayCourse } from "../../services/apiCourse";
import { toast } from "react-hot-toast";

export function useToggleCourseDisplay() {
    const queryClient = useQueryClient();

    const { mutate: toggleCourse, isLoading: isToggling } = useMutation({
        mutationFn: ({ id, isActive }) =>
            toggleDisplayCourse(
                id,
                localStorage.getItem("token"),
                isActive
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["courses"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isToggling, toggleCourse };
}
