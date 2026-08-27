import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";

const outputRoot = join(process.cwd(), "out");
const expectedRoutes = [
  "/",
  "/projects/",
  "/research/",
  "/capabilities/",
  "/news/",
  "/news/research-ai-software/",
  "/news/ai-governance-initiative/",
  "/about/",
  "/contact/",
];

if (!existsSync(outputRoot)) {
  console.error("Static export not found. Run npm run build first.");
  process.exit(1);
}

const routeFile = (route) =>
  route === "/" ? join(outputRoot, "index.html") : join(outputRoot, route.replace(/^\/+/, ""), "index.html");

const failures = [];

for (const route of expectedRoutes) {
  const file = routeFile(route);
  if (!existsSync(file)) {
    failures.push("Missing route: " + route);
    continue;
  }

  const html = readFileSync(file, "utf8");
  if (!/<html[^>]+lang="en"/i.test(html)) failures.push(route + ': missing lang="en"');
  if ((html.match(/<main(?:\s|>)/gi) ?? []).length !== 1) failures.push(route + ": expected one main landmark");
  if ((html.match(/<h1(?:\s|>)/gi) ?? []).length !== 1) failures.push(route + ": expected one H1");
}

const htmlFiles = [];
const walk = (directory) => {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) walk(path);
    else if (entry.name.endsWith(".html")) htmlFiles.push(path);
  }
};
walk(outputRoot);

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const route = ("/" + relative(outputRoot, file).split(sep).join("/")).replace(/index\.html$/, "");
  const hrefs = [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);

  for (const href of hrefs) {
    if (
      href.startsWith("#") ||
      href.startsWith("mailto:") ||
      href.startsWith("http://") ||
      href.startsWith("https://") ||
      href.startsWith("/_next/") ||
      href.startsWith("/images/") ||
      href.startsWith("/fonts/") ||
      href === "/icon.svg"
    ) continue;

    const pathname = href.split(/[?#]/)[0];
    if (!pathname.startsWith("/") || pathname === "/icon.svg") continue;
    if (!existsSync(routeFile(pathname))) failures.push(route + ": broken local link " + href);
  }
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log("PASS: " + expectedRoutes.length + " authored routes and " + htmlFiles.length + " exported HTML files verified.");
