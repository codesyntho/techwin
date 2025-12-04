// src/components/trust/TrustStrip.tsx
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRequestQuote } from "@/context/RequestQuoteContext";

export default function TrustStrip(props: {
  bullets?: string[];
  counters?: { id: string; label: string; value: string | number }[];
  logos?: { id: string; src: string; alt?: string; href?: string }[];
  heading?: string;
  cta?: { label: string; href: string };
}) {
  const {
    bullets = [
      "20+ Years of Experience",
      "Independent IP & Patents",
      "Exported to 30+ Countries",
      "ISO / QC Certified",
    ],
    counters = [
      { id: "years", label: "Years", value: "20+" },
      { id: "countries", label: "Countries", value: "30+" },
      { id: "clients", label: "Major Clients", value: "200+" },
    ],
    logos = [
      { id: "client-a", src: "/logos/client-a.png", alt: "Client A" },
      { id: "client-b", src: "/logos/client-b.png", alt: "Client B" },
      { id: "client-c", src: "/logos/client-c.png", alt: "Client C" },
      { id: "client-d", src: "/logos/client-d.png", alt: "Client D" },
    ],
    heading = "Why Techwin — Trusted Worldwide",
    cta = { label: "Request a Quote", href: "/request-quote" },
  } = props;

  const [values, setValues] = useState<number[]>(counters.map(() => 0));
  const rootRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const { openModal } = useRequestQuote();

  // animate numeric counters when visible
  useEffect(() => {
    const node = rootRef.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            counters.forEach((c, idx) => {
              const raw = String(c.value);
              const target = parseInt(raw.replace(/\D/g, ""), 10);
              if (isNaN(target)) return;
              const duration = 1000 + idx * 300;
              const start = performance.now();
              const step = (now: number) => {
                const t = Math.min(1, (now - start) / duration);
                const eased = 1 - Math.pow(1 - t, 3);
                const v = Math.round(target * eased);
                setValues((prev) => {
                  const cp = [...prev];
                  cp[idx] = v;
                  return cp;
                });
                if (t < 1) requestAnimationFrame(step);
              };
              requestAnimationFrame(step);
            });
            obs.disconnect();
          }
        });
      },
      { threshold: 0.25 }
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, [counters]);

  // control marquee animation play state by inline style
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.style.animationPlayState = isPaused ? "paused" : "running";
  }, [isPaused]);

  // duplicate logos for seamless loop
  const loopLogos = logos.length < 6 ? [...logos, ...logos] : logos;

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden text-white"
      aria-label="Trust strip"
    >
      {/* gradient background */}
      <div className="absolute inset-0 bg-linear-to-r from-[#3087C0] to-[#51A3E0]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* left: heading + bullets */}
          <div className="lg:col-span-5 text-center lg:text-left">
            <h3 className="text-3xl md:text-4xl font-extrabold mb-5">
              {heading}
            </h3>
            <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
              {bullets.map((b, i) => (
                <div
                  key={i}
                  className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-2 text-sm backdrop-blur-sm border border-white/20"
                >
                  <span className="h-2 w-2 rounded-full bg-white" />
                  <span>{b}</span>
                </div>
              ))}
            </div>
            <div className="mt-6">
              <button
                type="button"
                onClick={() => openModal()}
                className="inline-block rounded-full bg-white text-[#3087C0] px-6 py-2.5 font-semibold shadow-md hover:shadow-lg transition-transform hover:-translate-y-0.5"
              >
                {cta.label}
              </button>
            </div>
          </div>

          {/* middle: counters */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="flex flex-wrap gap-8 sm:gap-12 justify-center">
              {counters.map((c, idx) => {
                const raw = String(c.value);
                const suffix = raw.replace(/\d/g, "");
                const display = /\d/.test(raw)
                  ? `${values[idx] || 0}${suffix}`
                  : raw;
                return (
                  <div key={c.id} className="text-center">
                    <div className="text-3xl sm:text-4xl font-extrabold drop-shadow-sm">
                      {display}
                    </div>
                    <div className="text-sm text-white/90 mt-1">{c.label}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* right: logos marquee */}
          <div className="lg:col-span-3">
            <div className="text-sm text-white/90 mb-3 font-medium text-center lg:text-left">
              Trusted by
            </div>
            <div
              className="overflow-hidden rounded-xl border border-white/10 bg-white/10 backdrop-blur-sm max-w-sm mx-auto lg:mx-0"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div
                ref={trackRef}
                style={{ animation: "trustScroll 22s linear infinite" }}
                className="flex gap-8 items-center p-3"
              >
                {loopLogos.map((l, i) => (
                  <div
                    key={`${l.id}-${i}`}
                    className="shrink-0 w-28 h-14 flex items-center justify-center p-2"
                  >
                    <Image
                      src={encodeURI(l.src)}
                      alt={l.alt || l.id}
                      width={120}
                      height={48}
                      style={{ width: "auto", height: "auto" }}
                      className="object-contain"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
