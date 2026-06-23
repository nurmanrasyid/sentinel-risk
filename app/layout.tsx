import type { Metadata } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const ibmPlexSans = IBM_Plex_Sans({
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-ibm",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Login | SentinelRisk PNM",
  description: "Internal IT Risk Management platform for PT Permodalan Nasional Madani",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${ibmPlexSans.variable} h-full`}
    >
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet" />
      </head>
      <body
        className="flex h-screen overflow-hidden bg-surface-bg text-on-surface font-body-sm"
        style={{ fontFamily: "'IBM Plex Sans', sans-serif" }}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
