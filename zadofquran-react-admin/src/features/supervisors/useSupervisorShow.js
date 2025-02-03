import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getSupervisorData } from "../../services/apiSupervisor";
import toast from "react-hot-toast";

export function useSupervisorShow(id, timezone) {
  // QUERY
  const { isLoading, data: user } = useQuery({
    queryKey: ["supervisor", id, timezone],
    queryFn: () => getSupervisorData(id, localStorage.getItem("token"), timezone),
  });

  // MUTATION
  const queryClient = useQueryClient();
  const { mutate: updateTimezone, isUpdateTimezoneLoading } = useMutation({
    mutationFn: ({ id, timezone }) =>
      getSupervisorData(id, localStorage.getItem("token"), timezone),
    onSuccess: (user) => {
      queryClient.setQueryData(["supervisor", id, timezone], user);
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
