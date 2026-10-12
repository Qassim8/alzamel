import Image from "next/image";
import { FaCheck } from "react-icons/fa6";
import { LogoMark } from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import { COMPANY } from "@/lib/content/company";

const METHOD_POINTS = [
  ["سحب الأتربة من العمق", "قبل أي غسيل — حتى لا نحبس الأتربة داخل الخامة."],
  ["المادة حسب الخامة", "قماش، خشب، استيل، حجر — لكل سطح مادته وأسلوبه."],
  ["تجفيف كامل", "لا نترك رطوبة تُنتج روائح أو عفونة لاحقاً."],
  ["جولة تفتيش معك", "نمرّ على العمل سوياً قبل الخروج من الموقع."],
];

/** دليل عملي على التميّز — البروتوكول الذي تمرّ به كل زيارة. */
export default function Method() {
  return (
    <section className="section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <Reveal className="order-2 lg:order-1">
          <span className="mb-5 eyebrow">
            <LogoMark className="h-3.5 w-auto" />
            طريقتنا
          </span>
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
                <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-mist text-micro text-primary-ink">
                  <FaCheck />
                </span>
                <div>
                  <p className="text-lead font-bold text-navy">{t}</p>
                  <p className="mt-1 text-small leading-[1.9] text-muted">
                    {d}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={150} className="order-1 lg:order-2">
          <div className="relative">
            <div className="overflow-hidden rounded-panel shadow-lift">
              <Image
                src="/images/courtyard-pressure-wash.webp"
                alt="فريق الزامل كلين أثناء تنفيذ عملية تنظيف خارجية"
                width={1000}
                height={1500}
                sizes="(max-width: 1024px) 92vw, 520px"
                className="h-[380px] w-full object-cover sm:h-[480px]"
              />
            </div>
            {/* النص هنا شعار الشركة اللفظي لا اقتباس عميل — فالعلامة هي المتحدّث */}
            <div className="absolute -inset-s-2 -bottom-6 max-w-[230px] rounded-2xl border border-line bg-white p-5 shadow-lift sm:-inset-s-6">
              <LogoMark className="mb-2.5 h-7 w-auto" />
              <p className="text-small leading-[1.8] font-bold text-navy">
                {COMPANY.tagline}
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
