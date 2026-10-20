// Dependency-free static server for the local preview build (preview-build/).
import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const root = join(process.cwd(), process.argv[2] || "preview-build");
const port = Number(process.argv[3] || 3008);
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".json": "application/json", ".txt": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg", ".ico": "image/x-icon", ".woff2": "font/woff2", ".ttf": "font/ttf" };

const server = createServer(async (req, res) => {
  let p = normalize(decodeURIComponent(req.url.split("?")[0])).replace(/^([/\\])+/, "");
  let file = join(root, p);
  try { if ((await stat(file)).isDirectory()) file = join(file, "index.html"); }
  catch { if (!extname(file)) file = join(root, p, "index.html"); }
  try {
    const body = await readFile(file);
    res.writeHead(200, { "Content-Type": types[extname(file)] || "application/octet-stream" });
    res.end(body);
  } catch {
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(await readFile(join(root, "404.html")).catch(() => "Not found"));
  }
});

// If the port is taken (e.g. an earlier preview window is still open), try the next one.
let current = port;
server.on("error", (err) => {
  if (err.code === "EADDRINUSE" && current < port + 10) {
    console.log(`Port ${current} is busy, trying ${current + 1}...`);
    server.listen(++current);
  } else {
    console.error(err.message);
    process.exit(1);
  }
});
server.on("listening", () => console.log(`\nPreview: http://localhost:${current}/  (Ctrl+C to stop)\n`));
server.listen(current);
