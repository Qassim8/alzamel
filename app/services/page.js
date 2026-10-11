import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { SERVICES } from "@/lib/data";

export const metadata = {
  title: "خدماتنا — ١٢ خدمة تنظيف متخصصة",
  description:
    "النظافة التأهيلية، التنظيف العميق، الكنب والمفروشات، السجاد والموكيت، الخيام، الستائر والنوافذ، المطابخ ودورات المياه، الواجهات والأحواش، الحدائق، خزانات المياه، الثريات، ومكافحة الحشرات.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        label="خدماتنا"
        title="١٢ خدمة تنظيف متخصصة"
        subtitle="من إزالة آثار البناء بعد التشطيب إلى تلميع الثريات — كل خدمة لها بروتوكول ومواد ومعدات خاصة بها. اضغط على أي خدمة لترسل لنا طلبك مباشرة."
      />

      {/* شريط تنقل سريع بين الخدمات */}
      <section className="sticky top-[76px] z-30 border-b border-line bg-white/90 backdrop-blur-lg">
        <div className="container-x flex scrollbar-none gap-2 overflow-x-auto py-3.5 [&::-webkit-scrollbar]:hidden">
          {SERVICES.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="flex shrink-0 items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[13px] font-semibold text-navy/75 transition-all duration-300 ease-brand hover:border-azure/50 hover:text-primary"
            >
              <Icon name={s.icon} className="text-primary" />
              {s.titleAr}
            </a>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal
                key={s.id}
                delay={(i % 3) * 100}
                className="h-full scroll-mt-40"
              >
                <div id={s.id} className="h-full">
                  <ServiceCard service={s} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

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

      <section className="section">
        <div className="container-x">
          <SectionHeading label="أسئلة شائعة" title="تفاصيل تهمّك قبل الحجز" />
          <FAQ />
        </div>
      </section>

      <CTABanner
        title="ما لقيت الخدمة اللي تبيها؟"
        subtitle="أرسل لنا وصف المكان وما تحتاجه، ونرتّب لك الحل المناسب."
      />
    </>
  );
}
