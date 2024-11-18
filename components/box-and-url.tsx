"use client";
import { Button, TextField } from "@mui/material";
import { useState } from "react";
import { UrlProps } from "@/types";

export default function BoxAndUrl({
                                      createFunc,
                                  }: {
    createFunc: (alias: string, url: string) => Promise<UrlProps | null>;
}) {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [shortenedUrl, setShortenedUrl] = useState<string | null>(null); // State for shortened URL
    const [errorMessage, setErrorMessage] = useState<string | null>(null); // State for error message
//was going to use some sort of regex to check if a link is valid however at OH on monday jeffery suggested this way and I think its betetr and less complex
    async function isRealUrl(url: string): Promise<boolean> {
        try {
            const response = await fetch(url, {
                method: "GET",
                mode: "no-cors", // Avoid CORS restrictions
                headers: {
                    "Content-Type": "text/plain",
                },
            });

            return response.ok || response.type === "opaque";
        } catch (error) {
            console.error("Error validating URL:", error);
            return false;
        }
    }

    async function CreateSURL() {
        try {
            // Check if the provided URL is real
            const urlExists = await isRealUrl(url);
            if (!urlExists) {
                setErrorMessage("The provided URL does not exist or is not reachable silly!");
                setShortenedUrl(null);
                return;
            }

            // Call createFunc to shorten the URL
            const result = await createFunc(alias, url);
            if (result) {
                setShortenedUrl(result.shortenedUrl); // Set the shortened URL
                setAlias(""); // Clear alias field
                setUrl(""); // Clear URL field
                setErrorMessage(null); // Clear error message and do it
            } else {
                setErrorMessage("Failed to create a shortened URL. Please make sure your alias is just as unique as u <3.");
                setShortenedUrl(null);
            }
        } catch (error) {
            console.error("Error creating URL:", error);
            setErrorMessage("An error occurred. Please try again >:( .");
            setShortenedUrl(null);
        }
    }

    return (
        <div>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    CreateSURL();
                }}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.5rem",
                    maxWidth: "1200px", // Wider form
                    margin: "50px auto",
                    padding: "3rem",
                    backgroundColor: "rgb(199,209,250)",
                    borderRadius: "12px",
                    boxShadow: "0 6px 12px rgba(250,161,242)",
                }}
            >
                {/* Alias */}
                <TextField
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    placeholder="Alias"
                    fullWidth
                    required
                    sx={{
                        backgroundColor: "white",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "gray", // Default border color
                            },
                            "&:hover fieldset": {
                                borderColor: "black", // Hover border color
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "hotpink", // Focus border color
                            },
                        },
                    }}
                />

                {/* URL */}
                <TextField
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="URL"
                    fullWidth
                    required
                    sx={{
                        backgroundColor: "white",
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": {
                                borderColor: "gray", // Default border color
                            },
                            "&.Mui-focused fieldset": {
                                borderColor: "hotpink", // Focus border color
                            },
                        },
                    }}
                />

                {/* Submit Button */}
                <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    sx={{
                        backgroundColor: "rgb(250,161,242)", // Default button color
                        borderRadius: "8px",
                        fontWeight: "bold",
                        ":hover": {
                            backgroundColor: "rgb(241,117,241)", // Hover colorrr
                        },
                    }}
                >
                    Submit
                </Button>
            </form>

            {/* Shortened URL Display */}
            {shortenedUrl && (
                <div
                    className="bg-pink-400 rounded"
                    style={{
                        textAlign: "center",
                        marginTop: "20px",
                        padding: "10px",
                        borderRadius: "8px",
                        display: "flex",
                        flexDirection: "column",
                        maxWidth: "1200px", // Wider form
                        margin: "50px auto",
                        backgroundColor: "rgb(199,209,250)",
                        boxShadow: "0 6px 12px rgba(250,161,242)",
                    }}
                >
                    <p>Click to copy!</p>
                    <a
                        href={shortenedUrl} // Access the `shortenedUrl` property
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 underline"
                        style={{ cursor: "pointer" }}
                        //display shortened URL below
                    >
                        {shortenedUrl}
                    </a>
                </div>
            )}

            {/* Error Message Display */}
            {errorMessage && (
                <p style={{ color: "red", textAlign: "center", marginTop: "10px" }}>
                    {errorMessage}
                </p>
            )}
        </div>
    );
}
