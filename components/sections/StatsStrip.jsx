import {
  FaUsers,
  FaCircleCheck,
  FaAward,
  FaFaceSmile,
  FaBroom,
} from "react-icons/fa6";
import Counter from "@/components/ui/Counter";
import Reveal from "@/components/ui/Reveal";
import { STATS } from "@/lib/content/stats";
import { FaHandsWash } from "react-icons/fa";

// بنفس ترتيب STATS في lib/data
const STAT_ICONS = [FaBroom, FaCircleCheck, FaAward, FaFaceSmile];

export default function StatsStrip({ tone = "light" }) {
  const dark = tone === "dark";

  return (
    /* لوحة واحدة مقسّمة بخطوط رفيعة: الخلفية تظهر من خلال gap-px
       فتعطي فواصل صحيحة في 2×2 على الجوال و4 أعمدة على الحاسوب */
    <div
      className={`grid grid-cols-2 gap-px overflow-hidden rounded-3xl border lg:grid-cols-3 ${
        dark
          ? "border-white/10 bg-white/10"
          : "border-line bg-line shadow-[0_20px_50px_-24px_rgba(8,47,73,0.25)]"
      }`}
    >
      {STATS.map((s, i) => {
        const StatIcon = STAT_ICONS[i % STAT_ICONS.length];

        return (
          <Reveal
            key={s.labelAr}
            delay={i * 90}
            className={`flex flex-col items-center px-4 py-7 text-center sm:px-6 sm:py-9 lg:flex-row lg:items-center lg:gap-4 lg:text-start ${
              dark ? "bg-navy" : "bg-white"
            }`}
          >
            <span
              className={`mb-3 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl text-lg lg:mb-0 lg:h-14 lg:w-14 lg:text-xl ${
                dark
                  ? "bg-turquoise/15 text-turquoise"
                  : "bg-mist text-primary-ink"
              }`}
              aria-hidden="true"
            >
              <StatIcon />
            </span>

            <div>
              <p
                className={`text-[1.9rem] leading-none font-black tracking-tight sm:text-[2.4rem] ${
                  dark ? "text-turquoise" : "text-brand-grad"
                }`}
              >
                <Counter to={s.value} />
                {s.suffix && (
                  <span className="ms-0.5 text-[0.6em] font-bold">
                    {s.suffix}
                  </span>
                )}
              </p>
              <p
                className={`mt-2 text-small leading-snug font-semibold sm:text-sm ${
                  dark ? "text-white/65" : "text-muted"
                }`}
              >
                {s.labelAr}
              </p>
            </div>
          </Reveal>
        );
      })}
    </div>
  );
}
