import { MongoClient, Db, Collection } from "mongodb";

// MongoDB connection string from environment variables
const MONGO_URI = process.env.MONGO_URI as string;
if (!MONGO_URI) {
    throw new Error("MONGO_URI environment variable is undefined");
}

// Database and collection names
const DB_NAME = "CS-391-MP-5"; // database name
export const URLS_COLLECTION = "urls"; // Updated collection name

let client: MongoClient | null = null;
let db: Db | null = null;

/**
 * Connect to MongoDB and return the database instance.
 * @returns {Promise<Db>} The database instance.
 */
async function connect(): Promise<Db> {
    if (!client) {
        client = new MongoClient(MONGO_URI); // Create a new MongoDB client instance
        await client.connect(); // Connect to the database server
        console.log("Connected to MongoDB");
    }
    return client.db(DB_NAME); // Return the database instance
}

/**
 * Get a specific collection from the database.
 * @param collectionName - The name of the collection to retrieve.
 * @returns {Promise<Collection>} The requested MongoDB collection.
 */
export default async function getCollection(
    collectionName: string,
): Promise<Collection> {
    if (!db) {
        db = await connect(); // Ensure database connection
    }
    return db.collection(collectionName); // Return the specified collection
}
