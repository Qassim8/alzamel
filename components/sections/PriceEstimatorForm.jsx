"use client";
import { useMemo, useState } from "react";
import { FaCalculator, FaWhatsapp } from "react-icons/fa6";
import { UNIT_PRICING } from "@/lib/content/pricing";
import { ar } from "@/lib/format";
import { whatsappLink } from "@/lib/whatsapp";

const ALL_UNITS = UNIT_PRICING.flatMap((group) =>
  group.units.map((unit) => ({ ...unit, group: group.group })),
);

export default function PriceEstimatorForm() {
  const [unitLabel, setUnitLabel] = useState(ALL_UNITS[0].label);
  const [qty, setQty] = useState(1);

  const unit = useMemo(
    () => ALL_UNITS.find((item) => item.label === unitLabel) ?? ALL_UNITS[0],
    [unitLabel],
  );

  const perUnit = Boolean(unit.unit);
  const count = Math.max(1, Math.min(Number(qty) || 1, 1000));
  const total = perUnit ? unit.amount * count : unit.amount;

  const waMessage = `مرحباً الزامل كلين، أرغب بعرض سعر لـ «${unit.label}»${
    perUnit ? ` — ${count} ${unit.unit}` : ""
  }. التقدير من الموقع: ${total} ر.س تقريباً.`;

  return (
    <div className="overflow-hidden card">
      <div className="grid gap-5 p-6 sm:p-8 md:grid-cols-[1.3fr_1fr] md:items-end">
        <div className="space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-small font-bold text-navy">
              نوع الخدمة أو المكان
            </span>
            <select
              value={unitLabel}
              onChange={(event) => {
                setUnitLabel(event.target.value);
                setQty(1);
              }}
              className="w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy transition-colors duration-200 focus:border-azure focus:ring-4 focus:ring-azure/10 focus:outline-hidden"
            >
              {UNIT_PRICING.map((group) => (
                <optgroup key={group.group} label={group.group}>
                  {group.units.map((item) => (
                    <option key={item.label} value={item.label}>
                      {item.label}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>

          {perUnit && (
            <label className="block">
              <span className="mb-1.5 block text-small font-bold text-navy">
                {unit.unit === "المتر" ? "عدد الأمتار تقريباً" : "عدد الأطقم"}
              </span>
              <input
                type="number"
                min={1}
                max={1000}
                inputMode="numeric"
                value={qty}
                onChange={(event) => setQty(event.target.value)}
                className="w-full rounded-xl border border-line bg-white px-4 py-3 text-body text-navy transition-colors duration-200 focus:border-azure focus:ring-4 focus:ring-azure/10 focus:outline-hidden"
              />
            </label>
          )}

          <p className="text-caption text-muted">{unit.meta}</p>
        </div>

        <div className="rounded-brand bg-mist p-5 text-center">
          <p className="flex items-center justify-center gap-2 text-caption font-bold text-muted">
            <FaCalculator className="text-primary-ink" />
            تبدأ من
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
          التقدير مبني على أسعار البداية المعلنة — قد يتغيّر حسب حالة المكان بعد
          المعاينة.
        </p>
      </div>
    </div>
  );
}
