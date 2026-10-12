"use client";
import { useEffect, useRef } from "react";
import { LogoMark } from "@/components/ui/Logo";

/**
 * علامات الشعار العائمة في الهيرو. يتوقف تحريكها عندما يخرج الهيرو
 * من الشاشة لتجنّب استهلاك المعالج بلا فائدة.
 *
 * ٨ علامات على الحاسوب و٤ على الجوال.
 */
const LOGO_MARKS = [
  { x: "2%", y: "6%", size: 150, dur: 9, delay: 0, mobile: true },
  { x: "-3%", y: "58%", size: 110, dur: 11, delay: -3 },
  { x: "14%", y: "84%", size: 70, dur: 7, delay: -1.5, mobile: true },
  { x: "44%", y: "88%", size: 95, dur: 10, delay: -2 },
  { x: "63%", y: "8%", size: 54, dur: 7.5, delay: -2.5, mobile: true },
  { x: "84%", y: "4%", size: 130, dur: 9.5, delay: -6, mobile: true },
  { x: "93%", y: "44%", size: 64, dur: 8, delay: -1.5 },
  { x: "78%", y: "80%", size: 100, dur: 11, delay: -4.5 },
];

export default function LogoField() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // تبدأ الحركة بعد أول رسم فقط — لا تزاحم رسم صورة الهيرو (LCP)
    const start = requestAnimationFrame(() => {
      el.dataset.paused = "false";
    });

    if (typeof IntersectionObserver === "undefined") {
      return () => cancelAnimationFrame(start);
    }

    const io = new IntersectionObserver(
      ([e]) => {
        el.dataset.paused = e.isIntersecting ? "false" : "true";
      },
      { threshold: 0 },
    );
    io.observe(el);

    return () => {
      cancelAnimationFrame(start);
      io.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      data-paused="true"
      className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      aria-hidden="true"
    >
      {LOGO_MARKS.map((mark, i) => (
        <LogoMark
          key={i}
          decorative
          className={`hero-logo-mark ${mark.mobile ? "" : "hidden sm:block"}`}
          style={{
            "--x": mark.x,
            "--y": mark.y,
            "--s": `${mark.size}px`,
            "--d": `${mark.dur}s`,
            "--delay": `${mark.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
