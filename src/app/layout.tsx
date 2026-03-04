import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Grondi-Core",
  description: "Next.js starter with Firebase, GitHub, and Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}