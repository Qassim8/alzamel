import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import ServiceCard from "@/components/ui/ServiceCard";
import { FEATURED_SERVICES, SERVICES } from "@/lib/content/services";
import { ar } from "@/lib/format";

/**
 * شبكة الخدمات.
 * all=false → الخدمات المختارة مع زر يفتح الصفحة الكاملة (الرئيسية).
 * all=true  → الخدمات كلها بلا ترويسة (صفحة الخدمات).
 */
export default function ServicesGrid({ all = false }) {
  const items = all ? SERVICES : FEATURED_SERVICES;

  const grid = (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((s, i) => (
        <Reveal key={s.id} delay={(i % 3) * 100} className="h-full">
          <div
            id={all ? s.id : undefined}
            className={`h-full ${all ? "scroll-mt-24 sm:scroll-mt-16" : ""}`}
          >
            <ServiceCard service={s} />
          </div>
        </Reveal>
      ))}
    </div>
  );

  if (all) {
    return (
      <section className="section">
        <div className="container-x">{grid}</div>
      </section>
    );
  }

  return (
    <section
      id="services"
      className="relative z-0 pt-42 pb-16 sm:pt-32 sm:pb-24"
    >
      <div className="container-x">
        <SectionHeading
          label="خدماتنا"
          title="كل ما يحتاجه المكان النظيف — تحت سقف واحد"
          subtitle={`${ar(SERVICES.length)} خدمة متخصصة من النظافة التأهيلية إلى مكافحة الحشرات. كل خدمة تفتح لك واتساب برسالة مجهّزة بتفاصيلها.`}
        />
        {grid}
        <Reveal delay={120} className="mt-10 text-center">
          <Link href="/services" className="btn-navy">
            اعرض كل الخدمات
            <FaArrowLeftLong className="text-xs" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
