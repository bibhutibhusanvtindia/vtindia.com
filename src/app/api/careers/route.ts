import { NextResponse } from "next/server";
import { collect } from "@/lib/validate";
import { mailConfigured, sendMail, type Attachment } from "@/lib/mail";

const MAX_RESUME_BYTES = 5 * 1024 * 1024;
const ALLOWED_RESUME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  const form = await request.formData();

  if (typeof form.get("company_website") === "string" && form.get("company_website")) {
    return NextResponse.json({ ok: true });
  }

  const result = collect(form, {
    name: { max: 120, required: true },
    email: { max: 200, required: true, email: true },
    phone: { max: 40, required: true },
    city: { max: 120 },
    postcode: { max: 20 },
    address: { max: 400 },
    message: { max: 5000 },
  });

  if ("error" in result && result.error) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  const attachments: Attachment[] = [];
  const resume = form.get("resume");

  if (resume instanceof File && resume.size > 0) {
    if (resume.size > MAX_RESUME_BYTES) {
      return NextResponse.json({ error: "Resume must be 5MB or smaller." }, { status: 400 });
    }
    if (!ALLOWED_RESUME_TYPES.includes(resume.type)) {
      return NextResponse.json({ error: "Resume must be a PDF or Word document." }, { status: 400 });
    }
    attachments.push({
      filename: resume.name.replace(/[^\w.\-]/g, "_"),
      content: Buffer.from(await resume.arrayBuffer()),
      contentType: resume.type,
    });
  }

  const { name, email, phone, city, postcode, address, message } = result.values!;

  if (!mailConfigured) {
    return NextResponse.json(
      { error: "Applications are not configured on this server yet. Please email info@vtindia.com directly." },
      { status: 503 },
    );
  }

  try {
    await sendMail({
      subject: `Career application: ${name}`,
      replyTo: email,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone}`,
        `City: ${city || "—"}`,
        `Postcode: ${postcode || "—"}`,
        `Address: ${address || "—"}`,
        "",
        message || "(no message)",
      ].join("\n"),
      attachments,
    });
  } catch (error) {
    console.error("[careers] SMTP delivery failed:", error);
    return NextResponse.json(
      { error: "We could not submit your application right now. Please email info@vtindia.com directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
