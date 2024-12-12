import { API_URL } from "../Constants";

export async function getCurrentUser(token) {
    try {
        const res = await fetch(`${API_URL}auth`, {
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        // if (!res.ok) {
        //     const errorData = await res.json();

        //     throw new Error(errorData.message);
        // }
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

// export async function logout() {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw new Error(error.message);
// }
export async function login({ email, password }, setError, token) {
    try {
        const res = await fetch(`${API_URL}auth/login`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                email,
                password,
            }),
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
export async function signup(userData, setError, token) {
    try {
        const res = await fetch(`${API_URL}auth/register`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
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
