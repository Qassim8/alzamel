"use client";
import { useRef } from "react";
import { FaCalculator, FaXmark } from "react-icons/fa6";
import PriceEstimatorForm from "@/components/sections/PriceEstimatorForm";
import { FaSearchDollar } from "react-icons/fa";

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
        aria-label="احصل على سعر الخدمة"
        className="quick-price-float group fixed inset-s-5 bottom-[calc(5rem+env(safe-area-inset-bottom))] z-50 flex cursor-pointer items-center gap-0 overflow-hidden rounded-full bg-navy p-0 text-small font-bold text-white shadow-lift transition-all duration-300 ease-brand hover:gap-2 hover:pe-5 focus-visible:gap-2 focus-visible:pe-5 sm:bottom-24"
      >
        <span className="quick-price-icon flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-turquoise text-[26px] text-navy">
          <FaSearchDollar />
        </span>
        <span className="max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-300 ease-brand group-hover:max-w-40 group-hover:opacity-100 group-focus-visible:max-w-40 group-focus-visible:opacity-100">
          احصل على سعر الخدمة
        </span>
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
