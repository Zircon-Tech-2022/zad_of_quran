let hostname = window.location.hostname.replace("www.", "");
export const API_URL =
    hostname === "localhost" || hostname === "127.0.0.1"
        ? "http://127.0.0.1:3333"
        : "https://api." + hostname;

// export const API_URL = "https://api.zadofquran-backend.test/";
export const LIMIT = 15;
