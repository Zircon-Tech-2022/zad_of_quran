import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createUserApi } from "../../services/apiUsers";

export function useCreateUser(setError) {
    const queryClient = useQueryClient();
    const { mutate: createUser, isLoading: isCreating } = useMutation({
        mutationFn: (userData) => {
            return createUserApi(
                userData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم اضافة الطالب بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createUser };
}
// create function to add two numbers
