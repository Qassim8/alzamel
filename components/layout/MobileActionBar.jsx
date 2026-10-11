import { FaPhone, FaWhatsapp } from "react-icons/fa6";
import { COMPANY } from "@/lib/content/company";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

/**
 * شريط إجراءات سفلي للجوال فقط — زرّان متساويان دائماً في المتناول.
 * يحترم المساحة الآمنة في أجهزة الحافة المنحنية.
 */
export default function MobileActionBar() {
  return (
    <div
      className="fixed inset-x-0 bottom-0 z-50 grid grid-cols-2 border-t border-line bg-white/95 backdrop-blur-lg sm:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <a
        href={whatsappLink(DEFAULT_WA_MESSAGE)}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 py-4 text-body font-bold text-navy"
      >
        <FaWhatsapp className="text-lg text-[#128C4A]" />
        واتساب
      </a>
      <a
        href={`tel:+${COMPANY.phoneIntl}`}
        className="flex items-center justify-center gap-2 border-s border-line py-4 text-body font-bold text-navy"
      >
        <FaPhone className="text-primary-ink" />
        اتصال
      </a>
    </div>
  );
}
