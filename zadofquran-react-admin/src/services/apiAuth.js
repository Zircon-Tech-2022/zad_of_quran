import { API_URL } from "../Constants";

export async function getCurrentUser(token) {
    if (!token) {
        return null;
    }
    try {
        const res = await fetch(`${API_URL}auth`, {
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();

            throw new Error(errorData.message);
        }
        const data = await res.json();

        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}

export async function logout(token) {
    try {
        const res = await fetch(`${API_URL}auth/logout`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            const errorData = await res.json();

            throw new Error(errorData.message);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
export async function login({ email, password }, setError, token, setToken) {
    try {
        const res = await fetch(`${API_URL}admin/auth/login`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email,
                password,
            }),
            Authorization: `Bearer ${token}`,
        });

        if (!res.ok) {
            const errorData = await res.json();
            setError("email", { message: errorData.message });

            throw new Error(errorData.message);
        }
        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error.message);
    }
}
