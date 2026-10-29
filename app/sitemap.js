import { SERVICES } from "@/lib/content/services";
import { SITE_URL } from "@/lib/site";

/**
 * خريطة الموقع — تضم الصفحات الفعلية فقط.
 * أي مسار هنا يجب أن يُرجع 200، وإلا أبلغت Search Console عن خطأ.
 */
const ROUTES = [
  { path: "", changeFrequency: "weekly", priority: 1 },
  { path: "/services", changeFrequency: "weekly", priority: 0.9 },
  { path: "/gallery", changeFrequency: "monthly", priority: 0.8 },
  { path: "/pricing", changeFrequency: "monthly", priority: 0.8 },
  { path: "/why-us", changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact", changeFrequency: "monthly", priority: 0.7 },
];

export default function sitemap() {
  const lastModified = new Date();

  const pages = ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency,
    priority,
  }));

  // صفحة لكل خدمة — هي ما يستهدف عبارات البحث التفصيلية
  const services = SERVICES.map((s) => ({
    url: `${SITE_URL}/services/${s.slug}`,
    lastModified,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  return [...pages, ...services];
}
