import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { deleteLesson as deleteLessonApi } from "../../services/apiLessons";

export function useDeleteLesson() {
  const queryClient = useQueryClient();

  const { isLoading: isDeleting, mutate: deleteLesson } = useMutation({
    mutationFn: (id) => {
      return deleteLessonApi(id, localStorage.getItem("token"));
    },
    onSuccess: () => {
      toast.success("تم المسح بنجاح");

      queryClient.invalidateQueries({
        queryKey: ["lessons"],
      });
    },
    onError: (err) => toast.error(err.message),
  });

  return { isDeleting, deleteLesson };
}
