/**
 * app/hr-consulting-delhi-ncr/page.tsx
 * URL: /hr-consulting-delhi-ncr
 */
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HR Consulting Delhi NCR | Best Recruitment Firm | Talenti HR",
  description:
    "Top HR consulting firm in Delhi NCR — Talenti HR Consulting Pvt. Ltd. Expert recruitment, executive search, RPO & HR outsourcing across Delhi, Noida, Gurgaon & Faridabad since 2009. Call +91-8826319888.",
  alternates: { canonical: "https://www.talenti.in/hr-consulting-delhi-ncr" },
  openGraph: {
    title: "HR Consulting Delhi NCR | Talenti HR Consulting Pvt. Ltd.",
    description: "Leading HR consulting firm in Delhi NCR since 2009 — executive search, IT staffing, RPO & HR outsourcing powered by TalentIQ AI.",
    url: "https://www.talenti.in/hr-consulting-delhi-ncr",
  },
  keywords: ["HR Consulting Delhi NCR", "HR Consultant Delhi", "Recruitment Agency Delhi NCR", "Best HR Firm Delhi", "HR Outsourcing Delhi", "Staffing Agency Delhi NCR"],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      "name": "Talenti HR Consulting Pvt. Ltd. — Delhi NCR",
      "description": "Leading HR consulting firm in Delhi NCR offering executive search, IT recruitment, RPO, and HR outsourcing since 2009.",
      "url": "https://www.talenti.in/hr-consulting-delhi-ncr",
      "telephone": "+91-8826319888",
      "email": "info@talenti.biz",
      "address": { "@type": "PostalAddress", "addressLocality": "Noida", "addressRegion": "Uttar Pradesh", "addressCountry": "IN" },
      "areaServed": ["Delhi", "Noida", "Gurgaon", "Faridabad", "Greater Noida", "NCR"],
    },
    {
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.talenti.in" },
        { "@type": "ListItem", "position": 2, "name": "HR Consulting Delhi NCR", "item": "https://www.talenti.in/hr-consulting-delhi-ncr" },
      ],
    },
  ],
};

export default function HRConsultingDelhiNCRPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main style={{ fontFamily: "'Inter',system-ui,sans-serif", color: "#0F172A" }}>

        {/* HERO */}
        <section style={{ background: "linear-gradient(135deg,#F8FAFC,#EFF6FF)", padding: "72px 24px 56px" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: "#64748B", marginBottom: 28 }}>
              <Link href="/" style={{ color: "#2563EB", textDecoration: "none" }}>Home</Link> › HR Consulting Delhi NCR
            </nav>
            <span style={{ background: "#EFF6FF", border: "1px solid #DBEAFE", color: "#2563EB", fontSize: 12, fontWeight: 700, padding: "5px 14px", borderRadius: 100, textTransform: "uppercase", letterSpacing: "0.06em" }}>
              Delhi · Noida · Gurgaon · Faridabad
            </span>
            <h1 style={{ fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, lineHeight: 1.12, marginTop: 18, marginBottom: 18, letterSpacing: "-0.02em" }}>
              Best HR Consulting Firm in Delhi NCR —<br />Talenti HR Consulting Pvt. Ltd.
            </h1>
            <p style={{ fontSize: 18, color: "#475569", lineHeight: 1.8, maxWidth: 660, marginBottom: 36 }}>
              Serving businesses across <strong>Delhi, Noida, Gurgaon, Faridabad, and Greater Noida</strong> since 2009 — expert recruitment, executive search, RPO, HR outsourcing, and AI-powered TalentIQ platform.
            </p>
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
              <a href="tel:+918826319888" style={{ background: "#2563EB", color: "white", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>📞 +91-8826319888</a>
              <a href="https://wa.me/918826319888" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "white", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>💬 WhatsApp</a>
              <Link href="/#contact" style={{ background: "white", color: "#0F172A", border: "1.5px solid #E2E8F0", padding: "13px 28px", borderRadius: 10, fontWeight: 700, fontSize: 15, textDecoration: "none" }}>Book Consultation →</Link>
            </div>
          </div>
        </section>

        {/* WHY */}
        <section style={{ padding: "72px 24px", background: "white" }}>
          <div style={{ maxWidth: 900, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(20px,2.5vw,30px)", fontWeight: 800, marginBottom: 32, letterSpacing: "-0.02em" }}>
              Why Businesses in Delhi NCR Choose Talenti
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
              {[
                { t: "Pan-NCR Coverage", b: "Dedicated consultants for Delhi, Noida, Gurgaon, Faridabad and Greater Noida — with deep local market knowledge in every sub-region." },
                { t: "AI-Powered TalentIQ", b: "Our proprietary TalentIQ platform reduces time-to-hire by 60%, scanning 500K+ profiles to surface only the best-matched candidates for your roles." },
                { t: "15+ Years Local Expertise", b: "Founded in 2009, we have placed 10,000+ professionals across Delhi NCR — from entry-level to C-Suite, across 18+ industries." },
                { t: "60+ Years Combined HR Expertise", b: "Our founding team of Kunal Bhatia, Rohit Singh, and Shikha Bhatia brings unmatched knowledge in recruitment, training, and consulting." },
                { t: "Global Reach", b: "We source talent from India, APAC, Middle East, UK, and Europe — all coordinated from our Delhi NCR base for seamless delivery." },
                { t: "SLA-Backed Delivery", b: "Shortlist within 5–7 days, 90-day replacement guarantee, and weekly pipeline dashboards — accountability built into every engagement." },
              ].map(w => (
                <div key={w.t} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", borderRadius: 14, padding: "22px" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>{w.t}</h3>
                  <p style={{ fontSize: 13, color: "#64748B", lineHeight: 1.75 }}>{w.b}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section style={{ padding: "64px 24px", background: "linear-gradient(135deg,#1E3A5F,#2563EB)", textAlign: "center" }}>
          <div style={{ maxWidth: 640, margin: "0 auto" }}>
            <h2 style={{ fontSize: "clamp(20px,3vw,30px)", fontWeight: 800, color: "white", marginBottom: 14 }}>Connect with an HR Consultant in Delhi NCR</h2>
            <p style={{ color: "rgba(255,255,255,0.75)", marginBottom: 28 }}>Free consultation · Same-day WhatsApp response · No commitment</p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              <a href="tel:+918826319888" style={{ background: "white", color: "#1E3A5F", padding: "13px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>📞 Call Now</a>
              <a href="https://wa.me/918826319888" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "white", padding: "13px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>💬 WhatsApp</a>
              <a href="mailto:info@talenti.biz" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "1px solid rgba(255,255,255,0.3)", padding: "13px 28px", borderRadius: 10, fontWeight: 700, textDecoration: "none" }}>✉ Email Us</a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}