import { useQuery } from "@tanstack/react-query";
import { getSubscribers } from "../../services/apiSubscribers";
import { useSearchParams } from "react-router-dom";

export function useSubscriber() {
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
        queryKey: ["subscribers", search, page],
        queryFn: () =>
            getSubscribers({ search, page }, localStorage.getItem("token")),
    });

    // MUTATION
    // match

    return { isLoading, error, data };
}
