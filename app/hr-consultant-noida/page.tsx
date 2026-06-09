/**
 * app/hr-consultant-noida/page.tsx
 * URL: http://localhost:3000/hr-consultant-noida
 *       https://www.talenti.in/hr-consultant-noida
 *
 * NO "use client" — this is a Server Component.
 * Metadata + JSON-LD are injected server-side.
 */
import type { Metadata } from "next";
import Link from "next/link";

/* ── Page-specific SEO metadata ─────────────────────────────────── */
export const metadata: Metadata = {
  title: "HR Consultant in Noida | 15+ Years Experience | Talenti HR",
  description:
    "Looking for a trusted HR consultant in Noida? Talenti HR Consulting Pvt. Ltd. — expert recruitment, executive search, RPO & HR outsourcing in Noida & Delhi NCR since 2009. Call +91-8826319888.",
  alternates: {
    canonical: "https://www.talenti.in/hr-consultant-noida",
  },
  openGraph: {
    title: "HR Consultant in Noida | Talenti HR Consulting Pvt. Ltd.",
    description:
      "Top HR consulting firm in Noida since 2009 — executive search, IT recruitment, RPO, HR outsourcing & TalentIQ AI platform. Call +91-8826319888.",
    url: "https://www.talenti.in/hr-consultant-noida",
  },
  keywords: [
    "HR Consultant Noida",
    "HR Consulting Firm Noida",
    "Best HR Consultant Noida",
    "HR Outsourcing Noida",
    "Recruitment Agency Noida",
    "Staffing Company Noida",
    "HR Consulting Delhi NCR",
    "Talent Acquisition Noida",
  ],
};

/* ── JSON-LD structured data ─────────────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": "Talenti HR Consulting Pvt. Ltd.",
      "description":
        "Best HR consulting firm in Noida offering executive search, IT recruitment, RPO, HR outsourcing, and strategic HR advisory since 2009.",
      "url": "https://www.talenti.in/hr-consultant-noida",
      "telephone": "+91-8826319888",
      "email": "info@talenti.biz",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Noida",
        "addressRegion": "Uttar Pradesh",
        "postalCode": "201309",
        "addressCountry": "IN",
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": 28.5355,
        "longitude": 77.3910,
      },
      "areaServed": ["Noida", "Greater Noida", "Delhi", "Gurgaon", "Delhi NCR"],
      "sameAs": [
        "https://www.linkedin.com/company/talenti-hr-consulting-pvt--ltd-/",
        "https://www.facebook.com/talentijobs/",
      ],
    },
    {
      "@type": "FAQPage",
      "mainEntity": [
        {
          "@type": "Question",
          "name": "Which is the best HR consulting firm in Noida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Talenti HR Consulting Pvt. Ltd., headquartered in Noida since 2009, is one of the best HR consulting firms in Noida and Delhi NCR. We offer executive search, IT recruitment, RPO, HR outsourcing, and AI-powered TalentIQ platform services.",
          },
        },
        {
          "@type": "Question",
          "name": "Do you provide HR outsourcing for small businesses in Noida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Yes. Talenti offers complete HR outsourcing for SMEs in Noida — payroll, compliance, recruitment, performance management, and employee engagement at a fraction of in-house team costs.",
          },
        },
        {
          "@type": "Question",
          "name": "How quickly can you fill a vacancy in Noida?",
          "acceptedAnswer": {
            "@type": "Answer",
            "text":
              "Our average time-to-hire is 18 days. For senior roles in Noida & NCR, we present a qualified shortlist within 5–7 working days of mandate briefing.",
          },
        },
      ],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home",                "item": "https://www.talenti.in" },
        { "@type": "ListItem", "position": 2, "name": "HR Consultant Noida", "item": "https://www.talenti.in/hr-consultant-noida" },
      ],
    },
  ],
};

/* ── Page component ─────────────────────────────────────────────── */
export default function HRConsultantNoidaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main style={{ fontFamily: "'Inter',system-ui,sans-serif", color: "#0F172A" }}>

        {/* ── HERO ── */}
        <section style={{ background: "linear-gradient(135deg,#F8FAFC,#EFF6FF)", padding: "72px 24px 56px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>

            {/* Breadcrumb */}
            <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "#64748B", marginBottom: 28, display: "flex", gap: 6, alignItems: "center" }}>
              <Link href="/" style={{ color: "#2563EB", textDecoration: "none" }}>Home</Link>
              <span>›</span>
              <span>HR Consultant Noida</span>
            </nav>

            {/* Badge */}
            <span style={{ background: "#EFF6FF", border: "1px solid #DBEAFE", color: "#2563EB", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Noida · Delhi NCR · Since 2009
            </span>

            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, letterSpacing: "-0.02em", lineHeight: 1.12, marginTop: 18, marginBottom: 18 }}>
              Best HR Consultant in Noida &amp;<br />Delhi NCR — Talenti HR Consulting
            </h1>

            <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.8, maxWidth: 660, marginBottom: 36 }}>
              Since <strong>2009</strong>, Talenti HR Consulting Pvt. Ltd. has been Noida's most trusted HR consulting partner — delivering expert recruitment, executive search, HR outsourcing, and AI-powered talent management through our <strong>TalentIQ platform</strong>.
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="tel:+918826319888"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#2563EB", color: "white", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none", boxShadow: "0 4px 14px rgba(37,99,235,0.3)" }}>
                📞 Call +91-8826319888
              </a>
              <a href="https://wa.me/918826319888" target="_blank" rel="noopener noreferrer"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#25D366", color: "white", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                💬 WhatsApp
              </a>
              <Link href="/#contact"
                style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "white", color: "#0F172A", border: "1.5px solid #E2E8F0", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                Book Free Consultation →
              </Link>
            </div>

            {/* Trust strip */}
            <div style={{ display: "flex", gap: 32, marginTop: 48, paddingTop: 32, borderTop: "1px solid #E2E8F0", flexWrap: "wrap" }}>
              {[["15+", "Years in Noida"], ["500K+", "Resume Database"], ["98%", "Retention Rate"], ["18 Days", "Avg. Time-to-Hire"]].map(([v, l]) => (
                <div key={l}>
                  <div style={{ fontFamily: "system-ui", fontSize: 28, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 13, color: "#94A3B8", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── SERVICES ── */}
        <section style={{ padding: "72px 24px", background: "white" }} aria-labelledby="services-h">
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <span style={{ background: "#EFF6FF", color: "#2563EB", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase" }}>Our Services</span>
            <h2 id="services-h" style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, marginTop: 14, marginBottom: 8, letterSpacing: "-0.02em" }}>
              HR Consulting Services in Noida &amp; Delhi NCR
            </h2>
            <p style={{ fontSize: 16, color: "#64748B", marginBottom: 40, lineHeight: 1.75 }}>
              Every service below is available to businesses in Noida, Greater Noida, Delhi, and across NCR — with the same senior consultants who have been serving the region since 2009.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
              {[
                { icon: "👑", title: "Executive Search Noida",          desc: "CXO, VP & Director-level hiring across IT, BFSI, manufacturing & more. Confidential mandates handled with discretion.", kw: "executive search Noida" },
                { icon: "💻", title: "IT Recruitment Agency Noida",     desc: "Software engineers, cloud architects, data scientists, DevOps & product managers for startups and enterprises.", kw: "IT recruitment Noida" },
                { icon: "🔄", title: "RPO Services Delhi NCR",          desc: "Embedded recruitment teams for high-volume hiring — reducing cost-per-hire by 30–40% vs. traditional methods.", kw: "RPO services Noida" },
                { icon: "🏢", title: "HR Outsourcing for SMEs",         desc: "Complete HR function management — payroll, compliance, performance management — without full-time overhead.", kw: "HR outsourcing Noida" },
                { icon: "🗺️", title: "Talent Mapping Noida",           desc: "Proactively map and track top talent in Noida's business parks before you need to hire. Build your talent pipeline.", kw: "talent mapping Delhi NCR" },
                { icon: "📊", title: "HR Advisory &amp; Consulting",    desc: "Workforce planning, compensation benchmarking, org design, and HR process audits for growing businesses.", kw: "HR advisory Noida" },
              ].map(s => (
                <article key={s.title} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: "24px 22px", transition: "box-shadow 0.2s" }}>
                  <div style={{ fontSize: 28, marginBottom: 12 }}>{s.icon}</div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{s.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.7 }} dangerouslySetInnerHTML={{ __html: s.desc }} />
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY TALENTI IN NOIDA ── */}
        <section style={{ padding: "72px 24px", background: "#F8FAFC" }} aria-labelledby="why-h">
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <span style={{ background: "#FDF6EC", color: "#8B6914", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase" }}>Why Talenti</span>
            <h2 id="why-h" style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, marginTop: 14, marginBottom: 24, letterSpacing: "-0.02em" }}>
              Why Talenti is Noida's Top HR Consulting Choice Since 2009
            </h2>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))", gap: 20 }}>
              {[
                { title: "Locally embedded since 2009",    body: "Our consultants have deep roots in Noida's Sector 62, 63, and 125 tech parks — trusted by companies from startups to large enterprises for 15+ years." },
                { title: "AI-powered via TalentIQ",        body: "Our proprietary TalentIQ platform screens thousands of profiles in seconds, reducing time-to-hire by 60% and surfacing only the best-matched candidates." },
                { title: "60+ years combined expertise",   body: "Our founding partners Kunal Bhatia, Rohit Singh, and Shikha Bhatia bring a cumulative 60+ years in HR, talent acquisition, and management consulting." },
                { title: "500K+ pre-screened profiles",    body: "Our resume database of 500,000+ verified candidates across India and global markets gives you immediate access to the best talent in any domain." },
                { title: "Global reach from Noida",        body: "While headquartered in Noida, we actively source and place talent across India, APAC, Middle East, UK and Europe — all managed from our NCR base." },
                { title: "SLA-guaranteed delivery",        body: "Every engagement comes with written SLAs — shortlist within 5–7 working days, replacement guarantee up to 90 days, and weekly progress dashboards." },
              ].map(w => (
                <div key={w.title} style={{ background: "white", border: "1px solid #E2E8F0", borderRadius: 14, padding: "24px 22px" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#0F172A", marginBottom: 8 }}>{w.title}</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.75 }}>{w.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section style={{ padding: "72px 24px", background: "white" }} aria-labelledby="faq-h">
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <span style={{ background: "#EFF6FF", color: "#2563EB", fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 100, letterSpacing: "0.08em", textTransform: "uppercase" }}>FAQ</span>
            <h2 id="faq-h" style={{ fontSize: "clamp(22px,3vw,32px)", fontWeight: 800, marginTop: 14, marginBottom: 32, letterSpacing: "-0.02em" }}>
              HR Consulting Noida — Frequently Asked Questions
            </h2>

            {[
              { q: "Which is the best HR consulting firm in Noida?",
                a: "Talenti HR Consulting Pvt. Ltd. is widely regarded as one of the best HR consulting firms in Noida, with 15+ years of experience, a founding team with 60+ combined years of expertise, and an AI-powered TalentIQ platform for faster, more accurate hiring." },
              { q: "What HR services does Talenti offer in Noida?",
                a: "We offer executive search, permanent hiring, IT recruitment, RPO (Recruitment Process Outsourcing), HR outsourcing for SMEs, talent mapping, employer branding, and strategic HR advisory — all available to businesses in Noida and across Delhi NCR." },
              { q: "Do you provide HR outsourcing for small businesses in Noida?",
                a: "Yes. Our HR outsourcing packages are specifically designed for small and mid-sized businesses in Noida, covering payroll, compliance, recruitment, performance management, and employee engagement — at a fraction of the cost of a full in-house HR team." },
              { q: "How quickly can you fill a position in Noida?",
                a: "Our average time-to-hire is 18 days. For roles in Noida and NCR, we typically present a qualified shortlist within 5–7 working days of receiving a detailed mandate. CXO-level positions take 21–30 days." },
              { q: "Does Talenti work with IT companies in Noida's Sector 62 and 63?",
                a: "Absolutely. We have deep networks across Noida's technology corridors — Sector 62, 63, 125, and 135 — and have placed hundreds of IT professionals in companies ranging from product startups to large IT service firms." },
              { q: "How do I get started with Talenti HR Consulting in Noida?",
                a: "Simply call +91-8826319888, email info@talenti.biz, or WhatsApp us to schedule a free 30-minute consultation. We'll discuss your requirements and recommend the right service — with no upfront commitment." },
            ].map((f, i) => (
              <details key={i} style={{ border: "1px solid #E2E8F0", borderRadius: 12, marginBottom: 10, overflow: "hidden" }}>
                <summary style={{ padding: "18px 22px", fontWeight: 600, fontSize: 15, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {f.q}
                  <span style={{ fontSize: 20, color: "#94A3B8", flexShrink: 0, marginLeft: 12 }}>+</span>
                </summary>
                <p style={{ margin: 0, padding: "0 22px 18px", fontSize: 14, color: "#475569", lineHeight: 1.8 }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* ── FINAL CTA ── */}
        <section style={{ padding: "72px 24px", background: "linear-gradient(135deg,#1E3A5F,#2563EB)" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center" }}>
            <h2 style={{ fontSize: "clamp(22px,3vw,34px)", fontWeight: 800, color: "white", marginBottom: 14, letterSpacing: "-0.02em" }}>
              Talk to an HR Consultant in Noida Today
            </h2>
            <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 16, marginBottom: 36, lineHeight: 1.75 }}>
              Free 30-minute consultation · No commitment required · Guaranteed response within 4 business hours
            </p>
            <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+918826319888"
                style={{ background: "white", color: "#1E3A5F", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                📞 +91-8826319888
              </a>
              <a href="https://wa.me/918826319888" target="_blank" rel="noopener noreferrer"
                style={{ background: "#25D366", color: "white", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                💬 WhatsApp Now
              </a>
              <a href="mailto:info@talenti.biz"
                style={{ background: "rgba(255,255,255,0.12)", color: "white", border: "1.5px solid rgba(255,255,255,0.25)", padding: "14px 32px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>
                ✉ info@talenti.biz
              </a>
            </div>
          </div>
        </section>

      </main>
    </>
  );
}