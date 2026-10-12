import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

export default function PageHeader({ label, title, subtitle }) {
  return (
    <section
      className="relative bleed-under-nav overflow-hidden border-b border-white/15 bg-navy"
      style={{
        backgroundImage:
          "linear-gradient(112deg, rgba(8, 47, 73, .75), rgba(8, 47, 73, .85)), url('/images/yard.jpg')",
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
      <div className="relative container-x py-14 sm:py-20">
        <Reveal>
          <nav
            aria-label="مسار التصفح"
            className="mb-5 flex items-center gap-2 text-caption font-semibold text-white/75"
          >
            <Link href="/" className="transition-colors hover:text-white">
              الرئيسية
            </Link>
            <FaChevronLeft className="text-[9px]" />
            <span className="text-white">{title}</span>
          </nav>

          {label && (
            <span className="mb-4 eyebrow text-white/85">
              <LogoMark className="h-3.5 w-auto" />
              {label}
            </span>
          )}
          <h1 className="max-w-3xl heading-page text-white!">{title}</h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lead leading-loose text-white/80 sm:text-base">
              {subtitle}
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
