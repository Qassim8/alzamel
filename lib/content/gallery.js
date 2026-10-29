/**
 * معرض «من الميدان» في الصفحة الرئيسية — مختارات من معرض الأعمال.
 * المعرض الكامل في /gallery (lib/content/gallery-items.js).
 *
 * كل الصور عمودية ١٢٠٠×١٦٠٠ (نسبة ٣:٤)، وخلايا الشبكة بالنسبة نفسها
 * فلا تُقصّ أي صورة. feature يشغل عمودين × صفّين فيحافظ على النسبة.
 * خمس صور بالضبط = ٨ خلايا = شبكة ٤×٢ ممتلئة.
 */
export const GALLERY_W = 1200;
export const GALLERY_H = 1600;

export const GALLERY = [
  {
    src: "/gallery/floor-1.webp",
    alt: "فنّي الزامل كلين يجلي أرضية رخام بمكينة تلميع",
    feature: true,
  },
  {
    src: "/gallery/carpet-3.webp",
    alt: "سحب الأوساخ من الموكيت بجهاز استخلاص",
  },
  {
    src: "/gallery/sofa-1.webp",
    alt: "تنظيف كنب جلد بمواد متخصصة داخل مجلس",
  },
  {
    src: "/gallery/curtains-1.webp",
    alt: "تنظيف ستارة بالبخار في مكانها دون فكّها",
  },
  {
    src: "/gallery/kitchen-1.webp",
    alt: "تنظيف حوض ومغسلة مطبخ بمواد متخصصة",
  },
];
