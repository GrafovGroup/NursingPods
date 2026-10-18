"use client";
import { useEffect, useState } from "react";
import { business, type Locale } from "@/lib/config";
import { content } from "@/lib/content";
import { provinces } from "@/lib/locations";
export default function InquiryForm({ locale }: { locale: Locale }) {
  const c = content[locale];
  const f = c.form;
  const [interest, setInterest] = useState("");
  useEffect(() => {
    const choose = (event: Event) => {
      setInterest((event as CustomEvent<string>).detail);
    };
    window.addEventListener("choose-product", choose);
    return () => window.removeEventListener("choose-product", choose);
  }, []);
  const fields = [
    ["name", f.name, "text", "name", true],
    ["organization", f.organization, "text", "organization", true],
    ["email", f.email, "email", "email", true],
    ["phone", f.phone, "tel", "tel", false],
    ["city", f.city, "text", "address-level2", true],
  ] as const;
  return (
    <form
      className="inquiry-form"
      aria-label={f.title}
      onSubmit={(e) => e.preventDefault()}
    >
      <h3>{f.title}</h3>
      <p className="form-note" id="inquiry-status">
        {f.callNote}{" "}
        <a href={`tel:${business.phone}`}>{business.phoneDisplay}</a>
      </p>
      <div className="form-grid">
        {fields.map(([name, label, type, auto, required]) => (
          <label key={name} htmlFor={name}>
            {label}{" "}
            <span className="field-meta">
              {required ? "*" : `(${f.optional})`}
            </span>
            <input
              id={name}
              name={name}
              type={type}
              autoComplete={auto}
              required={required}
              maxLength={name === "email" ? 254 : 160}
              onInvalid={(e) => e.currentTarget.setCustomValidity(f.invalid)}
              onInput={(e) => e.currentTarget.setCustomValidity("")}
            />
          </label>
        ))}
        <label htmlFor="province">
          {f.province} *
          <select
            id="province"
            name="province"
            required
            defaultValue=""
            onInvalid={(e) => e.currentTarget.setCustomValidity(f.invalid)}
            onChange={(e) => e.currentTarget.setCustomValidity("")}
          >
            <option value="" disabled>
              {f.select}
            </option>
            {provinces.map((p) => (
              <option key={p[0]} value={p[0]}>
                {p[locale === "en" ? 1 : 2]}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="interest">
          {f.interest}
          <select
            id="interest"
            name="interest"
            value={interest}
            onChange={(e) => setInterest(e.target.value)}
          >
            <option value="">{f.select}</option>
            {c.products.map((p) => (
              <option key={p[0]}>{p[0]}</option>
            ))}
            {c.solutions.map((p) => (
              <option key={p[0]}>{p[0]}</option>
            ))}
            <option>{f.other}</option>
          </select>
        </label>
        <label htmlFor="timeline">
          {f.timeline}
          <select id="timeline" name="timeline" defaultValue="">
            <option value="">{f.select}</option>
            {f.timelineOptions.map((o) => (
              <option key={o}>{o}</option>
            ))}
          </select>
        </label>
        <label className="full-width" htmlFor="details">
          {f.details}
          <textarea
            id="details"
            name="details"
            rows={3}
            maxLength={4000}
            aria-describedby="details-hint"
          />
          <span id="details-hint" className="input-hint">
            {f.detailsHint}
          </span>
        </label>
      </div>
      <p className="input-hint">
        * {f.required}. {f.privacy}
      </p>
      <button
        type="submit"
        className="button submit-button"
        disabled={!business.inquiriesEnabled}
        aria-describedby="inquiry-status"
      >
        {f.submit}
        <span aria-hidden="true">↗</span>
      </button>
    </form>
  );
}
