"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

/**
 * شاشة التحميل — عند الدخول للموقع وعند التنقل بين الصفحات.
 *
 * مكوّن عميل، لكن Next يرسم ترميزه في HTML الثابت أيضاً، فالشاشة
 * موجودة في أول رسم قبل أن تعمل جافاسكربت — لا وميض صفحة نصف جاهزة.
 *
 * ثلاث شبكات أمان، لأن فشل الإخفاء يحجب الموقع كلّه:
 *  1) الإظهار مشروط بالكلاس `js` على <html> (CSS) — بدون جافاسكربت لا تظهر.
 *  2) مؤقّتات سقف تُخفيها قسراً إن تعذّر رصد جهوز الصفحة أو الانتقال.
 *  3) تُحذف من DOM بعد التلاشي، فلا يعتمد زوالها على انتقال CSS أصلاً
 *     (انتقال متوقّف يعني شاشة معتمة تعترض كل نقرة).
 */

/* الفقاعات تصعد من الأسفل — x موضع أفقي، s القطر، d المدة، delay إزاحة
   سالبة حتى تبدأ المجموعة في منتصف دورتها فتبدو الحركة جارية من اللحظة الأولى. */
const BUBBLES = [
  { x: "11%", size: 30, dur: 4.6, delay: -0.4 },
  { x: "25%", size: 18, dur: 3.8, delay: -2.1 },
  { x: "38%", size: 42, dur: 5.6, delay: -1.2 },
  { x: "52%", size: 22, dur: 4.2, delay: -3 },
  { x: "66%", size: 34, dur: 5.1, delay: -0.8 },
  { x: "79%", size: 20, dur: 3.9, delay: -2.6 },
  { x: "90%", size: 28, dur: 4.8, delay: -1.6 },
];

const MIN_VISIBLE = 450; // أقل مدة ظهور — لودر يلمع ٨٠ms أسوأ من لا لودر
const BOOT_CAP = 2200; // سقف الدخول للموقع
const NAV_DELAY = 140; // الصفحات ثابتة ومعظم الانتقالات أسرع من هذا
const NAV_CAP = 8000; // سقف الانتقال
const FADE = 500; // يطابق مدة الانتقال في globals.css ثم تُحذف العقدة

export default function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [gone, setGone] = useState(false);
  const booted = useRef(false);
  const nav = useRef({});

  const show = () => {
    setGone(false);
    setVisible(true);
  };

  // ── الدخول للموقع: تختفي بعد جهوز الخطوط وأول رسم ──
  // الخطوط هي سبب الوميض المرئي (display: swap)، لا الصور — فلا ننتظر
  // window.load حتى لا تحتجز صورة بطيئة صفحةً جاهزة فعلاً.
  useEffect(() => {
    const startedAt = Date.now();
    let done = false;
    let hide;

    const finish = () => {
      if (done) return;
      done = true;
      hide = setTimeout(
        () => {
          booted.current = true;
          setVisible(false);
        },
        Math.max(0, MIN_VISIBLE - (Date.now() - startedAt)),
      );
    };

    const cap = setTimeout(finish, BOOT_CAP);
    // بلا requestAnimationFrame: يُخنَق في التبويبات الخلفية فينتظر السقف
    // بلا داعٍ. مهلة MIN_VISIBLE وحدها تكفي لتُرسم الخطوط قبل الإخفاء.
    const fonts = document.fonts?.ready ?? Promise.resolve();
    fonts.then(finish);

    return () => {
      clearTimeout(cap);
      clearTimeout(hide);
    };
  }, []);

  // ── حذف العقدة بعد التلاشي ──
  // gone في التبعيّات لازم: انتقال سريع يُعيد تركيب العقدة (gone=false)
  // دون أن تتغيّر visible، فلولاه لبقيت العقدة معلّقة في DOM إلى الأبد.
  useEffect(() => {
    if (visible || gone) return;
    const t = setTimeout(() => setGone(true), FADE);
    return () => clearTimeout(t);
  }, [visible, gone]);

  // ── انتهاء الانتقال: الصفحة الجديدة ظهرت ──
  useEffect(() => {
    if (!booted.current) return; // أول تشغيل = تحميل الموقع، يتولّاه الأعلى
    clearTimeout(nav.current.show);
    clearTimeout(nav.current.cap);
    setVisible(false);
  }, [pathname]);

  // ── بدء الانتقال: نقرة على رابط داخلي لصفحة أخرى ──
  // رصد عام على مستوى الصفحة بدل تعديل كل <Link> في الموقع.
  useEffect(() => {
    // نسخة محليّة: كائن المؤقّتات ثابت الهوية، والتنظيف يحتاجه كما هو
    const timers = nav.current;

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const link =
        e.target instanceof Element ? e.target.closest("a[href]") : null;
      if (!link || link.target === "_blank" || link.hasAttribute("download")) {
        return;
      }

      let url;
      try {
        url = new URL(link.href, window.location.href);
      } catch {
        return;
      }

      // روابط خارجية (واتساب، هاتف) وروابط داخل الصفحة نفسها (#) لا لودر لها
      if (url.origin !== window.location.origin) return;
      if (url.pathname === window.location.pathname) return;

      clearTimeout(timers.show);
      clearTimeout(timers.cap);
      timers.show = setTimeout(show, NAV_DELAY);
      timers.cap = setTimeout(() => setVisible(false), NAV_CAP);
    };

    document.addEventListener("click", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      clearTimeout(timers.show);
      clearTimeout(timers.cap);
    };
  }, []);

  if (gone) return null;

  return (
    <div
      className={`page-loader${visible ? "" : " is-done"}`}
      role="status"
      aria-live="polite"
    >
      <span className="sr-only">جارٍ التحميل</span>

      <span className="page-loader-bubbles" aria-hidden="true">
        {BUBBLES.map((b, i) => (
          <span
            key={i}
            className="loader-bubble"
            style={{
              "--x": b.x,
              "--s": `${b.size}px`,
              "--d": `${b.dur}s`,
              "--delay": `${b.delay}s`,
            }}
          />
        ))}
      </span>

      <span className="page-loader-mark" aria-hidden="true">
        <LogoMark className="h-16 w-auto sm:h-20" decorative />
      </span>

      <span className="page-loader-bar" aria-hidden="true" />
    </div>
  );
}
