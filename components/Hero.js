import Image from "next/image";
import Link from "next/link";
import { FaWhatsapp, FaArrowLeftLong, FaCircleCheck } from "react-icons/fa6";
import Reveal from "./Reveal";
import { whatsappLink } from "@/lib/data";

const TRUST_POINTS = ["فريق متخصص", "معدات حديثة", "مواد آمنة"];

const FLOATING_BUBBLES = [
  { x: "2%", y: "6%", size: 150, dur: 9, delay: 0, mobile: true },
  { x: "-3%", y: "58%", size: 110, dur: 11, delay: -3 },
  { x: "14%", y: "84%", size: 70, dur: 7, delay: -1.5, mobile: true },
  { x: "30%", y: "10%", size: 60, dur: 8, delay: -4 },
  { x: "44%", y: "88%", size: 95, dur: 10, delay: -2 },
  { x: "48%", y: "30%", size: 42, dur: 6.5, delay: -5 },
  { x: "52%", y: "62%", size: 28, dur: 5.5, delay: -1 },
  { x: "63%", y: "8%", size: 54, dur: 7.5, delay: -2.5, mobile: true },
  { x: "84%", y: "4%", size: 130, dur: 9.5, delay: -6, mobile: true },
  { x: "93%", y: "44%", size: 64, dur: 8, delay: -1.5 },
  { x: "78%", y: "80%", size: 100, dur: 11, delay: -4.5, mobile: true },
  { x: "92%", y: "90%", size: 40, dur: 6, delay: -3 },
  { x: "66%", y: "92%", size: 34, dur: 6.5, delay: -5.5 },
  { x: "38%", y: "52%", size: 24, dur: 5, delay: -0.5 },
  { x: "22%", y: "28%", size: 36, dur: 7, delay: -3.5 },
  { x: "72%", y: "24%", size: 22, dur: 5.5, delay: -2 },
];

const bubbleVars = (b) => ({
  "--x": b.x,
  "--y": b.y ?? "auto",
  "--s": `${b.size}px`,
  "--d": `${b.dur}s`,
  "--delay": `${b.delay}s`,
});

const bubbleClass = (b, extra = "") =>
  `bubble ${extra} ${b.mobile ? "" : "hidden sm:block"}`.trim();

// مسار متموج وعضوي (Fluid Organic Blob/Wave) مستوحى من الأنماط الحركية البارزة
const WAVE_PATH =
  "M0.14,0.02 C0.36,0 0.62,0.04 0.84,0.03 C0.95,0.02 1,0.1 0.98,0.2 " +
  "C0.96,0.3 0.86,0.36 0.88,0.48 C0.9,0.6 1,0.64 0.98,0.76 " +
  "C0.96,0.9 0.9,0.98 0.76,0.98 C0.56,0.98 0.4,0.95 0.22,0.98 " +
  "C0.08,1 0,0.92 0.02,0.8 C0.04,0.62 0,0.46 0.03,0.3 " +
  "C0.05,0.14 0.04,0.04 0.14,0.02 Z";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-[var(--c-mist)] py-12 lg:py-20">
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

      {/* ================= 1. الفقاعات المتحركة ================= */}
      <div
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        {FLOATING_BUBBLES.map((b, i) => (
          <span
            key={`f-${i}`}
            className={bubbleClass(b)}
            style={bubbleVars(b)}
          />
        ))}
      </div>

      <div className="container-x relative z-10 grid items-center gap-14 py-8 lg:grid-cols-2 lg:gap-12">
        {/* النصوص والتعريف */}
        <div>
          <Reveal delay={80}>
            <h1 className="h-display">
              خلّ النظافة علينا
              <br />
              <span className="text-brand-grad mt-14">والراحة لك</span>
            </h1>
          </Reveal>
          <Reveal delay={160}>
            <p className="lead mt-6 max-w-xl">
              من تنظيف ما بعد التشطيب إلى التنظيف العميق للمنازل والمنشآت، نمنح
              كل مساحة عناية تستحقها، بفريق متخصص ومعدات حديثة ومواد آمنة. لأن
              النظافة الحقيقية ليست مجرد مظهر، بل راحة تبدأ من التفاصيل.
            </p>
          </Reveal>
          <Reveal delay={240}>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={whatsappLink(
                  "مرحباً الزامل كلين، أرغب بحجز خدمة تنظيف. أرجو تزويدي بالتفاصيل.",
                )}
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
          </Reveal>
          <Reveal delay={300}>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-sm font-semibold text-navy/80">
              {TRUST_POINTS.map((point) => (
                <li key={point} className="flex items-center gap-2">
                  <FaCircleCheck className="text-emerald-500" />
                  {point}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* ================= 2. الصورة داخل الإطار العضوي المتموّج ================= */}
        <Reveal delay={200} className="relative ">
          <div className="relative isolate mx-auto w-full max-w-[560px] lg:max-w-full">
            <div
              aria-hidden="true"
              className="hero-blob-bg absolute -bottom-6 -left-6 right-12 top-12 -z-10 sm:-bottom-8 sm:-left-8"
            />

            <div className="drop-shadow-[0_28px_40px_rgba(8,47,73,0.28)]">
              <div
                className="relative h-[440px] w-full sm:h-[540px] lg:h-[620px]"
                style={{
                  clipPath: "url(#hero-wave)",
                  WebkitClipPath: "url(#hero-wave)",
                }}
              >
                <Image
                  src="/images/05-sofa-steam.png"
                  alt="فنّي الزامل كلين بزيّ العلامة أثناء تنظيف تفاصيل داخلية"
                  fill
                  priority
                  className="object-cover"
                />

                {/* التدرج الداخلي الشفاف */}
                <div
                  className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent"
                  aria-hidden="true"
                />
              </div>
            </div>

            {/* حدّ أبيض يتبع الشكل المتموّج الجديد */}
            <svg
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
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
