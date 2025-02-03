import { API_URL } from "../Constants";

export async function getSupervisorsData({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/supervisors?q=${search}&page=${page}&limit=15`,
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

export async function getSupervisorData(id, token, timezone = null) {
    if (!id) return null;
    let endpoint = `${API_URL}admin/supervisors/${id}`;

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

export async function updateSupervisorApi(supervisorData, id, token, setError) {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(supervisorData)) {
            if (key === "image" && value == null) {
                continue;
            }
            formData.append(key, value);
        }
        formData.append("_method", "patch");
        const res = await fetch(`${API_URL}admin/supervisors/${id}`, {
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
export async function createSupervisorApi(supervisorData, token, setError) {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(supervisorData)) {
            formData.append(key, value);
        }
        const res = await fetch(`${API_URL}admin/supervisors`, {
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

export async function deleteSupervisor(id, token) {
    const res = await fetch(`${API_URL}admin/supervisors/${id}`, {
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
