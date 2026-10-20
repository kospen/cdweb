import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Creative Destruction — AI, Software, Research & Innovation",
  description: "Creative Destruction turns research, artificial intelligence and software engineering into deployable digital products and systems.",
  icons: { icon: "/icon.svg" },
  openGraph: {
    title: "Creative Destruction — AI, Software, Research & Innovation",
    description: "Creative Destruction turns research, AI and software engineering into deployable digital products and systems.",
    url: "https://www.creative-destruction.eu/",
    siteName: "Creative Destruction",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Creative Destruction — AI, Software, Research & Innovation",
    description: "Creative Destruction turns research, AI and software engineering into deployable digital products and systems.",
  },
};

export default function RootLandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" style={{ background: "#070b0e", colorScheme: "dark" }}><head><meta name="color-scheme" content="dark"/><link rel="preload" href="/fonts/CourierPrime-Regular.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/><link rel="preload" href="/fonts/CourierPrime-Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous"/></head><body style={{ background: "#070b0e" }}>{children}</body></html>;
}


