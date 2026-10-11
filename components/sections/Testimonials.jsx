import { LogoMark } from "@/components/ui/Logo";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { ar } from "@/lib/format";
import { TESTIMONIALS } from "@/lib/content/testimonials";

/**
 * آراء العملاء — لا يظهر القسم إطلاقاً ما دامت البيانات فارغة،
 * حتى لا يُنشر محتوى غير حقيقي.
 */
export default function Testimonials() {
  if (TESTIMONIALS.length === 0) return null;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading label="آراء العملاء" title="ما يقوله من جرّبنا" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <Reveal
              key={`${t.name}-${i}`}
              delay={(i % 3) * 110}
              className="h-full"
            >
              <figure className="relative h-full card p-6">
                <LogoMark className="absolute -inset-s-0 top-5 me-6 h-6 w-auto opacity-70" />
                <blockquote className="text-small leading-[1.95] text-muted">
                  {t.quote}
                </blockquote>
                <figcaption className="mt-5 border-t border-line pt-4">
                  <p className="text-body font-bold text-navy">{t.name}</p>
                  <p className="mt-0.5 text-caption text-muted">
                    {[t.city, t.service].filter(Boolean).join(" — ")}
                  </p>
                  {t.rating ? (
                    <p className="mt-1 text-caption text-primary-ink">
                      التقييم: {ar(t.rating)}/٥
                    </p>
                  ) : null}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
