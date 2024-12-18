import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteUser as deleteUserApi } from "../../services/apiUsers";

export function useDeleteUser() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteUser } = useMutation({
        mutationFn: (id) => {
            return deleteUserApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["users"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteUser };
}
