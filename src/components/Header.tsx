"use client";
import { useEffect, useRef, useState } from "react";
import { business, type Locale } from "@/lib/config";
import { content, sectionIds } from "@/lib/content";
export function Brand() {
  return (
    <span className="brand">
      <span className="brand-mark" aria-hidden="true">
        <span />
      </span>
      <span>
        Nursing<span className="brand-light">Pods</span>
        <small>.ca</small>
      </span>
    </span>
  );
}
export default function Header({ locale }: { locale: Locale }) {
  const c = content[locale];
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    function escape(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    }
    if (open) document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return (
    <>
      <a className="skip-link" href="#main">
        {c.skip}
      </a>
      <header className="site-header" id="top">
        <a href={`/${locale}/`} aria-label="NursingPods.ca">
          <Brand />
        </a>
        <button
          className="menu-toggle"
          ref={toggle}
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? c.close : c.menu}
          <span aria-hidden="true">{open ? "−" : "+"}</span>
        </button>
        <nav
          id="main-nav"
          aria-label={
            locale === "fr" ? "Navigation principale" : "Main navigation"
          }
          className={open ? "navigation is-open" : "navigation"}
        >
          {c.nav.map((label, i) => (
            <a
              href={`#${sectionIds[i]}`}
              key={label}
              onClick={() => setOpen(false)}
            >
              {label}
            </a>
          ))}
          <a
            className="language-switch"
            href={`/${locale === "en" ? "fr" : "en"}/`}
            hrefLang={locale === "en" ? "fr-CA" : "en-CA"}
            lang={locale === "en" ? "fr" : "en"}
            aria-label={
              locale === "en" ? "Passer en français" : "Switch to English"
            }
          >
            {locale === "en" ? "FR" : "EN"}
            <span aria-hidden="true"> ↗</span>
          </a>
          <a className="nav-call" href={`tel:${business.phone}`}>
            {c.call}
          </a>
          <a
            className="button small"
            href="#contact"
            onClick={() => setOpen(false)}
          >
            {c.quote}
            <span aria-hidden="true">↗</span>
          </a>
        </nav>
      </header>
    </>
  );
}
