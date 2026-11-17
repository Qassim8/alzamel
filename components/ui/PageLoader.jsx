"use client";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { LogoMark } from "@/components/ui/Logo";

/**
 * شاشة التحميل — عند الدخول للموقع وعند التنقل بين الصفحات.
 *
 * الاستعارة: عمود رغوة صابون يعبر الشاشة من اليمين لليسار،
 * كمسحة ممسحة. لغة التنظيف نفسها، لا فقاعات طافية.
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

/* عمود رغوة واحد: فقاعات متلاصقة بمقاسات مختلفة تعبر الشاشة ككتلة.
   y نسبة من الارتفاع، x إزاحة أفقية بالبكسل عن محور العمود، s القطر.
   المواضع متقاربة والمقاسات متفاوتة عمداً حتى تتداخل الدوائر فتبدو
   رغوة ملتصقة لا فقاعات متفرّقة. ثابتة داخل العمود — العمود وحده
   هو ما يتحرّك، فحركة واحدة بدل ستّين. */
const FOAM_COUNT = 62;

/* مولّد ثابت البذرة: يعطي النتيجة نفسها على الخادم وعلى المتصفّح،
   فلا يختلف الترميز بينهما (Math.random كان ليكسر الهيدريشن). */
let seed = 20261117;
const noise = () => {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
};

const FOAM = Array.from({ length: FOAM_COUNT }, (_, i) => ({
  y: -4 + (i * 108) / (FOAM_COUNT - 1),
  x: Math.round((noise() - 0.5) * 112),
  s: Math.round(16 + noise() * 52),
}));

const MIN_VISIBLE = 700; // تكفي لرؤية مسحة كاملة — لودر لا يُرى بلا فائدة
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

      <span className="page-loader-foam" aria-hidden="true">
        {FOAM.map((b, i) => (
          <span
            key={i}
            className="loader-bubble"
            style={{
              "--y": `${b.y}%`,
              "--x": `${b.x}px`,
              "--s": `${b.s}px`,
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
