"use client";
import { useEffect, useRef, useState } from "react";
import { ar } from "@/lib/format";

/**
 * عدّاد تصاعدي.
 * يُرسم بالقيمة النهائية في HTML — فيراها الزائر ومحرك البحث فوراً.
 * إن كان العنصر خارج الشاشة عند التحميل يرجع إلى صفر ثم يعدّ عند ظهوره.
 */
export default function Counter({ to = 0, duration = 1500, className = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduce = window.matchMedia?.(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (reduce || typeof IntersectionObserver === "undefined") return;

    // العنصر ظاهر أصلاً عند التحميل → اتركه على القيمة النهائية
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) return;

    let raf = requestAnimationFrame(() => setN(0));

    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);

    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={className}>
      {ar(n)}
    </span>
  );
}
