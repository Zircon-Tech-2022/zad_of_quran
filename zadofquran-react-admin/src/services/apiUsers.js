import { API_URL } from "../../Constants";

// import { API_URL } from "../Constants";
export async function getUserData({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/users?q=${search}&page=${page}&limit=15`,
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

export async function updateUserApi(teacherData, id, token, setError) {
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
        const res = await fetch(`${API_URL}admin/users/${id}`, {
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
export async function createUserApi(teacherData, token, setError) {
    try {
        const formData = new FormData();
        //
        for (const [key, value] of Object.entries(teacherData)) {
            formData.append(key, value);
        }
        const res = await fetch(`${API_URL}admin/users`, {
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

export async function deleteUser(id, token) {
    const res = await fetch(`${API_URL}admin/users/${id}`, {
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
