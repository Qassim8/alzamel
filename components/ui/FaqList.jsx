"use client";
import { useState } from "react";
import { FaPlus } from "react-icons/fa6";
import { FAQS } from "@/lib/content/faqs";

export default function FAQ({ items = FAQS }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mx-auto max-w-3xl space-y-3">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div
            key={f.q}
            className={`overflow-hidden rounded-brand border bg-white transition-all duration-300 ease-brand ${
              isOpen ? "border-azure/40 shadow-card" : "border-line"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? -1 : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 p-5 text-right"
            >
              <span
                className={`text-lead font-bold transition-colors ${
                  isOpen ? "text-primary-ink" : "text-navy"
                }`}
              >
                {f.q}
              </span>
              <span
                className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-caption transition-all duration-300 ease-brand ${
                  isOpen
                    ? "rotate-45 bg-brand-grad text-white"
                    : "bg-mist text-primary-ink"
                }`}
              >
                <FaPlus />
              </span>
            </button>
            <div
              className={`grid transition-[grid-template-rows,opacity] duration-300 ease-brand ${
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <p className="px-5 pb-5 text-body leading-loose text-muted">
                  {f.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
