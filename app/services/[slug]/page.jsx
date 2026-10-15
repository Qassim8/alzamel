import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaArrowLeftLong, FaCheck, FaWhatsapp } from "react-icons/fa6";

import PageHeader from "@/components/layout/PageHeader";
import CTABanner from "@/components/sections/CTABanner";
import ProcessSteps from "@/components/sections/ProcessSteps";
import JsonLd from "@/components/seo/JsonLd";
import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import {
  SERVICES,
  getServiceBySlug,
  relatedServices,
} from "@/lib/content/services";
import { ar } from "@/lib/format";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo";
import { PRIMARY_CITY } from "@/lib/site";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

/** صفحة ثابتة لكل خدمة — تُبنى وقت البناء فتظهر فوراً وتُفهرس جيداً. */
export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  const title = `${service.titleAr} في ${PRIMARY_CITY}`;
  // الوصف يُقتطع عند أول جملة ليبقى ضمن ما يعرضه Google (~160 حرفاً)
  const firstSentence = service.descAr.split("،")[0];
  const priceLine = service.priceFrom
    ? ` تبدأ من ${service.priceFrom.display}.`
    : "";
  const description = `${service.titleAr} في ${PRIMARY_CITY} — ${firstSentence}.${priceLine} احجز من الزامل كلين عبر واتساب.`;

  return {
    title,
    description,
    alternates: { canonical: `/services/${slug}` },
    openGraph: {
      title: `${title} | الزامل كلين`,
      description,
      url: `/services/${slug}`,
      type: "article",
    },
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  const related = relatedServices(slug);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbSchema([
            { name: "الرئيسية", path: "/" },
            { name: "خدماتنا", path: "/services" },
            { name: service.titleAr, path: `/services/${slug}` },
          ]),
          serviceSchema(service),
        ]}
      />

      <PageHeader
        label="خدماتنا"
        title={`${service.titleAr} في ${PRIMARY_CITY}`}
        subtitle={service.descAr}
      />

      {/* الشرح + الصورة */}
      <section className="section">
        <div className="container-x grid items-start gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-16">
          <Reveal>
            <span className="mb-5 eyebrow">
              <Icon name={service.icon} className="text-primary-ink" />
              {service.short}
            </span>
            <h2 className="heading-section">كيف ننفّذ هذه الخدمة</h2>
            <p className="mt-5 lead">{service.longDesc}</p>

            {service.includes?.length > 0 && (
              <>
                <h3 className="mt-10 mb-4 text-card font-bold text-navy">
                  ماذا تشمل الخدمة؟
                </h3>
                <ul className="grid gap-3 sm:grid-cols-2">
                  {service.includes.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 text-small font-semibold text-navy/80"
                    >
                      <FaCheck className="mt-1 shrink-0 text-micro text-turquoise" />
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            )}

            <div className="mt-9 flex flex-wrap gap-3">
              <a
                href={whatsappLink(WA_MESSAGES.service(service.titleAr))}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <FaWhatsapp className="text-lg" />
                اطلب {service.titleAr}
              </a>
              <Link href="/pricing" className="btn-ghost">
                كل الأسعار
                <FaArrowLeftLong className="text-xs" />
              </Link>
            </div>
          </Reveal>

          <Reveal delay={150} className="lg:sticky lg:top-28">
            {service.image && (
              <div className="overflow-hidden rounded-panel shadow-lift">
                <Image
                  src={service.image}
                  alt={service.imageAlt || service.titleAr}
                  width={1000}
                  height={700}
                  sizes="(max-width: 1024px) 92vw, 460px"
                  className="h-64 w-full object-cover sm:h-80"
                />
              </div>
            )}

            {/* جدول أسعار الخدمة */}
            {service.prices?.length > 0 && (
              <div className="mt-6 overflow-hidden card">
                <div className="border-b border-line bg-mist px-6 py-4">
                  <h3 className="text-card font-bold text-navy">
                    أسعار {service.titleAr}
                  </h3>
                </div>
                <ul className="divide-y divide-line">
                  {service.prices.map((p) => (
                    <li
                      key={p.label}
                      className="flex flex-wrap items-center justify-between gap-2 px-6 py-3.5"
                    >
                      <span className="text-small font-semibold text-navy">
                        {p.label}
                      </span>
                      <span className="text-small font-bold text-primary-ink">
                        من {p.display}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="border-t border-line px-6 py-3 text-caption text-muted">
                  السعر النهائي يُثبَّت قبل بدء العمل.
                </p>
              </div>
            )}
          </Reveal>
        </div>
      </section>

      {/* خطوات العمل */}
      <section className="bg-mist section">
        <div className="container-x">
          <SectionHeading
            label="كيف نعمل"
            title="من رسالة واتساب إلى مكان نظيف"
            subtitle="أربع خطوات واضحة — تعرف ما يحدث في كل مرحلة."
          />
          <ProcessSteps />
        </div>
      </section>

      {/* خدمات ذات صلة — ربط داخلي يقوّي أرشفة الصفحات */}
      <section className="section">
        <div className="container-x">
          <SectionHeading
            label="خدمات أخرى"
            title="قد تحتاج أيضاً"
            subtitle={`نقدّم ${ar(SERVICES.length)} خدمة تنظيف متخصصة في ${PRIMARY_CITY}.`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r, i) => (
              <Reveal key={r.slug} delay={i * 110}>
                <Link
                  href={`/services/${r.slug}`}
                  className="group flex h-full flex-col card p-6 transition-all duration-300 ease-brand hover:-translate-y-1 hover:border-azure/35 hover:shadow-lift"
                >
                  <span className="mb-4 icon-box">
                    <Icon name={r.icon} />
                  </span>
                  <h3 className="mb-2 text-card font-bold text-navy">
                    {r.titleAr}
                  </h3>
                  <p className="flex-1 text-small leading-6 text-muted">
                    {r.short}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-2 text-small font-bold text-primary-ink">
                    التفاصيل والسعر
                    <FaArrowLeftLong className="text-xs transition-transform duration-300 group-hover:-translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={`جاهز لحجز ${service.titleAr}؟`}
        subtitle="أرسل لنا نوع المكان وحجمه، ونرجع لك بالتفاصيل والسعر خلال وقت قصير."
      />
    </>
  );
}
