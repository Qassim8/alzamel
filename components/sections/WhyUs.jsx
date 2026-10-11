import Icon from "@/components/ui/Icon";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { WHY_US } from "@/lib/content/why-us";

/** قسم المميزات على خلفية كحلية — ما الذي يميّزنا؟ */
export default function WhyUs() {
  return (
    <section className="bg-navy-grad section">
      <div className="container-x">
        <SectionHeading
          tone="dark"
          label="لماذا الزامل كلين"
          title="نظافة تُدار باحتراف — من أول زيارة إلى آخر تفصيلة"
          subtitle="نركّز على جودة التنفيذ، وضوح السعر، والمرونة التي تناسب مساحتك."
        />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {WHY_US.map((f, i) => (
            <Reveal
              key={f.titleAr}
              delay={(i % 3) * 110}
              className="rounded-brand border border-white/10 bg-white/[.04] p-6 transition-colors duration-300 ease-brand hover:border-turquoise/30 hover:bg-white/[.07]"
            >
              <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-icon bg-turquoise/15 text-xl text-turquoise">
                <Icon name={f.icon} />
              </span>
              <h3 className="mb-2 text-base font-bold text-white">
                {f.titleAr}
              </h3>
              <p className="text-small leading-[1.95] text-white/60">
                {f.descAr}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
