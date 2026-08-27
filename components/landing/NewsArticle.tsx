import type { Locale, LocaleContent, NewsRecord } from "@/content/types";
import { localeHref, routePaths } from "@/content";
import SiteFrame from "./SiteFrame";

export default function NewsArticle({ locale, copy, article }: { locale: Locale; copy: LocaleContent; article: NewsRecord }) {
  const route = `/news/${article.slug}`;
  return <SiteFrame locale={locale} copy={copy} route={route}><article className="article-page"><header className="site-shell article-head"><a href={localeHref(locale, routePaths.news)}>← {copy.nav.news}</a><div className="news-meta"><time dateTime={article.date}>{article.date}</time><span>{article.category}</span>{article.related && <span>{article.related}</span>}</div><h1>{article.title}</h1><p>{article.summary}</p></header><div className="paper-section"><div className="site-shell article-body"><aside><span>ARTICLE / {article.slug.toUpperCase()}</span><i aria-hidden="true"/></aside><div>{article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></div></article></SiteFrame>;
}
