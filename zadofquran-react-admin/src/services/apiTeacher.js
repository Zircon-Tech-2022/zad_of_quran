import { API_URL } from "../../Constants";

// import { API_URL } from "../Constants";
export async function matchTeachersQuery({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/staff?q=${search}&page=${page}&limit=15`,
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

export async function getTeacherData(id, token, timezone = null) {
    if (!id) return null; 
    let endpoint = `${API_URL}admin/staff/${id}`;
    
    if (timezone) {
        const query = timezone.replace('+',"%2B"); // replace + with %2B to avoid encoding issue
        endpoint+=`?timezone_offset=${query}`;
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

export async function getTeachersQueryData({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/staff?q=${search}&page=${page}&limit=15`,
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

export async function updateTeacherApi(teacherData, id, token, setError) {
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
        const res = await fetch(`${API_URL}admin/staff/${id}`, {
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
export async function createTeacherApi(teacherData, token, setError) {
    try {
        const formData = new FormData();
        //
        for (const [key, value] of Object.entries(teacherData)) {
            formData.append(key, value);
        }
        const res = await fetch(`${API_URL}admin/staff`, {
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

export async function deleteTeacher(id, token) {
    const res = await fetch(`${API_URL}admin/staff/${id}`, {
        method: "DELETE",
        headers: {
            "accept-language": "ar",
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    });

    if (!res.ok) throw Error("حدث خطأ اثناء المسح، ربما المدرس له حلقات نشطة");
    const data = await res.json();
    return data;
}
