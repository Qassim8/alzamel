import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY } from "@/lib/content/gallery";

/**
 * معرض «من الميدان» — إثبات بصري.
 * الحاسوب: شبكة bento بصورة كبيرة (عمودان × صفّان) وخمس عادية.
 * التابلت: عمودان. الجوال: تمرير أفقي بـ snap.
 */
export default function Gallery({
  tone = "mist",
  title = "فريق واحد. مظهر واحد.",
  subtitle = "زيّ موحّد بألوان العلامة، ومعدات نعتني بها كما نعتني بمساحتك.",
}) {
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : ""}`}>
      <div className="container-x">
        <SectionHeading label="من الميدان" title={title} subtitle={subtitle} />
      </div>

      {/* الجوال: شريط أفقي يلتقط الصور؛ من sm فأعلى: شبكة */}
      <div className="container-x">
        <div
          /* ٣×٣ على الحاسوب: الكبيرة ٢×٢ + خمس عادية = ٩ خلايا تمتلئ تماماً */
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:grid-rows-3"
          style={{ scrollbarWidth: "none" }}
        >
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 3) * 110}
              className={`w-[78vw] shrink-0 snap-start sm:w-auto ${
                g.feature ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="group h-full overflow-hidden rounded-brand shadow-card">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1600}
                  height={1067}
                  // ✅ تحديث sizes لتوفير دقة عالية للصورة الكبيرة تناسب مساحتها الفعلية
                  sizes={
                    g.feature
                      ? "(max-width: 1024px) 100vw, 850px"
                      : "(max-width: 640px) 78vw, (max-width: 1024px) 50vw, 400px"
                  }
                  style={{ objectPosition: g.pos ?? "center" }}
                  className={`w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06] ${
                    g.feature
                      ? "h-56 sm:h-75 lg:h-full lg:min-h-125"
                      : "h-56 sm:h-57.5 lg:h-60"
                  }`}
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
