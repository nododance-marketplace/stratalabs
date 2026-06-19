"use client";

import { useState, type FormEvent } from "react";
import { CheckIcon } from "@/components/ui/icons";

interface FormValues {
  name: string;
  company: string;
  email: string;
  message: string;
}

const EMPTY: FormValues = { name: "", company: "", email: "", message: "" };

export function ContactForm() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof FormValues, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormValues>(key: K, value: string) {
    setValues((v) => ({ ...v, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormValues, string>> = {};
    if (!values.name.trim()) next.name = "Please enter your name.";
    if (!values.email.trim()) {
      next.email = "Please enter your email.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      next.email = "Please enter a valid email address.";
    }
    if (!values.message.trim()) next.message = "Tell us a little about your needs.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!validate()) return;

    // TODO (email): wire this up to send an email / create a CRM lead.
    // Options: a Next.js Route Handler (app/api/contact/route.ts) calling
    // Resend / SendGrid, or a form service like Formspree. For now we log.
    console.log("[Strata Labs] Contact inquiry:", values);

    setSubmitted(true);
    setValues(EMPTY);
  }

  if (submitted) {
    // Success state
    return (
      <div className="glass flex flex-col items-center gap-4 rounded-2xl p-12 text-center">
        <div className="rounded-full border border-accent/40 p-4 text-accent">
          <CheckIcon className="h-7 w-7" />
        </div>
        <h2 className="font-heading text-2xl tracking-tight text-white">
          Message received
        </h2>
        <p className="max-w-sm text-sm text-steel">
          Thanks for reaching out. This demo logs your inquiry to the console —
          wiring it to email is a TODO. Our US-based team will follow up once
          that&apos;s connected.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-accent underline-offset-4 hover:text-accent-signal hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="glass rounded-2xl p-8">
      <div className="grid gap-6 sm:grid-cols-2">
        <Field
          label="Name"
          required
          error={errors.name}
          input={
            <input
              type="text"
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              autoComplete="name"
              className={inputClass(errors.name)}
              placeholder="Jordan Avery"
            />
          }
        />
        <Field
          label="Company"
          input={
            <input
              type="text"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              autoComplete="organization"
              className={inputClass()}
              placeholder="Meridian Aerospace"
            />
          }
        />
      </div>

      <div className="mt-6">
        <Field
          label="Email"
          required
          error={errors.email}
          input={
            <input
              type="email"
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              autoComplete="email"
              className={inputClass(errors.email)}
              placeholder="you@company.com"
            />
          }
        />
      </div>

      <div className="mt-6">
        <Field
          label="Message"
          required
          error={errors.message}
          input={
            <textarea
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              rows={5}
              className={`${inputClass(errors.message)} resize-none`}
              placeholder="Which machines are you evaluating, and what are you building?"
            />
          }
        />
      </div>

      <button
        type="submit"
        className="btn-spark mt-8 w-full py-4 text-sm sm:w-auto sm:px-10"
      >
        Send inquiry
      </button>
    </form>
  );
}

function Field({
  label,
  required,
  error,
  input,
}: {
  label: string;
  required?: boolean;
  error?: string;
  input: React.ReactNode;
}) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-sm text-titanium">
        {label}
        {required && <span className="text-steel"> *</span>}
      </span>
      {input}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
}

function inputClass(error?: string) {
  return `w-full rounded-xl border bg-base-900/80 px-4 py-3 text-sm text-white placeholder:text-steel/50 outline-none transition-colors focus:border-accent/60 ${
    error ? "border-red-400/60" : "border-white/10"
  }`;
}
