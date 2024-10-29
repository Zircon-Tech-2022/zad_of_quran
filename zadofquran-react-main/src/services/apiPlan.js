import { API_URL } from "../Constants";

export async function plan(subData, setError, token) {
    try {
        const res = await fetch(`${API_URL}subscribe`, {
            method: "POST",
            headers: {
                "accept-language": localStorage.getItem("lang") || "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(subData),
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
