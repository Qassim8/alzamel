/**
 * روابط التواصل الاجتماعي.
 * اترك `href` فارغاً ولن تظهر الأيقونة في الموقع إطلاقاً.
 */
export const SOCIALS = [
  { id: "instagram", label: "انستقرام", href: "" },
  { id: "x", label: "إكس", href: "" },
  { id: "tiktok", label: "تيك توك", href: "" },
  { id: "snapchat", label: "سناب شات", href: "" },
];

export const ACTIVE_SOCIALS = SOCIALS.filter((s) => s.href);
