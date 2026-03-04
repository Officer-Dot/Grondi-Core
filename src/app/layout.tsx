import type { Metadata } from "next";
import { RuntimeProvider } from "@/components/runtime-context";
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
      <body>
        <RuntimeProvider>{children}</RuntimeProvider>
      </body>
    </html>
  );
}