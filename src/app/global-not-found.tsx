import Image from "next/image";
import Link from "next/link";
import "./globals.css";
export const metadata = {
  title: "Page not found | NursingPods.ca",
  robots: { index: false, follow: false },
};
export default function GlobalNotFound() {
  return (
    <html lang="en-CA">
      <body>
        <main className="section detail-hero" id="main">
          <p className="eyebrow">NursingPods.ca · 404</p>
          <h1>Page not found.</h1>
          <p className="detail-intro" lang="fr-CA">
            Cette page est introuvable.
          </p>
          <div className="hero-actions">
            <Link prefetch={false} className="button" href="/en/" lang="en-CA">
              English home
            </Link>
            <Link prefetch={false} className="button" href="/fr/" lang="fr-CA">
              Accueil en français
            </Link>
          </div>
          <figure className="page-visual">
            <Image
              src="/images/pages/global-not-found-neutral.webp"
              alt="A bright corridor leading back to a welcoming atrium."
              width={1200}
              height={800}
              sizes="92vw"
            />
          </figure>
        </main>
      </body>
    </html>
  );
}
