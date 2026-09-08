import type { Metadata, Viewport } from "next";
import { Noto_Nastaliq_Urdu, Fredoka } from "next/font/google";
import "./globals.css";

// Urdu in Nastaliq script — self-hosted at build time so the PWA works fully offline
const nastaliq = Noto_Nastaliq_Urdu({
  variable: "--font-nastaliq",
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  preload: true,
});

// Rounded friendly font for English terms & UI numbers
const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "ROSHAN — روشن | Digital Literacy for Village Schools",
  description:
    "ROSHAN: an offline-first digital literacy adventure for Classes 1–5. Noor, Chotu aur Bijli ke sath seekhein!",
  manifest: "/manifest.webmanifest",
  applicationName: "ROSHAN",
  icons: {
    icon: "/icons/icon-192.png",
    apple: "/icons/icon-192.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8EC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // kiosk-style for kids; no accidental zoom
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning>
      <body className={`${nastaliq.variable} ${fredoka.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
