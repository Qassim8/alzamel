import { FaCircleInfo, FaWhatsapp } from "react-icons/fa6";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/sections/CTABanner";
import Reveal from "@/components/ui/Reveal";
import FAQ from "@/components/ui/FaqList";
import { PackagesGrid, UnitPricingGrid } from "@/components/sections/Packages";
import { FAQS } from "@/lib/content/faqs";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "باقات وأسعار التنظيف في الرياض",
  description:
    "باقات تنظيف شهرية وربع سنوية وعقود سنوية للمنشآت في الرياض، وتسعير الشقق والفلل حسب عدد الغرف والمساحة. السعر يُثبَّت قبل بدء العمل.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: "باقات وأسعار التنظيف في الرياض",
    description:
      "باقات شهرية وربع سنوية وعقود سنوية للمنشآت، وتسعير الشقق والفلل حسب الحجم.",
    url: "/pricing",
    type: "website",
  },
};

export default function PricingPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "الباقات والأسعار", path: "/pricing" },
        ])}
      />

      <PageHeader
        label="الباقات والأسعار"
        title="تسعير واضح حسب حجم المكان"
        subtitle="نحدد السعر بناءً على نوع الخدمة وحجم المكان وعدد الزيارات — ونثبّته قبل بدء العمل بلا مفاجآت في النهاية."
      />

      <section className="section">
        <div className="container-x">
          <SectionHeading
            label="العقود الدورية"
            title="اختر الباقة التي تناسب إيقاعك"
            subtitle="الباقات الدورية أوفر من الزيارات المفردة، وتضمن لك فريقاً ثابتاً يعرف مكانك."
          />
          <PackagesGrid />
        </div>
      </section>

      <section className="bg-mist section">
        <div className="container-x">
          <SectionHeading
            label="تفصيل حسب الحجم"
            title="الشقق والفلل — كل حجم وله سعره"
            subtitle="اختر الحجم الأقرب لمكانك واطلب السعر مباشرة عبر واتساب."
          />
          <UnitPricingGrid />

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col items-start gap-4 rounded-brand border border-azure/25 bg-white p-6 sm:flex-row sm:items-center">
              <span className="icon-box-soft shrink-0">
                <FaCircleInfo />
              </span>
              <div className="flex-1">
                <p className="text-lead font-bold text-navy">
                  كيف نصل للسعر النهائي؟
                </p>
                <p className="mt-1.5 text-small leading-[1.95] text-muted">
                  نأخذ منك نوع المكان ومساحته وعدد الغرف والخدمات المطلوبة. في
                  الأعمال الكبيرة (النظافة التأهيلية، الفلل، المنشآت) نقوم
                  بمعاينة مجانية قبل تثبيت السعر.
                </p>
              </div>
              <a
                href={whatsappLink(WA_MESSAGES.quoteDetails)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary shrink-0"
              >
                <FaWhatsapp className="text-base" /> اطلب عرض سعر
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            label="أسئلة شائعة"
            title="أسئلة حول الأسعار والباقات"
          />
          <FAQ items={FAQS.filter((f) => /سعر|عقود|تستغرق/.test(f.q))} />
        </div>
      </section>

      <CTABanner
        title="ابدأ بسعر واضح من أول رسالة"
        subtitle="أرسل لنا نوع المكان ومساحته، ونرجع لك بعرض سعر مفصّل."
      />
    </>
  );
}
