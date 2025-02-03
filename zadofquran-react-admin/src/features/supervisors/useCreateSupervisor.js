import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createSupervisorApi } from "../../services/apiSupervisor";

export function useCreateSupervisor(setError) {
    const queryClient = useQueryClient();
    const { mutate: createSupervisor, isLoading: isCreating } = useMutation({
        mutationFn: (supervisorData) => {
            return createSupervisorApi(
                supervisorData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم إضافة الدورة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["supervisors"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createSupervisor };
}
// create function to add two numbers
