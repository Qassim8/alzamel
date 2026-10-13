import CTABanner from "@/components/sections/CTABanner";
import Coverage from "@/components/sections/Coverage";
import FaqSection from "@/components/sections/FaqSection";
import Gallery from "@/components/sections/Gallery";
import Hero from "@/components/sections/Hero";
import Method from "@/components/sections/Method";
import Packages from "@/components/sections/Packages";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesGrid from "@/components/sections/ServicesGrid";
import Testimonials from "@/components/sections/Testimonials";
import WhyUs from "@/components/sections/WhyUs";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content/faqs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, faqSchema } from "@/lib/seo";

/* الأسئلة الظاهرة في الصفحة — نفسها المستخدمة في بيانات FAQPage
   حتى تتطابق البيانات المنظّمة مع المحتوى المرئي (شرط Google). */
const HOME_FAQS = FAQS.slice(0, 5);

export const metadata = {
  // العنوان الافتراضي من layout يغطّي الرئيسية — لا نكرّر اسم العلامة مرتين
  title: {
    absolute: "شركة تنظيف في الرياض | الزامل كلين — نظافة تأهيلية وتنظيف عميق",
  },
  description:
    "الزامل كلين شركة تنظيف في الرياض: نظافة تأهيلية بعد التشطيب، تنظيف عميق وتعقيم للمنازل والفلل، تنظيف كنب وسجاد وستائر، غسيل خزانات، واجهات وأحواش، ومكافحة حشرات. باقات دورية وعقود للمنشآت — احجز عبر واتساب.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "شركة تنظيف في الرياض | الزامل كلين",
    description:
      "نظافة تأهيلية، تنظيف عميق وتعقيم، مفروشات، خزانات، واجهات، ومكافحة حشرات — بفريق متخصص ومواد آمنة.",
    url: "/",
    type: "website",
  },
};

/* ترتيب الصفحة يتبع رحلة الزائر:
   ماذا تقدّمون؟ ← كيف أحجز؟ ← لماذا أنتم؟ ← أثبتوا ذلك ← كم السعر؟
   ← هل تصلون لمدينتي؟ ← بقي عندي سؤال ← احجز الآن */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([{ name: "الرئيسية", path: "/" }]),
          faqSchema(HOME_FAQS),
        ]}
      />

      <Hero />

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

      <FaqSection items={HOME_FAQS} showAsk />

      <CTABanner />
    </>
  );
}
