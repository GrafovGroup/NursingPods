import { notFound } from "next/navigation";
import ThankYou from "@/components/ThankYou";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Demande acceptée | NursingPods.ca",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/fr/merci/",
    languages: { "en-CA": "/en/thank-you/", "fr-CA": "/fr/merci/" },
  },
};
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if ((await params).locale !== "fr") notFound();
  return <ThankYou locale="fr" />;
}
