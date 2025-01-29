const hostname = window.location.hostname.replace("www.", "").replace("admin.", '') + '/';
export const API_URL =
  hostname.includes("localhost") || hostname.includes("127.0.0.1")
    ? import.meta.env.VITE_SERVER_URI
    : "https://api." + hostname;


// export const API_URL = "https://api.zadofquran-backend.test/";
export const LIMIT = 15;
