import { FaCircleInfo, FaWhatsapp } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import FAQ from "@/components/FAQ";
import { PackagesGrid, UnitPricingGrid } from "@/components/PackagesSection";
import { FAQS, whatsappLink } from "@/lib/data";

export const metadata = {
  title: "الباقات والأسعار",
  description:
    "باقات تنظيف شهرية وربع سنوية وعقود سنوية للمنشآت، وتسعير الشقق والفلل حسب الحجم — الزامل كلين.",
};

export default function PricingPage() {
  return (
    <>
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
                <p className="text-[15px] font-bold text-navy">
                  كيف نصل للسعر النهائي؟
                </p>
                <p className="mt-1.5 text-[13.5px] leading-[1.95] text-muted">
                  نأخذ منك نوع المكان ومساحته وعدد الغرف والخدمات المطلوبة. في
                  الأعمال الكبيرة (النظافة التأهيلية، الفلل، المنشآت) نقوم
                  بمعاينة مجانية قبل تثبيت السعر.
                </p>
              </div>
              <a
                href={whatsappLink(
                  "مرحباً الزامل كلين، أرغب بطلب عرض سعر. تفاصيل المكان: ",
                )}
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
