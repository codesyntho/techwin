// src/components/category/CategoryHero.tsx
"use client";

import React from "react";
import Image from "next/image";
import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { useRequestQuote } from "@/context/RequestQuoteContext";

export type BreadcrumbItem = { label: string; href?: string };
export type CTA = { label: string; href: string; external?: boolean } | null;

export type HeroData = {
  title: string;
  tagline: string;
  image: string;
  imageAlt?: string;
  breadcrumb?: BreadcrumbItem[];
  ctaPrimary?: CTA;
  ctaSecondary?: CTA;
};

type Props = {
  hero: HeroData;
  fallbackImage?: string;
  showGlassCard?: boolean;
  showImageCTA?: boolean;
};

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.06 } },
};

const textItem: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 0.9, 0.3, 1] },
  },
};

const imageVariants: Variants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.9, ease: [0.22, 0.9, 0.3, 1] },
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.35 },
  },
};

export default function CategoryHero({
  hero,
  fallbackImage = "/techwin-company/category-hero-default.webp",
  showGlassCard = true,
  showImageCTA = false,
}: Props) {
  const { title, tagline, image, imageAlt, breadcrumb = [], ctaPrimary, ctaSecondary } = hero;
  const heroSrc = image || fallbackImage;
  const heroAlt = imageAlt || `${title} — Techwin`;
  const { openModal } = useRequestQuote();

  const descriptiveTagline =
    tagline?.trim() ||
    "Ultra-narrow linewidth fiber lasers engineered for research-grade stability, industrial reliability, and high-coherence optical performance. Designed for interferometry, sensing, metrology, and advanced photonics applications where precision cannot be compromised.";

  const breadcrumbToRender =
    breadcrumb.length > 0 && breadcrumb[breadcrumb.length - 1].label?.trim() === title?.trim()
      ? breadcrumb.slice(0, breadcrumb.length - 1)
      : breadcrumb;

  // FIX APPLIED HERE
  const renderCta = (cta: CTA | undefined, isPrimary: boolean) => {
    if (!cta) return null;

    const commonClasses = isPrimary
      ? "inline-flex items-center gap-3 rounded-full px-6 py-3 bg-[#3B9ACB] text-white text-sm font-semibold shadow-lg hover:shadow-xl hover:brightness-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3B9ACB]/30 transition"
      : "inline-flex items-center gap-2 rounded-full px-5 py-2.5 border border-slate-300 text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-200";

    if (cta.label.toLowerCase().includes("request quote")) {
      return (
        <button
          onClick={openModal}
          className={commonClasses}
          aria-label={cta.label}
        >
          <span>{cta.label}</span>
          {isPrimary && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 5l7 7-7 7"
              />
            </svg>
          )}
        </button>
      );
    } else {
      return (
        <a
          href={cta.href}
          className={commonClasses}
          {...(cta.external
            ? { target: "_blank", rel: "noopener noreferrer" }
            : {})}
          aria-label={cta.label}
        >
          <span>{cta.label}</span>
          {isPrimary && (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-4 h-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 12h14M13 5l7 7-7 7"
              />
            </svg>
          )}
        </a>
      );
    }
  };

  return (
    <section
      aria-labelledby="category-hero-title"
      className="relative overflow-visible bg-linear-to-b from-white via-white to-slate-50 pt-28 md:pt-32"
    >
      {/* subtle top glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-16 h-48 md:h-56 -z-20"
        style={{
          background:
            "radial-gradient(900px 220px at 8% 14%, rgba(48,135,192,0.06), transparent 22%), radial-gradient(600px 180px at 92% 18%, rgba(91,183,225,0.025), transparent 30%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Breadcrumb */}
        {breadcrumbToRender && breadcrumbToRender.length > 0 && (
          <nav className="mt-2 mb-5 text-sm text-slate-600" aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-2">
              {breadcrumbToRender.map((b, i) => {
                const isLast = i === breadcrumbToRender.length - 1;
                return (
                  <li key={i} className="flex items-center">
                    {b.href && !isLast ? (
                      <a href={b.href} className="hover:underline text-slate-600">
                        {b.label}
                      </a>
                    ) : (
                      <span
                        aria-current={isLast ? "page" : undefined}
                        className={isLast ? "text-[#3B9ACB] font-medium" : "text-[#3B9ACB]"}
                      >
                        {b.label}
                      </span>
                    )}
                    {!isLast && <span className="mx-2 text-slate-300">/</span>}
                  </li>
                );
              })}
            </ol>
          </nav>
        )}

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-stretch">
          {/* LEFT */}
          <motion.div
            className="md:col-span-7 h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.18 }}
            variants={containerVariants}
          >
            <div className="relative h-full p-7 md:p-9 rounded-3xl border border-slate-200 bg-white/95 shadow-[0_22px_60px_rgba(15,23,42,0.08)]">
              {/* vertical accent bar */}
              <div
                aria-hidden
                className="hidden md:block absolute -left-0.5 top-8 h-16 w-1.5 rounded-full bg-linear-to-b from-[#3B9ACB] to-sky-400"
              />

              {/* soft overlay */}
              {showGlassCard && (
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl z-0"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.35), transparent 55%)",
                  }}
                />
              )}

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col">
                <motion.div
                  variants={textItem}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50/80 px-3 py-1 text-xs font-medium text-slate-600 mb-4"
                >
                  <span className="inline-flex h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                  <span>Single-frequency photonics platform</span>
                </motion.div>

                <motion.h1
                  variants={textItem}
                  id="category-hero-title"
                  className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.05rem] leading-tight font-bold tracking-[-0.015em] text-[#3B9ACB]"
                >
                  {title}
                </motion.h1>

                <motion.p
                  variants={textItem}
                  className="mt-4 text-base md:text-lg text-black max-w-2xl"
                >
                  {descriptiveTagline}
                </motion.p>

                <motion.div
                  variants={textItem}
                  className="mt-6 flex flex-wrap items-center gap-3"
                >
                  {renderCta(ctaPrimary, true)}
                  {/* {renderCta(ctaSecondary, false)} */}
                </motion.div>

                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.18 }}
                  variants={containerVariants}
                  className="mt-7 grid grid-cols-1 xs:grid-cols-3 gap-4 max-w-xl"
                >
                  {[
                    { label: "RELATIVE INTENSITY NOISE", value: "< 0.05 dB" },
                    { label: "OUTPUT STABILITY", value: "< 0.6 dB" },
                    { label: "TYPICAL POWER", value: "Up to 10 W" },
                  ].map((f, idx) => (
                    <motion.div
                      key={idx}
                      variants={textItem}
                      className="flex flex-col gap-1 rounded-2xl border border-slate-100 bg-slate-50/80 px-4 py-3"
                    >
                      <span className="text-[0.68rem] uppercase tracking-wide text-slate-500">
                        {f.label}
                      </span>
                      <span className="text-sm font-semibold text-slate-900">
                        {f.value}
                      </span>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT: Image */}
          <motion.div
            className="md:col-span-5 h-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={imageVariants}
            whileHover="hover"
          >
            <div className="relative h-full rounded-3xl overflow-hidden border border-slate-100 bg-white shadow-[0_30px_70px_rgba(15,23,42,0.12)]">
              <div className="relative w-full h-full min-h-72 sm:min-h-80 md:min-h-104 lg:min-h-120">
                <Image
                  src={heroSrc}
                  alt={heroAlt}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover" }}
                  placeholder="blur"
                  blurDataURL="/techwin-company/blur-placeholder.png"
                  priority
                />

                {showImageCTA && (
                  <button
                    onClick={openModal}
                    className="absolute right-4 bottom-4 rounded-full bg-[#3B9ACB] text-white px-5 py-2 text-sm font-medium shadow-xl hover:-translate-y-0.5 transition-transform z-50"
                  >
                    Request quote
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-white via-transparent to-transparent -z-10" />
    </section>
  );
}
