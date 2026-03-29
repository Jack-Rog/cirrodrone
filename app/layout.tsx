import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";

import { TooltipProvider } from "@/components/ui/tooltip";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://cirro-drone.com"),
  alternates: {
    canonical: "/",
  },
  title: {
    default: "Cirro | Appstore for drones",
    template: "%s | Cirro",
  },
  description:
    "Deploy custom software to your current drone set-up, no configuration required. Request beta access to explore Cirro.",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/brand/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/brand/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/brand/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/brand/favicon-32x32.png"],
  },
  openGraph: {
    title: "Cirro | Appstore for drones",
    description:
      "Deploy custom software to your current drone set-up, no configuration required.",
    type: "website",
    siteName: "Cirro",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cirro | Appstore for drones",
    description:
      "Deploy custom software to your current drone set-up, no configuration required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${manrope.variable} ${inter.variable} bg-background font-sans text-foreground antialiased`}
      >
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
