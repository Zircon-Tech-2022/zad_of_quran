import { useQuery } from "@tanstack/react-query";
import { getFaqData } from "../../services/apiFaq";
import { useSearchParams } from "react-router-dom";

export function useFaq() {
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
        queryKey: ["faqs", search, page],
        queryFn: () =>
            getFaqData({ search, page }, localStorage.getItem("token")),
    });

    return { isLoading, error, data };
}
