import { notFound } from "next/navigation";
import NewsArticle from "@/components/landing/NewsArticle";
import { en } from "@/content/en";
import { pageMetadata } from "@/content/metadata";

export function generateStaticParams() {
  return en.news.records.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = en.news.records.find((item) => item.slug === slug);
  return article
    ? pageMetadata("en", "news", article.title + " — Creative Destruction", article.summary, "/news/" + article.slug)
    : {};
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = en.news.records.find((item) => item.slug === slug);
  if (!article) notFound();
  return <NewsArticle locale="en" copy={en} article={article}/>;
}