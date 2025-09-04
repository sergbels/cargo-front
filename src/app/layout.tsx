import type {Metadata} from "next";
import {ReactNode} from "react";
import "./global.css"

export const metadata: Metadata = {
    title: "TransportHub",
    description: "Агрегатор логистических услуг",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en">
        <head>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link
                href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap"
                rel="stylesheet"/>
        </head>
        <body>
        {children}
        </body>
        </html>
    );
}
