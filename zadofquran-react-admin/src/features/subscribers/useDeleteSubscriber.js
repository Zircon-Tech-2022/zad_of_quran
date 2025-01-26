import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteSubscriber as deleteSubscriberApi } from "../../services/apiSubscribers";

export function useDeleteSubscriber() {
    const queryClient = useQueryClient();

    const { isLoading: isDeleting, mutate: deleteSubscriber } = useMutation({
        mutationFn: (id) => {
            return deleteSubscriberApi(id, localStorage.getItem("token"));
        },
        onSuccess: () => {
            toast.success("تم المسح بنجاح");

            queryClient.invalidateQueries({
                queryKey: ["subscribers"],
            });
        },
        onError: (err) => toast.error(err.message),
    });

    return { isDeleting, deleteSubscriber };
}
