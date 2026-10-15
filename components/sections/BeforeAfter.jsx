"use client";
import Image from "next/image";
import { useState } from "react";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { BEFORE_AFTER } from "@/lib/content/before-after";

/** مقارنة بمقبض سحب بين صورتَي «قبل» و«بعد». */
function Compare({ item }) {
  const [pos, setPos] = useState(50);

  return (
    <figure className="overflow-hidden card">
      <div className="relative aspect-4/3 w-full select-none">
        <Image
          src={item.after}
          alt={`${item.alt} — بعد`}
          fill
          sizes="(max-width: 768px) 92vw, 560px"
          className="object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 0 0 ${100 - pos}%)` }}
        >
          <Image
            src={item.before}
            alt={`${item.alt} — قبل`}
            fill
            sizes="(max-width: 768px) 92vw, 560px"
            className="object-cover"
          />
        </div>

        <span className="absolute top-3 right-3 rounded-full bg-navy/80 px-3 py-1 text-caption font-bold text-white">
          قبل
        </span>
        <span className="absolute top-3 left-3 rounded-full bg-action-grad px-3 py-1 text-caption font-bold text-white">
          بعد
        </span>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-0.5 bg-white shadow-lift"
          style={{ right: `${pos}%` }}
        />

        <input
          type="range"
          min={0}
          max={100}
          value={pos}
          onChange={(e) => setPos(Number(e.target.value))}
          aria-label={`حرّك للمقارنة: ${item.title}`}
          className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>

      <figcaption className="p-5">
        <p className="text-card font-bold text-navy">{item.title}</p>
        {item.service && (
          <p className="mt-1 text-caption text-muted">{item.service}</p>
        )}
      </figcaption>
    </figure>
  );
}

export default function BeforeAfter() {
  if (BEFORE_AFTER.length === 0) return null;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          label="قبل وبعد"
          title="الفرق الذي تراه بعينك"
          subtitle="صور حقيقية من أعمالنا — حرّك الفاصل لترى الفرق."
        />
        <div className="grid gap-6 md:grid-cols-2">
          {BEFORE_AFTER.map((item, i) => (
            <Reveal key={item.title} delay={(i % 2) * 120}>
              <Compare item={item} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
