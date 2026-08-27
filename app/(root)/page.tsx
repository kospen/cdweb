import HomePage from "@/components/landing/HomePage";
import { en } from "@/content/en";
import { pageMetadata } from "@/content/metadata";
export const metadata = pageMetadata("en", "home");
export default function Page() { return <HomePage locale="en" copy={en}/>; }
