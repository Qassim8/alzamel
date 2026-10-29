"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { FaPlay } from "react-icons/fa6";

/**
 * مشغّل فيديو خفيف: لا يُحمَّل الفيديو إلا عند الضغط على التشغيل.
 * قبل ذلك تظهر صورة الغلاف فقط — فلا تُستهلك باقة الزائر بلا داعٍ،
 * ولا يتأثر LCP بملف فيديو في الخلفية.
 */
export default function VideoPlayer({
  src,
  poster,
  title,
  alt,
  className = "",
  priority = false,
}) {
  const [active, setActive] = useState(false);
  const ref = useRef(null);

  return (
    <div
      className={`group relative overflow-hidden rounded-brand bg-navy shadow-card ${className}`}
    >
      {active ? (
        <video
          ref={ref}
          src={src}
          poster={poster}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="h-full w-full object-cover"
        >
          <p className="p-4 text-white">متصفحك لا يدعم تشغيل الفيديو.</p>
        </video>
      ) : (
        <button
          type="button"
          onClick={() => setActive(true)}
          aria-label={`تشغيل: ${title || alt}`}
          className="relative block h-full w-full cursor-pointer"
        >
          <Image
            src={poster}
            alt={alt}
            fill
            priority={priority}
            sizes="(max-width: 640px) 92vw, (max-width: 1024px) 50vw, 560px"
            className="object-cover transition-transform duration-700 ease-brand group-hover:scale-[1.04]"
          />
          <span
            className="absolute inset-0 bg-linear-to-t from-navy/70 via-navy/10 to-transparent"
            aria-hidden="true"
          />

          <span
            aria-hidden="true"
            className="absolute inset-0 grid place-items-center"
          >
            <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-xl text-primary-ink shadow-lift transition-transform duration-300 ease-brand group-hover:scale-110">
              <FaPlay className="ms-1" />
            </span>
          </span>

          {title && (
            <span className="absolute inset-x-4 bottom-4 text-start text-body font-bold text-white drop-shadow-sm">
              {title}
            </span>
          )}
        </button>
      )}
    </div>
  );
}
