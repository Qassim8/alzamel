import { MARQUEE_WORDS } from "@/lib/data";

/** شريط كلمات متحرك — يتوقف عند المرور بالماوس ومع تفضيل تقليل الحركة. */
export default function Marquee() {
  const items = [...MARQUEE_WORDS, ...MARQUEE_WORDS];
  return (
    <div
      className="marquee-mask relative overflow-hidden border-y border-line bg-white py-4"
      style={{
        maskImage:
          "linear-gradient(to left, transparent, #000 8%, #000 92%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to left, transparent, #000 8%, #000 92%, transparent)",
      }}
      aria-hidden="true"
    >
      <div className="marquee-track gap-8">
        {items.map((w, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-8 text-[14px] font-bold text-navy/45"
          >
            {w}
            <span className="h-1.5 w-1.5 rounded-full bg-turquoise/60" />
          </span>
        ))}
      </div>
    </div>
  );
}
