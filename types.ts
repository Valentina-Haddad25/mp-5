export interface UrlProps {
    id: string; // Unique ID for the URL entry; CS460 taught to always have ID, but I do not think its necessary here
    alias: string; // Short alias for the URL
    originalUrl: string; // The full original URL
    shortenedUrl: string; //shortened URL
}