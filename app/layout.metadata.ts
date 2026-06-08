// ─────────────────────────────────────────────────────────────────
//  layout.metadata.ts
//  Copy-paste the `metadata` and `viewport` exports into your
//  app/layout.tsx (Next.js App Router).
//
//  Also add the <JsonLd /> component call inside <body> in layout.tsx
// ─────────────────────────────────────────────────────────────────

import type { Metadata, Viewport } from "next";

// ── Canonical base URL ──────────────────────────────────────────
const BASE_URL = "https://www.talenti.in";

// ── Viewport (separate export required in Next.js 14+) ──────────
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

// ── Main metadata export ─────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),

  // ── Title ──
  title: {
    default:
      "Talenti HR Consulting | AI-Powered Recruitment & Executive Search India",
    template: "%s | Talenti HR Consulting",
  },

  // ── Description (140–160 chars ideal) ──
  description:
    "Talenti HR Consulting delivers AI-driven recruitment, executive search, RPO & HR consulting across India, APAC & Middle East. 10,000+ placements. 14-day average hire. Since 2009.",

  // ── Keywords ──
  keywords: [
    "AI recruitment India",
    "executive search India",
    "HR consulting Noida",
    "RPO services India",
    "IT recruitment Delhi NCR",
    "talent acquisition partner India",
    "TalentIQ ATS",
    "BFSI recruitment",
    "CXO search India",
    "HR outsourcing India",
    "permanent staffing India",
    "employer branding India",
  ],

  // ── Authors / Publisher ──
  authors: [{ name: "Talenti HR Consulting Pvt. Ltd.", url: BASE_URL }],
  creator: "Talenti HR Consulting Pvt. Ltd.",
  publisher: "Talenti HR Consulting Pvt. Ltd.",

  // ── Canonical ──
  alternates: {
    canonical: BASE_URL,
    // Add per-page canonicals on subpages — do NOT put /about here,
    // that applies only to the root page.
  },

  // ── Open Graph ──
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Talenti HR Consulting",
    title:
      "Talenti HR Consulting | AI-Powered Recruitment & Executive Search India",
    description:
      "AI-powered recruitment, executive search, RPO & HR consulting since 2009. Trusted by 150+ companies across India, APAC & Middle East.",
    images: [
      {
        url: "/og-image.jpg",   // Create a 1200×630px image and put it in /public/
        width: 1200,
        height: 630,
        alt: "Talenti HR Consulting — AI-Powered Recruitment India",
      },
    ],
  },

  // ── Twitter / X ──
  twitter: {
    card: "summary_large_image",
    title:
      "Talenti HR Consulting | AI-Powered Recruitment India",
    description:
      "AI-powered recruitment, executive search & RPO since 2009. 10,000+ placements. 14-day average hire.",
    images: ["/og-image.jpg"],
    // site: "@talentiin",   // Add when Twitter account is created
  },

  // ── Robots ──
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // ── Verification tokens ──
  // Fill these in from Google Search Console → Settings → Ownership
  verification: {
    google: "REPLACE_WITH_YOUR_GSC_VERIFICATION_TOKEN",
    // yandex: "...",
    // bing: "...",
  },

  // ── App links / manifest ──
  // manifest: "/site.webmanifest",   // Uncomment when manifest is added

  // ── Icons ──
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

// ─────────────────────────────────────────────────────────────────
//  HOW TO USE IN layout.tsx
//  ─────────────────────────────────────────────────────────────────
//
//  import { metadata, viewport } from "./layout.metadata";
//  export { metadata, viewport };
//
//  export default function RootLayout({ children }: { children: React.ReactNode }) {
//    return (
//      <html lang="en-IN">
//        <body>
//          <JsonLd />      ← add this (see schema.jsonld.tsx)
//          {children}
//        </body>
//      </html>
//    );
//  }
// ─────────────────────────────────────────────────────────────────
