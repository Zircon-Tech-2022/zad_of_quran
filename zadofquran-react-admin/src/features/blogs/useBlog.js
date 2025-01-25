import { useQuery } from "@tanstack/react-query";
import { getBlogData } from "../../services/apiBlog";
import { useSearchParams } from "react-router-dom";

export function useBlog() {
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
        queryKey: ["blogs", search, page],
        queryFn: () =>
            getBlogData({ search, page }, localStorage.getItem("token")),
    });
    return { isLoading, error, data };
}
