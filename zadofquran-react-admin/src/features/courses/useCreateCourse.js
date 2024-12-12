import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createCourseApi } from "../../services/apiCourse";

export function useCreateCourse(setError) {
    const queryClient = useQueryClient();
    const { mutate: createCourse, isLoading: isCreating } = useMutation({
        mutationFn: (courseData) => {
            return createCourseApi(
                courseData,
                localStorage.getItem("token"),
                setError
            );
        },

        onSuccess: () => {
            toast.success("تم اضافة الدورة بنجاح");
            queryClient.invalidateQueries({
                queryKey: ["courses"],
            });
        },
        onError: (err) => {
            toast.error(err.message);
        },
    });
    return { isCreating, createCourse };
}
// create function to add two numbers
