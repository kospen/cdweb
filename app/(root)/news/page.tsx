import ContentPage from "@/components/landing/ContentPage";
import { en } from "@/content/en";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "news");
export default function Page() { return <ContentPage locale="en" copy={en} page="news"/>; }
