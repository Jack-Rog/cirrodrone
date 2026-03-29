import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Cirro",
    short_name: "Cirro",
    description:
      "Deploy custom software to your current drone set-up, no configuration required.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8fbff",
    theme_color: "#16354a",
    icons: [
      {
        src: "/brand/android-chrome-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/brand/android-chrome-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/brand/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
