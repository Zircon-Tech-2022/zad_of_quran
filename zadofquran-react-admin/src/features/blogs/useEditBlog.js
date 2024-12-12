import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBlogApi } from "../../services/apiBlog";
import { toast } from "react-hot-toast";

export function useEditBlog(setError) {
    const queryClient = useQueryClient();

    const { mutate: editBlog, isLoading: isEditing } = useMutation({
        mutationFn: ({ newBlogData, id }) =>
            updateBlogApi(
                newBlogData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["blogs"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editBlog };
}
