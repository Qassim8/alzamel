import PageHeader from "@/components/layout/PageHeader";
import ContactForm from "@/components/sections/ContactForm";
import FAQ from "@/components/ui/FaqList";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content/faqs";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo";

export const metadata = {
  title: "تواصل معنا — طلب خدمة تنظيف في الرياض",
  description:
    "اطلب خدمة تنظيف أو عرض سعر من الزامل كلين في الرياض — عبر نموذج الموقع أو واتساب مباشرة. نرد على طلبك في أسرع وقت.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "تواصل مع الزامل كلين — تنظيف في الرياض",
    description: "اطلب خدمة أو عرض سعر عبر النموذج أو واتساب مباشرة.",
    url: "/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "الرئيسية", path: "/" },
          { name: "تواصل معنا", path: "/contact" },
        ])}
      />

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
