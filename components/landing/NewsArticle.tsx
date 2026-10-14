import type { ReactNode } from "react";
import type { ArticleBlock, Locale, LocaleContent, NewsRecord } from "@/content/types";
import { localeHref, routePaths } from "@/content";
import SiteFrame from "./SiteFrame";

/** Renders the two inline marks allowed in article text: **bold** and [label](href). */
function inline(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  const pattern = /\*\*(.+?)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(text))) {
    if (match.index > last) out.push(text.slice(last, match.index));
    if (match[1] !== undefined) {
      out.push(<strong key={match.index}>{match[1]}</strong>);
    } else {
      const href = match[3];
      const external = /^https?:\/\//.test(href);
      out.push(external
        ? <a key={match.index} href={href} target="_blank" rel="noopener noreferrer">{match[2]}</a>
        : <a key={match.index} href={href}>{match[2]}</a>);
    }
    last = pattern.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

function Block({ block }: { block: ArticleBlock }) {
  if (block.type === "h2") return <h2>{inline(block.text)}</h2>;
  if (block.type === "ul") return <ul>{block.items.map((item) => <li key={item}>{inline(item)}</li>)}</ul>;
  return <p>{inline(block.text)}</p>;
}

export default function NewsArticle({ locale, copy, article }: { locale: Locale; copy: LocaleContent; article: NewsRecord }) {
  const route = `/news/${article.slug}`;
  const body = article.blocks
    ? article.blocks.map((block, index) => <Block key={index} block={block}/>)
    : article.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>);

  return <SiteFrame locale={locale} copy={copy} route={route}><article className="article-page"><header className="site-shell article-head"><a href={localeHref(locale, routePaths.news)}>← {copy.nav.news}</a><div className="news-meta"><time dateTime={article.date}>{article.date}</time><span>{article.category}</span>{article.related && <span>{article.related}</span>}</div><h1>{article.title}</h1><p>{article.summary}</p>{article.image && <figure className="article-figure"><img src={article.image.src} srcSet={article.image.srcSet} sizes="(max-width: 72rem) 100vw, 72rem" width={article.image.width} height={article.image.height} alt={article.image.alt} decoding="async"/>{article.image.caption && <figcaption>{article.image.caption}</figcaption>}</figure>}</header><div className="paper-section"><div className="site-shell article-body"><aside><span>ARTICLE / {article.slug.toUpperCase()}</span><i aria-hidden="true"/></aside><div className={article.blocks ? "article-prose" : undefined}>{body}</div></div></div></article></SiteFrame>;
}
