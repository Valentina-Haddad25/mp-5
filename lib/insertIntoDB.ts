"use server";

import getCollection, { URLS_COLLECTION } from "@/db"; // Import DB utilities
import { UrlProps } from "@/types"; // Import the UrlProps interface

export default async function insertIntoDB(
    alias: string, // Short alias for the URL
    originalUrl: string, // The full original URL
): Promise<UrlProps | null> {
    try {
        const urlsCollection = await getCollection(URLS_COLLECTION); // Get the collection from the DB

        // Check if the alias already exists

        const existingUrl = await urlsCollection.findOne({ alias });
        if (existingUrl) {
            console.error(`The alias "${alias}" is already in use.`);
            return null;
        }
//use dev or use props
        //deploy on vercel
        //
        // Generate the shortened URL
        const shortenedUrl = `http://localhost:3000/${alias}`;

        // Define the URL entry
        const urlEntry = {
            alias,
            originalUrl,
            shortenedUrl,
        };
//add check in
        // Insert into the collection
        const res = await urlsCollection.insertOne(urlEntry);

        // Check if insertion was successful
        if (!res.acknowledged) {
            console.error("Failed to insert URL into the database");
            return null;
        }

        // Return the newly created URL object with the shortened URL
        return {
            id: res.insertedId.toHexString(),
            alias,
            originalUrl,
            shortenedUrl,
        };
    } catch (error) {
        console.error("Error creating new shortened URL:", error);
        return null;
    }
}
