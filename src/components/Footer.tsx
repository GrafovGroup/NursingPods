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
                ["products", "solutions", "about", "contact"].includes(
                  sectionIds[i],
                )
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
          <a className="footer-phone" href={`tel:${business.phone}`}>
            {business.phoneDisplay}
          </a>
          <a className="text-link" href={sectionPath(locale, "quote")}>
            {c.quote} ↗
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} NursingPods.ca. {c.rights}
        </span>
        <a href={`/${locale}/`}>{locale === "en" ? "Home" : "Accueil"}</a>
      </div>
    </footer>
  );
}
