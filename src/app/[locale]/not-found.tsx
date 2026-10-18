"use client";
import { useEffect } from "react";
import { useLocale } from "@/components/LocaleProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { sectionPath } from "@/lib/paths";
export default function NotFound() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale === "fr" ? "fr-CA" : "en-CA";
  }, [locale]);
  return (
    <>
      <Header locale={locale} />
      <main id="main" className="section detail-hero">
        <p className="eyebrow">404</p>
        <h1>
          {locale === "en"
            ? "This page could not be found."
            : "Cette page est introuvable."}
        </h1>
        <p className="detail-intro">
          {locale === "en"
            ? "Explore the product and solution guides, or return to the homepage."
            : "Explorez les guides de produits et de solutions, ou revenez à l’accueil."}
        </p>
        <div className="hero-actions">
          <a className="button" href={`/${locale}/`}>
            {locale === "en" ? "Return home" : "Retour à l’accueil"}
          </a>
          <a className="text-link" href={sectionPath(locale, "products")}>
            {locale === "en" ? "Explore products" : "Explorer les produits"}
          </a>
        </div>
      </main>
      <Footer locale={locale} />
    </>
  );
}
