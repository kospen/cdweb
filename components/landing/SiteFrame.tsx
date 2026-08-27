import type { Locale, LocaleContent } from "@/content/types";
import Header from "./Header";
import Footer from "./Footer";

export default function SiteFrame({ locale, copy, route, children }: { locale: Locale; copy: LocaleContent; route: string; children: React.ReactNode }) {
  return (
    <>
      <a className="skip-link" href="#main-content">{copy.common.skip}</a>
      <Header locale={locale} copy={copy} route={route} />
      <main id="main-content">{children}</main>
      <Footer locale={locale} copy={copy} route={route} />
    </>
  );
}
