"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaBars, FaXmark } from "react-icons/fa6";
import Logo from "./Logo";
import { NAV_LINKS, whatsappLink, DEFAULT_WA_MESSAGE } from "@/lib/data";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 12);
    // الفحص الأولي في إطار الرسم التالي — لا setState داخل جسم الـ effect
    const raf = requestAnimationFrame(onScroll);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // أغلق قائمة الجوال عند تغيير الصفحة — تعديل الحالة أثناء العرض
  // هو النمط الموصى به في React بدل effect لمجرد مزامنة حالة مشتقّة.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  // امنع تمرير الخلفية أثناء فتح القائمة
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`top-0 z-50 transition-all duration-300 ease-brand ${
        solid
          ? "sticky border-b border-line bg-white/85 shadow-[0_1px_20px_-12px_rgba(8,47,73,.35)] backdrop-blur-xl"
          : "absolute w-full"
      }`}
    >
      <nav
        className="container-x flex h-[76px] items-center justify-between gap-6"
        aria-label="التنقل الرئيسي"
      >
        <Link href="/" aria-label="الزامل كلين — الصفحة الرئيسية">
          <Logo markClass="h-9 w-auto" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`relative rounded-full px-3.5 py-2 text-[14.5px] font-semibold transition-colors duration-200 ${
                  isActive(l.href)
                    ? "text-primary"
                    : "text-navy/80 hover:text-primary"
                }`}
              >
                {l.label}
                <span
                  className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-grad transition-transform duration-300 ease-brand ${
                    isActive(l.href) ? "scale-x-100" : "scale-x-0"
                  }`}
                />
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={whatsappLink(DEFAULT_WA_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hidden px-5! py-2.5! sm:inline-flex"
          >
            <FaWhatsapp className="text-base" /> اطلب الآن
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
            aria-expanded={open}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-xl text-navy transition-colors hover:border-azure/50 hover:text-primary lg:hidden"
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* قائمة الجوال */}
      <div
        className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-500 ease-brand lg:hidden ${
          open ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-x space-y-1 py-4">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href}>
              <Link
                href={l.href}
                style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                className={`block rounded-xl px-4 py-3 text-[15px] font-semibold transition-all duration-300 ${
                  isActive(l.href)
                    ? "bg-mist text-primary"
                    : "text-navy/80 hover:bg-mist"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="pt-2">
            <a
              href={whatsappLink(DEFAULT_WA_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary w-full"
            >
              <FaWhatsapp /> اطلب عبر واتساب
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}
