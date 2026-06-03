import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  metadataBase: new URL("https://www.talenti.in"),
  title: {
    default: "Talenti HR Consulting | AI-Powered Recruitment & HR Solutions India",
    template: "%s | Talenti HR Consulting",
  },
  description:
    "Talenti HR Consulting Pvt Ltd — India's leading AI-powered HR consulting firm since 2009. Expert recruitment, executive search, RPO, HR outsourcing & talent management across India, APAC, Middle East & Europe. Powered by TalentIQ.",
  keywords: [
    "HR consulting India",
    "AI recruitment India",
    "executive search India",
    "RPO services India",
    "IT recruitment India",
    "talent management",
    "HR outsourcing",
    "TalentIQ ATS",
    "permanent hiring",
    "BFSI recruitment",
    "employer branding",
    "HR consulting Delhi NCR",
    "talent mapping India",
    "CXO search India",
    "staffing agency India",
  ],
  authors: [{ name: "Talenti HR Consulting Pvt. Ltd.", url: "https://www.talenti.in" }],
  creator: "Talenti HR Consulting Pvt. Ltd.",
  publisher: "Talenti HR Consulting Pvt. Ltd.",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.talenti.in",
    siteName: "Talenti HR Consulting",
    title: "Talenti HR Consulting | AI-Powered Recruitment & HR Solutions India",
    description:
      "India's leading AI-powered HR consulting firm since 2009. Expert recruitment, executive search, RPO & strategic HR management. Powered by TalentIQ platform.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Talenti HR Consulting — AI-Powered Recruitment Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Talenti HR Consulting | AI-Powered Recruitment India",
    description:
      "India's leading AI-powered HR consulting firm since 2009 — expert recruitment, executive search & RPO services. Powered by TalentIQ.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://www.talenti.in",
  },
  verification: {
    // google: "YOUR_GOOGLE_VERIFICATION_CODE",  ← uncomment and add after Search Console setup
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        {/* Structured Data — Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Talenti HR Consulting Pvt. Ltd.",
              url: "https://www.talenti.in",
              logo: "https://www.talenti.in/logo.png",
              description:
                "India's leading AI-powered HR consulting firm since 2009. Expert recruitment, executive search, RPO, and HR management services.",
              foundingDate: "2009",
              founder: { "@type": "Person", name: "Kunal Bhatia" },
              address: {
                "@type": "PostalAddress",
                addressLocality: "Noida",
                addressRegion: "Uttar Pradesh",
                addressCountry: "IN",
              },
              contactPoint: [
                {
                  "@type": "ContactPoint",
                  telephone: "+91-8826319888",
                  contactType: "customer service",
                  areaServed: ["IN", "SG", "AE", "GB", "DE"],
                  availableLanguage: ["English", "Hindi"],
                },
              ],
              sameAs: [
                "https://www.linkedin.com/company/talenti-hr-consulting-pvt--ltd-/",
                "https://www.facebook.com/talentijobs/",
              ],
              areaServed: ["India", "APAC", "Middle East", "Europe"],
              serviceType: [
                "Permanent Recruitment",
                "Executive Search",
                "RPO",
                "IT Recruitment",
                "HR Consulting",
                "Talent Mapping",
                "Employer Branding",
              ],
            }),
          }}
        />
        {/* Structured Data — WebSite / Sitelinks Search */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              url: "https://www.talenti.in",
              name: "Talenti HR Consulting",
              potentialAction: {
                "@type": "SearchAction",
                target: "https://www.talenti.in/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
        {/* Preconnect for Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}