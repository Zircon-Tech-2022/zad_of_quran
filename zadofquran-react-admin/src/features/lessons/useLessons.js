import { useQuery } from "@tanstack/react-query";
import { getLessons } from "../../services/apiLessons";
import { useSearchParams } from "react-router-dom";

export function useLessons() {
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
        queryKey: ["lessons", search, page],
        queryFn: () =>
            getLessons({ search, page }, localStorage.getItem("token")),
    });

    return { isLoading, error, data };
}
