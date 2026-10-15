"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaWhatsapp, FaBars, FaXmark, FaChevronDown } from "react-icons/fa6";
import Logo from "@/components/ui/Logo";
import Icon from "@/components/ui/Icon";
import { NAV_LINKS } from "@/lib/content/navigation";
import { SERVICES } from "@/lib/content/services";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false); // قائمة الخدمات المنسدلة
  const [solid, setSolid] = useState(false);
  const pathname = usePathname();
  const overDarkHeader = pathname !== "/" && !solid;

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
    setMenu(false);
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
    /* fixed دائماً: لا يدخل تدفّق الصفحة فجأة عند التمرير فلا تحدث قفزة.
       إزاحة المحتوى تأتي من padding على <main>. */
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ease-brand ${
        solid
          ? "border-b border-line bg-white/85 shadow-[0_1px_20px_-12px_rgba(8,47,73,.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        className="container-x flex h-(--nav-h) items-center justify-between gap-6"
        aria-label="التنقل الرئيسي"
      >
        <Link href="/" aria-label="الزامل كلين — الصفحة الرئيسية">
          <Logo priority className="h-12 w-32 sm:w-38" />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((l) =>
            l.href === "/services" ? (
              /* قائمة الخدمات المنسدلة — تفتح بالمرور وبالتركيز معاً
                 حتى تعمل بلوحة المفاتيح لا بالماوس فقط. */
              <li
                key={l.href}
                className="relative"
                onMouseEnter={() => setMenu(true)}
                onMouseLeave={() => setMenu(false)}
                onFocus={() => setMenu(true)}
                onBlur={(e) =>
                  !e.currentTarget.contains(e.relatedTarget) && setMenu(false)
                }
              >
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  aria-expanded={menu}
                  className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-2 text-body font-semibold transition-colors duration-200 ${
                    overDarkHeader
                      ? isActive(l.href)
                        ? "text-turquoise"
                        : "text-white/90 hover:text-white"
                      : isActive(l.href)
                        ? "text-primary-ink"
                        : "text-navy/80 hover:text-primary-ink"
                  }`}
                >
                  {l.label}
                  <FaChevronDown
                    className={`text-[9px] transition-transform duration-300 ${menu ? "rotate-180" : ""}`}
                  />
                  <span
                    className={`absolute inset-x-3.5 -bottom-0.5 h-0.5 rounded-full bg-brand-grad transition-transform duration-300 ease-brand ${
                      isActive(l.href) ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>

                <div
                  className={`absolute top-full right-0 z-50 pt-3 transition-all duration-200 ease-brand ${
                    menu
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-1 opacity-0"
                  }`}
                >
                  <ul className="grid w-[34rem] grid-cols-2 gap-1 rounded-brand border border-line bg-white p-3 shadow-lift">
                    {SERVICES.map((s) => (
                      <li key={s.slug}>
                        <Link
                          href={`/services/${s.slug}`}
                          className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-small font-semibold text-navy/85 transition-colors hover:bg-mist hover:text-primary-ink"
                        >
                          <Icon
                            name={s.icon}
                            className="shrink-0 text-base text-primary-ink"
                          />
                          <span className="leading-tight">{s.titleAr}</span>
                        </Link>
                      </li>
                    ))}
                    <li className="col-span-2 mt-1 border-t border-line pt-2">
                      <Link
                        href="/services"
                        className="block rounded-xl px-3 py-2 text-small font-bold text-primary-ink transition-colors hover:bg-mist"
                      >
                        عرض كل الخدمات ←
                      </Link>
                    </li>
                  </ul>
                </div>
              </li>
            ) : (
              <li key={l.href}>
                <Link
                  href={l.href}
                  aria-current={isActive(l.href) ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-2 text-body font-semibold transition-colors duration-200 ${
                    overDarkHeader
                      ? isActive(l.href)
                        ? "text-turquoise"
                        : "text-white/90 hover:text-white"
                      : isActive(l.href)
                        ? "text-primary-ink"
                        : "text-navy/80 hover:text-primary-ink"
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
            ),
          )}
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
            className={`flex h-11 w-11 items-center justify-center rounded-full border text-xl transition-colors lg:hidden ${
              overDarkHeader
                ? "border-white/35 text-white hover:border-white/70 hover:text-turquoise"
                : "border-line text-navy hover:border-azure/50 hover:text-primary-ink"
            }`}
          >
            {open ? <FaXmark /> : <FaBars />}
          </button>
        </div>
      </nav>

      {/* قائمة الجوال */}
      <div
        className={`overflow-hidden border-t border-line bg-white transition-[max-height,opacity] duration-500 ease-brand lg:hidden ${
          open
            ? "max-h-[85svh] overflow-y-auto opacity-100"
            : "max-h-0 opacity-0"
        }`}
      >
        <ul className="container-x space-y-1 py-4">
          {NAV_LINKS.map((l, i) => (
            <li key={l.href}>
              <div className="flex items-center gap-1">
                <Link
                  href={l.href}
                  style={{ transitionDelay: open ? `${i * 40}ms` : "0ms" }}
                  className={`block flex-1 rounded-xl px-4 py-3 text-lead font-semibold transition-all duration-300 ${
                    isActive(l.href)
                      ? "bg-mist text-primary-ink"
                      : "text-navy/80 hover:bg-mist"
                  }`}
                >
                  {l.label}
                </Link>
                {l.href === "/services" && (
                  <button
                    type="button"
                    onClick={() => setMenu((v) => !v)}
                    aria-expanded={menu}
                    aria-label={menu ? "إخفاء الخدمات" : "عرض الخدمات"}
                    className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-navy/70 transition-colors hover:bg-mist"
                  >
                    <FaChevronDown
                      className={`text-xs transition-transform duration-300 ${menu ? "rotate-180" : ""}`}
                    />
                  </button>
                )}
              </div>

              {l.href === "/services" && (
                <ul
                  className={`grid overflow-hidden transition-[grid-template-rows,opacity] duration-300 ease-brand ${
                    menu
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <li className="min-h-0 overflow-hidden">
                    <ul className="ms-4 me-2 mt-1 space-y-0.5 border-s-2 border-line ps-3">
                      {SERVICES.map((sv) => (
                        <li key={sv.slug}>
                          <Link
                            href={`/services/${sv.slug}`}
                            className="flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-small font-semibold text-navy/75 transition-colors hover:bg-mist hover:text-primary-ink"
                          >
                            <Icon
                              name={sv.icon}
                              className="shrink-0 text-primary-ink"
                            />
                            {sv.titleAr}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              )}
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
