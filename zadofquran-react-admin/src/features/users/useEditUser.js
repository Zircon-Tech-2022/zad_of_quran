import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUserApi } from "../../services/apiUsers";
import { toast } from "react-hot-toast";

export function useEditUser(setError) {
    const queryClient = useQueryClient();

    const { mutate: editUser, isLoading: isEditing } = useMutation({
        mutationFn: ({ newUserData, id }) =>
            updateUserApi(
                newUserData,
                id,
                localStorage.getItem("token"),
                setError
            ),
        onSuccess: () => {
            toast.success("تم التعديل بنجاح");
            queryClient.invalidateQueries({ queryKey: ["users"] });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isEditing, editUser };
}
