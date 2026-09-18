"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { Field } from "@/components/forms/Field";
import { useLanguage } from "@/lib/translations";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function CareerForm() {
  const { t } = useLanguage();
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setStatus({ state: "sending" });

    const response = await fetch("/api/careers", { method: "POST", body: new FormData(form) });
    const data = await response.json().catch(() => ({}));

    if (response.ok) {
      form.reset();
      setStatus({ state: "sent" });
    } else {
      setStatus({ state: "error", message: data.error ?? "Something went wrong. Please try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="flex flex-col items-start gap-3 rounded-2xl border border-primary/30 bg-primary/5 p-8">
        <CheckCircle2 className="h-8 w-8 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">{t("form_app_received")}</h3>
        <p className="text-sm text-muted">{t("form_app_received_desc")}</p>
        <button onClick={() => setStatus({ state: "idle" })} className="mt-2 text-sm font-semibold text-primary hover:underline">
          {t("form_submit_another")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-7 shadow-sm">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={t("form_name")} name="name" required placeholder={t("form_name_ph")} />
        <Field label={t("form_email")} name="email" type="email" required placeholder={t("form_email_ph")} />
        <Field label={t("form_phone")} name="phone" type="tel" required placeholder={t("form_phone_ph")} />
        <Field label={t("form_city")} name="city" placeholder={t("form_city")} />
        <Field label={t("form_postcode")} name="postcode" placeholder={t("form_postcode_ph")} />
        <Field label={t("form_address")} name="address" placeholder={t("form_address_ph")} />
      </div>

      <Field
        label={t("form_resume")}
        name="resume"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="mt-5"
      />
      <Field label={t("form_message")} name="message" textarea rows={4} placeholder={t("form_about_you")} className="mt-5" />

      {status.state === "error" ? (
        <p className="mt-4 flex items-start gap-2 rounded-xl border border-primary/30 bg-primary/5 p-3 text-sm text-primary">
          <TriangleAlert className="mt-0.5 h-4 w-4 shrink-0" />
          {status.message}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-primary-strong disabled:opacity-60"
      >
        {status.state === "sending" ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
        {status.state === "sending" ? t("form_submitting") : t("form_submit_app")}
      </button>
    </form>
  );
}
