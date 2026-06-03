// app/api/contact/route.ts
// Place this file at:  app/api/contact/route.ts
// Requires: npm install resend
// Env var:  RESEND_API_KEY=re_xxxxxxxxxxxx  (in .env.local and Vercel dashboard)

import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, company, email, phone, service, message } = body;

    // Basic validation
    if (!name || !company || !email) {
      return NextResponse.json(
        { error: "Name, company, and email are required." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: "Talenti Website <info@talenti.biz>",
      to: ["info@talenti.biz"],
      replyTo: email,
      subject: `New Enquiry${service ? ` — ${service}` : ""} | ${company}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          </head>
          <body style="margin:0;padding:0;background:#F8FAFC;font-family:'Inter',system-ui,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#F8FAFC;padding:40px 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#FFFFFF;border-radius:16px;overflow:hidden;border:1px solid #E2E8F0;">

                    <!-- Header -->
                    <tr>
                      <td style="background:#1E3A5F;padding:28px 36px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <span style="font-family:system-ui,sans-serif;font-size:22px;font-weight:800;color:#FFFFFF;letter-spacing:-0.02em;">
                                Talent<span style="color:#DC2626;">i</span>
                              </span>
                              <span style="display:block;font-size:11px;color:#64748B;letter-spacing:1px;margin-top:2px;">HR CONSULTING PVT LTD</span>
                            </td>
                            <td align="right">
                              <span style="background:#2563EB;color:#FFFFFF;font-size:11px;font-weight:700;padding:5px 14px;border-radius:100px;">
                                New Website Enquiry
                              </span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Service badge if present -->
                    ${service ? `
                    <tr>
                      <td style="background:#EFF6FF;padding:14px 36px;border-bottom:1px solid #DBEAFE;">
                        <span style="font-size:12px;font-weight:600;color:#2563EB;">
                          Service Requested: ${service}
                        </span>
                      </td>
                    </tr>` : ""}

                    <!-- Contact details -->
                    <tr>
                      <td style="padding:32px 36px 24px;">
                        <p style="font-size:13px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 20px;">Contact Details</p>

                        <table width="100%" cellpadding="0" cellspacing="0">
                          ${[
                            ["Full Name", name],
                            ["Company", company],
                            ["Email", email],
                            ["Phone", phone || "Not provided"],
                          ]
                            .map(
                              ([label, value]) => `
                            <tr>
                              <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;width:140px;">
                                <span style="font-size:12px;font-weight:600;color:#94A3B8;">${label}</span>
                              </td>
                              <td style="padding:10px 0;border-bottom:1px solid #F1F5F9;">
                                <span style="font-size:14px;color:#0F172A;font-weight:500;">${value}</span>
                              </td>
                            </tr>`
                            )
                            .join("")}
                        </table>
                      </td>
                    </tr>

                    <!-- Requirements -->
                    ${message ? `
                    <tr>
                      <td style="padding:0 36px 32px;">
                        <p style="font-size:13px;font-weight:700;color:#94A3B8;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 12px;">Requirements</p>
                        <div style="background:#F8FAFC;border:1px solid #E2E8F0;border-radius:10px;padding:16px 20px;">
                          <p style="font-size:14px;color:#334155;line-height:1.75;margin:0;">${message.replace(/\n/g, "<br/>")}</p>
                        </div>
                      </td>
                    </tr>` : ""}

                    <!-- CTA -->
                    <tr>
                      <td style="padding:0 36px 32px;">
                        <a href="mailto:${email}"
                           style="display:inline-block;background:#2563EB;color:#FFFFFF;font-size:14px;font-weight:600;padding:12px 24px;border-radius:8px;text-decoration:none;">
                          Reply to ${name.split(" ")[0]} →
                        </a>
                      </td>
                    </tr>

                    <!-- Footer -->
                    <tr>
                      <td style="background:#F8FAFC;border-top:1px solid #E2E8F0;padding:18px 36px;">
                        <p style="font-size:12px;color:#94A3B8;margin:0;">
                          Submitted via <strong style="color:#64748B;">talenti.in</strong> &nbsp;·&nbsp;
                          ${new Date().toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })} IST
                        </p>
                      </td>
                    </tr>

                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Failed to send email. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (err) {
    console.error("Contact route error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}