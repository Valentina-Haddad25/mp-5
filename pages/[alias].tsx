import { GetServerSideProps } from "next";
import getCollection from "@/db";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { alias } = context.params!;

    try {
        const urlsCollection = await getCollection("urls");

        // Look up the alias in the database
        const urlEntry = await urlsCollection.findOne({ alias });

        // Handle cases where the alias is not found or the URL is invalid
        if (!urlEntry?.originalUrl) {
            console.error(`Invalid or missing URL for alias: ${alias}`);
            return { notFound: true };
        }

        // Redirect to the original URL
        return {
            redirect: {
                destination: urlEntry.originalUrl, // Redirect to the original URL
                permanent: false, // Temporary Redirect (302)
            },
        };
    } catch (error) {
        console.error("Error in getServerSideProps:", error);
        return { notFound: true }; // Return 404 for any unexpected errors
    }
};

// Return null for the redirect page
const RedirectPage = () => null;

export default RedirectPage;
