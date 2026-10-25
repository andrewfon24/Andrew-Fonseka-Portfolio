import { projects } from "../data.js";
export function GET() {
  const paths = ["/", ...projects.map((p) => `/case-studies/${p.id}/`)];
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.map((path) => `<url><loc>https://andrewfonseka.com${path}</loc></url>`).join("")}</urlset>`,
    { headers: { "Content-Type": "application/xml" } },
  );
}
