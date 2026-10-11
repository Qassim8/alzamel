import { LogoMark } from "@/components/ui/Logo";

/**
 * ختم العلامة: قطرة الشعار داخل دائرة بيضاء يحيط بها نص دائري.
 * النص لاتيني لأن تشكيل الحروف العربية على مسار دائري غير موثوق.
 * يدور ببطء (٤٠ ثانية) ويتوقف مع prefers-reduced-motion.
 *
 * لا يضبط المكوّن موضعه بنفسه (بلا relative/absolute) حتى لا يتعارض
 * مع الموضع الذي يمرّره المستدعي في className.
 */
export default function BrandSeal({ className = "" }) {
  return (
    <div
      className={`grid h-[76px] w-[76px] place-items-center rounded-full bg-white shadow-lift sm:h-[104px] sm:w-[104px] ${className}`}
      aria-hidden="true"
    >
      {/* direction: ltr ضروري — مع rtl الموروثة لا يُرسم النص على المسار */}
      <svg
        viewBox="0 0 100 100"
        style={{ direction: "ltr" }}
        className="brand-seal col-start-1 row-start-1 h-full w-full"
      >
        <defs>
          <path
            id="brand-seal-path"
            d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0"
            fill="none"
          />
        </defs>
        <text className="fill-navy/55 font-latin text-[8px] font-bold tracking-[.2em]">
          <textPath href="#brand-seal-path" startOffset="0">
            AL ZAMIL CLEAN • AL ZAMIL CLEAN •
          </textPath>
        </text>
      </svg>
      <LogoMark className="col-start-1 row-start-1 h-7 w-auto sm:h-10" />
    </div>
  );
}
