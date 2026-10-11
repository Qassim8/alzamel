import { FaWhatsapp, FaCheck, FaStar } from "react-icons/fa6";
import Reveal from "./Reveal";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";
import { PACKAGES, UNIT_PRICING, whatsappLink } from "@/lib/data";

export function PackagesGrid() {
  return (
    <div className="grid items-stretch gap-6 lg:grid-cols-3">
      {PACKAGES.map((p, i) => (
        <Reveal key={p.id} delay={i * 110} className="h-full">
          <article
            className={`relative flex h-full flex-col rounded-brand p-7 transition-all duration-300 ease-brand ${
              p.popular
                ? "bg-navy-grad text-white shadow-lift"
                : "card-hover"
            }`}
          >
            {p.popular && (
              <span className="absolute -top-3 start-7 inline-flex items-center gap-1.5 rounded-full bg-turquoise px-3 py-1 text-[11.5px] font-bold text-navy">
                <FaStar className="text-[10px]" /> الأكثر طلباً
              </span>
            )}

            <h3
              className={`text-[19px] font-bold ${p.popular ? "text-white" : "text-navy"}`}
            >
              {p.titleAr}
            </h3>
            <p
              className={`mt-1 text-[13px] ${p.popular ? "text-white/60" : "text-muted"}`}
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
                    className={`text-[13px] ${p.popular ? "text-white/60" : "text-muted"}`}
                  >
                    / {p.period}
                  </span>
                </p>
              ) : (
                <>
                  <p
                    className={`text-[15px] font-bold ${p.popular ? "text-turquoise" : "text-primary"}`}
                  >
                    عرض سعر مخصص
                  </p>
                  <p
                    className={`mt-1 text-[12.5px] ${p.popular ? "text-white/55" : "text-muted"}`}
                  >
                    التسعير حسب المساحة وعدد الزيارات — {p.period}
                  </p>
                </>
              )}
            </div>

            <ul className="mb-7 flex-1 space-y-3">
              {p.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-[13.5px]">
                  <FaCheck
                    className={`mt-1 shrink-0 text-[10px] ${p.popular ? "text-turquoise" : "text-turquoise"}`}
                  />
                  <span className={p.popular ? "text-white/80" : "text-navy/75"}>
                    {f}
                  </span>
                </li>
              ))}
            </ul>

            <a
              href={whatsappLink(
                `مرحباً الزامل كلين، أرغب بتفاصيل "${p.titleAr}" وسعرها.`,
              )}
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
          <div className="card h-full overflow-hidden">
            <div className="flex items-center gap-3 border-b border-line bg-mist px-6 py-5">
              <span className="icon-box !h-11 !w-11 !text-lg">
                <Icon name={g.icon} />
              </span>
              <h3 className="text-[17px] font-bold text-navy">{g.group}</h3>
            </div>
            <ul className="divide-y divide-line">
              {g.units.map((u) => (
                <li
                  key={u.label}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 transition-colors hover:bg-mist/60"
                >
                  <div>
                    <p className="text-[14.5px] font-bold text-navy">
                      {u.label}
                    </p>
                    <p className="mt-0.5 text-[12.5px] text-muted">{u.meta}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    {u.priceFrom ? (
                      <span className="text-[15px] font-bold text-primary">
                        من {u.priceFrom}
                      </span>
                    ) : (
                      <span className="rounded-full bg-mist px-3 py-1 text-[12px] font-bold text-muted">
                        حسب المعاينة
                      </span>
                    )}
                    <a
                      href={whatsappLink(
                        `مرحباً الزامل كلين، أرغب بسعر تنظيف "${u.label}" (${u.meta}).`,
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`اطلب سعر ${u.label}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-mist text-[15px] text-primary transition-all duration-300 ease-brand hover:bg-brand-grad hover:text-white"
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
    <section className="section bg-mist">
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
