import { API_URL } from "../../Constants";

// import { API_URL } from "../Constants";
export async function getTestimoinalData({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/testimonials?q=${search}&page=${page}&limit=15`,
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

export async function updateTestimoinalApi(
    testimoinalData,
    id,
    token,
    setError
) {
    try {
        const res = await fetch(`${API_URL}admin/testimonials/${id}`, {
            method: "PUT",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(testimoinalData),
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
export async function createTestimoinalApi(testimoinalData, token, setError) {
    try {
        const res = await fetch(`${API_URL}admin/testimonials`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(testimoinalData),
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

export async function deleteTestimoinal(id, token) {
    const res = await fetch(`${API_URL}admin/testimonials/${id}`, {
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
