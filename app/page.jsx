import CTABanner from "@/components/sections/CTABanner";
import Coverage from "@/components/sections/Coverage";
import FaqSection from "@/components/sections/FaqSection";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Method from "@/components/sections/Method";
import Packages from "@/components/sections/Packages";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesGrid from "@/components/sections/ServicesGrid";
import StatsStrip from "@/components/sections/StatsStrip";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content/faqs";

export const metadata = {
  title: "الزامل كلين | شركة تنظيف في الرياض — نظافة تأهيلية وتنظيف عميق",
  alternates: { canonical: "/" },
};

/* ترتيب الصفحة يتبع رحلة الزائر:
   ماذا تقدّمون؟ ← كيف أحجز؟ ← لماذا أنتم؟ ← أثبتوا ذلك ← كم السعر؟
   ← هل تصلون لمدينتي؟ ← بقي عندي سؤال ← احجز الآن */
export default function HomePage() {
  return (
    <>
      <Hero />

      {/* ثقة سريعة مباشرة بعد الوعد */}
      <section className="py-14 sm:py-16">
        <div className="container-x">
          <StatsStrip />
        </div>
      </section>

      <ServicesGrid />

      {/* خطوات العمل مبكراً — تزيل تردد «كيف أحجز؟» */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            label="كيف نعمل"
            title="من رسالة واتساب إلى مكان نظيف"
            subtitle="أربع خطوات واضحة بلا تعقيد — تعرف ما يحدث في كل مرحلة."
          />
          <ProcessSteps />
        </div>
      </section>

      <WhyUs />
      <Method />
      <Gallery />
      <Testimonials />
      <Packages />
      <Coverage />

      <FaqSection items={FAQS.slice(0, 5)} showAsk />

      <CTABanner />
    </>
  );
}
