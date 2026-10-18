import Image from "next/image";
import Footer from "@/components/Footer";
import { sectionPath } from "@/lib/paths";
import { entries, byId } from "@/lib/pages";
import { notFound } from "next/navigation";
import { business, isLocale } from "@/lib/config";
import { content } from "@/lib/content";
import { provinces, regions } from "@/lib/locations";
import Header from "@/components/Header";
import InquiryForm from "@/components/InquiryForm";
import OptionLink from "@/components/OptionLink";
import { SectionHeading, Arrow } from "@/components/Sections";
export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const c = content[locale];
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${business.url}/#organization`,
        name: business.name,
        url: business.url,
        ...(business.phoneVerified ? { telephone: business.phone } : {}),
      },
      {
        "@type": "WebSite",
        "@id": `${business.url}/#website`,
        name: business.name,
        url: business.url,
        inLanguage: ["en-CA", "fr-CA"],
      },
      {
        "@type": "WebPage",
        name: c.metaTitle,
        url: `${business.url}/${locale}/`,
        inLanguage: locale === "en" ? "en-CA" : "fr-CA",
        isPartOf: { "@id": `${business.url}/#website` },
      },
    ],
  };
  return (
    <>
      <Header locale={locale} />
      <main id="main">
        <section className="hero">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="tiny-star" aria-hidden="true">
                ✳
              </span>
              {c.eyebrow}
            </p>
            <h1>{c.headline}</h1>
            <p className="hero-intro">{c.intro}</p>
            <div className="hero-actions">
              <a className="button" href={sectionPath(locale, "quote")}>
                {c.quote}
                <Arrow />
              </a>
              <a className="text-link" href="#products">
                {c.explore}
                <Arrow />
              </a>
            </div>
            <p className="hero-note">
              <span aria-hidden="true">○</span>
              {c.heroNote}
            </p>
          </div>
          <div className="hero-image">
            <Image
              src={`/images/hero-${locale}.webp`}
              alt={c.heroAlt}
              fill
              priority
              sizes="(max-width: 850px) 100vw, 51vw"
            />
            <span className="image-corner" aria-hidden="true">
              NP / 01
            </span>
          </div>
        </section>
        <div className="values-strip">
          {c.ribbon.map((r, i) => (
            <span key={r}>
              <span className="value-symbol" aria-hidden="true">
                {["◈", "✳", "⌑"][i]}
              </span>
              {r}
            </span>
          ))}
        </div>
        <section className="section products" id="products">
          <div className="split-heading">
            <SectionHeading eyebrow={c.productEyebrow} title={c.productTitle}>
              {c.productIntro}
            </SectionHeading>
            <p className="section-index" aria-hidden="true">
              01 — 05
            </p>
          </div>
          <div className="product-grid">
            {c.products.map(([name, description, num]) => (
              <article className="product-card" key={name}>
                <div className="product-top">
                  <span className="product-number">{num}</span>
                  <span className="product-glyph" aria-hidden="true">
                    ⌑
                  </span>
                </div>
                <h3>
                  <a
                    href={
                      byId(
                        entries.find((e) => e.copy[locale].title === name)
                          ?.id || "products",
                      )!.paths[locale]
                    }
                  >
                    {name}
                  </a>
                </h3>
                <p>{description}</p>
                <OptionLink
                  option={entries[Number(num) - 1].copy[locale].title}
                  label={c.discuss}
                />
              </article>
            ))}
          </div>
        </section>
        <section className="benefits section">
          <SectionHeading eyebrow={c.benefitsEyebrow} title={c.benefitsTitle}>
            {c.benefitsIntro}
          </SectionHeading>
          <div className="benefit-list">
            {c.benefits.map(([title, description], i) => (
              <article key={title}>
                <span className="benefit-number">0{i + 1}</span>
                <div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section industries" id="industries">
          <SectionHeading eyebrow={c.industryEyebrow} title={c.industryTitle}>
            {c.industryIntro}
          </SectionHeading>
          <div className="industry-grid">
            {c.industries.map((industry, i) => (
              <a
                href={
                  byId(
                    [
                      "airports",
                      "transit",
                      "universities",
                      "hospitals",
                      "offices",
                      "malls",
                      "government",
                      "events",
                      "industrial",
                      "hospitality",
                    ][i],
                  )!.paths[locale]
                }
                key={industry}
              >
                <span className="industry-number" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span>{industry}</span>
                <Arrow />
              </a>
            ))}
          </div>
        </section>
        <section className="section process">
          <SectionHeading eyebrow={c.processEyebrow} title={c.processTitle} />
          <div className="steps">
            {c.steps.map(([title, description], i) => (
              <article key={title}>
                <span className="step-number">0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </section>
        <section className="section solutions" id="solutions">
          <div className="solutions-aside">
            <SectionHeading
              eyebrow={c.solutionsEyebrow}
              title={c.solutionsTitle}
            >
              {c.solutionsIntro}
            </SectionHeading>
            <a className="button" href={sectionPath(locale, "quote")}>
              {c.quote}
              <Arrow />
            </a>
            <div className="architectural-lines" aria-hidden="true">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div className="solution-list">
            {c.solutions.map(([name, description], i) => (
              <article key={name}>
                <span className="solution-number">0{i + 1}</span>
                <div>
                  <h3>
                    <a
                      href={
                        byId(
                          entries.find((e) => e.copy[locale].title === name)
                            ?.id || "products",
                        )!.paths[locale]
                      }
                    >
                      {name}
                    </a>
                  </h3>
                  <p>{description}</p>
                  <OptionLink
                    option={entries[5 + i].copy[locale].title}
                    label={c.discuss}
                  />
                </div>
              </article>
            ))}
          </div>
        </section>
        <section className="section coverage" id="locations">
          <SectionHeading eyebrow={c.coverageEyebrow} title={c.coverageTitle}>
            {c.coverageIntro}
          </SectionHeading>
          <div className="region-list">
            {regions.map((r) => (
              <a
                key={r.id}
                href={
                  (byId(`metro-${r.id}`) || byId("locations"))!.paths[locale]
                }
              >
                {r[locale]}
                <Arrow />
              </a>
            ))}
          </div>
          <div className="province-list">
            {provinces.map((p) => (
              <span key={p[0]}>{p[locale === "en" ? 1 : 2]}</span>
            ))}
          </div>
        </section>
        <section className="section about" id="about">
          <div>
            <p className="eyebrow">{c.aboutEyebrow}</p>
            <h2>{c.aboutTitle}</h2>
          </div>
          <p>{c.aboutText}</p>
        </section>
        <section className="section faq">
          <h2>{c.faqTitle}</h2>
          <div>
            {c.faqs.map(([q, a]) => (
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
        <section className="section contact" id="contact">
          <div className="contact-copy">
            <SectionHeading eyebrow={c.contactEyebrow} title={c.contactTitle}>
              {c.contactIntro}
            </SectionHeading>
            {business.phoneVerified && (
              <a className="contact-phone" href={`tel:${business.phone}`}>
                {business.phoneDisplay}
                <Arrow />
              </a>
            )}
            <p className="contact-tagline">{c.tagline}</p>
          </div>
          <InquiryForm locale={locale} />
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
