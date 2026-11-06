/**
 * Evita JSON.parse em HTML (ex.: redirect para /login) quando uma rota API deveria devolver JSON.
 */
export async function parseJsonResponse<T>(res: Response): Promise<T | null> {
    const ct = res.headers.get("content-type") ?? "";
    if (!ct.includes("application/json")) {
        return null;
    }
    try {
        return (await res.json()) as T;
    } catch {
        return null;
    }
}
