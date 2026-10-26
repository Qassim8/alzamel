import Image from "next/image";
import SectionHeading from "@/components/ui/SectionHeading";
import { PARTNERS } from "@/lib/content/partners";

function PartnerItem({ partner }) {
  const round = partner.shape === "circle";

  return (
    // <div className="relative flex shrink-0 items-center justify-center">
    //   {partner.logo ? (
    //     <Image
    //       src={partner.logo}
    //       alt={partner.name}
    //       width={160}
    //       height={64}
    //       className="h-12 w-auto object-contain opacity-60 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0 sm:h-14"
    //     />
    //   ) : (
    //     <span
    //       title={partner.name}
    //       className={`flex h-16 w-16 items-center justify-center border-2 border-dashed border-navy/15 bg-mist text-caption font-bold text-navy/35 sm:h-20 sm:w-20 ${
    //         round ? "rounded-full" : "rounded-2xl"
    //       }`}
    //     >
    //       {partner.name}
    //     </span>
    //   )}
    // </div>
    <></>
  );
}

export default function Partners() {
  if (PARTNERS.length === 0) return null;

  return (
    // <section className="overflow-hidden bg-mist section select-none">
    //   <div className="container-x">
    //     <SectionHeading
    //       label="شركاء النجاح"
    //       title="جهات نعمل معها"
    //       subtitle="عقود ومشاريع نفّذناها مع جهات تثق في معاييرنا."
    //     />
    //   </div>

    //   {/* شريط الماركيو المعتمد على نمط السنتين المتطابقتين */}
    //   <div
    //     className="relative mt-10 overflow-hidden"
    //     style={{
    //       maskImage:
    //         "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
    //       WebkitMaskImage:
    //         "linear-gradient(to right, transparent, #000 10%, #000 90%, transparent)",
    //     }}
    //   >
    //     <div className="flex overflow-hidden whitespace-nowrap" dir="ltr">
    //       {/* الشريحة الأولى */}
    //       <div className="animate-marquee-forward flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16">
    //         {PARTNERS.map((partner, index) => (
    //           <PartnerItem key={`p1-${index}`} partner={partner} />
    //         ))}
    //       </div>

    //       {/* الشريحة الثانية (المطابقة تماماً لتأمين الاستمرارية بدون فراغات) */}
    //       <div
    //         aria-hidden="true"
    //         className="animate-marquee-forward flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
    //       >
    //         {PARTNERS.map((partner, index) => (
    //           <PartnerItem key={`p2-${index}`} partner={partner} />
    //         ))}
    //       </div>
    //     </div>
    //   </div>
    // </section>
    <></>
  );
}
