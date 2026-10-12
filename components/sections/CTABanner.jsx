import { FaWhatsapp, FaPhone } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import { LogoMark } from "@/components/ui/Logo";
import { COMPANY } from "@/lib/content/company";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

export default function CTABanner({
  title = "جاهز لمساحة تلمع من أول نظرة؟",
  subtitle = "أرسل لنا نوع المكان وحجمه، ونرجع لك بالتفاصيل والسعر خلال وقت قصير.",
  tone = "mist",
}) {
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : ""}`}>
      <div className="container-x">
        <Reveal className="relative overflow-hidden rounded-panel bg-navy-grad px-7 py-14 text-center sm:px-12">
          <LogoMark
            decorative
            className="pointer-events-none absolute -inset-s-12 -bottom-16 h-[360px] w-auto opacity-[.11] sm:h-[440px]"
          />
          <div
            className="pointer-events-none absolute inset-e-[-5%] -top-24 h-72 w-72 rounded-full opacity-25 blur-3xl"
            style={{
              background: "radial-gradient(circle,#02B8D2,transparent 70%)",
            }}
            aria-hidden="true"
          />
          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-5">
            <h2 className="heading-section text-white!">{title}</h2>
            <p className="text-lead leading-loose text-white/70">{subtitle}</p>
            <div className="mt-2 flex flex-wrap justify-center gap-3">
              <a
                href={whatsappLink(WA_MESSAGES.quote)}
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
