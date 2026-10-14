import { notFound } from "next/navigation";
import NewsArticle from "@/components/landing/NewsArticle";
import { en } from "@/content/en";
import { absoluteUrl, pageMetadata } from "@/content/metadata";

export function generateStaticParams() {
  return en.news.records.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = en.news.records.find((item) => item.slug === slug);
  if (!article) return {};
  const ogImage = article.image ? { src: article.image.ogSrc, width: 1200, height: 630, alt: article.image.alt } : undefined;
  return pageMetadata(
    "en",
    "news",
    article.seoTitle ?? article.title + " — Creative Destruction",
    article.seoDescription ?? article.summary,
    "/news/" + article.slug + "/",
    { publishedTime: article.date, image: ogImage },
  );
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = en.news.records.find((item) => item.slug === slug);
  if (!article) notFound();
  const url = absoluteUrl("/news/" + article.slug + "/");
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: article.title,
    description: article.seoDescription ?? article.summary,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "en",
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    url,
    ...(article.image ? { image: [absoluteUrl(article.image.src), absoluteUrl(article.image.ogSrc)] } : {}),
    author: { "@type": "Organization", name: "Creative Destruction", url: absoluteUrl("/") },
    publisher: { "@type": "Organization", name: "Creative Destruction", url: absoluteUrl("/") },
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }}/>
    <NewsArticle locale="en" copy={en} article={article}/>
  </>;
}
