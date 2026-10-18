import Image from "next/image";
import { business, type Locale } from "@/lib/config";
import {
  byId,
  entries,
  pages,
  sectionNames,
  type PageRecord,
} from "@/lib/pages";
import { sectionPath } from "@/lib/paths";
import { locationEntries } from "@/lib/location-content";
import Header from "./Header";
import Footer from "./Footer";
import InquiryForm from "./InquiryForm";
export default function ContentPage({
  page,
  locale,
}: {
  page: PageRecord;
  locale: Locale;
}) {
  const quoteHref = ["quote", "contact"].includes(page.id)
    ? "#project-form"
    : `${sectionPath(locale, "quote")}?interest=${encodeURIComponent(page.id)}`;
  const location = locationEntries.find((l) => l.id === page.id);
  const entry = entries.find((e) => e.id === page.entryId);
  const children = pages.filter((p) => p.parentId === page.id);
  const parent = page.parentId ? byId(page.parentId) : undefined;
  const ancestors: PageRecord[] = [];
  let ancestor = parent;
  while (ancestor) {
    ancestors.unshift(ancestor);
    ancestor = ancestor.parentId ? byId(ancestor.parentId) : undefined;
  }
  const breadcrumb = [
    { name: locale === "en" ? "Home" : "Accueil", path: `/${locale}/` },
    ...ancestors.map((p) => ({ name: p.title[locale], path: p.paths[locale] })),
    { name: page.title[locale], path: page.paths[locale] },
  ];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumb.map((b, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: b.name,
      item: `${business.url}${b.path}`,
    })),
  };
  return (
    <>
      <Header locale={locale} alternatePaths={page.paths} />
      <main id="main" className="detail-main">
        <div className="section detail-hero">
          <nav
            aria-label={locale === "en" ? "Breadcrumb" : "Fil d’Ariane"}
            className="breadcrumbs"
          >
            <ol>
              {breadcrumb.map((b, i) => (
                <li key={b.path}>
                  {i === breadcrumb.length - 1 ? (
                    <span aria-current="page">{b.name}</span>
                  ) : (
                    <a href={b.path}>{b.name}</a>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <p className="eyebrow">{sectionNames[locale][page.section]}</p>
          <h1>{page.title[locale]}</h1>
          <p className="detail-intro">{page.description[locale]}</p>
          <a className="button" href={quoteHref}>
            {locale === "en" ? "Request a quote" : "Demander une soumission"} ↗
          </a>
        </div>
        {["quote", "contact"].includes(page.id) && (
          <section id="project-form" className="section quote-section">
            <InquiryForm locale={locale} />
          </section>
        )}
        {children.length > 0 && (
          <section
            className="section detail-grid"
            aria-label={page.title[locale]}
          >
            {children.map((child) => (
              <article key={child.id}>
                <h2>
                  <a href={child.paths[locale]}>{child.title[locale]}</a>
                </h2>
                <p>{child.description[locale]}</p>
                <a className="text-link" href={child.paths[locale]}>
                  {locale === "en"
                    ? "Explore this approach"
                    : "Explorer cette approche"}{" "}
                  ↗
                </a>
              </article>
            ))}
          </section>
        )}
        {page.id === "products" && (
          <section className="section comparison">
            <h2>
              {locale === "en"
                ? "Compare by the way you’ll use it"
                : "Comparez selon votre utilisation"}
            </h2>
            <div
              className="table-scroll"
              tabIndex={0}
              role="region"
              aria-label={
                locale === "en"
                  ? "Product approach comparison"
                  : "Comparaison des approches"
              }
            >
              <table>
                <caption>
                  {locale === "en"
                    ? "Planning considerations, not product specifications"
                    : "Éléments de planification, et non caractéristiques de produits"}
                </caption>
                <thead>
                  <tr>
                    <th scope="col">
                      {locale === "en" ? "Approach" : "Approche"}
                    </th>
                    <th scope="col">
                      {locale === "en" ? "Use case" : "Utilisation"}
                    </th>
                    <th scope="col">
                      {locale === "en" ? "What to confirm" : "À confirmer"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {entries
                    .filter((e) => e.kind === "products")
                    .map((e) => (
                      <tr key={e.id}>
                        <th scope="row">
                          <a href={byId(e.id)?.paths[locale]}>
                            {e.copy[locale].title}
                          </a>
                        </th>
                        <td>{e.useCase[locale]}</td>
                        <td>
                          <ul>
                            {e.considerations[locale].map((t) => (
                              <li key={t}>{t}</li>
                            ))}
                          </ul>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </section>
        )}
        {entry?.imagery?.[locale] && (
          <figure className="section detail-approved-image">
            <Image
              src={entry.imagery[locale].src}
              alt={entry.imagery[locale].alt}
              width={1200}
              height={800}
              sizes="(max-width:768px) 90vw, 900px"
            />
          </figure>
        )}
        {page.sections[locale].length > 0 && (
          <div className="section detail-body">
            <div>
              {page.sections[locale].map((s) => (
                <section key={s.title}>
                  <h2>{s.title}</h2>
                  <p>{s.body}</p>
                  {s.bullets && (
                    <ul>
                      {s.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>
            {entry && (
              <aside>
                <h2>
                  {locale === "en"
                    ? "Your project checklist"
                    : "Votre liste de préparation"}
                </h2>
                <ul>
                  {entry.considerations[locale].map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <a className="text-link" href={sectionPath(locale, "quote")}>
                  {locale === "en"
                    ? "Describe your project"
                    : "Décrivez votre projet"}{" "}
                  ↗
                </a>
              </aside>
            )}
          </div>
        )}
        {location && (
          <section className="section location-communities">
            <h2>
              {locale === "en"
                ? "Include your municipality"
                : "Précisez votre municipalité"}
            </h2>
            <p>
              {locale === "en"
                ? "Choose a community to add it to your project brief. These links are inquiry starting points, not local office listings."
                : "Choisissez une communauté pour l’ajouter au descriptif. Ces liens amorcent une demande; ils ne désignent pas des bureaux locaux."}
            </p>
            <div className="related-links">
              {location.municipalities.map((city) => (
                <a
                  key={city}
                  href={`${sectionPath(locale, "quote")}?city=${encodeURIComponent(city)}`}
                >
                  {city} ↗
                </a>
              ))}
            </div>
          </section>
        )}
        {page.faq && (
          <section className="section faq">
            <h2>
              {locale === "en" ? "Before you choose" : "Avant de choisir"}
            </h2>
            <div>
              {page.faq[locale].map(([q, a]) => (
                <details key={q}>
                  <summary>
                    {q}
                    <span aria-hidden="true">+</span>
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </section>
        )}
        {page.related && (
          <section className="section related">
            <h2>
              {locale === "en"
                ? "Keep exploring"
                : "Poursuivez votre exploration"}
            </h2>
            <div className="related-links">
              {page.related
                .map((id) => byId(id))
                .filter((p) => !!p)
                .map((p) => (
                  <a key={p.id} href={p.paths[locale]}>
                    {p.title[locale]} ↗
                  </a>
                ))}
            </div>
          </section>
        )}
        <section className="section detail-cta">
          <h2>
            {locale === "en"
              ? "Let’s work through the details."
              : "Précisons les détails ensemble."}
          </h2>
          <p>
            {locale === "en"
              ? "Bring your space, priorities and questions into the conversation."
              : "Parlons de votre espace, de vos priorités et de vos questions."}
          </p>
          <a className="button" href={quoteHref}>
            {locale === "en" ? "Request a quote" : "Demander une soumission"} ↗
          </a>
        </section>
      </main>
      <Footer locale={locale} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
        }}
      />
    </>
  );
}
