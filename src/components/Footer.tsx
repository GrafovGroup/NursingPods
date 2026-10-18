import { Brand } from "./Header";
import { business, type Locale } from "@/lib/config";
import { content, sectionIds } from "@/lib/content";
import { sectionPath, type Section } from "@/lib/paths";
export default function Footer({ locale }: { locale: Locale }) {
  const c = content[locale];
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div>
          <a href={`/${locale}/`}>
            <Brand />
          </a>
          <p>{c.footerText}</p>
        </div>
        <nav
          aria-label={
            locale === "en" ? "Footer navigation" : "Navigation de pied de page"
          }
        >
          {c.nav.map((n, i) => (
            <a
              key={n}
              href={
                [
                  "products",
                  "solutions",
                  "industries",
                  "about",
                  "contact",
                ].includes(sectionIds[i])
                  ? sectionPath(locale, sectionIds[i] as Section)
                  : `/${locale}/#${sectionIds[i]}`
              }
            >
              {n}
            </a>
          ))}
        </nav>
        <div>
          <p className="eyebrow">{c.footerContact}</p>
          {business.phoneVerified && (
            <a className="footer-phone" href={`tel:${business.phone}`}>
              {business.phoneDisplay}
            </a>
          )}
          {business.emailVerified &&
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(business.email) && (
              <a className="public-email" href={`mailto:${business.email}`}>
                {business.email}
              </a>
            )}
          <a className="text-link" href={sectionPath(locale, "quote")}>
            {c.quote} ↗
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="legal-links">
          <a href={sectionPath(locale, "privacy")}>
            {locale === "en" ? "Privacy" : "Confidentialité"}
          </a>
          <a href={sectionPath(locale, "terms")}>
            {locale === "en" ? "Website terms" : "Conditions du site"}
          </a>
        </div>
        <span>
          © {new Date().getFullYear()} NursingPods.ca. {c.rights}
        </span>
        <a href={`/${locale}/`}>{locale === "en" ? "Home" : "Accueil"}</a>
      </div>
    </footer>
  );
}
