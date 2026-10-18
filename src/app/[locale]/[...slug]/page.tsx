import { notFound } from "next/navigation";
import { isLocale, locales } from "@/lib/config";
import { findPage, pages } from "@/lib/pages";
import { pageMetadata } from "@/lib/seo";
import ContentPage from "@/components/ContentPage";
export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((locale) =>
    pages.map((p) => ({
      locale,
      slug: p.paths[locale].split("/").filter(Boolean).slice(1),
    })),
  );
}
async function resolve(params: Promise<{ locale: string; slug: string[] }>) {
  const { locale, slug } = await params;
  if (!isLocale(locale)) notFound();
  const page = findPage(locale, `/${locale}/${slug.join("/")}/`);
  if (!page) notFound();
  return { page, locale };
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { page, locale } = await resolve(params);
  return pageMetadata(page, locale);
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string; slug: string[] }>;
}) {
  const { page, locale } = await resolve(params);
  return <ContentPage page={page} locale={locale} />;
}
