import Link from "next/link";
import {
  FaWhatsapp,
  FaXTwitter,
  FaInstagram,
  FaTiktok,
  FaSnapchat,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
} from "react-icons/fa6";
import Logo from "./Logo";
import { COMPANY, NAV_LINKS, SERVICES, whatsappLink, ar } from "@/lib/data";

const SOCIALS = [
  { icon: <FaInstagram />, label: "انستقرام", href: "#" },
  { icon: <FaXTwitter />, label: "إكس", href: "#" },
  { icon: <FaTiktok />, label: "تيك توك", href: "#" },
  { icon: <FaSnapchat />, label: "سناب شات", href: "#" },
];

export default function Footer() {
  return (
    <footer className="bg-navy-grad text-white">
      <div className="container-x grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        {/* العلامة */}
        <div>
          <Logo tone="white" markClass="h-10 w-auto" />
          <p className="mt-5 max-w-xs text-[13.5px] leading-loose text-white/60">
            {COMPANY.promise} نقدّم حلول تنظيف متكاملة للمنازل والفلل والمنشآت
            في {COMPANY.city} وعدد من مدن المملكة.
          </p>
          <div className="mt-6 flex gap-2.5">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-[15px] text-white/70 transition-all duration-300 ease-brand hover:border-turquoise/50 hover:bg-white/5 hover:text-turquoise"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* روابط */}
        <nav aria-label="روابط الموقع">
          <p className="mb-4 text-[15px] font-bold">روابط سريعة</p>
          <ul className="space-y-2.5 text-[13.5px] text-white/65">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="transition-colors hover:text-turquoise"
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* خدمات */}
        <nav aria-label="أبرز الخدمات">
          <p className="mb-4 text-[15px] font-bold">أبرز الخدمات</p>
          <ul className="space-y-2.5 text-[13.5px] text-white/65">
            {SERVICES.slice(0, 7).map((s) => (
              <li key={s.id}>
                <Link
                  href={`/services#${s.id}`}
                  className="transition-colors hover:text-turquoise"
                >
                  {s.titleAr}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* تواصل */}
        <div>
          <p className="mb-4 text-[15px] font-bold">تواصل معنا</p>
          <ul className="space-y-3.5 text-[13.5px] text-white/65">
            <li className="flex items-start gap-2.5">
              <FaLocationDot className="mt-1 shrink-0 text-turquoise" />
              {COMPANY.city}
            </li>
            <li className="flex items-start gap-2.5">
              <FaClock className="mt-1 shrink-0 text-turquoise" />
              {COMPANY.workingHours}
            </li>
            <li>
              <a
                href={`tel:+${COMPANY.phoneIntl}`}
                className="flex items-center gap-2.5 transition-colors hover:text-turquoise"
              >
                <FaPhone className="shrink-0 text-turquoise" />
                <span dir="ltr">{COMPANY.phoneDisplay}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${COMPANY.email}`}
                className="flex items-center gap-2.5 transition-colors hover:text-turquoise"
              >
                <FaEnvelope className="shrink-0 text-turquoise" />
                <span dir="ltr">{COMPANY.email}</span>
              </a>
            </li>
          </ul>

          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 btn-primary w-full py-2.5! sm:w-auto"
          >
            <FaWhatsapp /> راسلنا على واتساب
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-[12.5px] text-white/45 sm:flex-row">
          <p>
            © {ar(new Date().getFullYear())} {COMPANY.nameAr} — جميع الحقوق
            محفوظة.
          </p>
          <p>سجل تجاري رقم: {COMPANY.commercialRegister}</p>
        </div>
      </div>
    </footer>
  );
}
