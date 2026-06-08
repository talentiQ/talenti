// components/JsonLd.tsx
// Uses next/script instead of JSX fragments to avoid the
// react/jsx-runtime module resolution error in some TS configs.

import Script from "next/script";

const BASE = "https://www.talenti.in";

// ── 1. Organization + LocalBusiness + ProfessionalService ────────
const schemaOrganization = {
  "@context": "https://schema.org",
  "@type": ["Organization", "LocalBusiness", "ProfessionalService"],
  "@id": `${BASE}/#organization`,
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
    "Talenti HR Consulting Pvt. Ltd. is an AI-powered recruitment, executive search, RPO, and HR consulting firm based in Noida, India. Founded in 2009, Talenti has completed 10,000+ placements for 150+ companies across India, APAC, Middle East, and Europe.",
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
  address: {
    "@type": "PostalAddress",
    streetAddress: "1108, T1, Assotech Business Cresterra, Sector 135",
    addressLocality: "Noida",
    addressRegion: "Uttar Pradesh",
    postalCode: "201301",
    addressCountry: "IN",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 28.5072,
    longitude: 77.3973,
  },
  telephone: "+91-8826319888",
  email: "info@talenti.biz",
  priceRange: "₹₹₹",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      opens: "09:00",
      closes: "19:00",
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      telephone: "+91-8826319888",
      contactType: "customer service",
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
  areaServed: [
    { "@type": "Country", name: "India" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United Arab Emirates" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Germany" },
    { "@type": "AdministrativeArea", name: "Middle East" },
  ],
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
    ].map((name, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Service",
        name,
        provider: { "@id": `${BASE}/#organization` },
      },
    })),
  },
  sameAs: [
    "https://www.linkedin.com/company/talenti-hr-consulting-pvt--ltd-/",
    "https://www.facebook.com/talentijobs/",
    // "https://twitter.com/talentiin",
    // "https://en.wikipedia.org/wiki/Talenti_HR_Consulting",
  ],
};

// ── 2. WebSite ───────────────────────────────────────────────────
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

// ── 3. WebPage (homepage) ────────────────────────────────────────
const schemaWebPage = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": `${BASE}/#webpage`,
  url: BASE,
  name: "Talenti HR Consulting | AI-Powered Recruitment & Executive Search India",
  isPartOf: { "@id": `${BASE}/#website` },
  about: { "@id": `${BASE}/#organization` },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${BASE}/images/og-image.png`,
  },
  inLanguage: "en-IN",
  breadcrumb: {
    "@type": "BreadcrumbList",
    "@id": `${BASE}/#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE },
    ],
  },
};

// ── 4. Leadership — Person (E-E-A-T signal) ──────────────────────
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
      "Kunal Bhatia founded Talenti HR Consulting Pvt. Ltd. in 2009 with 19+ years of experience in HR consulting, executive search, strategic RPO, and AI-driven talent acquisition.",
    worksFor: { "@id": `${BASE}/#organization` },
    image: `${BASE}/images/kunal.png`,
    // sameAs: ["https://www.linkedin.com/in/YOUR_LINKEDIN_URL/"],
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
      "Rohit Singh co-founded Talenti HR Consulting with 15+ years of experience in HR and talent acquisition. Post-graduate alumnus of the University of Sydney.",
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

// ── 5. Services ──────────────────────────────────────────────────
const schemaServices = [
  {
    name: "Executive Search & CXO Recruitment India",
    serviceType: "Executive Search",
    slug: "executive-search",
    description:
      "Confidential CXO, VP, and Director-level executive search for companies across India, APAC, and Europe.",
  },
  {
    name: "RPO — Recruitment Process Outsourcing India",
    serviceType: "Recruitment Process Outsourcing",
    slug: "rpo-solutions",
    description:
      "Fully managed RPO embedded within your organisation — end-to-end hiring lifecycle management with AI-powered sourcing and SLA-driven delivery.",
  },
  {
    name: "IT Recruitment & Technology Staffing India",
    serviceType: "IT Staffing",
    slug: "it-recruitment",
    description:
      "Specialist technology recruitment for software engineers, data scientists, DevOps, cloud engineers, and product managers across India.",
  },
  {
    name: "AI-Powered Recruitment — TalentIQ Platform",
    serviceType: "AI Recruitment",
    slug: "ai-recruitment",
    description:
      "AI resume screening, candidate match scoring (0–100), predictive analytics, and smart ATS via Talenti's proprietary TalentIQ platform.",
  },
  {
    name: "Permanent Hiring India",
    serviceType: "Permanent Recruitment",
    slug: "permanent-hiring",
    description:
      "Full-cycle permanent recruitment for mid to senior-level roles with AI-assisted sourcing and a 90-day placement guarantee.",
  },
  {
    name: "HR Consulting India",
    serviceType: "HR Consulting",
    slug: "hr-consulting",
    description:
      "Strategic HR advisory covering workforce planning, compensation benchmarking, org development, and CHRO partnership.",
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

// ── All schemas combined ─────────────────────────────────────────
const ALL_SCHEMAS = [
  schemaOrganization,
  schemaWebSite,
  schemaWebPage,
  ...schemaPersons,
  ...schemaServices,
];

// ── Component ────────────────────────────────────────────────────
// Uses next/script with strategy="beforeInteractive" so schema
// is present in the initial HTML payload seen by crawlers.
export default function JsonLd() {
  return (
    <>
      {ALL_SCHEMAS.map((schema, i) => (
        <Script
          key={`schema-${i}`}
          id={`schema-${i}`}
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}