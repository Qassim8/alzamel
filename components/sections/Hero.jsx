import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong, FaCircleCheck, FaWhatsapp } from "react-icons/fa6";
import BrandSeal from "@/components/ui/BrandSeal";
import BubbleField from "@/components/sections/BubbleField";
import StatsStrip from "@/components/sections/StatsStrip";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const TRUST_POINTS = ["فريق متخصص", "معدات حديثة", "مواد آمنة"];

// مسار متموج عضوي يُقصّ به إطار الصورة
const WAVE_PATH =
  "M0.14,0.02 C0.36,0 0.62,0.04 0.84,0.03 C0.95,0.02 1,0.1 0.98,0.2 " +
  "C0.96,0.9 0.9,0.98 0.76,0.98 C0.56,0.98 0.4,0.95 0.22,0.98 " +
  "C0.08,1 0,0.92 0.02,0.8 C0.04,0.62 0,0.46 0.03,0.3 " +
  "C0.05,0.14 0.04,0.04 0.14,0.02 Z";

/**
 * الهيرو — بلا Reveal على العنوان والصورة:
 * عنصر LCP يجب أن يُرسم فوراً دون انتظار جافاسكربت.
 */
export default function Hero() {
  return (
    <section className="relative isolate z-10 bleed-under-nav flex min-h-svh flex-col overflow-x-clip overflow-y-visible bg-mist pt-12 pb-0 lg:pt-20">
      {/* تعريف قناع الإطار المتموّج */}
      <svg
        width="0"
        height="0"
        className="absolute"
        aria-hidden="true"
        focusable="false"
      >
        <defs>
          <clipPath id="hero-wave" clipPathUnits="objectBoundingBox">
            <path d={WAVE_PATH} />
          </clipPath>
        </defs>
      </svg>

      <BubbleField />

      <div className="relative z-10 container-x grid flex-1 items-center gap-8 pt-5 pb-0 sm:gap-14 sm:pt-8 lg:grid-cols-2 lg:gap-12">
        {/* النصوص */}
        <div>
          <h1 className="heading-display">
            خلّ النظافة علينا
            <br />
            <span className="text-brand-grad">والراحة لك</span>
          </h1>

          <p className="mt-6 max-w-xl lead">
            من تنظيف ما بعد التشطيب إلى التنظيف العميق للمنازل والمنشآت، نمنح كل
            مساحة عناية تستحقها، بفريق متخصص ومعدات حديثة ومواد آمنة. لأن
            النظافة الحقيقية ليست مجرد مظهر، بل راحة تبدأ من التفاصيل.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={whatsappLink(WA_MESSAGES.book)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <FaWhatsapp className="text-lg" />
              احجز خدمة التنظيف
            </a>

            <Link href="/services" className="btn-ghost">
              اكتشف خدماتنا
              <FaArrowLeftLong className="text-xs" />
            </Link>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-navy/80">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <FaCircleCheck className="text-primary-ink" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* الصورة داخل الإطار العضوي المتموّج */}
        <div className="relative self-end">
          <div className="relative isolate mx-auto w-full max-w-140 lg:max-w-full">
            {/* <div
              aria-hidden="true"
              className="hero-blob-bg absolute top-12 right-12 -bottom-6 -left-6 -z-10 sm:-bottom-8 sm:-left-8"
            /> */}

            <div className="relative h-[clamp(18rem,48svh,28rem)] w-full sm:h-105 lg:h-150">
              <Image
                src="/images/02-hero.png"
                alt="فنّي الزامل كلين بزيّ العلامة أثناء تنظيف الكنب بالبخار"
                fill
                priority
                className="object-cover object-bottom"
              />
            </div>

            {/* حدّ أبيض يتبع الشكل المتموّج */}
            {/* <svg
              aria-hidden="true"
              viewBox="0 0 1 1"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                d={WAVE_PATH}
                fill="none"
                stroke="#fff"
                strokeWidth={6}
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            </svg> */}
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 translate-y-1/2">
        <div className="container-x">
          <StatsStrip />
        </div>
      </div>
    </section>
  );
}
