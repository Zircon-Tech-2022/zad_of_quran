import { API_URL } from "../../Constants";

export async function getSubscribers({ search, page }, token) {
    const res = await fetch(
        `${API_URL}admin/subscribers?q=${search}&page=${page}&limit=15`,
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

export async function getSubscriberData(id,token, timezone = null) {
    if (!id) return null; 
    let endpoint = `${API_URL}admin/subscribers/${id}`;
    
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

export async function deleteSubscriber(id, token) {
    const res = await fetch(`${API_URL}admin/subscribers/${id}`, {
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


// match
