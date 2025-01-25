import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getTeacherData } from "../../services/apiTeacher";
import toast from "react-hot-toast";

export function useTeacherShow(id, timezone) {
  // QUERY
  const { isLoading, data: user } = useQuery({
    queryKey: ["teacher", id, timezone],
    queryFn: () => getTeacherData(id, localStorage.getItem("token"), timezone),
  });

  // MUTATION
  const queryClient = useQueryClient();
  const { mutate: updateTimezone, isUpdateTimezoneLoading } = useMutation({
    mutationFn: (id, timezone) =>
      getTeacherData(id, localStorage.getItem("token"), timezone),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user);
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return {
    isLoading,
    user,
    updateTimezone,
    isUpdateTimezoneLoading,
  };
}
