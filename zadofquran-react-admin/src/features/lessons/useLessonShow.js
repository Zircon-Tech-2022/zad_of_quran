import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getLessonData } from "../../services/apiLessons";
import toast from "react-hot-toast";

export function useLessonShow(id, timezone) {
    // QUERY
    const { isLoading, data: lesson } = useQuery({
        queryKey: ["lesson", id, timezone],
        queryFn: () => getLessonData(id, localStorage.getItem("token"), timezone),
    });

    // MUTATION
    const queryClient = useQueryClient();
    const { mutate: updateTimezone, isUpdateTimezoneLoading } = useMutation({
        mutationFn: ({ id, timezone }) =>
            getLessonData(id, localStorage.getItem("token"), timezone),
        onSuccess: (lesson) => {
            queryClient.setQueryData(["lesson", id, timezone], lesson);
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });

    return {
        isLoading,
        lesson,
        updateTimezone,
        isUpdateTimezoneLoading,
    };
}
