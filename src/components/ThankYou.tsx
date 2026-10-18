import Image from "next/image";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { leadSettings } from "@/lib/leads/settings";
import { verifyToken } from "@/lib/leads/tokens";
import { sectionPath } from "@/lib/paths";
import type { Locale } from "@/lib/config";
import Header from "./Header";
import Footer from "./Footer";
export default async function ThankYou({ locale }: { locale: Locale }) {
  const s = leadSettings();
  const jar = await cookies();
  if (
    !s.ready ||
    !verifyToken(jar.get("np_accepted")?.value, "accepted", s.secret)
  )
    redirect(sectionPath(locale, "quote"));
  return (
    <>
      <Header
        locale={locale}
        alternatePaths={{ en: "/en/thank-you/", fr: "/fr/merci/" }}
      />
      <main id="main" className="section detail-hero">
        <p className="eyebrow">NursingPods.ca</p>
        <h1>
          {locale === "en"
            ? "Your inquiry was accepted."
            : "Votre demande a été acceptée."}
        </h1>
        <p className="detail-intro">
          {locale === "en"
            ? "Our delivery service accepted your project inquiry for processing. This is not a booking or a confirmation of product availability."
            : "Notre service de transmission a accepté votre demande pour traitement. Il ne s’agit pas d’une réservation ni d’une confirmation de disponibilité."}
        </p>
        <a className="button" href={`/${locale}/`}>
          {locale === "en" ? "Return home" : "Retour à l’accueil"}
        </a>
        <figure className="page-visual">
          <Image
            src={`/images/pages/thank-you-${locale}.webp`}
            alt={
              locale === "en"
                ? "A calm architectural space with a clear path forward."
                : "Un espace architectural calme avec un parcours dégagé."
            }
            width={1200}
            height={800}
            sizes="(max-width: 768px) 92vw, 1100px"
          />
        </figure>
      </main>
      <Footer locale={locale} />
    </>
  );
}
