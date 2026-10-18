import { notFound } from "next/navigation";
import ThankYou from "@/components/ThankYou";
export const dynamic = "force-dynamic";
export const metadata = {
  title: "Inquiry accepted | NursingPods.ca",
  robots: { index: false, follow: false },
  alternates: {
    canonical: "/en/thank-you/",
    languages: { "en-CA": "/en/thank-you/", "fr-CA": "/fr/merci/" },
  },
};
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  if ((await params).locale !== "en") notFound();
  return <ThankYou locale="en" />;
}
