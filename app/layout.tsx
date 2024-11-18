import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";



export const metadata: Metadata = {
    title: "Create Next App",
    description: "Generated by create next app",
};

const roboto = Roboto({
    subsets: ["latin"],
    weight: ["100", "400", "700"],
    variable: "--font-roboto",
});

// Use the `variable` in your layout
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body className={`${roboto.variable} antialiased`}>
        <Header /> {/* Added the Header component */}
        {children}
        </body>
        </html>
    );
}
