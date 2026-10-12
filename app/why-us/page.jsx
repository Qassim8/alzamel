import Image from "next/image";
import Gallery from "@/components/sections/Gallery";
import { LogoMark } from "@/components/ui/Logo";
import { FaCheck } from "react-icons/fa6";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import ProcessSteps from "@/components/sections/ProcessSteps";
import StatsStrip from "@/components/sections/StatsStrip";
import CTABanner from "@/components/sections/CTABanner";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import { COMPANY } from "@/lib/content/company";
import { WHY_US } from "@/lib/content/why-us";

export const metadata = {
  title: "لماذا تختارنا",
  description:
    "فريق خبير، معدات حديثة ومواد عالية الجودة، وخيارات تنظيف مرنة للمنازل والمنشآت.",
  alternates: { canonical: "/why-us" },
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
                <div className="h-full card p-6">
                  <span className="mb-5 icon-box">
                    <Icon name={f.icon} />
                  </span>
                  <h3 className="mb-2 text-base font-bold text-navy">
                    {f.titleAr}
                  </h3>
                  <p className="text-small leading-[1.95] text-muted">
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
      <section className="relative overflow-hidden bg-navy-grad section">
        <LogoMark
          decorative
          className="pointer-events-none absolute -inset-e-16 -bottom-24 h-[420px] w-auto opacity-[.1] sm:h-[500px]"
        />
        <div className="relative z-10 container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <span className="mb-5 eyebrow text-turquoise!">
              <LogoMark className="h-3.5 w-auto" />
              مبادئنا
            </span>
            <h2 className="heading-section text-white!">
              فريق واحد. مظهر واحد. معيار واحد.
            </h2>
            <p className="mt-5 text-lead leading-loose text-white/65">
              {COMPANY.promise} نحافظ على هذه الروح في كل زيارة — من الزيّ الذي
              يصلك به الفريق إلى آخر سطح نلمسه قبل الخروج.
            </p>

            <div className="mt-9 space-y-5">
              {PRINCIPLES.map((p) => (
                <div key={p.t} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-turquoise/15 text-micro text-turquoise">
                    <FaCheck />
                  </span>
                  <div>
                    <p className="text-lead font-bold text-white">{p.t}</p>
                    <p className="mt-1 text-small leading-[1.9] text-white/60">
                      {p.d}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150}>
            <div className="relative">
              <div className="h-120 overflow-hidden rounded-panel shadow-lift">
                <Image
                  src="/images/10-patio.png"
                  alt="فنّي الزامل كلين أثناء تنظيف واجهة خارجية"
                  fill
                  className="h-full w-full rounded-panel object-cover"
                />
              </div>
              <div className="absolute -inset-s-2 -bottom-5 max-w-[240px] rounded-2xl bg-white p-5 shadow-lift sm:-inset-s-6">
                <LogoMark className="mb-2.5 h-7 w-auto" />
                <p className="text-small leading-[1.8] font-bold text-navy">
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

      <Gallery
        tone="mist"
        title="هكذا يصلك الفريق"
        subtitle="زيّ موحّد بألوان العلامة ومعدات جاهزة في كل زيارة."
      />

      <CTABanner tone="light" />
    </>
  );
}
