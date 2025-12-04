// src/components/category/KeyFeatures.tsx
"use client";

import React, { useMemo, useState } from "react";
import { motion, Variants } from "framer-motion";

export type FeatureItemObj = {
  id?: string;
  icon?: React.ReactNode;
  title?: string;
  text: string;
  details?: string;
};

export type FeatureItem = string | FeatureItemObj;

type Props = {
  items: FeatureItem[];
  maxColumns?: 1 | 2 | 3; // API compatibility ke liye, ab use nahi ho raha
  interactive?: boolean;
  compact?: boolean;
};

const WRAPPER = "max-w-7xl mx-auto px-6";
const SECTION = "py-12 md:py-16";

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 0.9, 0.3, 1] },
  },
};

export default function KeyFeatures({
  items,
  interactive = true,
}: Props) {
  // normalize items
  const normalized = useMemo<FeatureItemObj[]>(
    () =>
      items.map((it, i) =>
        typeof it === "string"
          ? { id: `feature-${i}`, text: it }
          : {
              id: it.id ?? `feature-${i}`,
              title: it.title,
              text: it.text,
              details: it.details,
              icon: it.icon,
            }
      ),
    [items]
  );

  const [activeId, setActiveId] = useState<string>("");

  // Initialize activeId when normalized is ready
  React.useEffect(() => {
    if (normalized.length > 0 && !activeId) {
      setActiveId(normalized[0].id!);
    }
  }, [normalized, activeId]);

  if (!normalized.length) return null;

  const active =
    normalized.find((f) => f.id === activeId) ?? normalized[0];

  const handleTabClick = (id: string) => {
    if (!interactive) return;
    setActiveId(id);
  };

  const getLabel = (feat: FeatureItemObj, index: number) => {
    if (feat.title && feat.title.trim().length > 0) return feat.title;
    const raw = feat.text || "";
    return raw.length > 42
      ? raw.slice(0, 42) + "…"
      : raw || `Feature ${index + 1}`;
  };

  const activeIndex =
    normalized.findIndex((f) => f.id === active.id) + 1;

  return (
    <section
      className={`${SECTION} bg-slate-50`}
      aria-label="Key features"
    >
      <div className={WRAPPER}>
        {/* Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={sectionVariants}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 mb-2">
              <span className="h-1.5 w-8 rounded-full bg-[#3B9ACB]/20" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                Feature matrix
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-[-0.02em] text-[#3B9ACB]">
              Engineered features that matter in the lab
            </h2>
          </div>
          <p className="max-w-md text-xs sm:text-sm text-slate-500">
            Compare the most critical performance aspects of this laser
            family – stability, noise, coherence and integration – in a
            clean, tab-based view.
          </p>
        </motion.div>

        {/* Tab layout */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={sectionVariants}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* Tabs */}
          <div className="md:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.06)] p-2 md:p-3">
              <div className="flex items-center justify-between mb-2 px-1">
                <span className="text-xs font-medium text-slate-500">
                  {normalized.length} engineered capabilities
                </span>
                <span className="hidden md:inline-flex text-[11px] text-slate-400">
                  Select to view details
                </span>
              </div>

              <div className="flex md:flex-col gap-1 overflow-x-auto md:overflow-visible pb-1 hide-scrollbar">
                {normalized.map((feat, idx) => {
                  const isActive = feat.id === activeId;
                  const label = getLabel(feat, idx);

                  return (
                    <button
                      key={feat.id}
                      type="button"
                      onClick={() => handleTabClick(feat.id!)}
                      className={`group flex items-center justify-between md:justify-start whitespace-nowrap rounded-xl px-3 py-2 md:px-3.5 md:py-2.5 text-xs md:text-sm border transition-all ${
                        isActive
                          ? "bg-[#3B9ACB]/10 border-[#3B9ACB]/50 text-[#3B9ACB] shadow-sm"
                          : "bg-white border-transparent text-slate-600 hover:bg-slate-50 hover:border-slate-200"
                      }`}
                    >
                      <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[10px] font-semibold ${
                            isActive
                              ? "bg-[#3B9ACB] text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {idx + 1}
                        </span>
                        <span className="truncate">{label}</span>
                      </div>

                      <span
                        className={`ml-2 hidden md:inline-flex h-5 w-5 items-center justify-center rounded-full text-[10px] border ${
                          isActive
                            ? "border-[#3B9ACB]/40 text-[#3B9ACB]"
                            : "border-slate-200 text-slate-400 group-hover:border-slate-300"
                        }`}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-2.5 h-2.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path
                            d="M8 5h11M8 12h8M8 19h5M5 5h.01M5 12h.01M5 19h.01"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Active panel */}
          <div className="md:col-span-8">
            <div className="relative h-full rounded-2xl border border-slate-200 bg-white shadow-[0_18px_55px_rgba(15,23,42,0.12)] px-5 py-5 md:px-7 md:py-7 overflow-hidden">
              {/* soft gradients */}
              <div
                aria-hidden
                className="pointer-events-none absolute -right-12 -top-16 w-48 h-48 rounded-full bg-[#3B9ACB]/10 blur-3xl"
              />
              <div
                aria-hidden
                className="pointer-events-none absolute -left-10 bottom-0 w-52 h-40 rounded-full bg-sky-200/30 blur-3xl"
              />

              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.35,
                  ease: [0.22, 0.9, 0.3, 1],
                }}
                className="relative z-10"
              >
                {/* badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] font-medium text-slate-500 mb-3">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                  <span>Focused capability #{activeIndex}</span>
                </div>

                <div className="flex flex-col gap-3 md:gap-4">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-start gap-3">
                      {active.icon && (
                        <div className="hidden sm:flex h-10 w-10 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 text-[#3B9ACB]">
                          {active.icon}
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold tracking-[-0.01em] text-slate-900">
                          {active.title || getLabel(active, 0)}
                        </h3>
                        {/* <p className="mt-2 text-sm md:text-base text-slate-600 max-w-2xl">
                          {active.text}
                        </p> */}
                      </div>
                    </div>

                    <div className="mt-2 md:mt-0 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] text-slate-500">
                      <span className="h-1 w-6 rounded-full bg-[#3B9ACB]/30" />
                      <span>Lab-ready specification</span>
                    </div>
                  </div>

                  {active.details && (
                    <div className="mt-4 rounded-2xl bg-slate-50/80 border border-slate-200 px-4 py-4 md:px-5 md:py-5">
                      <h4 className="text-xs font-semibold tracking-[0.16em] uppercase text-slate-500 mb-2">
                        Technical context
                      </h4>
                      <p className="text-sm sm:text-sm text-slate-600 leading-relaxed">
                        {active.details}
                      </p>
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3 text-[11px] text-slate-500">


                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
