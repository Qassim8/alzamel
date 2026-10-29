import PageHeader from "@/components/layout/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import GalleryGrid from "@/components/sections/GalleryGrid";
import JsonLd from "@/components/seo/JsonLd";
import { GALLERY_ITEMS } from "@/lib/content/gallery-items";
import { ar } from "@/lib/format";
import { breadcrumbSchema } from "@/lib/seo";
import { PRIMARY_CITY, SITE_URL } from "@/lib/site";

const PHOTOS = GALLERY_ITEMS.filter((i) => i.type === "image");
const VIDEOS = GALLERY_ITEMS.filter((i) => i.type === "video");

export const metadata = {
  title: "معرض أعمالنا — صور وفيديو من الميدان",
  description: `صور وفيديوهات حقيقية من أعمال الزامل كلين في ${PRIMARY_CITY}: جلي الأرضيات، غسيل السجاد، تنظيف الكنب والستائر والمطابخ.`,
  alternates: { canonical: "/gallery" },
  openGraph: {
    title: "معرض أعمال الزامل كلين",
    description:
      "صور وفيديوهات حقيقية من تنفيذ الفريق — جلي أرضيات، سجاد، كنب، ستائر، ومطابخ.",
    url: "/gallery",
    type: "website",
  },
};

/* ImageGallery + VideoObject لكل مقطع — يتيح ظهور الصور والفيديو
   في نتائج Google وفي تبويب الصور. */
const mediaSchema = [
  {
    "@context": "https://schema.org",
    "@type": "ImageGallery",
    name: `معرض أعمال الزامل كلين في ${PRIMARY_CITY}`,
    url: `${SITE_URL}/gallery`,
    image: PHOTOS.map((p) => `${SITE_URL}${p.src}`),
  },
  ...VIDEOS.map((v) => ({
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description: v.alt,
    thumbnailUrl: `${SITE_URL}${v.poster}`,
    contentUrl: `${SITE_URL}${v.src}`,
    uploadDate: "2026-10-29",
  })),
];

export default function GalleryPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "معرض الأعمال", path: "/gallery" },
          ]),
          ...mediaSchema,
        ]}
      />

      <PageHeader
        label="معرض الأعمال"
        title="شاهد عملنا بعينك"
        subtitle={`${ar(PHOTOS.length)} صورة و${ar(VIDEOS.length)} مقاطع فيديو من تنفيذ فريقنا — لا صور مخزون ولا مشاهد مُعادة.`}
      />

      <section className="section">
        <div className="container-x">
          {/* بلا Reveal هنا: will-change/transform يجعل الغلاف حاوية
              للعناصر fixed فيخرج عارض الصور عن مكانه. */}
          <GalleryGrid />
        </div>
      </section>

      <CTABanner
        title="أعجبك ما رأيت؟"
        subtitle="أرسل لنا نوع المكان وحجمه، ونرجع لك بالتفاصيل والسعر خلال وقت قصير."
      />
    </>
  );
}
