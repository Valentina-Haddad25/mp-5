export default async function createFunc(alias: string, originalUrl: string): Promise<{ shortenedUrl: string } | null> {
    const response = await fetch("/api/create-url", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alias, originalUrl }),
    });

    if (!response.ok) {
        return null; // Return null if an error occurs
    }

    const data = await response.json();
    return data.success ? { shortenedUrl: data.shortenedUrl } : null;
}
