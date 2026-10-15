import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import PriceEstimatorForm from "@/components/sections/PriceEstimatorForm";

/**
 * حاسبة تقديرية — تجيب عن أكثر سؤال يسبق الحجز: «كم يكلّفني؟».
 * كل القيم من جدول الأسعار المعتمد في lib/content/pricing.js،
 * فلا رقم هنا غير معلن على الموقع.
 */

export default function PriceEstimator() {
  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          label="تقدير سريع"
          title="كم ستكلّفك الخدمة؟"
          subtitle="اختر نوع المكان واحصل على تقدير فوري من أسعارنا المعلنة. السعر النهائي يُثبَّت قبل بدء العمل."
        />

        <Reveal className="mx-auto max-w-3xl">
          <PriceEstimatorForm />
        </Reveal>
      </div>
    </section>
  );
}
