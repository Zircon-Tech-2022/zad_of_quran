import { useQuery } from "@tanstack/react-query";
import { getSupervisorsData } from "../../services/apiSupervisor";
import { useSearchParams } from "react-router-dom";

export function useSupervisor() {
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
        queryKey: ["supervisors", search, page],
        queryFn: () =>
            getSupervisorsData({ search, page }, localStorage.getItem("token")),
    });
    return { isLoading, error, data };
}
