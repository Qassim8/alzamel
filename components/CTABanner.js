import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import Reveal from "./Reveal";
import { LogoMark } from "./Logo";
import { COMPANY, whatsappLink } from "@/lib/data";

export default function CTABanner({
  title = "جاهز لمساحة تلمع من أول نظرة؟",
  subtitle = "أرسل لنا نوع المكان وحجمه، ونرجع لك بالتفاصيل والسعر خلال وقت قصير.",
}) {
  return (
    <section className="section">
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-[26px] bg-navy-grad px-7 py-14 text-center sm:px-12">
          <LogoMark className="pointer-events-none absolute -inset-s-12 -bottom-16 h-64 w-auto opacity-[.07]" />
          <div
            className="pointer-events-none absolute inset-e-[-5%] -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle,#02B8D2,transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="heading-section text-white!">{title}</h2>
            <p className="text-[15px] leading-loose text-white/70">
              {subtitle}
            </p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink(
                  "مرحباً الزامل كلين، أرغب بطلب عرض سعر لخدمة تنظيف.",
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-white"
              >
                <FaWhatsapp className="text-lg text-[#25D366]" /> واتساب مباشر
              </a>
              <a
                href={`tel:+${COMPANY.phoneIntl}`}
                className="btn border border-white/25 text-white hover:bg-white/10"
              >
                <FaPhone /> <span dir="ltr">{COMPANY.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
