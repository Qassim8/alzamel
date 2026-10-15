import CTABanner from "@/components/sections/CTABanner";
import FaqSection from "@/components/sections/FaqSection";
import ProcessSteps from "@/components/sections/ProcessSteps";
import ServicesGrid from "@/components/sections/ServicesGrid";
import PageHeader from "@/components/layout/PageHeader";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { SERVICES } from "@/lib/content/services";
import { ar } from "@/lib/format";
import JsonLd from "@/components/seo/JsonLd";
import { FAQS } from "@/lib/content/faqs";
import { breadcrumbSchema, faqSchema, serviceListSchema } from "@/lib/seo";

export const metadata = {
  title: "خدمات التنظيف في الرياض — ١٢ خدمة متخصصة",
  description:
    "١٢ خدمة تنظيف متخصصة في الرياض: نظافة تأهيلية، تنظيف عميق، كنب وسجاد، ستائر ونوافذ، مطابخ ودورات مياه، خزانات، واجهات، ومكافحة حشرات. لكل خدمة صفحتها وسعرها.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "خدمات التنظيف في الرياض — ١٢ خدمة متخصصة",
    description:
      "من النظافة التأهيلية بعد التشطيب إلى تنظيف الكنب والسجاد والخزانات والواجهات ومكافحة الحشرات.",
    url: "/services",
    type: "website",
  },
};

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "خدماتنا", path: "/services" },
          ]),
          faqSchema(FAQS),
          serviceListSchema(),
        ]}
      />

      <PageHeader
        label="خدماتنا"
        title={`${ar(SERVICES.length)} خدمة تنظيف متخصصة`}
        subtitle="من إزالة آثار البناء بعد التشطيب إلى تلميع الثريات — كل خدمة لها بروتوكول ومواد ومعدات خاصة بها. اضغط على أي خدمة لترسل لنا طلبك مباشرة."
      />

      {/* شريط تنقل سريع بين الخدمات — يلتصق تحت الـ Navbar */}
      <section className="sticky top-(--nav-h) z-30 border-b border-line backdrop-blur-lg">
        <div className="container-x">
          <nav
            aria-label="انتقل مباشرة إلى خدمة"
            className="service-filter-scrollbar flex [touch-action:pan-x] snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain py-3.5"
          >
            {SERVICES.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="flex shrink-0 snap-start items-center gap-2 rounded-full border border-line bg-white px-3.5 py-2 text-small font-semibold text-navy/75 transition-all duration-300 ease-brand hover:border-azure/50 hover:text-primary-ink"
              >
                <Icon name={s.icon} className="text-primary-ink" />
                {s.titleAr}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <ServicesGrid all />

      <section className="bg-mist section">
        <div className="container-x">
          <SectionHeading
            label="كيف نعمل"
            title="نفس الخطوات في كل خدمة"
            subtitle="بروتوكول واحد يضمن أن النتيجة لا تعتمد على من نفّذ الزيارة."
          />
          <ProcessSteps />
        </div>
      </section>

      <FaqSection title="تفاصيل تهمّك قبل الحجز" />

      <CTABanner
        title="ما لقيت الخدمة اللي تبيها؟"
        subtitle="أرسل لنا وصف المكان وما تحتاجه، ونرتّب لك الحل المناسب."
      />
    </>
  );
}
