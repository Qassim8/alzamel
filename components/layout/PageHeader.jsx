import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";

export default function PageHeader({ label, title, subtitle }) {
  return (
    <section className="relative bleed-under-nav overflow-hidden border-b border-line bg-mist">
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-fade-b"
        aria-hidden="true"
      />
      <LogoMark className="pointer-events-none absolute inset-s-[6%] -bottom-10 hidden h-48 w-auto opacity-[.07] lg:block" />

      <div className="relative container-x py-14 sm:py-20">
        <Reveal>
          <nav
            aria-label="مسار التصفح"
            className="mb-5 flex items-center gap-2 text-caption font-semibold text-muted"
          >
            <Link href="/" className="transition-colors hover:text-primary-ink">
              الرئيسية
            </Link>
            <FaChevronLeft className="text-[9px]" />
            <span className="text-navy">{title}</span>
          </nav>

          {label && (
            <span className="mb-4 eyebrow">
              <LogoMark className="h-3.5 w-auto" />
              {label}
            </span>
          )}
          <h1 className="max-w-3xl heading-page">{title}</h1>
          {subtitle && <p className="mt-5 max-w-2xl lead">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
