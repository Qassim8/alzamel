import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { GALLERY } from "@/lib/content/gallery";

/**
 * معرض «من الميدان» — إثبات بصري.
 * tone: "light" على الأبيض | "mist" على الخلفية الهادئة.
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
        <div className="grid gap-5 sm:grid-cols-3">
          {GALLERY.map((g, i) => (
            <Reveal key={g.src} delay={i * 120}>
              <div className="group relative overflow-hidden rounded-brand shadow-card">
                <Image
                  src={g.src}
                  alt={g.alt}
                  width={1000}
                  height={1500}
                  sizes="(max-width: 640px) 92vw, (max-width: 1024px) 45vw, 360px"
                  className="h-[300px] w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06] sm:h-[340px]"
                />
                <div
                  className="absolute inset-0 bg-linear-to-t from-navy/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden="true"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
