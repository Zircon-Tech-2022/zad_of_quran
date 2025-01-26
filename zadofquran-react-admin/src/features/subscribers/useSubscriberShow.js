import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSubscriberData } from "../../services/apiSubscribers";
import toast from "react-hot-toast";

export function useSubscriberShow(id, timezone) {
  // QUERY
  const { isLoading, data: user } = useQuery({
    queryKey: ["subscriber", id, timezone],
    queryFn: () =>
      getSubscriberData(id, localStorage.getItem("token"), timezone),
  });

  // MUTATION
  const queryClient = useQueryClient();
  const { mutate: updateTimezone, isUpdateTimezoneLoading } = useMutation({
    mutationFn: ({ id, timezone }) =>
      getSubscriberData(id, localStorage.getItem("token"), timezone),
    onSuccess: (user) => {
      queryClient.setQueryData(["subscriber", id, timezone], user);
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
