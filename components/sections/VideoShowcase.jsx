import Link from "next/link";
import { FaArrowLeftLong } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { GALLERY_VIDEOS } from "@/lib/content/gallery-items";

/**
 * شريط فيديو من الميدان — دليل متحرك أقوى من الصورة الثابتة.
 * المقاطع لا تُحمَّل إلا عند الضغط (VideoPlayer)، فلا تؤثر على سرعة الصفحة.
 */
export default function VideoShowcase({ limit = 3 }) {
  const videos = GALLERY_VIDEOS.slice(0, limit);
  if (videos.length === 0) return null;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          label="فيديو من الميدان"
          title="شاهد الفريق وهو يعمل"
          subtitle="مقاطع قصيرة من تنفيذ حقيقي — المعدات والطريقة كما هي في زيارتك."
        />

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v, i) => (
            <Reveal key={v.src} delay={(i % 3) * 110}>
              <VideoPlayer
                src={v.src}
                poster={v.poster}
                title={v.title}
                alt={v.alt}
                className="aspect-4/5"
              />
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-10 text-center">
          <Link href="/gallery" className="btn-navy">
            معرض الأعمال كاملاً
            <FaArrowLeftLong className="text-xs" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
