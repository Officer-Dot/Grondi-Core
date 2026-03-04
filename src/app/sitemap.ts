import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://grondi-core.vercel.app";
  const routes = [
    "",
    "/demo",
    "/klant",
    "/login",
    "/projecten",
    "/planning",
    "/assets",
    "/taken",
    "/uren",
    "/fotos",
    "/rapportage",
  ];

  return routes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
