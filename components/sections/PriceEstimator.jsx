"use client";
import { useMemo, useState } from "react";
import { FaCalculator, FaWhatsapp } from "react-icons/fa6";
import Reveal from "@/components/ui/Reveal";
import SectionHeading from "@/components/ui/SectionHeading";
import { UNIT_PRICING } from "@/lib/content/pricing";
import { ar } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

/**
 * حاسبة تقديرية — تجيب عن أكثر سؤال يسبق الحجز: «كم يكلّفني؟».
 * كل القيم من جدول الأسعار المعتمد في lib/content/pricing.js،
 * فلا رقم هنا غير معلن على الموقع.
 */

// البنود المسعّرة بالمتر تحتاج مساحة؛ غيرها سعر مقطوع
const ALL_UNITS = UNIT_PRICING.flatMap((g) =>
  g.units.map((u) => ({ ...u, group: g.group })),
);

export default function PriceEstimator() {
  const [unitLabel, setUnitLabel] = useState(ALL_UNITS[0].label);
  const [qty, setQty] = useState(1);

  const unit = useMemo(
    () => ALL_UNITS.find((u) => u.label === unitLabel) ?? ALL_UNITS[0],
    [unitLabel],
  );

  const perUnit = Boolean(unit.unit);
  const count = Math.max(1, Math.min(Number(qty) || 1, 1000));
  const total = perUnit ? unit.amount * count : unit.amount;

  const waMessage = `مرحباً الزامل كلين، أرغب بعرض سعر لـ «${unit.label}»${
    perUnit ? ` — ${count} ${unit.unit}` : ""
  }. التقدير من الموقع: ${total} ر.س تقريباً.`;

  return (
    <section className="section">
      <div className="container-x">
        <SectionHeading
          label="تقدير سريع"
          title="كم ستكلّفك الخدمة؟"
          subtitle="اختر نوع المكان واحصل على تقدير فوري من أسعارنا المعلنة. السعر النهائي يُثبَّت قبل بدء العمل."
        />

        <Reveal className="mx-auto max-w-3xl">
          <div className="overflow-hidden card">
            <div className="grid gap-5 p-6 sm:p-8 md:grid-cols-[1.3fr_1fr] md:items-end">
              {/* المدخلات */}
              <div className="space-y-4">
                <label className="block">
                  <span className="mb-1.5 block text-small font-bold text-navy">
                    نوع الخدمة أو المكان
                  </span>
                  <select
                    value={unitLabel}
                    onChange={(e) => {
                      setUnitLabel(e.target.value);
                      setQty(1);
                    }}
                    className="w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy transition-colors duration-200 focus:border-azure focus:ring-4 focus:ring-azure/10 focus:outline-hidden"
                  >
                    {UNIT_PRICING.map((g) => (
                      <optgroup key={g.group} label={g.group}>
                        {g.units.map((u) => (
                          <option key={u.label} value={u.label}>
                            {u.label}
                          </option>
                        ))}
                      </optgroup>
                    ))}
                  </select>
                </label>

                {perUnit && (
                  <label className="block">
                    <span className="mb-1.5 block text-small font-bold text-navy">
                      عدد الأمتار تقريباً
                    </span>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      inputMode="numeric"
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy transition-colors duration-200 focus:border-azure focus:ring-4 focus:ring-azure/10 focus:outline-hidden"
                    />
                  </label>
                )}

                <p className="text-caption text-muted">{unit.meta}</p>
              </div>

              {/* النتيجة */}
              <div className="rounded-brand bg-mist p-5 text-center">
                <p className="flex items-center justify-center gap-2 text-caption font-bold text-muted">
                  <FaCalculator className="text-primary-ink" />
                  التقدير يبدأ من
                </p>
                <p className="mt-2 text-brand-grad text-[2rem] leading-none font-bold">
                  {ar(total)}
                  <span className="ms-1 text-card">ر.س</span>
                </p>
                {perUnit && (
                  <p className="mt-2 text-caption text-muted">
                    {ar(unit.amount)} ر.س × {ar(count)} {unit.unit}
                  </p>
                )}
              </div>
            </div>

            <div className="border-t border-line bg-white px-6 py-5 sm:px-8">
              <a
                href={whatsappLink(waMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full"
              >
                <FaWhatsapp className="text-lg" />
                أرسل التقدير واحصل على السعر النهائي
              </a>
              <p className="mt-3 text-center text-caption text-muted">
                التقدير مبني على أسعار البداية المعلنة — قد يتغيّر حسب حالة
                المكان بعد المعاينة.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
