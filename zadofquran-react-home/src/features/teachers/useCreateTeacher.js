import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
// import { createEditTeacherApi } from "../../services/apiTeacher";

export function useCreateTeacher() {
    const queryClient = useQueryClient();
    const { mutate: createTeacher, isLoading: isCreating } = useMutation({
        // mutationFn: createEditTeacherApi,

        onSuccess: () => {
            toast.success("تم إضافة المعلم بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["teachers"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createTeacher };
}
// create function to add two numbers
