import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleDisplayTeacher } from "../../services/apiTeacher";
import { toast } from "react-hot-toast";

export function useToggleTeacherDisplay() {
    const queryClient = useQueryClient();

    const { mutate: toggleTeacher, isLoading: isToggling } = useMutation({
        mutationFn: ({ id, isActive }) =>
            toggleDisplayTeacher(
                id,
                localStorage.getItem("token"),
                isActive
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["teachers"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isToggling, toggleTeacher };
}
