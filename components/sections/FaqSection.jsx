import { FaWhatsapp } from "react-icons/fa6";
import FaqList from "@/components/ui/FaqList";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { FAQS } from "@/lib/content/faqs";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

/** قسم الأسئلة الشائعة — إزالة آخر اعتراض قبل الحجز. */
export default function FaqSection({
  label = "أسئلة شائعة",
  title = "إجابات سريعة قبل ما تحجز",
  items = FAQS,
  tone = "light",
  showAsk = false,
}) {
  return (
    <section className={`section ${tone === "mist" ? "bg-mist" : ""}`}>
      <div className="container-x">
        <SectionHeading label={label} title={title} />
        <FaqList items={items} />
        {showAsk && (
          <Reveal delay={120} className="mt-8 text-center">
            <a
              href={whatsappLink(WA_MESSAGES.question)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              <FaWhatsapp className="text-base text-[#25D366]" />
              سؤالك غير موجود؟ اسألنا مباشرة
            </a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
