import Image from "next/image";
import {
  FaWhatsapp,
  FaLocationDot,
  FaTruckFast,
  FaClock,
} from "react-icons/fa6";
import PageHeader from "@/components/layout/PageHeader";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABanner from "@/components/sections/CTABanner";
import Reveal from "@/components/ui/Reveal";
import { CITIES } from "@/lib/content/cities";
import { COMPANY } from "@/lib/content/company";
import { ar } from "@/lib/format";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export const metadata = {
  title: "مناطق التغطية",
  description:
    "الزامل كلين — مقرّنا الرياض (حي النفل) وخدماتنا تصل إلى أكثر من ١٦ مدينة في المملكة. اختر مدينتك واطلب خدمتك مباشرة.",
  alternates: { canonical: "/areas" },
};

const PERKS = [
  {
    icon: <FaTruckFast />,
    title: "أسطول موحّد",
    desc: "سيارات بهوية العلامة ومعدات كاملة تصل معها في كل زيارة.",
  },
  {
    icon: <FaClock />,
    title: "وصول في الموعد",
    desc: "نحدد نافذة وصول واضحة ونلتزم بها — ونخبرك فوراً بأي تغيير.",
  },
  {
    icon: <FaLocationDot />,
    title: "تغطية خارج القائمة",
    desc: "مدينتك غير مذكورة؟ راسلنا — نرتّب الزيارة حسب حجم العمل.",
  },
];

export default function AreasPage() {
  return (
    <>
      <PageHeader
        label="مناطق التغطية"
        title={`نخدم ${ar(CITIES.length)} مدينة حول المملكة`}
        subtitle={`مقرّنا الرئيسي في ${COMPANY.city}، ونصل بخدماتنا إلى أبرز مدن المملكة بنفس المعايير ونفس الفريق المدرّب.`}
      />

      <section className="section">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <Reveal>
            <span className="mb-5 eyebrow">اختر مدينتك</span>
            <h2 className="heading-section">
              اضغط على مدينتك وأرسل طلبك مباشرة
            </h2>
            <p className="mt-5 lead">
              كل مدينة تفتح لك محادثة واتساب برسالة مجهّزة باسم مدينتك — نرد
              عليك بتفاصيل التوفر والسعر.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {CITIES.map((c, i) => (
                <Reveal key={c.name} delay={(i % 4) * 70}>
                  <a
                    href={whatsappLink(WA_MESSAGES.city(c.name))}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center justify-between gap-3 rounded-2xl border p-4 transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:shadow-card ${
                      c.main
                        ? "border-transparent bg-brand-grad text-white"
                        : "border-line bg-white hover:border-azure/40"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <FaLocationDot
                        className={c.main ? "text-white/80" : "text-turquoise"}
                      />
                      <span
                        className={`text-body font-bold ${c.main ? "text-white" : "text-navy"}`}
                      >
                        {c.name}
                      </span>
                      {c.main && (
                        <span className="rounded-full bg-white/20 px-2 py-0.5 text-micro font-bold">
                          المقر الرئيسي
                        </span>
                      )}
                    </span>
                    <FaWhatsapp
                      className={`text-card transition-transform duration-300 group-hover:scale-110 ${
                        c.main ? "text-white" : "text-[#25D366]"
                      }`}
                    />
                  </a>
                </Reveal>
              ))}
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-brand shadow-lift">
              <Image
                src="/images/brand-van.jpg"
                alt="سيارة الزامل كلين بهوية العلامة"
                width={1500}
                height={1000}
                sizes="(max-width:1024px) 92vw, 520px"
                className="w-full object-cover"
              />
            </div>

            <div className="mt-6 space-y-3">
              {PERKS.map((p) => (
                <div key={p.title} className="flex gap-4 card p-5">
                  <span className="icon-box-soft h-11! w-11! text-lg!">
                    {p.icon}
                  </span>
                  <div>
                    <p className="text-body font-bold text-navy">{p.title}</p>
                    <p className="mt-1 text-small leading-[1.9] text-muted">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-mist section">
        <div className="container-x">
          <SectionHeading
            label="المقر الرئيسي"
            title={COMPANY.city}
            subtitle={`أوقات العمل: ${COMPANY.workingHours} — سجل تجاري رقم ${COMPANY.commercialRegister}`}
          />
          <Reveal className="mx-auto max-w-2xl text-center">
            <a
              href={whatsappLink(WA_MESSAGES.location)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaWhatsapp className="text-base" /> راسلنا على واتساب
            </a>
          </Reveal>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
