import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    host: "https://cirro-drone.com",
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin/", "/thank-you", "/developer/console/"],
      },
    ],
    sitemap: "https://cirro-drone.com/sitemap.xml",
  };
}
