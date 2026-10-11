import Link from "next/link";
import { FaArrowLeftLong, FaWhatsapp } from "react-icons/fa6";
import { LogoMark } from "@/components/ui/Logo";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export const metadata = {
  title: "الصفحة غير موجودة",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <section className="relative bleed-under-nav overflow-hidden bg-mist">
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-fade-b"
        aria-hidden="true"
      />
      <div className="relative container-x flex min-h-[70vh] flex-col items-center justify-center gap-6 py-20 text-center">
        <LogoMark className="h-24 w-auto sm:h-32" />

        <p className="font-latin text-title font-bold tracking-[.25em] text-primary-ink">
          404
        </p>

        <h1 className="heading-page">الصفحة غير موجودة</h1>
        <p className="max-w-md lead">
          الرابط الذي فتحته غير صحيح أو لم يعد متاحاً. ارجع إلى الرئيسية أو
          راسلنا مباشرة وسنساعدك.
        </p>

        <div className="mt-2 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-primary">
            الرئيسية
            <FaArrowLeftLong className="text-xs" />
          </Link>
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost"
          >
            <FaWhatsapp className="text-base text-[#128C4A]" />
            تواصل عبر واتساب
          </a>
        </div>
      </div>
    </section>
  );
}
