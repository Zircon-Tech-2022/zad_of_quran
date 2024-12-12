import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteCourse as deleteCourseApi } from "../../services/apiCourse";

export function useDeleteCourse() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteCourse } = useMutation({
        mutationFn: (id) => {
            return deleteCourseApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteCourse };
}
