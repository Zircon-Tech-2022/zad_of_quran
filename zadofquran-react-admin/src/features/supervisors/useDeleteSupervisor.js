import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSupervisor as deleteSupervisorApi } from "../../services/apiSupervisor";

export function useDeleteSupervisor() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteSupervisor } = useMutation({
        mutationFn: (id) => {
            return deleteSupervisorApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["supervisors"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteSupervisor };
}
