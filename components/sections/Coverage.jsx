import Image from "next/image";
import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import { CITIES } from "@/lib/content/cities";
import { ar } from "@/lib/format";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

/** هل تصلون لمدينتي؟ — شرائح المدن مع رابط واتساب لكل مدينة. */
export default function Coverage() {
  return (
    <section className="bg-mist section">
      <div className="container-x grid items-center gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <Reveal>
          <span className="mb-5 eyebrow">مناطق التغطية</span>
          <h2 className="heading-section">
            مقرّنا الرياض، وخدماتنا تصل إلى {ar(CITIES.length)} مدينة
          </h2>
          <p className="mt-5 lead">
            أسطولنا موحّد بهوية العلامة ويصل إليك في الموعد المتفق عليه. اختر
            مدينتك وأرسل لنا طلبك مباشرة.
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {CITIES.map((c) => (
              <a
                key={c.name}
                href={whatsappLink(WA_MESSAGES.city(c.name))}
                target="_blank"
                rel="noopener noreferrer"
                className={`chip transition-all duration-300 ease-brand hover:-translate-y-0.5 hover:border-azure/50 hover:text-primary-ink ${
                  c.main ? "border-transparent! bg-action-grad text-white!" : ""
                }`}
              >
                {c.name}
              </a>
            ))}
          </div>
          <Link
            href="/areas"
            className="mt-7 inline-flex items-center gap-2 text-body font-bold text-primary-ink hover:underline"
          >
            تفاصيل التغطية <FaArrowLeftLong className="text-xs" />
          </Link>
        </Reveal>

        <Reveal delay={150}>
          <div className="overflow-hidden rounded-brand shadow-lift">
            <Image
              src="/images/brand-van.jpg"
              alt="سيارة الزامل كلين بهوية العلامة"
              width={1500}
              height={1000}
              sizes="(max-width: 1024px) 92vw, 600px"
              className="w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
