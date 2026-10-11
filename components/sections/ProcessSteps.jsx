import Reveal from "@/components/ui/Reveal";
import { ar } from "@/lib/format";
import { STEPS } from "@/lib/content/steps";

export default function ProcessSteps({ tone = "light" }) {
  const dark = tone === "dark";
  return (
    <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {/* خط الربط بين الخطوات على الشاشات الكبيرة */}
      <span
        className={`absolute inset-x-12 top-[46px] hidden h-px lg:block ${
          dark ? "bg-white/15" : "bg-line"
        }`}
        aria-hidden="true"
      />
      {STEPS.map((s, i) => (
        <Reveal
          key={s.num}
          delay={i * 110}
          className={`relative rounded-brand p-6 transition-all duration-300 ease-brand ${
            dark
              ? "border border-white/10 bg-white/4 hover:bg-white/[.07]"
              : "card"
          }`}
        >
          <span
            className={`mb-5 flex h-12 w-12 items-center justify-center rounded-icon text-lead font-bold ${
              dark ? "bg-turquoise text-navy" : "bg-action-grad text-white"
            }`}
          >
            {ar(s.num)}
          </span>
          <h3
            className={`mb-2 text-base font-bold ${dark ? "text-white" : "text-navy"}`}
          >
            {s.titleAr}
          </h3>
          <p
            className={`text-small leading-[1.9] ${dark ? "text-white/60" : "text-muted"}`}
          >
            {s.descAr}
          </p>
        </Reveal>
      ))}
    </div>
  );
}
