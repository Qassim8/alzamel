import { FaWhatsapp } from "react-icons/fa6";
import { DEFAULT_WA_MESSAGE, whatsappLink } from "@/lib/whatsapp";

/** زر واتساب عائم — يختفي على الجوال لأن MobileActionBar يحلّ محلّه. */
export default function WhatsAppFloat() {
  return (
    <a
      href={whatsappLink(DEFAULT_WA_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل معنا عبر واتساب"
      className="group fixed inset-s-5 bottom-5 z-50 hidden items-center gap-0 overflow-hidden rounded-full bg-[#25D366] text-white shadow-lift transition-all duration-300 ease-brand hover:gap-2 hover:ps-5 sm:flex"
    >
      <span className="max-w-0 text-small font-bold whitespace-nowrap opacity-0 transition-all duration-300 ease-brand group-hover:max-w-[140px] group-hover:opacity-100">
        تواصل معنا
      </span>
      <span className="relative flex h-14 w-14 items-center justify-center text-[26px]">
        <span
          className="absolute inset-0 animate-pulse-ring rounded-full bg-[#25D366]"
          aria-hidden="true"
        />
        <FaWhatsapp className="relative" />
      </span>
    </a>
  );
}
