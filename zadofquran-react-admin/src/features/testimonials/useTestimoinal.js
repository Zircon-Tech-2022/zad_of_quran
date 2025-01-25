import { useQuery } from "@tanstack/react-query";
import { getTestimoinalData } from "../../services/apiTestimoinal";
import { useSearchParams } from "react-router-dom";

export function useTestimoinal() {
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
        queryKey: ["testimonials", search, page],
        queryFn: () =>
            getTestimoinalData({ search, page }, localStorage.getItem("token")),
    });

    return { isLoading, error, data };
}
