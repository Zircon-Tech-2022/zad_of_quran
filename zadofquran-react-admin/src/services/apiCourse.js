import { API_URL } from "../../Constants";

export async function getCourseData({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/courses?q=${search}&page=${page}&limit=15`,
        {
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!res.ok) throw Error("حدث خطأ اثناء جلب البيانات");
    const data = await res.json();
    return data;
}

export async function updateCourseApi(courseData, id, token, setError) {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(courseData)) {
            if (key == "image" && value == null) {
                continue;
            }
            formData.append(key, value);
        }
        formData.append("_method", "patch");
        const res = await fetch(`${API_URL}admin/courses/${id}`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json();
            if (errorData.data) {
                for (const [key, value] of Object.entries(errorData?.data)) {
                    setError(key, value);
                }
            }

            throw new Error(errorData.message);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function createCourseApi(courseData, token, setError) {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(courseData)) {
            formData.append(key, value);
        }
        const res = await fetch(`${API_URL}admin/courses`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (!res.ok) {
            const errorData = await res.json();
            if (errorData.data) {
                for (const [key, value] of Object.entries(errorData?.data)) {
                    setError(key, value);
                }
            }

            throw new Error(errorData.message);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function deleteCourse(id, token) {
    const res = await fetch(`${API_URL}admin/courses/${id}`, {
        method: "DELETE",
        headers: {
            "accept-language": "ar",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw Error("حدث خطأ اثناء المسح ");
    const data = await res.json();
    return data;
}
