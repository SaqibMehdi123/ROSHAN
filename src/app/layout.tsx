import type { Metadata, Viewport } from "next";
import { Noto_Nastaliq_Urdu, Fredoka } from "next/font/google";
import "./globals.css";

// Canonical site URL — override per deployment with NEXT_PUBLIC_SITE_URL
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://saqibmehdi123.github.io/ROSHAN";

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

const TITLE = "ROSHAN — روشن | Digital Literacy for Village Schools (Classes 1–5)";
const DESCRIPTION =
  "ROSHAN (روشن) is a free, offline-first digital literacy adventure for rural Pakistani children in Classes 1–5 (ages 6–11). 8 storybook worlds, 76 spoken Urdu lessons: computer basics, mouse & keyboard, files, paint, internet safety, logic and block coding. No ads, no tracking — works fully offline after the first load.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s | ROSHAN روشن",
  },
  description: DESCRIPTION,
  applicationName: "ROSHAN",
  keywords: [
    "digital literacy Pakistan",
    "computer basics for kids Urdu",
    "بچوں کے لیے کمپیوٹر تعلیم",
    "rural education technology",
    "offline learning app PWA",
    "mouse keyboard practice for children",
    "internet safety for kids Urdu",
    "block coding for beginners",
    "کلگری سیکھیں",
    "digital literacy app Urdu",
    "ROSHAN روشن",
  ],
  authors: [{ name: "Saqib Mehdi", url: "https://github.com/SaqibMehdi123" }],
  creator: "Saqib Mehdi",
  publisher: "ROSHAN Learning",
  category: "education",
  alternates: {
    canonical: "/",
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/icons/icon-192.png",
  },
  openGraph: {
    type: "website",
    siteName: "ROSHAN — روشن",
    locale: "ur_PK",
    alternateLocale: ["en_US"],
    url: "/",
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "ROSHAN روشن — digital literacy adventure for village schools, Classes 1–5",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8EC",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1, // kiosk-style for kids; no accidental zoom
  userScalable: false,
};

/* ---- Structured data: rich results + AI search engines (ChatGPT, Perplexity, Google AI) ---- */
function structuredData() {
  const site = SITE_URL;
  const teaches = [
    "Computer parts and lab care",
    "Mouse: move, click, double-click, drag & drop",
    "Keyboard: letters, digits, typing",
    "Files, folders and saving work",
    "Creative tools: paint, shapes, text",
    "Internet basics and online safety",
    "Logic: patterns, sequences, loops, if-then, debugging",
    "Block-based coding fundamentals",
  ];
  return [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "ROSHAN",
      alternateName: "روشن",
      url: site,
      applicationCategory: "EducationalApplication",
      applicationSubCategory: "Digital Literacy",
      operatingSystem: "Any (Progressive Web App — Windows, Android, Linux)",
      browserRequirements: "Requires JavaScript. Works offline after first load.",
      inLanguage: ["ur", "en"],
      description: DESCRIPTION,
      educationalLevel: "Primary school — Classes 1 to 5 (ages 6–11)",
      teaches,
      featureList: [
        "76 story-based spoken lessons in Urdu with English subtitles",
        "8 adventure worlds with zero-failure gamification",
        "Voice-first: every instruction is spoken (no reading required)",
        "Offline-first PWA — works without internet after first load",
        "30-second autosave, power-cut safe resume",
        "Pair mode: two children share one computer with 10-minute swaps",
        "Teacher Hub: progress dashboard, risk alerts, CSV export, printable lesson plans",
        "Privacy-first: first name only, no ads, no external links, no tracking",
      ],
      isAccessibleForFree: true,
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR" },
      audience: {
        "@type": "EducationalAudience",
        educationalRole: ["student", "teacher"],
        audienceType: "Children ages 6–11, teachers, rural schools",
      },
      author: { "@type": "Person", name: "Saqib Mehdi", url: "https://github.com/SaqibMehdi123" },
      license: "https://opensource.org/licenses/MIT",
      screenshot: `${site}/icons/icon-512.png`,
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is ROSHAN (روشن)?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "ROSHAN is a free, offline-first digital literacy adventure app for rural Pakistani primary school children (Classes 1–5, ages 6–11). Children learn computer basics, mouse, keyboard, files, paint, internet safety, logic and block coding through 76 story-based lessons in Urdu, guided by five friendly characters including Bijli the robot.",
          },
        },
        {
          "@type": "Question",
          name: "Does ROSHAN work without internet?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ROSHAN is an offline-first PWA: after one initial load, the entire app — all 76 lessons, games and the Teacher Hub — runs 100% offline on old Windows PCs and low-end Android tablets. Progress autosaves every 30 seconds and survives power cuts.",
          },
        },
        {
          "@type": "Question",
          name: "Can children use ROSHAN before they can read?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ROSHAN is voice-first: every story line, instruction and hint is spoken aloud in Urdu (Nastaliq script), with optional speech synthesis and English subtitles. No reading is required to complete any lesson.",
          },
        },
        {
          "@type": "Question",
          name: "What do the 8 ROSHAN worlds teach?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "World 1: meeting the computer and lab care. World 2: the mouse (move, click, double-click, drag & drop). World 3: the keyboard and typing. World 4: files, folders and saving. World 5: creative tools and paint. World 6: internet basics and online safety. World 7: logic — patterns, sequences, loops, if-then and debugging. World 8: block-based coding and making a first game.",
          },
        },
        {
          "@type": "Question",
          name: "What happens when a child makes a mistake in ROSHAN?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Nothing bad — by design. ROSHAN uses zero-failure gamification: a mistake is called 'finding a bug' and Bijli responds with a friendly hint. There are no red crosses, no failure sounds, and every activity ends in success so children stay motivated.",
          },
        },
        {
          "@type": "Question",
          name: "Is ROSHAN safe for children's privacy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. ROSHAN asks only for a child's first name, stores everything locally on the device, and contains no ads, no external links, no accounts and no tracking. Teachers can export progress as CSV from the offline Teacher Hub.",
          },
        },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "ROSHAN Digital Literacy Adventure — Classes 1–5",
      description: "A complete 8-world digital literacy curriculum: computer basics, mouse, keyboard, files, creative tools, internet safety, logic and block coding, taught through spoken Urdu stories and zero-failure games.",
      inLanguage: "ur",
      provider: { "@type": "Organization", name: "ROSHAN Learning", url: site },
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "online",
        courseWorkload: "PT7M",
      },
      offers: { "@type": "Offer", price: "0", priceCurrency: "PKR", category: "Free" },
    },
  ];
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ur" dir="rtl" suppressHydrationWarning>
      <body className={`${nastaliq.variable} ${fredoka.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
        {children}
        {/* Crawler / no-JS fallback: the app itself is a single-route client SPA for children */}
        <noscript>
          <div style={{ padding: "2rem", direction: "ltr" }}>
            <h1>ROSHAN — روشن: Digital Literacy for Village Schools</h1>
            <p>
              ROSHAN is a free, offline-first digital literacy app for rural Pakistani children in
              Classes 1–5 (ages 6–11). It teaches computer basics, the mouse, the keyboard, files
              and folders, creative paint tools, internet safety, logic and block coding through 76
              spoken story lessons in Urdu across 8 adventure worlds — with zero-failure
              gamification, pair mode for two children on one PC, an offline Teacher Hub with CSV
              progress export, and strict privacy (first name only, no ads, no tracking). Enable
              JavaScript to play.
            </p>
          </div>
        </noscript>
      </body>
    </html>
  );
}
