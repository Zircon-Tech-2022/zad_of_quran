import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getPlansData } from "../../services/apiPlans";
import { useSearchParams } from "react-router-dom";

export function usePlans() {
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
        queryKey: ["plans", search, page],
        queryFn: () =>
            getPlansData({ search, page }, localStorage.getItem("token")),
    });

    return { isLoading, error, data };
}
