"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaXmark,
} from "react-icons/fa6";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { GALLERY_CATEGORIES, GALLERY_ITEMS } from "@/lib/content/gallery-items";
import { ar } from "@/lib/format";

/**
 * شبكة المعرض مع تصفية حسب الفئة وعارض صور (lightbox).
 * الفيديو لا يُحمَّل إلا بضغط المستخدم (VideoPlayer).
 */
export default function GalleryGrid() {
  const [cat, setCat] = useState("all");
  const [lightbox, setLightbox] = useState(null); // فهرس الصورة المفتوحة

  const items =
    cat === "all"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((i) => i.category === cat);

  // الصور فقط هي ما يُفتح في العارض
  const images = items.filter((i) => i.type === "image");

  const total = images.length;
  const close = () => setLightbox(null);
  const step = (dir) =>
    setLightbox((i) => (i === null ? null : (i + dir + total) % total));

  // مفاتيح لوحة المفاتيح + منع تمرير الخلفية أثناء فتح العارض
  useEffect(() => {
    if (lightbox === null) return;

    const onKey = (e) => {
      if (e.key === "Escape") setLightbox(null);
      // في RTL: السهم الأيمن = السابق
      if (e.key === "ArrowRight")
        setLightbox((i) => (i === null ? null : (i - 1 + total) % total));
      if (e.key === "ArrowLeft")
        setLightbox((i) => (i === null ? null : (i + 1) % total));
    };

    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, total]);

  const current = lightbox === null ? null : images[lightbox];

  return (
    <>
      {/* فلاتر الفئات */}
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {GALLERY_CATEGORIES.map((c) => {
          const on = cat === c.id;
          return (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCat(c.id);
                setLightbox(null);
              }}
              aria-pressed={on}
              className={`rounded-full border px-4 py-2 text-small font-bold transition-all duration-300 ease-brand ${
                on
                  ? "border-transparent bg-action-grad text-white shadow-card"
                  : "border-line bg-white text-navy/75 hover:border-azure/50 hover:text-primary-ink"
              }`}
            >
              {c.label}
              <span
                className={`ms-1.5 ${on ? "text-white/70" : "text-muted"}`}
              ></span>
            </button>
          );
        })}
      </div>

      {/* الشبكة */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          if (item.type === "video") {
            return (
              <VideoPlayer
                key={item.src}
                src={item.src}
                poster={item.poster}
                title={item.title}
                alt={item.alt}
                className="aspect-4/5 sm:col-span-1"
              />
            );
          }

          const index = images.indexOf(item);
          return (
            <button
              key={item.src}
              type="button"
              onClick={() => setLightbox(index)}
              aria-label={`تكبير: ${item.alt}`}
              className="group relative aspect-4/5 cursor-zoom-in overflow-hidden rounded-brand shadow-card"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 380px"
                className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.06]"
              />
              <span
                className="absolute inset-0 bg-linear-to-t from-navy/65 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                aria-hidden="true"
              />
              <span className="absolute inset-x-4 bottom-4 text-start text-small font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {item.alt}
              </span>
            </button>
          );
        })}
      </div>

      {/* عارض الصور */}
      {current && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.alt}
          className="fixed inset-0 z-100 flex items-center justify-center bg-navy/95 p-4 backdrop-blur-sm"
          onClick={close}
        >
          <button
            type="button"
            onClick={close}
            aria-label="إغلاق"
            className="absolute top-4 left-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
          >
            <FaXmark />
          </button>

          <div
            className="relative max-h-[86svh] w-full max-w-4xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={current.src}
              alt={current.alt}
              width={1600}
              height={2000}
              sizes="(max-width: 1024px) 92vw, 900px"
              className="mx-auto max-h-[78svh] w-auto rounded-brand object-contain"
            />
            <p className="mt-4 text-center text-small text-white/80">
              {current.alt}
            </p>
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(-1);
                }}
                aria-label="السابق"
                className="absolute end-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
              >
                <FaChevronRight />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  step(1);
                }}
                aria-label="التالي"
                className="absolute start-3 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-xl text-white transition-colors hover:bg-white/20"
              >
                <FaChevronLeft />
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
