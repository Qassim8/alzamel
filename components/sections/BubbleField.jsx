"use client";
import { useEffect, useRef } from "react";

/**
 * فقاعات الهيرو. مكوّن عميل صغير مهمته الوحيدة إيقاف الحركة
 * عندما يخرج الهيرو من الشاشة — فلا تستهلك المعالج بلا فائدة.
 *
 * مجموعتان منفصلتان تماماً:
 *  - DESKTOP: من 640px فأعلى (hidden sm:block) — كما هي بلا تغيير.
 *  - MOBILE:  أقل من 640px (sm:hidden) — أصغر حجماً وموزّعة على
 *             الأطراف والفراغات فقط، بعيداً عن العنوان والأزرار والصورة.
 */
const DESKTOP_BUBBLES = [
  { x: "2%", y: "10%", size: 150, dur: 9, delay: 0 },
  { x: "-3%", y: "58%", size: 110, dur: 11, delay: -3 },
  { x: "14%", y: "84%", size: 70, dur: 7, delay: -1.5 },
  { x: "44%", y: "88%", size: 95, dur: 10, delay: -2 },

  { x: "30%", y: "12%", size: 90, dur: 10.5, delay: -1.5 },
  { x: "63%", y: "15%", size: 54, dur: 7.5, delay: -2.5 },
  { x: "84%", y: "15%", size: 130, dur: 9.5, delay: -6 },

  { x: "47%", y: "45%", size: 54, dur: 7.5, delay: -1.5 },
  { x: "93%", y: "44%", size: 64, dur: 8, delay: -1.5 },
  { x: "78%", y: "80%", size: 100, dur: 11, delay: -4.5 },
];

/* على الجوال النص يملأ العرض والصورة في الوسط، فالمساحات الحرة هي:
   يسار الأسطر القصيرة وصفّ الأزرار (العربية RTL تترك اليسار فارغاً)،
   وحافتا الشاشة خارج إطار الصورة.
   ملاحظة: y هنا بوحدة rem من أعلى الهيرو لا بنسبة مئوية — فيبقى
   الموضع ثابتاً مهما تغيّر ارتفاع الهيرو باختلاف الجهاز. */
const MOBILE_BUBBLES = [
  { x: "-7%", y: "12rem", size: 56, dur: 10, delay: 0 },
  { x: "2%", y: "25.5rem", size: 40, dur: 8, delay: -2.5 },
  { x: "-4%", y: "33rem", size: 30, dur: 7, delay: -4 },
  { x: "96%", y: "38rem", size: 36, dur: 9, delay: -1.5 },
  { x: "-3%", y: "45rem", size: 26, dur: 6.5, delay: -3 },
  { x: "95%", y: "50rem", size: 44, dur: 11, delay: -5 },
];

const vars = (b) => ({
  "--x": b.x,
  "--y": b.y,
  "--s": `${b.size}px`,
  "--d": `${b.dur}s`,
  "--delay": `${b.delay}s`,
});

export default function BubbleField() {
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
      {DESKTOP_BUBBLES.map((b, i) => (
        <span
          key={`d-${i}`}
          className="bubble hidden sm:block"
          style={vars(b)}
        />
      ))}
      {MOBILE_BUBBLES.map((b, i) => (
        <span key={`m-${i}`} className="bubble sm:hidden" style={vars(b)} />
      ))}
    </div>
  );
}
