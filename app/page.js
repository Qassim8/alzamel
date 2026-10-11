import Image from "next/image";
import Link from "next/link";
import {
  FaArrowLeftLong,
  FaCheck,
  FaQuoteRight,
  FaWhatsapp,
} from "react-icons/fa6";

import Hero from "@/components/Hero";
import StatsStrip from "@/components/StatsStrip";
import SectionHeading from "@/components/SectionHeading";
import ServiceCard from "@/components/ServiceCard";
import ProcessSteps from "@/components/ProcessSteps";
import PackagesSection from "@/components/PackagesSection";
import CTABanner from "@/components/CTABanner";
import FAQ from "@/components/FAQ";
import Reveal from "@/components/Reveal";
import Icon from "@/components/Icon";
import {
  COMPANY,
  FEATURED_SERVICES,
  WHY_US,
  CITIES,
  GALLERY,
  FAQS,
  whatsappLink,
  ar,
} from "@/lib/data";

export const metadata = {
  title: "الزامل كلين | شركة تنظيف في الرياض — نظافة تأهيلية وتنظيف عميق",
};

const METHOD_POINTS = [
  ["سحب الأتربة من العمق", "قبل أي غسيل — حتى لا نحبس الأتربة داخل الخامة."],
  ["المادة حسب الخامة", "قماش، خشب، استيل، حجر — لكل سطح مادته وأسلوبه."],
  ["تجفيف كامل", "لا نترك رطوبة تُنتج روائح أو عفونة لاحقاً."],
  ["جولة تفتيش معك", "نمرّ على العمل سوياً قبل الخروج من الموقع."],
];

/* ترتيب الصفحة يتبع رحلة الزائر:
   ماذا تقدّمون؟ ← كيف أحجز؟ ← لماذا أنتم؟ ← أثبتوا ذلك ← كم السعر؟
   ← هل تصلون لمدينتي؟ ← بقي عندي سؤال ← احجز الآن */
export default function HomePage() {
  return (
    <>
      {/* 1. الهيرو */}
      <Hero />

      {/* 2. إحصائيات — ثقة سريعة مباشرة بعد الوعد */}
      <section className="py-14 sm:py-16">
        <div className="container-x">
          <StatsStrip />
        </div>
      </section>

      {/* 3. الخدمات — ماذا نقدّم؟ */}
      <section id="services" className="bg-mist section">
        <div className="container-x">
          <SectionHeading
            label="خدماتنا"
            title="كل ما يحتاجه المكان النظيف — تحت سقف واحد"
            subtitle="١٢ خدمة متخصصة من النظافة التأهيلية إلى مكافحة الحشرات. كل خدمة تفتح لك واتساب برسالة مجهّزة بتفاصيلها."
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURED_SERVICES.map((s, i) => (
              <Reveal key={s.id} delay={(i % 3) * 110} className="h-full">
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>

          <Reveal delay={120} className="mt-10 text-center">
            <Link href="/services" className="btn-navy">
              اعرض الخدمات الـ١٢ كاملة <FaArrowLeftLong className="text-xs" />
            </Link>
          </Reveal>
        </div>
      </section>

      {/* 4. خطوات العمل — كيف أحجز؟ (يزيل التردد مبكراً) */}
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

      {/* 5. لماذا الزامل — ما الذي يميّزنا؟ */}
      <section className="bg-navy-grad section">
        <div className="container-x">
          <SectionHeading
            tone="dark"
            label="لماذا الزامل كلين"
            title="نظافة تُدار باحتراف — من أول زيارة إلى آخر تفصيلة"
            subtitle="نركّز على جودة التنفيذ، وضوح السعر، والمرونة التي تناسب مساحتك."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_US.map((f, i) => (
              <Reveal
                key={f.titleAr}
                delay={(i % 3) * 110}
                className="rounded-brand border border-white/10 bg-white/4 p-6 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-turquoise/30 hover:bg-white/[.07]"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-[14px] bg-turquoise/15 text-xl text-turquoise">
                  <Icon name={f.icon} />
                </span>
                <h3 className="mb-2 text-[16px] font-bold text-white">
                  {f.titleAr}
                </h3>
                <p className="text-[13.5px] leading-[1.95] text-white/60">
                  {f.descAr}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 6. طريقتنا — دليل عملي على التميّز */}
      <section className="section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="order-2 lg:order-1">
            <span className="mb-5 eyebrow">طريقتنا</span>
            <h2 className="heading-section">
              لا نكتفي بالسطح —{" "}
              <span className="text-brand-grad">نعمل على العمق</span>
            </h2>
            <p className="mt-5 lead">
              كل زيارة تمرّ ببروتوكول ثابت: سحب الأتربة من الأعماق، إزالة البقع،
              ثم الغسيل والتجفيف والتعقيم والتعطير. نختار المادة حسب نوع الخامة
              حتى نحافظ على الألوان والأقمشة.
            </p>

            <ul className="mt-8 space-y-4">
              {METHOD_POINTS.map(([t, d]) => (
                <li key={t} className="flex gap-4">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-[10px] text-primary">
                    <FaCheck />
                  </span>
                  <div>
                    <p className="text-[15px] font-bold text-navy">{t}</p>
                    <p className="mt-1 text-[13.5px] leading-[1.9] text-muted">
                      {d}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={150} className="order-1 lg:order-2">
            <div className="relative">
              <div className="overflow-hidden rounded-[26px] shadow-lift">
                <Image
                  src="/images/outdoor-team.jpg"
                  alt="فريق الزامل كلين أثناء تنفيذ عملية تنظيف خارجية"
                  width={1000}
                  height={1500}
                  sizes="(max-width:1024px) 92vw, 520px"
                  className="h-[380px] w-full object-cover sm:h-[480px]"
                />
              </div>
              <div className="absolute -inset-s-2 -bottom-6 max-w-[230px] rounded-2xl border border-line bg-white p-5 shadow-lift sm:-inset-s-6">
                <FaQuoteRight className="mb-2 text-lg text-turquoise" />
                <p className="text-[13.5px] leading-[1.8] font-bold text-navy">
                  {COMPANY.tagline}
                </p>
                <p className="mt-2 text-[12px] text-muted">
                  شعار الزامل كلين المعتمد
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 7. معرض الصور — إثبات بصري */}
      <section className="bg-mist section">
        <div className="container-x">
          <SectionHeading
            label="من الميدان"
            title="فريق واحد. مظهر واحد."
            subtitle="زيّ موحّد بألوان العلامة، ومعدات نعتني بها كما نعتني بمساحتك."
          />
          <div className="grid gap-5 sm:grid-cols-3">
            {GALLERY.map((g, i) => (
              <Reveal key={g.src} delay={i * 120}>
                <div className="group relative overflow-hidden rounded-brand shadow-card">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    width={1000}
                    height={1500}
                    sizes="(max-width:640px) 92vw, 360px"
                    className="h-[300px] w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06] sm:h-[340px]"
                  />
                  <div
                    className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    aria-hidden="true"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 8. الباقات — السعر بعد أن اقتنع الزائر بالقيمة */}
      <PackagesSection />

      {/* 9. التغطية — هل تصلون لمدينتي؟ */}
      <section className="bg-mist section">
        <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
          <Reveal>
            <span className="mb-5 eyebrow">مناطق التغطية</span>
            <h2 className="heading-section">
              مقرّنا الرياض، وخدماتنا تصل إلى {ar(CITIES.length)} مدينة
            </h2>
            <p className="mt-5 lead">
              أسطولنا موحّد بهوية العلامة ويصل إليك في الموعد المتفق عليه. اختر
              مدينتك وأرسل لنا طلبك مباشرة.
            </p>
            <div className="mt-7 flex flex-wrap gap-2">
              {CITIES.map((c) => (
                <a
                  key={c.name}
                  href={whatsappLink(
                    `مرحباً الزامل كلين، أرغب بخدمة تنظيف في ${c.name}.`,
                  )}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`chip transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-azure/50 hover:text-primary ${
                    c.main
                      ? "border-transparent! bg-brand-grad! text-white!"
                      : ""
                  }`}
                >
                  {c.name}
                </a>
              ))}
            </div>
            <Link
              href="/areas"
              className="mt-7 inline-flex items-center gap-2 text-[14px] font-bold text-primary hover:underline"
            >
              تفاصيل التغطية <FaArrowLeftLong className="text-xs" />
            </Link>
          </Reveal>

          <Reveal delay={150}>
            <div className="overflow-hidden rounded-brand shadow-lift">
              <Image
                src="/images/brand-van.jpg"
                alt="سيارة الزامل كلين بهوية العلامة"
                width={1500}
                height={1000}
                sizes="(max-width:1024px) 92vw, 600px"
                className="w-full object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* 10. الأسئلة الشائعة — إزالة آخر اعتراض */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            label="أسئلة شائعة"
            title="إجابات سريعة قبل ما تحجز"
          />
          <FAQ items={FAQS.slice(0, 5)} />
          <Reveal delay={120} className="mt-8 text-center">
            <a
              href={whatsappLink("مرحباً الزامل كلين، لدي سؤال عن خدماتكم.")}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <FaWhatsapp className="text-base text-[#25D366]" /> سؤالك غير
              موجود؟ اسألنا مباشرة
            </a>
          </Reveal>
        </div>
      </section>

      {/* 11. دعوة ختامية للحجز */}
      <CTABanner />
    </>
  );
}
