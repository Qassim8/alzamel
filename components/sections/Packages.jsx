import { FaWhatsapp, FaCheck, FaStar } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import Icon from "@/components/ui/Icon";
import SectionHeading from "@/components/ui/SectionHeading";
import { PACKAGES } from "@/lib/content/packages";
import { UNIT_PRICING } from "@/lib/content/pricing";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export function PackagesGrid() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3">
      {PACKAGES.map((p, i) => (
        <Reveal key={p.id} delay={i * 110} className="h-full">
          <article
            className={`relative flex h-full flex-col rounded-brand p-7 transition-all duration-300 ease-brand ${
              p.popular ? "bg-navy-grad text-white shadow-lift" : "card-hover"
            }`}
          >
            {p.popular && (
              <span className="absolute inset-s-7 -top-3 inline-flex items-center gap-1.5 rounded-full bg-turquoise px-3 py-1 text-caption font-bold text-navy">
                <FaStar className="text-micro" /> الأكثر طلباً
              </span>
            )}

            <h3
              className={`text-title font-bold ${p.popular ? "text-white" : "text-navy"}`}
            >
              {p.titleAr}
            </h3>
            <p
              className={`mt-1 text-small ${p.popular ? "text-white/60" : "text-muted"}`}
            >
              {p.subtitle}
            </p>

            <div
              className={`my-6 border-y py-5 ${p.popular ? "border-white/12" : "border-line"}`}
            >
              {p.price ? (
                <p className="flex items-baseline gap-1.5">
                  <span
                    className={`text-[1.75rem] font-bold ${p.popular ? "text-white" : "text-navy"}`}
                  >
                    {p.price}
                  </span>
                  <span
                    className={`text-small ${p.popular ? "text-white/60" : "text-muted"}`}
                  >
                    / {p.period}
                  </span>
                </p>
              ) : (
                <>
                  <p
                    className={`text-lead font-bold ${p.popular ? "text-turquoise" : "text-primary-ink"}`}
                  >
                    عرض سعر مخصص
                  </p>
                  <p
                    className={`mt-1 text-caption ${p.popular ? "text-white/55" : "text-muted"}`}
                  >
                    التسعير حسب المساحة وعدد الزيارات — {p.period}
                  </p>
                </>
              )}
            </div>

            <ul className="mb-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-small">
                  <FaCheck
                    className={`mt-1 shrink-0 text-micro ${p.popular ? "text-turquoise" : "text-turquoise"}`}
                  />
                  <span
                    className={p.popular ? "text-white/80" : "text-navy/75"}
                  >
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink(WA_MESSAGES.package(p.titleAr))}
              target="_blank"
              rel="noopener noreferrer"
              className={p.popular ? "btn-white w-full" : "btn-primary w-full"}
            >
              <FaWhatsapp className="text-base" /> اطلب عرض السعر
            </a>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

export function UnitPricingGrid() {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {UNIT_PRICING.map((g, gi) => (
        <Reveal key={g.group} delay={gi * 120}>
          <div className="h-full overflow-hidden card">
            <div className="flex items-center gap-3 border-b border-line bg-mist px-6 py-5">
              <span className="icon-box h-11! w-11! text-lg!">
                <Icon name={g.icon} />
              </span>
              <h3 className="text-card font-bold text-navy">{g.group}</h3>
            </div>
            <ul className="divide-y divide-line">
              {g.units.map((u) => (
                <li
                  key={u.label}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-mist/60"
                >
                  <div>
                    <p className="text-body font-bold text-navy">{u.label}</p>
                    <p className="mt-0.5 text-caption text-muted">{u.meta}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {u.priceFrom ? (
                      <span className="text-lead font-bold text-primary-ink">
                        من {u.priceFrom}
                      </span>
                    ) : (
                      <span className="rounded-full bg-mist px-3 py-1 text-caption font-bold text-muted">
                        حسب المعاينة
                      </span>
                    )}
                    <a
                      href={whatsappLink(WA_MESSAGES.unit(u.label, u.meta))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`اطلب سعر ${u.label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-lead text-primary-ink transition-all duration-300 ease-brand hover:bg-brand-grad hover:text-white"
                    >
                      <FaWhatsapp />
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}
    </div>
  );
}

/** القسم الكامل كما يظهر في الصفحة الرئيسية. */
export default function PackagesSection() {
  return (
    <section className="bg-mist section">
      <div className="container-x">
        <SectionHeading
          label="الباقات والعقود"
          title="ادفع مقابل ما تحتاجه فعلاً"
          subtitle="زيارة مفردة، باقة دورية، أو عقد سنوي للمنشآت — والتسعير يتحدد حسب نوع المكان ومساحته."
        />
        <PackagesGrid />
      </div>
    </section>
  );
}
