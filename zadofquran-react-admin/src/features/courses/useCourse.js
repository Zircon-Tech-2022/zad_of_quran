import { useQuery } from "@tanstack/react-query";
import { getCourseData } from "../../services/apiCourse";
import { useSearchParams } from "react-router-dom";

export function useCourse() {
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
        queryKey: ["courses", search, page],
        queryFn: () =>
            getCourseData({ search, page }, localStorage.getItem("token")),
    });
    return { isLoading, error, data };
}
