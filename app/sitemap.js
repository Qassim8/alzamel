import { SITE_URL } from "@/lib/site";

export default function sitemap() {
  const routes = ["", "/services", "/pricing", "/areas", "/why-us", "/contact"];
  return routes.map((r) => ({
    url: `${SITE_URL}${r}`,
    lastModified: new Date(),
    changeFrequency: r === "" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.8,
  }));
}
