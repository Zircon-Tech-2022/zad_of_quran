import { API_URL } from "../Constants";
import { lessonStatus } from "../statusConstants";

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

export async function toggleLessonStatus(id, token, currentStatus) {
    const res = await fetch(`${API_URL}admin/lessons/${id}`, {
        method: "PUT",
        headers: {
            "accept-language": "ar",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: currentStatus === lessonStatus.waiting.value ? lessonStatus.confirmed.value : lessonStatus.waiting.value }),
    });

    if (!res.ok) throw Error("حدث خطأ اثناء تغيير الحالة ");
    const data = await res.json();
    return data;
}

export async function createLessonApi(teacherData, token, setError) {
    try {
        const res = await fetch(`${API_URL}admin/lessons`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(teacherData),
        });

        const data = await res.json();

        if (!res.ok) {
            if (data?.data) {
                Object.entries(data.data).forEach(([key, value]) => {
                    setError(key, value);
                });
            }
            throw new Error(data.message);
        }

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function updateLessonApi(teacherData, id, token, setError) {
    try {
        const res = await fetch(`${API_URL}admin/lessons/${id}`, {
            method: "PUT",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(teacherData),
        });

        const data = await res.json();

        if (!res.ok) {
            if (data?.data) {
                Object.entries(data.data).forEach(([key, value]) => {
                    setError(key, value);
                });
            }
            throw new Error(data.message);
        }

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
