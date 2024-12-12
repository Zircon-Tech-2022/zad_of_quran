import { API_URL } from "../../Constants";

// import { API_URL } from "../Constants";
export async function getFaqData({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/FAQs?q=${search}&page=${page}&limit=15`,
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

export async function updateFaqApi(faqData, id, token, setError) {
    try {
        const res = await fetch(`${API_URL}admin/FAQs/${id}`, {
            method: "PUT",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(faqData),
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
export async function createFaqApi(faqData, token, setError) {
    try {
        const formData = new FormData();
        for (const [key, value] of Object.entries(faqData)) {
            formData.append(key, value);
        }
        const res = await fetch(`${API_URL}admin/FAQs`, {
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

export async function deleteFaq(id, token) {
    const res = await fetch(`${API_URL}admin/FAQs/${id}`, {
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
