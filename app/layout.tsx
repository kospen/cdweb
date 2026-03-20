import type { ReactNode } from "react";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body"
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display"
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${inter.variable} ${sora.variable} bg-bg text-textPrimary antialiased`}>
        {children}
      </body>
    </html>
  );
}
