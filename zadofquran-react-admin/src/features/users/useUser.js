import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getUserData } from "../../services/apiUsers";
import { useSearchParams } from "react-router-dom";

export function useUser() {
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
        queryKey: ["users", search, page],
        queryFn: () =>
            getUserData({ search, page }, localStorage.getItem("token")),
    });

    return { isLoading, error, data };
}
