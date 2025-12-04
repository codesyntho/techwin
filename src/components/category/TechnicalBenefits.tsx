// src/components/category/TechnicalBenefitsPremiumWithCompare.tsx
"use client";

import React, { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { SparklesCore } from "@/components/ui/sparkles";
import { Info, CheckCircle2 } from "lucide-react";

export type BenefitCard = {
  id?: string;
  title: string;
  subtitle?: string;
  desc?: string;
  metric?: string;
  metricValue?: number;
  meta?: string[];
  details?: string;
  icon?: React.ReactNode;
};

type Props = {
  items: Array<string | BenefitCard>;
  columns?: 1 | 2 | 3;
  compact?: boolean;
};

const CONTAINER = "max-w-7xl mx-auto px-6 md:px-8 lg:px-12";

const sectionVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, staggerChildren: 0.06 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

/**
 * Advanced, futuristic technical benefits section.
 * White page, primary-blue “3D” container + interactive compare.
 */
export default function TechnicalBenefits({ items, columns = 3, compact = false }: Props) {
  const normalized = useMemo(
    () =>
      items.map((it, i) =>
        typeof it === "string"
          ? ({
              id: `b-${i}`,
              title: it,
              desc: "",
              metricValue: 0,
              meta: [],
              details: "",
            } as BenefitCard)
          : { ...it, id: it.id ?? `b-${i}` }
      ),
    [items]
  );

  const [openId, setOpenId] = useState<string | null>(null);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [isCompareModalOpen, setCompareModalOpen] = useState(false);

  const selected = normalized.filter((n) => compareIds.includes(n.id!));

  function toggleOpen(id: string) {
    setOpenId((p) => (p === id ? null : id));
  }

  function toggleCompare(id: string) {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 3) return prev; // max 3
      return [...prev, id];
    });
  }

  return (
    <>
      {/* SECTION */}
      <section
        className="relative py-16 md:py-20 bg-white text-black overflow-hidden"
        aria-label="Technical advantages"
      >
        {/* decorative backgrounds */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(59,154,203,0.14) 1px, transparent 1px),linear-gradient(to bottom, rgba(59,154,203,0.14) 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
        <div aria-hidden className="pointer-events-none absolute -top-40 right-[-10%] w-[520px] h-[520px] rounded-full bg-[#3B9ACB1F] blur-3xl -z-10" />
        <div aria-hidden className="pointer-events-none absolute -bottom-40 left-[-10%] w-[520px] h-[520px] rounded-full bg-[#3B9ACB14] blur-3xl -z-10" />

        <div className={CONTAINER}>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            {/* LEFT: Heading + controls */}
            <motion.div
              className="lg:col-span-4 space-y-5"
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.55, ease: [0.22, 0.9, 0.3, 1] }}
            >
              <div className="inline-flex items-center gap-3">
                <span className="h-1.5 w-10 rounded-full bg-[#3B9ACB]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-black/60">
                  Technical advantages
                </span>
              </div>

              <div>
                <h2 className="text-3xl md:text-4xl lg:text-[2.6rem] font-semibold tracking-[-0.03em] text-black">
                  Engineering advantages,
                  <span className="block text-[#3B9ACB]">explained visually.</span>
                </h2>
                <p className="mt-4 text-sm md:text-base text-black/70 leading-relaxed max-w-lg">
                  See how this laser family behaves where it matters most – noise, linewidth, stability and system
                  integration. Click a card to select it for comparison, or tap the info icon to see more details.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-3 text-xs md:text-sm">
                <div className="inline-flex items-center gap-2 rounded-full bg-white shadow-sm border border-[#3B9ACB33] px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                  <span className="font-medium text-black">Lab-validated metrics</span>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-[#3B9ACB] text-white px-3 py-1.5">
                  <span className="h-1 w-6 rounded-full bg-white" />
                  <span>Select 2–3 cards to compare</span>
                </div>
              </div>

              <div className="pt-5 border-t border-[#3B9ACB26] mt-5">
                <div className="flex flex-wrap gap-3 items-center">
                  <button
                    onClick={() => {
                      setCompareIds([]);
                      setOpenId(null);
                    }}
                    className="rounded-full px-4 py-2 border border-[#3B9ACB33] text-xs md:text-sm text-black bg-white hover:bg-[#3B9ACB0D] hover:shadow-sm transition cursor-pointer"
                  >
                    Clear selection
                  </button>

                  <button
                    onClick={() => setCompareModalOpen(true)}
                    aria-disabled={compareIds.length < 2}
                    className={`rounded-full px-4 py-2 text-xs md:text-sm font-semibold inline-flex items-center gap-2 transition cursor-pointer ${
                      compareIds.length >= 2
                        ? "bg-[#3B9ACB] text-white shadow hover:brightness-110"
                        : "bg-white text-black/40 border border-[#3B9ACB33] cursor-not-allowed"
                    }`}
                  >
                    <span>Open compare</span>
                    <span className="inline-flex h-5 min-w-[1.8rem] items-center justify-center rounded-full bg-white text-[11px] text-[#3B9ACB] ">
                      {compareIds.length}
                    </span>
                  </button>

                  {/* <span className="text-[11px] text-black/55">
                    Select at least <span className="font-semibold">2</span> benefits to unlock compare.
                  </span> */}
                </div>
              </div>
            </motion.div>

            {/* RIGHT: 3D container with cards */}
            <motion.div
              className="lg:col-span-8"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              variants={sectionVariants}
            >
              <div
                className="
                  relative rounded-[26px] bg-white text-black
                  border border-[#3B9ACB33]
                  shadow-[0_32px_90px_rgba(59,154,203,0.38)]
                  px-4 py-5 md:px-6 md:py-6
                  overflow-hidden
                "
              >
                {/* subtle primary aura + top light line */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-10 -top-24 h-44 opacity-70"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 0, rgba(59,154,203,0.5), transparent 60%)",
                  }}
                />
                <div className="pointer-events-none absolute inset-x-0 top-9 h-px bg-linear-to-r from-transparent via-[#3B9ACB66] to-transparent" />

                <motion.div
                  className="relative z-10 grid gap-5"
                  style={{
                    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                    alignItems: "stretch",
                  }}
                >
                  {normalized.map((it, idx) => (
                    <motion.div key={it.id} variants={cardVariants}>
                      <BlueCard
                        item={it}
                        index={idx}
                        isOpen={openId === it.id}
                        onToggle={() => toggleOpen(it.id!)}
                        compareSelected={compareIds.includes(it.id!)}
                        compareIndex={compareIds.indexOf(it.id!)}
                        onCompare={() => toggleCompare(it.id!)}
                      />
                    </motion.div>
                  ))}
                </motion.div>

                {/* <div className="relative z-10 mt-5">
                  <div className="inline-flex items-center gap-2 rounded-full bg-[#3B9ACB0F] border border-[#3B9ACB33] px-3 py-1.5 text-[11px] text-black/70">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#3B9ACB]" />
                    <span>Hint: click a card to select it. Tap the (i) icon for more info.</span>
                  </div>
                </div> */}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* STICKY COMPARE BAR */}
      <AnimatePresence>
        {compareIds.length > 0 && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className="fixed left-3 right-3 md:left-10 md:right-10 bottom-6 z-40"
          >
            <div className="max-w-7xl mx-auto">
              <div className="rounded-2xl bg-white text-black border border-[#3B9ACB33] shadow-[0_22px_60px_rgba(59,154,203,0.35)] px-4 py-3 flex flex-wrap items-center gap-3 md:gap-4">
                <div className="flex items-center gap-2 text-xs md:text-sm">
                  <span className="font-semibold">Compare tray</span>
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#3B9ACB] text-[11px] px-3 py-1 font-semibold text-white">
                    {compareIds.length} selected
                  </span>
                </div>

                <div className="hidden md:flex flex-wrap items-center gap-2 text-[11px] text-black/70">
                  {selected.map((s) => (
                    <span
                      key={s.id}
                      className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 border border-[#3B9ACB33]"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#3B9ACB]" />
                      <span>{s.title}</span>
                    </span>
                  ))}
                </div>

                <div className="ml-auto flex items-center gap-2">
                  <button
                    onClick={() => setCompareIds([])}
                    className="rounded-full px-3.5 py-1.5 border border-[#3B9ACB33] bg-white text-xs md:text-sm text-black hover:bg-[#3B9ACB0D] transition"
                  >
                    Clear
                  </button>
                  <button
                    onClick={() => setCompareModalOpen(true)}
                    disabled={compareIds.length < 2}
                    className={`rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold transition ${
                      compareIds.length >= 2
                        ? "bg-[#3B9ACB] text-white hover:brightness-110"
                        : "bg-white text-black/40 border border-[#3B9ACB33] cursor-not-allowed"
                    }`}
                  >
                    Open compare
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPARE MODAL */}
      <AnimatePresence>
        {isCompareModalOpen && selected.length >= 2 && (
          <CompareModal
            selected={selected.slice(0, 3)}
            onClose={() => setCompareModalOpen(false)}
            onRequestQuote={() => {
              // TODO: wire to contact section
            }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

/* CARD */
function BlueCard({
  item,
  index,
  isOpen,
  onToggle,
  compareSelected,
  compareIndex,
  onCompare,
}: {
  item: BenefitCard;
  index?: number;
  isOpen?: boolean;
  onToggle?: () => void;
  compareSelected?: boolean;
  compareIndex?: number;
  onCompare?: (e: React.MouseEvent) => void;
}) {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const ry = useTransform(mx, [-100, 100], [6, -6]);
  const rx = useTransform(my, [-100, 100], [-4, 4]);
  const sc = useTransform(mx, [-100, 100], [1.01, 1.01]);

  function handleMove(e: React.MouseEvent) {
    const b = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - b.left - b.width / 2) / (b.width / 2);
    const y = (e.clientY - b.top - b.height / 2) / (b.height / 2);
    mx.set(x * 22);
    my.set(y * 18);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
  }

  return (
    <div className="relative h-full">
      <motion.button
        type="button"
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{
          rotateY: ry as any,
          rotateX: rx as any,
          scale: sc as any,
          perspective: 1000,
        }}
        onClick={onCompare}
        tabIndex={0}
        aria-pressed={compareSelected}
        className={`
          w-full text-left rounded-2xl p-5 md:p-6 h-full min-h-[230px]
          flex flex-col justify-between
          bg-white
          border
          shadow-[0_16px_40px_rgba(59,154,203,0.25)]
          hover:shadow-[0_22px_55px_rgba(59,154,203,0.38)]
          transition-all duration-300
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#3B9ACB]/80
          ${compareSelected ? "border-[#3B9ACB] bg-blue-50/30 ring-2 ring-[#3B9ACB]" : "border-[#3B9ACB33]"}
        `}
      >
        <div className="flex gap-4 items-start">
          <div className="shrink-0 mt-1">
            <CircularMetricForBlue value={item.metricValue ?? 0} label={item.metric} selected={compareSelected} />
          </div>

          <div className="flex-1 min-w-0 flex flex-col justify-between">
            <div>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm md:text-base font-semibold text-black leading-snug">{item.title}</h3>
                  {item.subtitle && <div className="mt-1 text-[11px] md:text-xs text-black/70">{item.subtitle}</div>}
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggle?.();
                  }}
                  className="p-1.5 rounded-full text-black/50 hover:bg-[#3B9ACB]/20 hover:text-black transition-colors"
                  aria-label="Show details"
                >
                  <Info size={16} />
                </button>
              </div>

              {item.desc && <p className="mt-3 text-xs md:text-sm text-black/75 leading-relaxed">{item.desc}</p>}
            </div>

            <div className="mt-4 flex items-center justify-end">
              <div className="inline-flex items-center gap-1 text-[10px] text-black/55">
                {compareSelected ? <span className="font-semibold text-[#3B9ACB]">Selected for compare</span> : <span>Click card to select</span>}
              </div>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isOpen && (item.details || (item.meta && item.meta.length > 0)) && (
            <motion.div
              initial={{ opacity: 0, height: 0, marginTop: 0 }}
              animate={{ opacity: 1, height: "auto", marginTop: 14 }}
              exit={{ opacity: 0, height: 0, marginTop: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 0.9, 0.3, 1] }}
              className="pt-3 border-t border-[#3B9ACB26]"
            >
              {item.details && <p className="text-[11px] md:text-xs text-black/75 leading-relaxed">{item.details}</p>}

              {item.meta && item.meta.length > 0 && (
                <ul className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.meta.map((m, i) => (
                    <li key={i} className="text-[10px] text-black px-2 py-1 rounded-md bg-[#3B9ACB0D] border border-[#3B9ACB26]">
                      {m}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {compareSelected && (
          <div className="absolute top-2 right-2">
            <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3B9ACB] text-white shadow-lg">
              <CheckCircle2 size={14} />
            </div>
          </div>
        )}
      </motion.button>
    </div>
  );
}

/* Circular metric for white cards */
/* Improvement: if value is 0, show subtle dash (—) instead of large 0 which looks odd */
function CircularMetricForBlue({ value = 0, label, selected }: { value?: number; label?: string; selected?: boolean }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  const stroke = 5;
  const size = 52;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (pct / 100) * circumference;

  const small = pct === 0;

  return (
    <div className="w-14 h-14 flex flex-col items-center justify-center relative">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} aria-hidden className="absolute inset-0">
        <defs>
          <linearGradient id="metric-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3B9ACB" />
            <stop offset="100%" stopColor="#55D6F5" />
          </linearGradient>
        </defs>
        <circle cx={size / 2} cy={size / 2} r={radius} stroke="rgba(59,154,203,0.12)" strokeWidth={stroke} fill="none" />
        {!small && (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="url(#metric-grad)"
            strokeWidth={stroke}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: offset }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          />
        )}
      </svg>

      <div className={`w-full h-full rounded-full flex flex-col items-center justify-center transition-colors ${selected ? "bg-blue-100/50" : "bg-transparent"}`}>
        {small ? (
          // subtle dash for zero (less aggressive than "0")
          <span className="text-lg font-semibold text-[#3B9ACB]">—</span>
        ) : (
          <span className="text-lg font-bold text-[#3B9ACB]">{pct}</span>
        )}
      </div>

      {label && <div className="text-[9px] text-black/70 mt-1.5 text-center leading-tight">{label}</div>}
    </div>
  );
}

/* COMPARE MODAL: improved layout and overlap-fade behaviour */
function CompareModal({
  selected,
  onClose,
  onRequestQuote,
}: {
  selected: BenefitCard[];
  onClose: () => void;
  onRequestQuote?: () => void;
}) {
  const left = selected[0];
  const right = selected[1];

  const x = useMotionValue(50); // percent (0..100) - 50 center
  const xSpring = useSpring(x, { stiffness: 300, damping: 40 });

  const containerRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  // Compute left/right opacity based on slider position to avoid visual double-text
  const leftOpacity = useTransform(xSpring, [0, 30, 50, 70, 100], [1, 0.7, 0.55, 0.3, 0.1]);
  const rightOpacity = useTransform(xSpring, [0, 30, 50, 70, 100], [0.1, 0.3, 0.55, 0.7, 1]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") x.set(Math.max(0, x.get() - 5));
      if (e.key === "ArrowRight") x.set(Math.min(100, x.get() + 5));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, x]);

  if (!left || !right) return null;

  const handlePointerDown = (e: React.PointerEvent) => {
    dragging.current = true;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newX = Math.min(Math.max(0, e.clientX - rect.left), rect.width);
    x.set((newX / rect.width) * 100);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    const currentX = x.get();
    const snapPoints = [25, 50, 75];
    const snap = snapPoints.reduce((a, b) => (Math.abs(currentX - a) < Math.abs(currentX - b) ? a : b));
    x.set(snap);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6"
      role="dialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ scale: 0.96, y: 12, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.96, y: 10, opacity: 0 }}
        transition={{ duration: 0.28, ease: [0.22, 0.9, 0.3, 1] }}
        className="relative z-10 max-w-6xl w-full bg-white text-black rounded-2xl shadow-[0_32px_90px_rgba(0,0,0,0.45)] overflow-hidden border border-[#3B9ACB33]"
      >
        {/* header */}
        <div className="flex items-center justify-between px-5 md:px-7 py-4 border-b border-[#3B9ACB26] bg-white/90">
          <div>
            <h3 className="text-sm md:text-base font-semibold text-black">
              Compare
              <span className="font-normal text-black/70">
                {" "}
                – {left.title} <span className="text-black/50">vs</span> {right.title}
              </span>
            </h3>
            <p className="mt-1 text-[11px] text-black/55">Drag the handle or use arrow keys. Press Esc to close.</p>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={onClose} className="rounded-full px-3 py-1.5 border border-[#3B9ACB33] bg-white text-xs text-black hover:bg-[#3B9ACB0D]">
              Close
            </button>
            <button onClick={() => onRequestQuote?.()} className="rounded-full px-4 py-1.5 bg-[#3B9ACB] text-xs md:text-sm font-semibold text-white hover:brightness-110">
              Request quote
            </button>
          </div>
        </div>

        {/* body */}
        <div className="relative h-[460px] md:h-[520px]" ref={containerRef}>
          {/* Background sparkles */}
          <div className="absolute inset-0 -z-10">
            <SparklesCore className="w-full h-full" background="transparent" particleColor="#3B9ACB" particleDensity={12} minSize={0.25} maxSize={0.8} />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-[#3B9ACB04]" />

          {/* RIGHT Panel (always visible behind clipped left) */}
          <div className="absolute inset-0 flex justify-end items-center pointer-events-none">
            <div className="w-full h-full px-8 md:px-12 lg:px-16 py-10 flex flex-col justify-center items-end text-right">
              {/* wrap in motion.div to apply opacity transform */}
              <motion.div style={{ opacity: rightOpacity as any, maxWidth: "56ch" }} className="transform-gpu">
                <h4 className="text-xl md:text-2xl font-semibold text-black">{right.title}</h4>
                {right.subtitle && <p className="mt-2 text-base text-black/70 max-w-xl">{right.subtitle}</p>}
                {right.desc && <p className="mt-4 text-base text-black/75 max-w-xl leading-relaxed">{right.desc}</p>}
              </motion.div>
            </div>
          </div>

          {/* Left Panel (clipped by slider) */}
          <motion.div
            className="absolute inset-0 flex justify-start items-center overflow-hidden pointer-events-none"
            // clipPath driven by spring - left area visible
            style={{ clipPath: useTransform(xSpring, (v) => `inset(0 ${100 - v}% 0 0)`) as any }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[#3B9ACB08] via-white to-white" />
            <div className="w-full h-full px-8 md:px-12 lg:px-16 py-10 flex flex-col justify-center pointer-events-none">
              <motion.div style={{ opacity: leftOpacity as any, maxWidth: "56ch" }}>
                <h4 className="text-xl md:text-2xl font-semibold text-black">{left.title}</h4>
                {left.subtitle && <p className="mt-2 text-base text-black/70 max-w-xl">{left.subtitle}</p>}
                {left.desc && <p className="mt-4 text-base text-black/75 max-w-xl leading-relaxed">{left.desc}</p>}
              </motion.div>
            </div>
          </motion.div>

          {/* center handle */}
          <motion.div
            role="slider"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={x.get()}
            tabIndex={0}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            className="absolute top-0 bottom-0 z-40 flex items-center justify-center w-10 cursor-ew-resize"
            style={{ left: useTransform(xSpring, (v) => `${v}%`) as any, x: "-50%" }}
          >
            <div className="relative w-12 h-12 rounded-full bg-white text-black border-2 border-[#3B9ACB] shadow-2xl flex items-center justify-center">
              <motion.div className="absolute inset-0 rounded-full border-2 border-[#3B9ACB]" animate={{ scale: [1, 1.4, 1], opacity: [1, 0, 1] }} transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }} />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M9 4L4 9L9 14" stroke="#3B9ACB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M15 4L20 9L15 14" stroke="#3B9ACB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </motion.div>
        </div>

        {/* footer */}
        <div className="px-5 md:px-7 py-3 border-t border-[#3B9ACB26] flex flex-wrap items-center justify-between gap-3 text-[11px] md:text-xs text-black/60">
          <span>Tip: drag to bias towards one side – release to snap to 25 / 50 / 75.</span>
          <div className="flex items-center gap-2">
            <button onClick={() => x.set(50)} className="rounded-full px-3 py-1.5 border border-[#3B9ACB33] bg-white text-black hover:bg-[#3B9ACB0D]">
              Reset to middle
            </button>
            <button onClick={() => onRequestQuote?.()} className="rounded-full px-4 py-1.5 bg-[#3B9ACB] text-white font-semibold hover:brightness-110">
              Request quote
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
