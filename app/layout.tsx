import "./globals.css";
import type { ReactNode } from "react";
import type { Metadata, Viewport } from "next";
import JsonLd from "@/components/JsonLd";

// ─────────────────────────────────────────────────────────────────
//  METADATA
// ─────────────────────────────────────────────────────────────────
export const metadata = {
  metadataBase: new URL("https://www.talenti.in"),

  title: {
    default:
      "Talenti HR Consulting | AI-Powered Recruitment & Executive Search India",
    template: "%s | Talenti HR Consulting",
  },

  description:
    "Talenti HR Consulting Pvt. Ltd. — AI-powered recruitment, executive search, RPO & HR consulting since 2009. 10,000+ placements across India, APAC, Middle East & Europe. Average time-to-hire: 14 days. Powered by TalentIQ.",

  keywords: [
    "AI recruitment India",
    "HR consulting India",
    "executive search India",
    "RPO services India",
    "IT recruitment Delhi NCR",
    "HR consulting Noida",
    "talent acquisition India",
    "TalentIQ ATS",
    "permanent staffing India",
    "BFSI recruitment India",
    "CXO search India",
    "employer branding India",
    "talent mapping India",
    "HR outsourcing India",
    "staffing agency Delhi NCR",
    "recruitment agency Noida",
  ],

  authors: [
    { name: "Talenti HR Consulting Pvt. Ltd.", url: "https://www.talenti.in" },
  ],
  creator: "Talenti HR Consulting Pvt. Ltd.",
  publisher: "Talenti HR Consulting Pvt. Ltd.",

  // ── Canonical & hreflang ──────────────────────────────────────
  alternates: {
    canonical: "https://www.talenti.in",
    languages: {
      "en-IN": "https://www.talenti.in",
    },
  },

  // ── Robots ───────────────────────────────────────────────────
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

  // ── Open Graph ───────────────────────────────────────────────
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://www.talenti.in",
    siteName: "Talenti HR Consulting",
    title:
      "Talenti HR Consulting | AI-Powered Recruitment & Executive Search India",
    description:
      "AI-powered recruitment, executive search, RPO & HR consulting since 2009. 10,000+ placements. 14-day average hire. India · APAC · Middle East · Europe.",
    images: [
      {
        url: "https://www.talenti.in/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Talenti HR Consulting — AI-Powered Recruitment & Executive Search India",
      },
    ],
  },

  // ── Twitter / X ──────────────────────────────────────────────
  twitter: {
    card: "summary_large_image",
    title: "Talenti HR Consulting | AI-Powered Recruitment India",
    description:
      "AI-powered recruitment, executive search & RPO since 2009. 10,000+ placements. 14-day average hire.",
    images: ["https://www.talenti.in/images/og-image.png"],
    // site: "@talentiin",   // ← uncomment when Twitter account is live
  },

  // ── Google Search Console verification ───────────────────────
  // Get this token from Search Console → Settings → Ownership verification → HTML tag method
  // verification: {
  //   google: "YOUR_GSC_VERIFICATION_TOKEN",
  // },

  // ── Icons ────────────────────────────────────────────────────
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
//  VIEWPORT (must be a separate export in Next.js 14+)
// ─────────────────────────────────────────────────────────────────
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#2563EB",
};

// ─────────────────────────────────────────────────────────────────
//  SCHEMA CONSTANTS
//  Defined outside JSX so they serialise cleanly with no
//  whitespace artifacts or runtime object construction overhead.
// ─────────────────────────────────────────────────────────────────

const BASE = "https://www.talenti.in";

/** 1 ─ Organization + LocalBusiness (combined — both types apply) */
const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${BASE}/#organization`,

  // Core identity
  name: "Talenti HR Consulting Pvt. Ltd.",
  alternateName: ["Talenti HR", "Talenti HR Consulting", "Talenti"],
  legalName: "Talenti HR Consulting Private Limited",
  url: BASE,
  logo: {
    "@type": "ImageObject",
    "@id": `${BASE}/#logo`,
    url: `${BASE}/images/logo.png`,
    width: 198,
    height: 50,
    caption: "Talenti HR Consulting",
  },
  image: `${BASE}/images/og-image.png`,
  description:
    "Talenti HR Consulting Pvt. Ltd. is an AI-powered recruitment, executive search, RPO, and HR consulting firm based in Noida, India. Founded in 2009, Talenti has completed 10,000+ placements for 150+ companies across India, APAC, Middle East, and Europe using the proprietary TalentIQ AI platform.",

  // Founding
  foundingDate: "2009",
  founder: [
    {
      "@type": "Person",
      "@id": `${BASE}/#kunal-bhatia`,
      name: "Kunal Bhatia",
      jobTitle: "Founder & Managing Director",
    },
    {
      "@type": "Person",
      "@id": `${BASE}/#rohit-singh`,
      name: "Rohit Singh",
      jobTitle: "Co-Founder & Consulting Partner",
    },
  ],
  numberOfEmployees: {
    "@type": "QuantitativeValue",
    minValue: 10,
    maxValue: 50,
  },

  // Address (full — required for LocalBusiness rich results)
  address: {
    "@type": "PostalAddress",
    streetAddress: "1108, T1, Assotech Business Cresterra, Sector 135",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },

  // Geo coordinates (enables map pins in AI Overviews)
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5072,
    longitude: 77.3973,
  },

  // Contact
  telephone: "+91-8826319888",
  email: "info@talenti.biz",
  priceRange: "₹₹₹",

  // Opening hours
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ],
      opens: "09:00",
      closes: "19:00",
    },
  ],

  // Contact points
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8826319888",
      contactType: "customer service",
      contactOption: "TollFree",
      areaServed: ["IN", "SG", "AE", "GB", "DE"],
      availableLanguage: ["English", "Hindi"],
    },
    {
      "@type": "ContactPoint",
      email: "info@talenti.biz",
      contactType: "sales",
      areaServed: "Worldwide",
    },
  ],

  // Service area
  areaServed: [
    { "@type": "Country", name: "India", "@id": "https://www.wikidata.org/wiki/Q668" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Germany" },
    { "@type": "AdministrativeArea", name: "South East Asia" },
    { "@type": "AdministrativeArea", name: "Middle East" },
  ],

  // Services offered
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "HR Consulting & Recruitment Services",
    itemListElement: [
      "Permanent Hiring",
      "Executive Search",
      "IT Recruitment",
      "RPO Solutions",
      "HR Consulting",
      "AI Recruitment (TalentIQ)",
      "Talent Mapping",
      "Employer Branding",
    ].map((name, position) => ({
      "@type": "ListItem",
      position: position + 1,
      item: {
        "@type": "Service",
        name,
        provider: { "@id": `${BASE}/#organization` },
      },
    })),
  },

  // Social profiles (sameAs is a key GEO signal — AI systems use this to resolve entity)
  sameAs: [
    "https://www.linkedin.com/company/talenti-hr-consulting-pvt--ltd-/",
    "https://www.facebook.com/talentijobs/",
    // Add these when live:
    // "https://twitter.com/talentiin",
    // "https://www.instagram.com/talentihrconsulting/",
    // "https://en.wikipedia.org/wiki/Talenti_HR_Consulting",
  ],
};

/** 2 ─ WebSite with Sitelinks Search Box */
const schemaWebSite = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${BASE}/#website`,
  url: BASE,
  name: "Talenti HR Consulting",
  description:
    "AI-powered HR consulting and recruitment firm — executive search, RPO, IT staffing, and talent management since 2009.",
  publisher: { "@id": `${BASE}/#organization` },
  inLanguage: "en-IN",
};

/** 3 ─ WebPage (homepage) */
const schemaWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE}/#webpage`,
  url: BASE,
  name: "Talenti HR Consulting | AI-Powered Recruitment & Executive Search India",
  description:
    "AI-powered recruitment, executive search, RPO & HR consulting since 2009. 10,000+ placements. 14-day average hire.",
  isPartOf: { "@id": `${BASE}/#website` },
  about: { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${BASE}/images/og-image.png`,
  },
  dateModified: new Date().toISOString().split("T")[0],
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${BASE}/#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: BASE,
      },
    ],
  },
};

/** 4 ─ Leadership — Person schema (E-E-A-T trust signal) */
const schemaPersons = [
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#kunal-bhatia`,
    name: "Kunal Bhatia",
    givenName: "Kunal",
    familyName: "Bhatia",
    jobTitle: "Founder & Managing Director",
    description:
      "Kunal Bhatia founded Talenti HR Consulting Pvt. Ltd. in 2009. He brings 19+ years of experience in HR consulting, executive search, strategic RPO, and AI-driven talent acquisition across India and global markets.",
    worksFor: { "@id": `${BASE}/#organization` },
    image: `${BASE}/images/kunal.png`,
    // sameAs: ["https://www.linkedin.com/in/YOUR_KUNAL_LINKEDIN/"],  // ← add real URL
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#rohit-singh`,
    name: "Rohit Singh",
    givenName: "Rohit",
    familyName: "Singh",
    jobTitle: "Co-Founder & Consulting Partner",
    description:
      "Rohit Singh co-founded Talenti HR Consulting with 15+ years of experience in HR, training, and talent acquisition. Post-graduate alumnus of the University of Sydney.",
    worksFor: { "@id": `${BASE}/#organization` },
    image: `${BASE}/images/rohit.png`,
    alumniOf: [
      { "@type": "CollegeOrUniversity", name: "University of Sydney" },
      { "@type": "CollegeOrUniversity", name: "Niagara College of Canada" },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE}/#shikha-bhatia`,
    name: "Shikha Bhatia",
    givenName: "Shikha",
    familyName: "Bhatia",
    jobTitle: "Consulting Partner — IT & Europe",
    description:
      "Shikha Bhatia leads technology recruitment and European market hiring at Talenti HR Consulting, specialising in CXO and leadership-level searches for captive centres in India.",
    worksFor: { "@id": `${BASE}/#organization` },
    image: `${BASE}/images/shikha.png`,
  },
];

/** 5 ─ Top Services */
const schemaServices = [
  {
    name: "Executive Search & CXO Recruitment India",
    serviceType: "Executive Search",
    description:
      "Confidential CXO, VP, and Director-level executive search for companies across India, APAC, and Europe. Market mapping, competitor intelligence, and culture-fit assessment included.",
    slug: "executive-search",
  },
  {
    name: "RPO — Recruitment Process Outsourcing India",
    serviceType: "Recruitment Process Outsourcing",
    description:
      "Fully managed RPO embedded within your organisation — end-to-end hiring lifecycle management, AI-powered sourcing, and SLA-driven delivery for enterprises across India.",
    slug: "rpo-solutions",
  },
  {
    name: "IT Recruitment & Technology Staffing India",
    serviceType: "IT Staffing",
    description:
      "Specialist technology recruitment for software engineers, architects, data scientists, DevOps, cloud engineers, and product managers across India and globally.",
    slug: "it-recruitment",
  },
  {
    name: "AI-Powered Recruitment — TalentIQ Platform",
    serviceType: "AI Recruitment",
    description:
      "AI resume screening, candidate match scoring (0–100), predictive analytics, and smart ATS — Talenti's proprietary TalentIQ platform transforms enterprise talent acquisition.",
    slug: "ai-recruitment",
  },
  {
    name: "Permanent Hiring India",
    serviceType: "Permanent Recruitment",
    description:
      "Full-cycle permanent recruitment for mid to senior-level roles across functions with AI-assisted sourcing, screening, and placement guarantee.",
    slug: "permanent-hiring",
  },
  {
    name: "HR Consulting India",
    serviceType: "HR Consulting",
    description:
      "Strategic HR advisory covering workforce planning, HR redesign, compensation benchmarking, org development, and CHRO partnership.",
    slug: "hr-consulting",
  },
].map((s) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `${BASE}/services/${s.slug}#service`,
  name: s.name,
  serviceType: s.serviceType,
  provider: { "@id": `${BASE}/#organization` },
  description: s.description,
  areaServed: { "@type": "Country", name: "India" },
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    seller: { "@id": `${BASE}/#organization` },
  },
}));

// ─────────────────────────────────────────────────────────────────
//  ROOT LAYOUT
// ─────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: ReactNode }) {
  // All schemas in one array — renders as individual <script> tags
  const allSchemas = [
    schemaOrganization,
    schemaWebSite,
    schemaWebPage,
    ...schemaPersons,
    ...schemaServices,
  ];

  return (
    <html lang="en-IN">
      <head>
        {/* ── JSON-LD Schema Markup ─────────────────────────────── */}
        {allSchemas.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}

        {/* ── Preconnect for CDN resources used in the page ────── */}
        <link rel="preconnect" href="https://cdn.jsdelivr.net" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  );
}