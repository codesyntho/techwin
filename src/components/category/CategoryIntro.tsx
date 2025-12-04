// src/components/category/CategoryIntro.tsx
"use client";

import React from "react";
import { motion, Variants } from "framer-motion";

export type IntroData = {
  heading: string;
  description: string;
};

type Props = {
  intro: IntroData;
  keyFeaturesPreview?: string[];
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: "easeOut" },
  },
};

const listItem: Variants = {
  hidden: { opacity: 0, y: 10, scale: 0.97 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.08 * i,
      duration: 0.45,
      ease: "easeOut",
    },
  }),
};

export default function CategoryIntro({ intro, keyFeaturesPreview = [] }: Props) {
  const { heading, description } = intro;

  return (
    <section
      aria-labelledby="category-intro-title"
      className="
        relative
        w-screen left-1/2 -translate-x-1/2
        overflow-hidden
        mt-16 md:mt-24
        bg-[#3B9ACB]
      "
    >
      {/* BACKGROUND GRID + GLOWS (same feel as FAQ) */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        {/* grid lines */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.14) 1px, transparent 1px),linear-gradient(to bottom, rgba(255,255,255,0.14) 1px, transparent 1px)",
            backgroundSize: "46px 46px",
          }}
        />
        {/* top-left glow */}
        <div
          className="absolute -top-40 left-[-15%] w-[520px] h-[520px] rounded-full blur-3xl"
          style={{ background: "rgba(255,255,255,0.32)" }}
        />
        {/* bottom-right glow */}
        <div
          className="absolute -bottom-40 right-[-10%] w-[460px] h-[460px] rounded-full blur-3xl"
          style={{ background: "rgba(0,0,0,0.25)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* LEFT SIDE */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="md:col-span-7"
          >
            {/* Decorative small header */}
            <div className="inline-flex items-center gap-3 mb-4">
              <span className="w-12 h-1 bg-white/70 rounded-full block" />
              <span className="px-3 py-1 bg-white/10 rounded-full text-xs font-medium text-white/90">
                Category overview
              </span>
            </div>

            <h2
              id="category-intro-title"
              className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white leading-tight tracking-[-0.03em]"
            >
              {heading}
            </h2>

            <p className="mt-5 text-white/90 text-base md:text-lg leading-relaxed max-w-2xl">
              {description}
            </p>

            {/* Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#contact"
                className="
                  px-6 py-3
                  bg-white
                  text-[#3B9ACB]
                  font-semibold
                  rounded-full
                  shadow-[0_14px_40px_rgba(0,0,0,0.25)]
                  hover:-translate-y-1
                  hover:shadow-[0_18px_56px_rgba(0,0,0,0.32)]
                  transition-transform transition-shadow
                  duration-200
                "
              >
                Request a quote
              </a>

              {/* <a
                href="#downloads"
                className="
                  px-5 py-2
                  bg-white/10
                  border border-white/40
                  text-white
                  rounded-full
                  hover:bg-white/18
                  transition
                "
              >
                Download brochure
              </a> */}
            </div>
          </motion.div>

          {/* RIGHT SIDE — HIGHLIGHTS CARD */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            className="md:col-span-5"
          >
            <div
              className="
                relative
                rounded-3xl
                p-6 md:p-7
                bg-white/95
                text-slate-900
                border border-white/70
                shadow-[0_24px_80px_rgba(0,0,0,0.35)]
                backdrop-blur-xl
              "
            >
              {/* small top accent line */}
              <div className="pointer-events-none absolute inset-x-6 -top-px h-px bg-gradient-to-r from-transparent via-[#3B9ACB] to-transparent" />

              <h3 className="text-xs md:text-sm font-semibold text-[#3B9ACB] mb-1">
                Highlights
              </h3>
              <p className="text-sm text-slate-600 mb-4">
                Snapshot of what this laser family delivers in the lab.
              </p>

              <motion.ul
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {keyFeaturesPreview.map((f, idx) => (
                  <motion.li
                    key={idx}
                    custom={idx + 1}
                    variants={listItem}
                    className="
                      group
                      relative flex flex-col gap-2 p-4
                      rounded-2xl
                      bg-slate-50
                      border border-[rgba(59,154,203,0.25)]
                      shadow-[0_10px_30px_rgba(15,23,42,0.12)]
                      hover:-translate-y-1
                      hover:shadow-[0_14px_40px_rgba(15,23,42,0.2)]
                      transition-all
                    "
                  >
                    {/* Check icon */}
                    <div
                      className="
                        w-9 h-9 flex items-center justify-center
                        rounded-xl
                        bg-[#3B9ACB]/10
                        border border-[#3B9ACB]/30
                      "
                    >
                      <svg
                        width="18"
                        height="18"
                        viewBox="0 0 24 24"
                        fill="none"
                      >
                        <path
                          d="M5 12.5L10 17L20 7"
                          stroke="#3B9ACB"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>

                    <p className="text-xs md:text-sm font-semibold text-slate-900 leading-snug">
                      {f}
                    </p>

                    <p className="text-[11px] text-slate-500">
                      Learn more in the technical benefits section.
                    </p>
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
