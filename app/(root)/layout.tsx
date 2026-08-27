import type { Metadata } from "next";
import "../globals.css";


export const metadata: Metadata = {
  title: "Creative Destruction",
  description: "Research, AI and software engineering shaped into deployable digital products and systems.",
  icons: { icon: "/icon.svg" }
};

export default function RootLandingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" style={{ background: "#070b0e", colorScheme: "dark" }}><head><meta name="color-scheme" content="dark"/><link rel="preload" href="/fonts/CourierPrime-Regular.ttf" as="font" type="font/ttf" crossOrigin="anonymous"/></head><body style={{ background: "#070b0e" }}>{children}</body></html>;
}


