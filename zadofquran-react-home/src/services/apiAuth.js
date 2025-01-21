import { API_URL } from "../Constants";

export async function getCurrentUser(token, timezone = null) {
    try {
        let endpoint = localStorage.getItem('user-type') == 'teacher' ? `${API_URL}auth/staff`:`${API_URL}auth`;
        if (timezone) {
            const query = timezone.replace('+',"%2B"); // replace + with %2B to avoid encoding issue
            endpoint+=`?timezone_offset=${query}`;
        }

        const res = await fetch(endpoint, {
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (!res.ok) {
            if (res.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user-type");
            }
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

// export async function logout() {
//   const { error } = await supabase.auth.signOut();
//   if (error) throw new Error(error.message);
// }
export async function login({ email, password, type }, setError, token) {
    try {
        const endpoint = type == 'teacher' ? `${API_URL}auth/staff/login`:`${API_URL}auth/login`;
        const res = await fetch(endpoint, {
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
export async function signup(userData, setError) {
    try {
        // formData
        const endpoint = userData.get('type') == 'teacher' ? `${API_URL}auth/staff/register`:`${API_URL}auth/register`;
        const res = await fetch(endpoint, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
            },
            body: userData,
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

export async function updateProfile(userData, setError, token) {
    try {
        // formData
        const res = await fetch(`${API_URL}auth/staff/update`, {
            method: "POST",
            headers: {
                "accept-language": "ar",
                Accept: "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: userData,
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