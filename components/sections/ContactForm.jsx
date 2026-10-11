"use client";
import { useState } from "react";
import {
  FaWhatsapp,
  FaPaperPlane,
  FaLocationDot,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCircleCheck,
  FaTriangleExclamation,
} from "react-icons/fa6";
import { LogoMark } from "@/components/ui/Logo";
import { COMPANY } from "@/lib/content/company";
import { latin } from "@/lib/format";
import { SERVICES } from "@/lib/content/services";
import { WA_MESSAGES, whatsappLink } from "@/lib/whatsapp";

const EMPTY = { name: "", phone: "", city: "", service: "", message: "" };

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

/** رقم جوال سعودي: ١٠ أرقام تبدأ بـ 05 — بعد تحويل الأرقام العربية. */
const SAUDI_PHONE = /^05\d{8}$/;

export default function ContactForm() {
  const [status, setStatus] = useState("idle");
  const [form, setForm] = useState(EMPTY);
  const [phoneError, setPhoneError] = useState("");

  const set = (k) => (e) => {
    if (k === "phone") setPhoneError("");
    setForm((f) => ({ ...f, [k]: e.target.value }));
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const phone = latin(form.phone).replace(/[\s-]/g, "");
    if (!SAUDI_PHONE.test(phone)) {
      setPhoneError("أدخل رقم جوال سعودي من ١٠ أرقام يبدأ بـ 05");
      return;
    }

    // بلا مفتاح Web3Forms لا نرسل شيئاً — نوجّه الزائر إلى واتساب بدلاً من ذلك
    if (!WEB3FORMS_KEY) {
      setStatus("nokey");
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `طلب خدمة جديد من موقع ${COMPANY.nameAr}`,
          from_name: form.name,
          name: form.name,
          phone: form.phone,
          city: form.city,
          service: form.service,
          message: form.message,
          botcheck: form.botcheck ?? "",
        }),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm(EMPTY);
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy placeholder:text-muted/70 transition-colors duration-200 focus:border-azure focus:outline-hidden focus:ring-4 focus:ring-azure/10";

  const INFO = [
    {
      icon: <FaLocationDot />,
      label: "الموقع",
      value: COMPANY.city,
    },
    {
      icon: <FaPhone />,
      label: "الجوال",
      value: COMPANY.phoneDisplay,
      href: `tel:+${COMPANY.phoneIntl}`,
      ltr: true,
    },
    {
      icon: <FaEnvelope />,
      label: "البريد الإلكتروني",
      value: COMPANY.email,
      href: `mailto:${COMPANY.email}`,
      ltr: true,
    },
    {
      icon: <FaClock />,
      label: "أوقات العمل",
      value: COMPANY.workingHours,
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
      {/* النموذج */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 card p-6 sm:p-8"
      >
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-small font-bold text-navy">
              الاسم الكامل *
            </span>
            <input
              required
              type="text"
              placeholder="مثال: محمد الزامل"
              className={field}
              value={form.name}
              onChange={set("name")}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-small font-bold text-navy">
              رقم الجوال *
            </span>
            <input
              required
              type="tel"
              inputMode="tel"
              dir="ltr"
              placeholder="05XXXXXXXX"
              aria-invalid={phoneError ? "true" : undefined}
              aria-describedby={phoneError ? "phone-error" : undefined}
              className={`${field} text-right ${
                phoneError ? "border-red-400 focus:border-red-500" : ""
              }`}
              value={form.phone}
              onChange={set("phone")}
            />
            {phoneError && (
              <span
                id="phone-error"
                className="mt-1.5 block text-caption font-semibold text-red-600"
              >
                {phoneError}
              </span>
            )}
          </label>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-small font-bold text-navy">
              المدينة / الحي
            </span>
            <input
              type="text"
              placeholder="مثال: الرياض — النفل"
              className={field}
              value={form.city}
              onChange={set("city")}
            />
          </label>
          <label className="block">
            <span className="mb-1.5 block text-small font-bold text-navy">
              الخدمة المطلوبة *
            </span>
            <select
              required
              className={field}
              value={form.service}
              onChange={set("service")}
            >
              <option value="" disabled>
                اختر الخدمة
              </option>
              {SERVICES.map((s) => (
                <option key={s.id} value={s.titleAr}>
                  {s.titleAr}
                </option>
              ))}
              <option value="باقة أو عقد دوري">باقة أو عقد دوري</option>
              <option value="خدمة أخرى">خدمة أخرى</option>
            </select>
          </label>
        </div>

        <label className="block">
          <span className="mb-1.5 block text-small font-bold text-navy">
            تفاصيل المكان
          </span>
          <textarea
            rows={5}
            placeholder="نوع المكان (شقة / فيلا / مكتب)، عدد الغرف أو المساحة، والموعد المفضّل…"
            className={`${field} resize-y`}
            value={form.message}
            onChange={set("message")}
          />
        </label>

        {/* فخّ السبام — يدعمه Web3Forms؛ مخفي عن المستخدم والقارئ الصوتي */}
        <input
          type="checkbox"
          name="botcheck"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
          onChange={(e) =>
            setForm((f) => ({ ...f, botcheck: e.target.checked }))
          }
        />

        <button
          type="submit"
          disabled={status === "sending"}
          className="mt-1 btn-primary w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          <FaPaperPlane className="text-sm" />
          {status === "sending" ? "جارٍ الإرسال…" : "إرسال الطلب"}
        </button>

        <div aria-live="polite" className="empty:hidden">
          {status === "success" && (
            <p className="flex items-center gap-2.5 rounded-xl bg-mist px-4 py-3.5 text-small font-bold text-primary-ink">
              <FaCircleCheck className="shrink-0 text-base" />
              تم إرسال طلبك — سنتواصل معك قريباً.
            </p>
          )}
          {status === "error" && (
            <p className="flex items-center gap-2.5 rounded-xl bg-red-50 px-4 py-3.5 text-small font-bold text-red-700">
              <FaTriangleExclamation className="shrink-0 text-base" />
              تعذّر الإرسال. تواصل معنا مباشرة عبر واتساب.
            </p>
          )}
          {status === "nokey" && (
            <div className="rounded-xl bg-mist px-4 py-4">
              <p className="flex items-center gap-2.5 text-small font-bold text-navy">
                <FaTriangleExclamation className="shrink-0 text-base text-primary-ink" />
                نموذج البريد غير مفعّل حالياً.
              </p>
              <p className="mt-1.5 text-caption text-muted">
                أرسل بياناتك عبر واتساب — الرسالة جاهزة بما كتبته.
              </p>
              <a
                href={whatsappLink(WA_MESSAGES.fromForm(form))}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 btn-primary w-full"
              >
                <FaWhatsapp className="text-base" />
                إرسال عبر واتساب
              </a>
            </div>
          )}
        </div>

        <p className="text-center text-caption text-muted">
          بياناتك تُستخدم للرد على طلبك فقط.
        </p>
      </form>

      {/* بطاقة المعلومات */}
      <aside className="relative overflow-hidden rounded-brand bg-navy-grad p-6 text-white sm:p-8">
        <LogoMark className="pointer-events-none absolute -inset-s-8 -bottom-12 h-52 w-auto opacity-[.07]" />

        <div className="relative">
          <h3 className="text-lg font-bold">معلومات التواصل</h3>
          <p className="mt-2 text-small leading-[1.9] text-white/60">
            تفضّل الرد السريع؟ راسلنا على واتساب — عادةً نرد خلال دقائق في أوقات
            العمل.
          </p>

          <ul className="mt-7 space-y-5">
            {INFO.map((i) => (
              <li key={i.label} className="flex gap-3.5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[.07] text-lead text-turquoise">
                  {i.icon}
                </span>
                <div className="min-w-0">
                  <p className="text-caption text-white/50">{i.label}</p>
                  {i.href ? (
                    <a
                      href={i.href}
                      dir={i.ltr ? "ltr" : undefined}
                      className={`block text-body font-bold transition-colors hover:text-turquoise ${i.ltr ? "text-start" : ""}`}
                    >
                      {i.value}
                    </a>
                  ) : (
                    <p className="text-body font-bold">{i.value}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>

          <a
            href={whatsappLink(WA_MESSAGES.fromForm(form))}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 btn-white w-full"
          >
            <FaWhatsapp className="text-lg text-[#25D366]" /> تواصل عبر واتساب
          </a>

          <p className="mt-5 border-t border-white/10 pt-5 text-caption text-white/40">
            سجل تجاري رقم: {COMPANY.commercialRegister}
          </p>
        </div>
      </aside>
    </div>
  );
}
