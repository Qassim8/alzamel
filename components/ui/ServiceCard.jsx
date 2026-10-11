import Image from "next/image";
import { FaWhatsapp, FaCheck } from "react-icons/fa6";
import Icon from "@/components/ui/Icon";
import { LogoMark } from "@/components/ui/Logo";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * بطاقة خدمة.
 * إذا كان للخدمة `image` تظهر بصورة حقيقية، وإلا بغلاف متدرّج
 * بألوان الهوية مع أيقونة الخدمة — فيبقى النظام متناسقاً في الحالتين.
 */
export default function ServiceCard({ service, compact = false }) {
  const { titleAr, descAr, short, points, icon, image, message } = service;

  return (
    <article className="group flex h-full card-hover flex-col overflow-hidden">
      <div className="relative h-44 w-full overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={titleAr}
              width={1000}
              height={700}
              sizes="(max-width:640px) 100vw, (max-width:1024px) 50vw, 380px"
              className="h-full w-full object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/15 to-transparent"
              aria-hidden="true"
            />
          </>
        ) : (
          <div className="relative h-full w-full bg-navy-grad">
            <LogoMark className="absolute -inset-s-5 -bottom-6 h-36 w-auto opacity-[.14] transition-transform duration-700 ease-brand group-hover:scale-110" />
            <div
              className="absolute inset-0 opacity-[.5]"
              style={{
                backgroundImage:
                  "radial-gradient(circle at 78% 22%, rgba(2,184,210,.35), transparent 60%)",
              }}
              aria-hidden="true"
            />
          </div>
        )}

        <div className="absolute inset-x-5 bottom-4 flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-icon bg-white/95 text-xl text-primary-ink shadow-card">
            <Icon name={icon} />
          </span>
          <h3 className="text-card leading-tight font-bold text-white drop-shadow-xs">
            {titleAr}
          </h3>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        {short && !compact && (
          <p className="mb-2 text-caption font-bold text-primary-ink">
            {short}
          </p>
        )}
        <p className="flex-1 text-body leading-[1.95] text-muted">
          {compact ? short || descAr : descAr}
        </p>

        {!compact && points?.length > 0 && (
          <ul className="my-5 space-y-2">
            {points.map((p) => (
              <li
                key={p}
                className="flex items-center gap-2 text-small font-semibold text-navy/75"
              >
                <FaCheck className="shrink-0 text-micro text-turquoise" />
                {p}
              </li>
            ))}
          </ul>
        )}

        <a
          href={whatsappLink(message)}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-auto inline-flex w-full items-center justify-center gap-2 rounded-full bg-mist px-4 py-3 text-small font-bold text-navy transition-all duration-300 ease-brand group-hover:bg-action-grad group-hover:text-white"
        >
          <FaWhatsapp className="text-base" /> اطلب هذه الخدمة
        </a>
      </div>
    </article>
  );
}
