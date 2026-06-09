// app/page.tsx
// ─────────────────────────────────────────────────────────────────
//  SERVER COMPONENT — no "use client" at the top.
//  Next.js pre-renders this as full HTML on the server.
//  Googlebot and AI crawlers receive all page content immediately.
// ─────────────────────────────────────────────────────────────────
 
import TalentiWebsite from "@/components/TalentiWebsite";
 
export default function Page() {
  return <TalentiWebsite />;
}
 