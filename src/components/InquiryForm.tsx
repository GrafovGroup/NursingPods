"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { business, type Locale } from "@/lib/config";
import { content } from "@/lib/content";
import { provinces } from "@/lib/locations";
import { entries } from "@/lib/pages";
import { sectionPath } from "@/lib/paths";
import { validateLead, fieldLimits } from "@/lib/leads/validation";
import { leadMessages } from "@/lib/leads/messages";
export default function InquiryForm({ locale }: { locale: Locale }) {
  const c = content[locale],
    f = c.form,
    m = leadMessages[locale];
  const form = useRef<HTMLFormElement>(null),
    summary = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false),
    [token, setToken] = useState(""),
    [busy, setBusy] = useState(false),
    [feedback, setFeedback] = useState(""),
    [errors, setErrors] = useState<Record<string, string>>({});
  useEffect(() => {
    let active = true;
    fetch("/api/inquiries/config", { cache: "no-store" })
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (active && data?.enabled && data.token) {
          setEnabled(true);
          setToken(data.token);
        }
      })
      .catch(() => {});
    const params = new URLSearchParams(window.location.search);
    const selected = entries.find((e) => e.id === params.get("interest"));
    const productSelect = form.current?.elements.namedItem("interest");
    if (selected && productSelect instanceof HTMLSelectElement)
      productSelect.value = selected.copy[locale].title;
    const city = form.current?.elements.namedItem("city");
    if (city instanceof HTMLInputElement)
      city.value = (params.get("city") || "").slice(0, 120);
    const choose = (e: Event) => {
      if (productSelect instanceof HTMLSelectElement)
        productSelect.value = (e as CustomEvent<string>).detail;
    };
    window.addEventListener("choose-product", choose);
    return () => {
      active = false;
      window.removeEventListener("choose-product", choose);
    };
  }, [locale]);
  const fields = [
    ["name", f.name, "text", "name", true],
    ["organization", f.organization, "text", "organization", true],
    ["email", f.email, "email", "email", true],
    ["phone", f.phone, "tel", "tel", false],
    ["city", f.city, "text", "address-level2", true],
  ] as const;
  const labels: Record<string, string> = {
    name: f.name,
    organization: f.organization,
    email: f.email,
    phone: f.phone,
    city: f.city,
    province: f.province,
    interest: f.interest,
    details: f.details,
    timeline: f.timeline,
    consent: locale === "en" ? "Consent" : "Consentement",
  };
  function read() {
    const d = new FormData(form.current!);
    return Object.fromEntries([
      ...Object.keys(fieldLimits).map((k) => [k, String(d.get(k) || "")]),
      ["locale", locale],
      ["consent", d.get("consent") === "on"],
      ["consentVersion", "2026-10-18"],
      ["website", String(d.get("website") || "")],
      ["token", token],
    ]);
  }
  function message(code: string) {
    return code === "required"
      ? m.required
      : code === "email"
        ? m.email
        : code === "consent"
          ? m.consentError
          : m.invalid;
  }
  function download() {
    const data = read();
    const text = [
      m.project,
      m.notSent,
      "",
      ...Object.keys(fieldLimits).map((k) => `${labels[k]}: ${data[k]}`),
    ].join("\n\n");
    const url = URL.createObjectURL(
      new Blob([text], { type: "text/plain;charset=utf-8" }),
    );
    const a = document.createElement("a");
    a.href = url;
    a.download = `nursingpods-${locale === "fr" ? "projet" : "project"}.txt`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setFeedback(m.downloaded);
  }
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (!enabled || busy) return;
    const data = read();
    const validation = validateLead(data);
    if (!validation.ok) {
      setErrors(validation.errors);
      setTimeout(() => summary.current?.focus(), 0);
      return;
    }
    setErrors({});
    setBusy(true);
    setFeedback(m.sending);
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (res.status === 202 && result.code === "accepted") {
        window.location.assign(
          locale === "en" ? "/en/thank-you/" : "/fr/merci/",
        );
        return;
      }
      if (result.errors) {
        setErrors(result.errors);
        setTimeout(() => summary.current?.focus(), 0);
      }
      setFeedback(
        result.code === "unavailable"
          ? m.unavailable
          : result.code === "expired"
            ? m.expired
            : result.code === "rate"
              ? m.rate
              : result.code === "duplicate"
                ? m.duplicate
                : result.code === "delivery"
                  ? m.delivery
                  : m.generic,
      );
    } catch {
      setFeedback(m.delivery);
    } finally {
      setBusy(false);
    }
  }
  const error = (field: string) =>
    errors[field] ? (
      <span className="field-error" id={`${field}-error`}>
        {message(errors[field])}
      </span>
    ) : null;
  return (
    <form
      ref={form}
      className="inquiry-form"
      aria-label={m.formTitle}
      onSubmit={submit}
      noValidate
    >
      <h2>{f.title}</h2>
      <p className="form-note" id="inquiry-status">
        {enabled ? m.active : m.prepare}{" "}
        {business.phoneVerified && (
          <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
        )}
      </p>
      {Object.keys(errors).length > 0 && (
        <div className="error-summary" ref={summary} tabIndex={-1} role="alert">
          <h3>{m.summary}</h3>
          <ul>
            {Object.entries(errors).map(([key, value]) => (
              <li key={key}>
                <a href={`#${key}`}>
                  {labels[key] || key}: {message(value)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">
          Website
          <input id="website" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <div className="form-grid">
        {fields.map(([name, label, type, auto, required]) => (
          <div key={name}>
            <label htmlFor={name}>
              {label} {required ? "*" : `(${f.optional})`}
            </label>
            <input
              id={name}
              name={name}
              type={type}
              autoComplete={auto}
              required={required}
              maxLength={fieldLimits[name]}
              aria-invalid={!!errors[name]}
              aria-describedby={errors[name] ? `${name}-error` : undefined}
            />
            {error(name)}
          </div>
        ))}
        <div>
          <label htmlFor="province">{f.province} *</label>
          <select
            id="province"
            name="province"
            required
            defaultValue=""
            aria-invalid={!!errors.province}
            aria-describedby={errors.province ? "province-error" : undefined}
          >
            <option value="">{f.select}</option>
            {provinces.map((p) => (
              <option key={p[0]} value={p[0]}>
                {p[locale === "en" ? 1 : 2]}
              </option>
            ))}
          </select>
          {error("province")}
        </div>
        <div>
          <label htmlFor="interest">{f.interest}</label>
          <select id="interest" name="interest" defaultValue="">
            <option value="">{f.select}</option>
            {entries.map((e) => (
              <option key={e.id}>{e.copy[locale].title}</option>
            ))}
            <option>{f.other}</option>
          </select>
        </div>
        <div>
          <label htmlFor="timeline">{f.timeline}</label>
          <select id="timeline" name="timeline" defaultValue="">
            <option value="">{f.select}</option>
            {f.timelineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </div>
        <div className="full-width">
          <label htmlFor="details">{f.details} *</label>
          <textarea
            id="details"
            name="details"
            rows={4}
            required
            maxLength={4000}
            aria-invalid={!!errors.details}
            aria-describedby={`details-hint${errors.details ? " details-error" : ""}`}
          />
          <span id="details-hint" className="input-hint">
            {f.detailsHint}
          </span>
          {error("details")}
        </div>
      </div>
      <label className="consent-label" htmlFor="consent">
        <input
          type="checkbox"
          id="consent"
          name="consent"
          required
          aria-invalid={!!errors.consent}
          aria-describedby={errors.consent ? "consent-error" : undefined}
        />
        <span>
          {m.consent} <a href={sectionPath(locale, "privacy")}>{m.privacy}</a>
        </span>
      </label>
      {error("consent")}
      <p className="input-hint">
        * {f.required}. {m.local}
      </p>
      <div className="form-actions">
        <button type="button" className="button outline" onClick={download}>
          {m.download} ↓
        </button>
        <button
          type="submit"
          className="button submit-button"
          disabled={!enabled || busy}
          aria-describedby="inquiry-status"
        >
          {busy ? m.sending : f.submit} ↗
        </button>
      </div>
      <p role="status" aria-live="polite" className="form-feedback">
        {feedback}
      </p>
    </form>
  );
}
