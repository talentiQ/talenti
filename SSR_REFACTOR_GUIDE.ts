// ─────────────────────────────────────────────────────────────────
//  SSR_REFACTOR_GUIDE.md
//  The most important SEO change for the Talenti website.
//
//  PROBLEM: The entire TalentiWebsite.jsx is a single "use client"
//  component. Googlebot and AI crawlers receive a near-empty HTML
//  shell — all text content is invisible to search engines.
//
//  SOLUTION: Split into a server component (page.tsx) that renders
//  all static content as HTML, with small "use client" islands only
//  for the parts that actually need interactivity.
// ─────────────────────────────────────────────────────────────────

/*
═══════════════════════════════════════════════════════════════════
  FILE STRUCTURE AFTER REFACTOR
═══════════════════════════════════════════════════════════════════

app/
  layout.tsx              ← export metadata, viewport; add <JsonLd />
  page.tsx                ← SERVER component (no "use client")
  sitemap.ts
  robots.ts               ← (or use public/robots.txt)

components/
  JsonLd.tsx              ← schema markup (no interactivity needed)
  Nav.tsx                 ← "use client" (mobile menu state)
  HeroSection.tsx         ← server (static text, stats)
  HeroDashboard.tsx       ← "use client" (Counter animation)
  ServicesSection.tsx     ← server (pure static)
  ProcessTimeline.tsx     ← "use client" (scrollTo button)
  AIPlatformSection.tsx   ← server (mockup is static)
  IndustriesSection.tsx   ← server
  WhyTalentiSection.tsx   ← server
  TestimonialsSection.tsx ← server
  FaqSection.tsx          ← "use client" (accordion state)
  BlogSection.tsx         ← server
  ContactSection.tsx      ← "use client" (form state)
  Footer.tsx              ← "use client" (modal triggers only)
  Modal.tsx               ← "use client"

═══════════════════════════════════════════════════════════════════
  app/page.tsx  —  SERVER COMPONENT (the new root)
═══════════════════════════════════════════════════════════════════
*/

// app/page.tsx
// NO "use client" at the top — this is a React Server Component.
// Everything here renders as static HTML that Googlebot can read.

import Nav            from "@/components/Nav";
import HeroSection    from "@/components/HeroSection";
import TrustSection   from "@/components/TrustSection";
import ServicesSection from "@/components/ServicesSection";
import ProcessTimeline from "@/components/ProcessTimeline";
import AIPlatformSection from "@/components/AIPlatformSection";
import IndustriesSection from "@/components/IndustriesSection";
import WhyTalentiSection from "@/components/WhyTalentiSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FaqSection     from "@/components/FaqSection";
import BlogSection    from "@/components/BlogSection";
import ContactSection from "@/components/ContactSection";
import Footer         from "@/components/Footer";
import GlobalStyles   from "@/components/GlobalStyles";  // inject GLOBAL_CSS

export default function HomePage() {
  return (
    <>
      <GlobalStyles />
      <Nav />
      <HeroSection />
      <TrustSection />
      <ServicesSection />
      <ProcessTimeline />
      <AIPlatformSection />
      <IndustriesSection />
      <WhyTalentiSection />
      <TestimonialsSection />
      <FaqSection />
      <BlogSection />
      <ContactSection />
      <Footer />
    </>
  );
}

/*
═══════════════════════════════════════════════════════════════════
  EXAMPLE: ServicesSection.tsx  —  PURE SERVER COMPONENT
  (no "use client" — renders directly to HTML)
═══════════════════════════════════════════════════════════════════
*/

// components/ServicesSection.tsx
// No "use client" needed — this is 100% static content.

const SERVICES = [
  { icon: "users",  title: "Permanent Hiring",
    desc: "Full-cycle permanent recruitment for mid to senior-level roles across functions with AI-assisted sourcing and screening.",
    bg: "#EFF6FF", ic: "#2563EB" },
  // ... rest of services
];

export default function ServicesSection() {
  return (
    <section id="services" className="t-section" aria-labelledby="svc-h">
      <div className="t-container">
        <div className="t-sec-header">
          <div className="t-sec-tag t-tag-blue">Our Services</div>
          <h2 className="t-sec-title" id="svc-h">
            End-to-End Recruitment &amp; HR Solutions
          </h2>
          <p className="t-sec-sub">
            From entry-level staffing to C-suite executive search — we cover
            the full spectrum of talent acquisition and HR transformation.
          </p>
        </div>
        <div className="t-svc-grid">
          {SERVICES.map((s) => (
            // No onClick, no state — pure server HTML
            <article key={s.title} className="t-svc-card">
              <div className="t-svc-icon" style={{ background: s.bg }}>
                <i className={`ti ti-${s.icon}`} style={{ color: s.ic }} aria-hidden="true" />
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/*
═══════════════════════════════════════════════════════════════════
  EXAMPLE: FaqSection.tsx  —  CLIENT COMPONENT (accordion only)
  Keep "use client" here because it needs useState for open/close.
  BUT the FAQ *text content* is still rendered as HTML — Next.js
  does a server-side pre-render pass even for client components,
  so the text is visible in the initial HTML payload.
═══════════════════════════════════════════════════════════════════
*/

// components/FaqSection.tsx
"use client";

import { useState, useCallback } from "react";

const FAQS = [
  { q: "What is AI-powered recruitment and how does Talenti use it?",
    a: "AI-powered recruitment uses machine learning..." },
  // ...
];

export default function FaqSection() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const toggleFaq = useCallback((i: number) => setActiveFaq(v => v === i ? null : i), []);

  return (
    <section id="faq" className="t-section" itemScope itemType="https://schema.org/FAQPage">
      <div className="t-container">
        {/* Section header rendered as static HTML even in client component */}
        <h2 className="t-sec-title">Frequently Asked Questions</h2>
        {FAQS.map((f, i) => (
          <div key={i} itemScope itemProp="mainEntity" itemType="https://schema.org/Question">
            <button
              className={`t-faq-q${activeFaq === i ? " active" : ""}`}
              onClick={() => toggleFaq(i)}
              aria-expanded={activeFaq === i}
              itemProp="name"
            >
              {f.q}
            </button>
            <div className={`t-faq-ans${activeFaq === i ? " open" : ""}`}
              itemScope itemProp="acceptedAnswer" itemType="https://schema.org/Answer">
              <div className="t-faq-ans-inner" itemProp="text">{f.a}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/*
═══════════════════════════════════════════════════════════════════
  WHAT THIS ACHIEVES (SEO impact)
═══════════════════════════════════════════════════════════════════

  BEFORE (current):
  - Googlebot receives: <div id="__next"></div> + JS bundle
  - All hero text, services, FAQ answers = INVISIBLE
  - Google cannot categorise the page
  - AI crawlers cannot extract content for citations

  AFTER (server components):
  - Googlebot receives full HTML including:
    • H1: "Empowering Businesses Through Smart HR Solutions & AI Innovation"
    • H2s: "End-to-End Recruitment & HR Solutions", "From Brief to Hire..."
    • All service descriptions
    • All FAQ question+answer text (itemProp="text" visible in HTML)
    • All testimonials
    • All industry names
    • Contact details
  - AI systems can now extract: entity name, services, statistics,
    FAQ answers, location, contact details → direct citations

═══════════════════════════════════════════════════════════════════
  QUICK WIN: If a full refactor takes too long, add this to page.tsx
  as a TEMPORARY fix — it SSG-renders the critical text content:
═══════════════════════════════════════════════════════════════════

// app/page.tsx  —  TEMPORARY "thin server layer" approach
// Render a static HTML shadow of the critical content,
// then hydrate with the full React component.

export default function Page() {
  return (
    <>
      {/* Static SEO layer — visible to crawlers, hidden from users */}
      <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", width: 1, height: 1, overflow: "hidden" }}>
        <h1>Empowering Businesses Through Smart HR Solutions & AI Innovation</h1>
        <p>Since 2009, Talenti has been the trusted HR partner for SMEs and enterprises across India and globally.</p>
        <h2>End-to-End Recruitment & HR Solutions</h2>
        <h2>AI-Powered Recruitment — TalentIQ Platform</h2>
        <h2>Industries We Serve</h2>
        {/* ... add all key headings and text */}
      </div>
      {/* Full interactive component */}
      <TalentiWebsite />
    </>
  );
}

// ⚠ NOTE: The "hidden layer" approach is a quick win but not ideal.
// Google may deprioritise hidden content. It buys time while you
// do the proper component split above.
*/
