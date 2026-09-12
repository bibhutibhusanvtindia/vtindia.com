import { NextResponse } from "next/server";
import { collect } from "@/lib/validate";
import { mailConfigured, sendMail } from "@/lib/mail";

export async function POST(request: Request) {
  const form = await request.formData();

  // Honeypot: real users never fill a hidden field.
  if (typeof form.get("company_website") === "string" && form.get("company_website")) {
    return NextResponse.json({ ok: true });
  }

  const result = collect(form, {
    name: { max: 120, required: true },
    email: { max: 200, required: true, email: true },
    phone: { max: 40 },
    subject: { max: 200, required: true },
    message: { max: 5000, required: true },
  });

  if ("error" in result && result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const { name, email, phone, subject, message } = result.values!;

  if (!mailConfigured) {
    return NextResponse.json(
      { error: "Email delivery is not configured on this server yet. Please email info@vtindia.com directly." },
      { status: 503 },
    );
  }

  try {
    await sendMail({
      subject: `Website enquiry: ${subject}`,
      replyTo: email,
      text: [`Name: ${name}`, `Email: ${email}`, `Phone: ${phone || "—"}`, "", message].join("\n"),
    });
  } catch (error) {
    // Never fail silently: log server-side for diagnosis, and tell the visitor
    // plainly that it did not send — without leaking transport details.
    console.error("[contact] SMTP delivery failed:", error);
    return NextResponse.json(
      { error: "We could not send your message right now. Please email info@vtindia.com directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
