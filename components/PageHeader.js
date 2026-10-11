import Link from "next/link";
import { FaChevronLeft } from "react-icons/fa6";
import Reveal from "./Reveal";
import { LogoMark } from "./Logo";

export default function PageHeader({ label, title, subtitle }) {
  return (
    <section className="relative overflow-hidden border-b border-line bg-mist">
      <div
        className="pointer-events-none absolute inset-0 bg-grid mask-fade-b"
        aria-hidden="true"
      />
      <LogoMark className="pointer-events-none absolute inset-s-[6%] -bottom-10 hidden h-48 w-auto opacity-[.07] lg:block" />

      <div className="relative container-x py-14 sm:py-20">
        <Reveal>
          <nav
            aria-label="مسار التصفح"
            className="mb-5 flex items-center gap-2 text-[12.5px] font-semibold text-muted"
          >
            <Link href="/" className="transition-colors hover:text-primary">
              الرئيسية
            </Link>
            <FaChevronLeft className="text-[9px]" />
            <span className="text-navy">{title}</span>
          </nav>

          {label && <span className="mb-4 eyebrow">{label}</span>}
          <h1 className="max-w-3xl heading-display text-[1.75rem]! sm:text-[2.4rem]!">
            {title}
          </h1>
          {subtitle && <p className="mt-5 max-w-2xl lead">{subtitle}</p>}
        </Reveal>
      </div>
    </section>
  );
}
