import type { Metadata } from "next";
import { RuntimeProvider } from "@/components/runtime-context";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://grondi-core.vercel.app"),
  title: {
    default: "GrondiCore | Operationeel kernplatform",
    template: "%s | GrondiCore",
  },
  description:
    "GrondiCore beheert projecten, objecten, planning, assets en taken voor operationele teams.",
  keywords: [
    "GrondiCore",
    "projectbeheer",
    "objectbeheer",
    "planning",
    "assets",
    "taken",
    "field service",
  ],
  openGraph: {
    title: "GrondiCore",
    description:
      "Operationeel kernplatform met projecten, objecten en planning in één workflow.",
    type: "website",
    locale: "nl_NL",
    siteName: "GrondiCore",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GrondiCore",
    description:
      "Operationeel kernplatform met projecten, objecten en planning in één workflow.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl">
      <body>
        <ThemeProvider>
          <RuntimeProvider>{children}</RuntimeProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}