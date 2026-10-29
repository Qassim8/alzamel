import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY, GALLERY_H, GALLERY_W } from "@/lib/content/gallery";

/**
 * معرض «من الميدان» — إثبات بصري.
 *
 * الصور عمودية ٣:٤، وكل خلية بالنسبة نفسها (aspect-3/4) فلا تُقصّ
 * أي صورة. الكبيرة تشغل ٢×٢ وتبقى ٣:٤ لأن الخلايا متساوية.
 *
 * الحاسوب: شبكة ٤×٢ (كبيرة + أربع). التابلت: عمودان.
 * الجوال: تمرير أفقي بـ snap ببطاقات عمودية.
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

      <div className="container-x">
        <div
          className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:gap-5 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-4 lg:grid-rows-2"
          style={{ scrollbarWidth: "none" }}
        >
          {GALLERY.map((g, i) => (
            <Reveal
              key={g.src}
              delay={(i % 4) * 100}
              className={`w-[68vw] shrink-0 snap-start sm:w-auto ${
                g.feature ? "lg:col-span-2 lg:row-span-2" : ""
              }`}
            >
              <div className="group relative aspect-3/4 h-full overflow-hidden rounded-brand shadow-card">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={GALLERY_W}
                  height={GALLERY_H}
                  /* العرض المعروض فعلياً: الكبيرة ضعف العادية على الحاسوب */
                  sizes={
                    g.feature
                      ? "(max-width: 640px) 68vw, (max-width: 1024px) 46vw, 580px"
                      : "(max-width: 640px) 68vw, (max-width: 1024px) 46vw, 285px"
                  }
                  className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.05]"
                />
                <span
                  className="absolute inset-0 bg-linear-to-t from-navy/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-4 bottom-4 text-small font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {g.alt}
                </span>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-10 text-center">
          <Link href="/gallery" className="btn-navy">
            شاهد معرض الأعمال كاملاً
            <FaArrowLeftLong className="text-xs" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
