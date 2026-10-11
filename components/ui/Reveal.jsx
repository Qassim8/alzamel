"use client";
import { useEffect, useRef, useState } from "react";

/**
 * ظهور ناعم عند التمرير.
 *
 * مراقب واحد مشترك لكل عناصر الصفحة بدل مراقب لكل عنصر —
 * الصفحة الرئيسية وحدها فيها عشرات العناصر، وإنشاء مراقب لكل واحد
 * يرفع وقت العمل على الخيط الرئيسي بلا داعٍ.
 *
 * شبكتا أمان حتى لا يبقى محتوى مخفياً:
 *  1) الإخفاء مشروط بالكلاس `js` على <html> — بدون جافاسكربت يظهر كل شيء.
 *  2) مؤقّت احتياطي يُظهر العنصر إن لم يعمل المراقب لأي سبب.
 */
const callbacks = new WeakMap();
let observer = null;

function getObserver() {
  if (observer) return observer;
  if (typeof IntersectionObserver === "undefined") return null;

  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const show = callbacks.get(entry.target);
        if (show) show();
        callbacks.delete(entry.target);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.08, rootMargin: "0px 0px -48px" },
  );
  return observer;
}

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

    const io = getObserver();
    if (!io) {
      const raf = requestAnimationFrame(() => setShown(true));
      return () => cancelAnimationFrame(raf);
    }

    callbacks.set(el, () => setShown(true));
    io.observe(el);

    // احتياطي: لا نترك المحتوى مخفياً أكثر من ٣ ثوانٍ بأي حال
    const safety = setTimeout(() => setShown(true), 3000);

    return () => {
      clearTimeout(safety);
      callbacks.delete(el);
      io.unobserve(el);
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
