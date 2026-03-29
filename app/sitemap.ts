import type { MetadataRoute } from "next";

const BASE_URL = "https://cirro-drone.com";

const routes = [
  { path: "/", priority: 1 },
  { path: "/beta-access", priority: 0.9 },
  { path: "/pilot", priority: 0.8 },
  { path: "/pilot/apps", priority: 0.8 },
  { path: "/pilot/sessions", priority: 0.7 },
  { path: "/developer", priority: 0.8 },
  { path: "/developer/how-it-works", priority: 0.7 },
  { path: "/product/runtime-preview", priority: 0.65 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${BASE_URL}${route.path}`,
    lastModified,
    changeFrequency: route.path === "/" ? "daily" : "weekly",
    priority: route.priority,
  }));
}
