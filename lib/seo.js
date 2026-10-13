import { CITIES } from "@/lib/content/cities";
import { COMPANY, OPENING_HOURS } from "@/lib/content/company";
import { SERVICES } from "@/lib/content/services";
import { ACTIVE_SOCIALS } from "@/lib/content/socials";
import { PRIMARY_CITY, SITE_URL } from "@/lib/site";

/**
 * بيانات منظّمة (schema.org).
 * كل القيم مأخوذة من ملفات المحتوى — لا تُختلق أرقام ولا تقييمات.
 */

const ORG_ID = `${SITE_URL}/#business`;

/** النشاط التجاري: CleaningService يرث من LocalBusiness. */
export const businessSchema = {
  "@context": "https://schema.org",
  "@type": ["CleaningService", "LocalBusiness"],
  "@id": ORG_ID,
  name: COMPANY.nameAr,
  alternateName: COMPANY.nameEn,
  description: `شركة تنظيف في ${PRIMARY_CITY} — نظافة تأهيلية بعد التشطيب، تنظيف عميق وتعقيم، تنظيف كنب وسجاد وستائر، غسيل خزانات المياه، واجهات وأحواش، ومكافحة حشرات.`,
  url: SITE_URL,
  telephone: `+${COMPANY.phoneIntl}`,
  email: COMPANY.email,
  logo: `${SITE_URL}/icon.svg`,
  image: `${SITE_URL}/opengraph-image.jpg`,
  address: {
    "@type": "PostalAddress",
    addressLocality: PRIMARY_CITY,
    addressRegion: "منطقة الرياض",
    addressCountry: "SA",
    // TODO: أضف streetAddress و postalCode بعد اعتماد العنوان التفصيلي
  },
  // الجمعة بموعد مسبق فلا تُدرج ضمن الأوقات الثابتة
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: OPENING_HOURS.days,
      opens: OPENING_HOURS.opens,
      closes: OPENING_HOURS.closes,
    },
  ],
  areaServed: CITIES.map((c) => ({ "@type": "City", name: c.name })),
  knowsLanguage: ["ar", "en"],
  currenciesAccepted: "SAR",
  priceRange: "$$",
  // قائمة الخدمات — تساعد Google على فهم ما تقدّمه الشركة
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `خدمات التنظيف في ${PRIMARY_CITY}`,
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name: s.titleAr,
        description: s.descAr,
        serviceType: s.titleAr,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: PRIMARY_CITY },
      },
    })),
  },
  ...(ACTIVE_SOCIALS.length > 0 && {
    sameAs: ACTIVE_SOCIALS.map((s) => s.href),
  }),
  // TODO: لا تُضف aggregateRating إلا ببيانات تقييمات حقيقية موثّقة
};

/** الموقع نفسه — يساعد على ظهور اسم الموقع في نتائج البحث. */
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: COMPANY.nameAr,
  inLanguage: "ar",
  publisher: { "@id": ORG_ID },
};

/** مسار التصفّح — يظهر أسفل نتيجة البحث. */
export function breadcrumbSchema(trail) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

/** الأسئلة الشائعة — يجب أن تطابق الأسئلة الظاهرة في الصفحة. */
export function faqSchema(items) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** صفحة خدمة واحدة. */
export function serviceSchema(service) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.titleAr,
    description: service.descAr,
    serviceType: service.titleAr,
    provider: { "@id": ORG_ID },
    areaServed: { "@type": "City", name: PRIMARY_CITY },
  };
}
