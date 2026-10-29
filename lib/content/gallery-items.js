/**
 * معرض الأعمال — صور وفيديوهات حقيقية من تنفيذ الفريق.
 *
 * المصدر: public/gallery (أصلها HEIC/MOV من كاميرا الفريق،
 * حُوّلت إلى WebP/MP4 عبر `node scripts/process-gallery.mjs`).
 *
 * type: "image" | "video"
 * serviceSlug: يربط العنصر بصفحة الخدمة فيظهر فيها تلقائياً.
 */
export const GALLERY_CATEGORIES = [
  { id: "all", label: "الكل" },
  { id: "floor", label: "الأرضيات" },
  { id: "carpet", label: "السجاد والموكيت" },
  { id: "sofa", label: "الكنب والمجالس" },
  { id: "curtains", label: "الستائر والنوافذ" },
  { id: "kitchen", label: "المطابخ والأسطح" },
];

export const GALLERY_ITEMS = [
  // ── الأرضيات ──
  {
    type: "video",
    category: "floor",
    serviceSlug: "post-construction-cleaning",
    src: "/gallery/floor.mp4",
    poster: "/gallery/floor-poster.webp",
    title: "جلي وتلميع الأرضيات",
    alt: "فنّي الزامل كلين يجلي أرضية بمكينة تلميع",
  },
  {
    type: "image",
    category: "floor",
    serviceSlug: "post-construction-cleaning",
    src: "/gallery/floor-1.webp",
    alt: "جلي أرضية رخام بمكينة تلميع داخل مدخل فيلا",
    featured: true,
  },
  {
    type: "image",
    category: "floor",
    serviceSlug: "post-construction-cleaning",
    src: "/gallery/floor-2.webp",
    alt: "تلميع أرضية بمكينة بعد التشطيب",
  },

  // ── السجاد والموكيت ──
  {
    type: "video",
    category: "carpet",
    serviceSlug: "carpet-cleaning",
    src: "/gallery/carpet.mp4",
    poster: "/gallery/carpet-poster.webp",
    title: "غسيل السجاد بالاستخلاص",
    alt: "تنظيف موكيت بجهاز استخلاص يسحب الماء والأوساخ",
  },
  {
    type: "image",
    category: "carpet",
    serviceSlug: "carpet-cleaning",
    src: "/gallery/carpet-1.webp",
    alt: "رش مادة تنظيف على موكيت مجلس قبل الغسيل",
  },
  {
    type: "image",
    category: "carpet",
    serviceSlug: "carpet-cleaning",
    src: "/gallery/carpet-2.webp",
    alt: "غسيل موكيت بمكينة تنظيف دوّارة",
  },
  {
    type: "image",
    category: "carpet",
    serviceSlug: "carpet-cleaning",
    src: "/gallery/carpet-3.webp",
    alt: "سحب الأوساخ من الموكيت بجهاز استخلاص",
  },
  {
    type: "image",
    category: "carpet",
    serviceSlug: "carpet-cleaning",
    src: "/gallery/carpet-4.webp",
    alt: "تنظيف سجادة منقوشة بمكنسة متخصصة",
  },

  // ── الكنب والمجالس ──
  {
    type: "video",
    category: "sofa",
    serviceSlug: "sofa-cleaning",
    src: "/gallery/sofa.mp4",
    poster: "/gallery/sofa-poster.webp",
    title: "تنظيف الكنب والمجالس",
    alt: "تنظيف كنب جلد بمواد متخصصة",
  },
  {
    type: "image",
    category: "sofa",
    serviceSlug: "sofa-cleaning",
    src: "/gallery/sofa-1.webp",
    alt: "مسح وتلميع كنب جلد داخل مجلس",
  },
  {
    type: "image",
    category: "sofa",
    serviceSlug: "sofa-cleaning",
    src: "/gallery/sofa-2.webp",
    alt: "تنظيف مجلس عربي بإطار خشبي محفور",
  },
  {
    type: "image",
    category: "sofa",
    serviceSlug: "sofa-cleaning",
    src: "/gallery/sofa-3.webp",
    alt: "تنظيف طقم كنب جلد في صالة",
  },

  // ── الستائر والنوافذ ──
  {
    type: "video",
    category: "curtains",
    serviceSlug: "curtain-cleaning",
    src: "/gallery/curtains.mp4",
    poster: "/gallery/curtains-poster.webp",
    title: "تنظيف الستائر بالبخار",
    alt: "تنظيف ستارة بالبخار دون فكّها",
  },
  {
    type: "image",
    category: "curtains",
    serviceSlug: "curtain-cleaning",
    src: "/gallery/curtains-1.webp",
    alt: "تنظيف ستارة بالبخار في مكانها دون فكّها",
  },
  {
    type: "image",
    category: "curtains",
    serviceSlug: "curtain-cleaning",
    src: "/gallery/windows-1.webp",
    alt: "تنظيف زجاج نافذة بممسحة احترافية",
  },
  {
    type: "image",
    category: "curtains",
    serviceSlug: "curtain-cleaning",
    src: "/gallery/windows-still.webp",
    alt: "تنظيف نافذة زجاجية مطلّة على حديقة",
  },

  // ── المطابخ والأسطح ──
  {
    type: "video",
    category: "kitchen",
    serviceSlug: "kitchen-bathroom-cleaning",
    src: "/gallery/kitchen.mp4",
    poster: "/gallery/kitchen-poster.webp",
    title: "تنظيف المطابخ",
    alt: "تنظيف أسطح وخزائن مطبخ وإزالة الدهون",
  },
  {
    type: "image",
    category: "kitchen",
    serviceSlug: "kitchen-bathroom-cleaning",
    src: "/gallery/kitchen-1.webp",
    alt: "تنظيف حوض ومغسلة مطبخ بمواد متخصصة",
  },
  {
    type: "image",
    category: "kitchen",
    serviceSlug: "deep-cleaning",
    src: "/gallery/surfaces-1.webp",
    alt: "مسح وتعقيم سطح طاولة خشبية",
  },
  {
    type: "image",
    category: "kitchen",
    serviceSlug: "deep-cleaning",
    src: "/gallery/surfaces-2.webp",
    alt: "تنظيف وتلميع سطح بقطعة ميكروفايبر",
  },
];

/** عناصر خدمة واحدة — تُستخدم في صفحة الخدمة. */
export function mediaForService(slug) {
  return GALLERY_ITEMS.filter((i) => i.serviceSlug === slug);
}

/** أول فيديو لخدمة معيّنة. */
export function videoForService(slug) {
  return GALLERY_ITEMS.find(
    (i) => i.serviceSlug === slug && i.type === "video",
  );
}

export const GALLERY_VIDEOS = GALLERY_ITEMS.filter((i) => i.type === "video");
