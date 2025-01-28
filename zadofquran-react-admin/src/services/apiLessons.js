import { API_URL } from "../../Constants";

export async function getLessons({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/lessons?q=${search}&page=${page}&limit=15`,
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

export async function getLessonData(id, token, timezone = null) {
    if (!id) return null;
    let endpoint = `${API_URL}admin/lessons/${id}`;

    if (timezone) {
        const query = timezone.replace('+', "%2B"); // replace + with %2B to avoid encoding issue
        endpoint += `?timezone_offset=${query}`;
    }

    const res = await fetch(
        endpoint,
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

export async function toggleDeactivateLesson(id, token, isActive) {
    const res = await fetch(`${API_URL}admin/lessons/${id}`, {
        method: "PUT",
        headers: {
            "accept-language": "ar",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ is_active: !isActive }),
    });

    if (!res.ok) throw Error("حدث خطأ اثناء التنشيط/إالغاء التنشيط ");
    const data = await res.json();
    return data;
}

export async function createLessonApi(teacherData, token, setError) {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(teacherData)) {
            formData.append(key, value);
        }
        const res = await fetch(`${API_URL}admin/lessons`, {
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

export async function updateLessonApi(teacherData, id, token, setError) {
    try {
        const formData = new FormData();
        //
        for (const [key, value] of Object.entries(teacherData)) {
            if (key == "image" && value == null) {
                continue;
            }
            formData.append(key, value);
        }
        formData.append("_method", "patch");
        const res = await fetch(`${API_URL}admin/lessons/${id}`, {
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

export async function deleteLesson(id, token) {
    const res = await fetch(`${API_URL}admin/lessons/${id}`, {
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
