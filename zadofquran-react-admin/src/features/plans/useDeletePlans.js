import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deletePlans as deletePlansApi } from "../../services/apiPlans";

export function useDeletePlans() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deletePlans } = useMutation({
        mutationFn: (id) => {
            return deletePlansApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["plans"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deletePlans };
}
