import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createBlogApi } from "../../services/apiBlog";

export function useCreateBlog(setError) {
    const queryClient = useQueryClient();
    const { mutate: createBlog, isLoading: isCreating } = useMutation({
        mutationFn: (blogData) => {
            return createBlogApi(
                blogData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم اضافة تدوينة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["blogs"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createBlog };
}
// create function to add two numbers
