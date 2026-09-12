import nodemailer from "nodemailer";

export type Attachment = { filename: string; content: Buffer; contentType: string };

const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, MAIL_TO, MAIL_FROM } = process.env;

export const mailConfigured = Boolean(SMTP_HOST && SMTP_USER && SMTP_PASS && MAIL_TO);

export async function sendMail({
  subject,
  text,
  replyTo,
  attachments,
}: {
  subject: string;
  text: string;
  replyTo?: string;
  attachments?: Attachment[];
}) {
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT ?? 587),
    secure: Number(SMTP_PORT ?? 587) === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  await transport.sendMail({
    from: MAIL_FROM ?? SMTP_USER,
    to: MAIL_TO,
    subject,
    text,
    replyTo,
    attachments,
  });
}
