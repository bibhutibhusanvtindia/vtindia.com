"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, TriangleAlert } from "lucide-react";
import { Field } from "@/components/forms/Field";

type Status = { state: "idle" | "sending" | "sent" } | { state: "error"; message: string };

export function CareerForm() {
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
        <h3 className="text-lg font-semibold">Application received.</h3>
        <p className="text-sm text-muted">Thank you for your interest in joining Virtoy. We&apos;ll be in touch.</p>
        <button onClick={() => setStatus({ state: "idle" })} className="mt-2 text-sm font-semibold text-primary hover:underline">
          Submit another application
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-border bg-surface p-7">
      <input type="text" name="company_website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Your name" name="name" required placeholder="Full name" />
        <Field label="Your email" name="email" type="email" required placeholder="you@email.com" />
        <Field label="Your phone" name="phone" type="tel" required placeholder="+91" />
        <Field label="City" name="city" placeholder="City" />
        <Field label="Postcode" name="postcode" placeholder="PIN code" />
        <Field label="Address" name="address" placeholder="Street address" />
      </div>

      <Field
        label="Your resume (PDF or Word, max 5MB)"
        name="resume"
        type="file"
        accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="mt-5"
      />
      <Field label="Message" name="message" textarea rows={4} placeholder="Tell us about yourself" className="mt-5" />

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
        {status.state === "sending" ? "Submitting…" : "Submit application"}
      </button>
    </form>
  );
}
