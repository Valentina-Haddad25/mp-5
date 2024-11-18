import { GetServerSideProps } from "next";
import getCollection from "@/db";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { alias } = context.params!;
    const urlsCollection = await getCollection("urls");

    // Look up the alias in the database
    //shout out CS460
    //needs to be FindOne and not find because I want a null return if it dose not exist bc find() returns a cursor and I do not want to handle that to be honest
    const urlEntry = await urlsCollection.findOne({ alias });
//this im pretty sure does not work as my box-and-url handles this but just in case
    if (!urlEntry?.originalUrl) {
        console.error(`Invalid or missing URL for alias: ${alias}`);
        return { notFound: true };
    }
//redirecting part
    if (urlEntry) {
        return {
            redirect: {
                destination: urlEntry.originalUrl, // Redirect to the original URL
                permanent: false, //  Temporary Redirect
            },
        };
    }

    // Return 404 page if ali not found
    return {
        notFound: true,
    };
};


const RedirectPage = () => null;

export default RedirectPage;
