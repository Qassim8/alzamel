import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { PARTNERS } from "@/lib/content/partners";

/**
 * شركاء النجاح — شريط لا نهائي يمرّ بالشعارات.
 * ما دام `logo` فارغاً يظهر شكل نائب (دائرة/مربع) يُستبدل لاحقاً
 * بالشعار الحقيقي دون أي تغيير في الكود.
 */
function PartnerItem({ partner }) {
  const round = partner.shape === "circle";

  return (
    <li
      className="flex shrink-0 items-center justify-center px-6 sm:px-9"
      aria-hidden="true"
    >
      {partner.logo ? (
        <Image
          src={partner.logo}
          alt={partner.name}
          width={160}
          height={64}
          className="h-12 w-auto object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
        />
      ) : (
        <span
          title={partner.name}
          className={`flex h-16 w-16 items-center justify-center border-2 border-dashed border-navy/15 bg-mist text-caption font-bold text-navy/35 sm:h-20 sm:w-20 ${
            round ? "rounded-full" : "rounded-2xl"
          }`}
        >
          {partner.name}
        </span>
      )}
    </li>
  );
}

export default function Partners() {
  if (PARTNERS.length === 0) return null;

  // نكرّر القائمة مرتين ليبدو الشريط لا نهائياً
  const track = [...PARTNERS, ...PARTNERS];

  return (
    <section className="bg-mist section">
      <div className="container-x">
        <SectionHeading
          label="شركاء النجاح"
          title="جهات نعمل معها"
          subtitle="عقود ومشاريع نفّذناها مع جهات تثق في معاييرنا."
        />
      </div>

      {/* الشريط يخرج عن الحاوية ليملأ عرض الشاشة */}
      <div
        className="marquee-mask relative overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to left, transparent, #000 10%, #000 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to left, transparent, #000 10%, #000 90%, transparent)",
        }}
      >
        <ul className="marquee-track items-center py-2">
          {track.map((p, i) => (
            <PartnerItem key={`${p.name}-${i}`} partner={p} />
          ))}
        </ul>
      </div>

      <p className="container-x mt-8 text-center text-caption text-muted">
        الأشكال أعلاه مواضع مؤقتة — تُستبدل بشعارات الشركاء الحقيقية.
      </p>
    </section>
  );
}
