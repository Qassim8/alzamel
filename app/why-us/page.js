import Image from "next/image";
import { FaCheck, FaQuoteRight } from "react-icons/fa6";
import PageHeader from "@/components/PageHeader";
import SectionHeading from "@/components/SectionHeading";
import ProcessSteps from "@/components/ProcessSteps";
import StatsStrip from "@/components/StatsStrip";
import CTABanner from "@/components/CTABanner";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import { COMPANY, WHY_US, GALLERY } from "@/lib/data";

export const metadata = {
  title: "لماذا تختارنا",
  description:
    "فريق موحّد بزيّ العلامة، مواد آمنة ومعتمدة، تسعير واضح قبل البدء، وبروتوكول تنظيف ثابت في كل زيارة.",
};

const PRINCIPLES = [
  {
    t: "وضوح",
    d: "سعر واضح ونطاق عمل محدد قبل أن نبدأ — تعرف تماماً ما ستحصل عليه.",
  },
  {
    t: "عناية",
    d: "تفاصيل متقنة وحضور هادئ داخل مساحتك — نحترم المكان كما نحترم صاحبه.",
  },
  {
    t: "اتساق",
    d: "لغة واحدة في كل تطبيق: نفس الفريق، نفس الزيّ، نفس المعايير.",
  },
];

export default function WhyUsPage() {
  return (
    <>
      <PageHeader
        label="لماذا الزامل كلين"
        title="نظافة تُدار باحتراف، لا بالصدفة"
        subtitle="النتيجة الجيدة ليست حظاً — هي بروتوكول ثابت، ومواد مختارة، وفريق يعرف ما يفعله في كل زاوية."
      />

      <section className="section">
        <div className="container-x">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((f, i) => (
              <Reveal key={f.titleAr} delay={(i % 3) * 110}>
                <div className="card-hover h-full p-6">
                  <span className="icon-box mb-5">
                    <Icon name={f.icon} />
                  </span>
                  <h3 className="mb-2 text-[16px] font-bold text-navy">
                    {f.titleAr}
                  </h3>
                  <p className="text-[13.5px] leading-[1.95] text-muted">
                    {f.descAr}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12">
            <StatsStrip />
          </div>
        </div>
      </section>

      {/* مبادئ الهوية */}
      <section className="section bg-navy-grad">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="eyebrow mb-5 !text-turquoise before:!bg-turquoise/50">
              مبادئنا
            </span>
            <h2 className="h-section !text-white">
              فريق واحد. مظهر واحد. معيار واحد.
            </h2>
            <p className="mt-5 text-[15px] leading-[2] text-white/65">
              {COMPANY.promise} نحافظ على هذه الروح في كل زيارة — من الزيّ الذي
              يصلك به الفريق إلى آخر سطح نلمسه قبل الخروج.
            </p>

            <div className="mt-9 space-y-5">
              {PRINCIPLES.map((p) => (
                <div key={p.t} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-[10px] text-turquoise">
                    <FaCheck />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-white">{p.t}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.9] text-white/60">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="overflow-hidden rounded-[26px] shadow-lift">
                <Image
                  src="/images/facade-cleaning.jpg"
                  alt="فنّي الزامل كلين أثناء تنظيف واجهة خارجية"
                  width={1000}
                  height={1500}
                  sizes="(max-width:1024px) 92vw, 520px"
                  className="h-[400px] w-full object-cover sm:h-[500px]"
                />
              </div>
              <div className="absolute -bottom-5 -start-2 max-w-[240px] rounded-2xl bg-white p-5 shadow-lift sm:-start-6">
                <FaQuoteRight className="mb-2 text-lg text-turquoise" />
                <p className="text-[13.5px] font-bold leading-[1.8] text-navy">
                  {COMPANY.tagline}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section">
        <div className="container-x">
          <SectionHeading
            label="كيف نعمل"
            title="أربع خطوات، بلا مفاجآت"
            subtitle="تعرف ما يحدث في كل مرحلة — من أول رسالة إلى التسليم النهائي."
          />
          <ProcessSteps />
        </div>
      </section>

      <section className="section bg-mist">
        <div className="container-x">
          <SectionHeading
            label="من الميدان"
            title="هكذا يصلك الفريق"
            subtitle="زيّ موحّد بألوان العلامة ومعدات جاهزة في كل زيارة."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 120}>
                <div className="group overflow-hidden rounded-brand shadow-card">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={1000}
                    height={1500}
                    sizes="(max-width:640px) 92vw, 360px"
                    className="h-[300px] w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06] sm:h-[340px]"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
