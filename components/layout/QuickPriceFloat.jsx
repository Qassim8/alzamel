"use client";
import { useRef } from "react";
import { FaCalculator, FaXmark } from "react-icons/fa6";
import PriceEstimatorForm from "@/components/sections/PriceEstimatorForm";

export default function QuickPriceFloat() {
  const dialogRef = useRef(null);

  function openEstimator() {
    dialogRef.current?.showModal();
  }

  function closeEstimator() {
    dialogRef.current?.close();
  }

  return (
    <>
      <button
        type="button"
        onClick={openEstimator}
        aria-haspopup="dialog"
        aria-controls="quick-price-dialog"
        aria-label="تقدير سعر الخدمة"
        className="fixed inset-s-4 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex cursor-pointer items-center gap-2.5 rounded-full bg-navy py-2.5 ps-2.5 pe-4 text-xs font-bold text-white shadow-lift transition-all duration-300 ease-brand hover:scale-105 focus-visible:scale-105 sm:bottom-24 sm:py-3 sm:ps-3 sm:pe-5 sm:text-sm"
      >
        {/* أيقونة الحاسبة المعبرة */}
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-turquoise text-sm text-navy shadow-sm sm:h-10 sm:w-10 sm:text-base">
          <FaCalculator />
        </span>

        {/* النص ظاهر دائماً بشكل مدمج وأنيق بدون الحاجة للضغط أو التمرير */}
        <span className="tracking-tight whitespace-nowrap">اعرف السعر</span>
      </button>

      <dialog
        ref={dialogRef}
        id="quick-price-dialog"
        aria-labelledby="quick-price-title"
        onClick={(event) => {
          if (event.target === event.currentTarget) closeEstimator();
        }}
        className="quick-estimator-dialog"
      >
        <div className="relative p-4 sm:p-6">
          <button
            type="button"
            onClick={closeEstimator}
            aria-label="إغلاق تقدير السعر"
            className="absolute inset-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white text-navy shadow-card transition-colors hover:bg-mist"
          >
            <FaXmark />
          </button>
          <div className="mt-14 mb-5 pe-12">
            <p className="eyebrow">تقدير سريع</p>
            <h2 id="quick-price-title" className="mt-2 heading-section">
              كم ستكلّفك الخدمة؟
            </h2>
            <p className="mt-2 text-small leading-7 text-muted">
              اختر الخدمة واحصل على تقدير فوري من أسعارنا المعلنة.
            </p>
          </div>
          <PriceEstimatorForm />
        </div>
      </dialog>
    </>
  );
}
