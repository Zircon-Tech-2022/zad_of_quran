import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteTeacher as deleteTeacherApi } from "../../services/apiTeacher";

export function useDeleteTeacher() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteTeacher } = useMutation({
        mutationFn: (id) => {
            return deleteTeacherApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["teachers"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteTeacher };
}
