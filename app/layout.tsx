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
  metadataBase: new URL("https://cirro.run"),
  title: {
    default: "Cirro | Appstore for drones",
    template: "%s | Cirro",
  },
  description:
    "Deploy custom software to your current drone set-up, no configuration required. Request beta access to explore Cirro.",
  openGraph: {
    title: "Cirro | Appstore for drones",
    description:
      "Deploy custom software to your current drone set-up, no configuration required.",
    type: "website",
    siteName: "Cirro",
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
