const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api";

type RequestOptions = RequestInit & {
    auth?: boolean;
};

export async function apiRequest<T>(
    path: string,
    options: RequestOptions = {}
): Promise<T> {
    const token = localStorage.getItem("EventRadar_token");

    const headers = new Headers(options.headers);

    if (!headers.has("Content-Type") && options.body) {
        headers.set("Content-Type", "application/json");
    }

    if (options.auth && token) {
        headers.set("Authorization", `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${path}`, {
        ...options,
        headers,
    });

    if (response.status === 204) {
        return undefined as T;
    }

    const contentType = response.headers.get("content-type");
    const isJson = contentType?.includes("application/json");

    const data = isJson ? await response.json() : await response.text();

    if (!response.ok) {
        const message =
            typeof data === "object" && data !== null && "message" in data
                ? String(data.message)
                : "Something went wrong.";

        throw new Error(message);
    }

    return data as T;
}