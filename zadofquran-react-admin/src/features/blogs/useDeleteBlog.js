import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteBlog as deleteBlogApi } from "../../services/apiBlog";

export function useDeleteBlog() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteBlog } = useMutation({
        mutationFn: (id) => {
            return deleteBlogApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["blogs"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteBlog };
}
