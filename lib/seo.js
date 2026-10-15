import { CITIES } from "@/lib/content/cities";
import { COMPANY, OPENING_HOURS } from "@/lib/content/company";
import { PRICE_MAX, PRICE_MIN } from "@/lib/content/pricing";
import { SERVICES } from "@/lib/content/services";
import { ACTIVE_SOCIALS } from "@/lib/content/socials";
import { PRIMARY_CITY, SITE_URL } from "@/lib/site";

/**
 * بيانات منظّمة (schema.org).
 * كل القيم مأخوذة من ملفات المحتوى — لا تُختلق أرقام ولا تقييمات.
 */

const ORG_ID = `${SITE_URL}/#business`;

/**
 * عروض الأسعار لخدمة واحدة.
 * السعر يظهر في نتائج Google كـ«يبدأ من …» ويزيد فرص الظهور
 * في عمليات البحث ذات النيّة الشرائية (كم سعر تنظيف …).
 * الخدمات بلا سعر معتمد لا تُرفق بأي عرض — لا نخترع أرقاماً.
 */
function serviceOffers(service) {
  if (!service.prices?.length) return undefined;

  const amounts = service.prices.map((p) => p.amount);
  return {
    "@type": "AggregateOffer",
    priceCurrency: "SAR",
    lowPrice: Math.min(...amounts),
    highPrice: Math.max(...amounts),
    offerCount: service.prices.length,
    availability: "https://schema.org/InStock",
    offers: service.prices.map((p) => ({
      "@type": "Offer",
      name: p.label,
      priceCurrency: "SAR",
      availability: "https://schema.org/InStock",
      priceSpecification: {
        "@type": "UnitPriceSpecification",
        price: p.amount,
        priceCurrency: "SAR",
        // السعر المعلن هو سعر البداية
        valueAddedTaxIncluded: false,
        ...(p.unit && { unitText: p.unit }),
      },
    })),
  };
}

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
  priceRange: `SAR ${PRICE_MIN}-${PRICE_MAX}`,
  // قائمة الخدمات — تساعد Google على فهم ما تقدّمه الشركة
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: `خدمات التنظيف في ${PRIMARY_CITY}`,
    itemListElement: SERVICES.map((s) => ({
      "@type": "Offer",
      ...(s.priceFrom && {
        priceCurrency: "SAR",
        price: s.priceFrom.amount,
      }),
      itemOffered: {
        "@type": "Service",
        name: s.titleAr,
        description: s.descAr,
        serviceType: s.titleAr,
        provider: { "@id": ORG_ID },
        areaServed: { "@type": "City", name: PRIMARY_CITY },
        ...(serviceOffers(s) && { offers: serviceOffers(s) }),
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
    ...(serviceOffers(service) && { offers: serviceOffers(service) }),
  };
}

/** قائمة الخدمات مع روابط صفحاتها — تقوّي أرشفة الصفحات الفرعية. */
export function serviceListSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `خدمات التنظيف في ${PRIMARY_CITY}`,
    numberOfItems: SERVICES.length,
    itemListElement: SERVICES.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: s.titleAr,
      url: `${SITE_URL}/services/${s.slug}`,
    })),
  };
}

/** صفحة «من نحن» داخل بيانات المنظمة. */
export const aboutSchema = {
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/#about`,
  name: `عن ${COMPANY.nameAr}`,
  url: `${SITE_URL}/#about`,
  mainEntity: { "@id": ORG_ID },
};
