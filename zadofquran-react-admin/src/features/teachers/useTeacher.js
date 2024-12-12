import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTeacherData } from "../../services/apiTeacher";
import { useSearchParams } from "react-router-dom";

export function useTeacher() {
    const [searchParams] = useSearchParams();

    // search
    const searchValue = searchParams.get("q");
    const search = !searchValue || searchValue === "" ? "" : searchValue;

    // PAGINATION
    const page = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    // QUERY
    const { isLoading, data, error } = useQuery({
        queryKey: ["teachers", search, page],
        queryFn: () =>
            getTeacherData({ search, page }, localStorage.getItem("token")),
    });

    return { isLoading, error, data };
}
