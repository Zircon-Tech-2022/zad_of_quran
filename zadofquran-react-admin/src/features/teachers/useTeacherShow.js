import { useQuery } from "@tanstack/react-query";
import { getTeacherData } from "../../services/apiTeacher";

export function useTeacherShow(id) {
  // QUERY
  const { isLoading, data, error } = useQuery({
    queryKey: ["teacher", id],
    queryFn: () => getTeacherData(id, localStorage.getItem("token")),
  });

  return { isLoading, error, data };
}
