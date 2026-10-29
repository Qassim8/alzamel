import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Icon from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import { ABOUT } from "@/lib/content/about";
import { COMPANY } from "@/lib/content/company";

/** من نحن — تعريف بالعلامة وطريقة عملها، لا أرقام مُختلقة. */
export default function About() {
  return (
    <section id="about" className="relative overflow-hidden section">
      <LogoMark
        className="pointer-events-none absolute -inset-s-20 -top-16 hidden h-[26rem] w-auto opacity-[.04] lg:block"
        decorative
      />

      <div className="relative container-x grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-16">
        {/* الصورة + بطاقة السجل */}
        <Reveal className="order-2 lg:order-1">
          <div className="relative">
            <div className="overflow-hidden rounded-panel shadow-lift">
              <Image
                src="/gallery/sofa-3.webp"
                alt="فريق الزامل كلين بالزيّ الموحّد أثناء تنظيف كنب في مجلس بالرياض"
                width={1200}
                height={1600}
                sizes="(max-width: 1024px) 92vw, 500px"
                className="aspect-4/5 w-full object-cover"
              />
            </div>

            <div className="absolute -inset-s-2 -bottom-6 rounded-2xl border border-line bg-white p-5 shadow-lift sm:-inset-s-6">
              <p className="text-caption text-muted">سجل تجاري</p>
              <p className="mt-0.5 text-card font-bold text-navy">
                {COMPANY.commercialRegister}
              </p>
            </div>
          </div>
        </Reveal>

        {/* النص */}
        <Reveal delay={120} className="order-1 lg:order-2">
          <span className="mb-5 eyebrow">
            <LogoMark className="h-3.5 w-auto" decorative />
            {ABOUT.label}
          </span>

          <h2 className="heading-section">{ABOUT.title}</h2>
          <p className="mt-5 lead">{ABOUT.lead}</p>
          <p className="mt-4 text-body leading-8 text-muted">{ABOUT.body}</p>

          <ul className="mt-9 grid gap-5 sm:grid-cols-2">
            {ABOUT.pillars.map((p) => (
              <li key={p.title} className="flex gap-3.5">
                <span className="icon-box-soft h-11! w-11! shrink-0 text-lg!">
                  <Icon name={p.icon} />
                </span>
                <div>
                  <p className="text-body font-bold text-navy">{p.title}</p>
                  <p className="mt-1 text-small leading-6 text-muted">
                    {p.desc}
                  </p>
                </div>
              </li>
            ))}
          </ul>

          <Link
            href="/why-us"
            className="mt-9 inline-flex items-center gap-2 text-body font-bold text-primary-ink hover:underline"
          >
            اعرف أكثر عن طريقتنا
            <FaArrowLeftLong className="text-xs" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
