import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/ui/FaqList";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content/faqs";

export const metadata = {
  title: "تواصل معنا",
  description:
    "اطلب خدمة أو عرض سعر من الزامل كلين — عبر النموذج أو واتساب مباشرة. الرياض وأكثر من ١٦ مدينة.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="تواصل معنا"
        title="اطلب خدمة أو اترك لنا رسالة"
        subtitle="اكتب بياناتك وتفاصيل المكان، ونتواصل معك لتحديد الموعد والسعر المناسب."
      />

      <section className="section">
        <div className="container-x">
          <ContactForm />
        </div>
      </section>

      <section className="bg-mist section">
        <div className="container-x">
          <SectionHeading label="قبل ما ترسل" title="ربما تجد إجابتك هنا" />
          <FAQ items={FAQS.slice(0, 4)} />
        </div>
      </section>
    </>
  );
}
