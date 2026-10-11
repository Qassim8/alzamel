"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ظهور ناعم عند التمرير — IntersectionObserver خفيف بلا مكتبات.
 * delay: تأخير بالميلي ثانية لعمل تتابع داخل الشبكات.
 *
 * شبكتا أمان حتى لا يبقى أي محتوى مخفياً:
 *  1) الإخفاء مشروط بالكلاس `js` على <html> — بدون جافاسكربت يظهر كل شيء.
 *  2) مؤقّت احتياطي يُظهر العنصر إن لم يعمل المراقب لأي سبب.
 */
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -48px" },
    );
    io.observe(el);

    // احتياطي: لا نترك المحتوى مخفياً أكثر من ٣ ثوانٍ بأي حال
    const safety = setTimeout(() => {
      setShown(true);
      io.disconnect();
    }, 3000);

    return () => {
      io.disconnect();
      clearTimeout(safety);
    };
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
