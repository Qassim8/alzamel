import { COMPANY } from "@/lib/content/company";

/** كل رسائل واتساب في مكان واحد — لا نصوص رسائل داخل المكوّنات. */
export const WA_MESSAGES = {
  default: "مرحباً الزامل كلين، أرغب بالاستفسار عن خدماتكم.",
  book: "مرحباً الزامل كلين، أرغب بحجز خدمة تنظيف. أرجو تزويدي بالتفاصيل.",
  quote: "مرحباً الزامل كلين، أرغب بطلب عرض سعر لخدمة تنظيف.",
  quoteDetails: "مرحباً الزامل كلين، أرغب بطلب عرض سعر. تفاصيل المكان: ",
  question: "مرحباً الزامل كلين، لدي سؤال عن خدماتكم.",
  location: "مرحباً الزامل كلين، أرغب بمعرفة موقعكم وتفاصيل التواصل.",

  /** رسالة خدمة بعينها. */
  service: (title) =>
    `مرحباً الزامل كلين، أرغب بطلب خدمة "${title}". أرجو تزويدي بالتفاصيل والسعر.`,

  /** رسالة باقة أو عقد. */
  package: (title) => `مرحباً الزامل كلين، أرغب بتفاصيل "${title}" وسعرها.`,

  /** رسالة تسعير وحدة سكنية حسب الحجم. */
  unit: (label, meta) =>
    `مرحباً الزامل كلين، أرغب بسعر تنظيف "${label}" (${meta}).`,

  /** رسالة خدمة في مدينة محددة. */
  city: (city) => `مرحباً الزامل كلين، أرغب بخدمة تنظيف في ${city}.`,

  /** رسالة مبنية من بيانات نموذج التواصل. */
  fromForm: ({ name, city, service, phone, message }) =>
    [
      "مرحباً الزامل كلين، أرغب بطلب خدمة.",
      name && `الاسم: ${name}`,
      phone && `الجوال: ${phone}`,
      city && `المدينة: ${city}`,
      service && `الخدمة: ${service}`,
      message && `التفاصيل: ${message}`,
    ]
      .filter(Boolean)
      .join("\n"),
};

export const DEFAULT_WA_MESSAGE = WA_MESSAGES.default;

export function whatsappLink(message = WA_MESSAGES.default) {
  return `https://wa.me/${COMPANY.phoneIntl}?text=${encodeURIComponent(message)}`;
}
