// src/components/home/Hero.tsx (copied from components/hero)
"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import RequestQuoteModal from "@/components/quote/RequestQuoteModal";

export type HeroSlide = {
    id: string;
    image: string; 
    headline: string;
    sub: string;
    ctaPrimary?: { label: string; href: string };
    ctaSecondary?: { label: string; href: string };
};

type Props = {
    slides: HeroSlide[];
    autoplay?: boolean;
    autoplayInterval?: number; 
};

export default function Hero({ slides, autoplay = true, autoplayInterval = 6000 }: Props) {
    const [index, setIndex] = useState(0);
    const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
    const length = slides.length;
    const timerRef = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement | null>(null);

    // swipe
    const touchStartX = useRef<number | null>(null);
    const touchEndX = useRef<number | null>(null);

    useEffect(() => {
        if (!autoplay || length <= 1) return;
        startTimer();
        return () => stopTimer();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index, autoplay, autoplayInterval, length]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        function onTouchStart(e: TouchEvent) {
            touchStartX.current = e.changedTouches[0].clientX;
        }
        function onTouchMove(e: TouchEvent) {
            touchEndX.current = e.changedTouches[0].clientX;
        }
        function onTouchEnd() {
            if (touchStartX.current == null || touchEndX.current == null) return;
            const dx = touchStartX.current - touchEndX.current;
            const threshold = 50; // px
            if (dx > threshold) {
                // swipe left
                goTo(index + 1);
            } else if (dx < -threshold) {
                // swipe right
                goTo(index - 1);
            }
            touchStartX.current = null;
            touchEndX.current = null;
        }
        el.addEventListener("touchstart", onTouchStart);
        el.addEventListener("touchmove", onTouchMove);
        el.addEventListener("touchend", onTouchEnd);
        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchmove", onTouchMove);
            el.removeEventListener("touchend", onTouchEnd);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [index]);

    function startTimer() {
        stopTimer();
        timerRef.current = window.setTimeout(() => {
            setIndex((i) => (i + 1) % length);
        }, autoplayInterval);
    }
    function stopTimer() {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    }

    function goTo(i: number) {
        setIndex(i < 0 ? length - 1 : i >= length ? 0 : i);
    }

    if (!slides || slides.length === 0) return null;

    return (
        <>
        <section
            ref={containerRef}
            className="relative w-full overflow-hidden select-none"
            onMouseEnter={() => stopTimer()}
            onMouseLeave={() => autoplay && startTimer()}
            aria-roledescription="carousel"
        >
            {/* slides */}
            <div className="relative h-screen md:h-[77vh] lg:h-[85vh]">
                {slides.map((s, i) => {
                    const active = i === index;
                    return (
                        <div
                            key={s.id}
                            className={`absolute inset-0 transition-opacity duration-800 ease-in-out ${active ? "opacity-100 z-20" : "opacity-0 z-10 pointer-events-none"
                                }`}
                            aria-hidden={!active}
                        >
                            {/* background image with subtle zoom */}
                            <div
                                className={`absolute inset-0 transform-gpu transition-transform duration-900 ${active ? "scale-100" : "scale-102"
                                    }`}
                            >
                                <Image
                                    src={s.image}
                                    alt={s.headline}
                                    priority={i === index}
                                    fill
                                    className="object-cover object-center"
                                />
                                {/* Uniform dark overlay */}
                                <div className="absolute inset-0 bg-black/45"></div>
                            </div>


                            {/* dim + color overlay for better contrast */}
                            <div className="absolute inset-0 bg-linear-to-b from-black/30 via-black/10 to-black/35 mix-blend-multiply"></div>

                            {/* content container */}
                            <div className="absolute inset-0 flex items-center">
                                <div className="mx-auto max-w-6xl w-full px-6 md:px-10 lg:px-16">
                                    <div className="max-w-2xl text-white">
                                        {/* animated headline */}
                                        <h1
                                            className={`text-3xl md:text-5xl font-semibold leading-tight drop-shadow-md transform transition-all duration-700 ${active ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
                                                }`}
                                            style={{ transitionDelay: active ? "120ms" : "0ms" }}
                                        >
                                            {s.headline}
                                        </h1>

                                        {/* subtext with slight delay */}
                                        <p
                                            className={`mt-4 text-sm md:text-base text-white/90 transform transition-all duration-700 ${active ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0"
                                                }`}
                                            style={{ transitionDelay: active ? "220ms" : "0ms" }}
                                        >
                                            {s.sub}
                                        </p>

                                        {/* CTAs with stagger */}
                                        <div className={`mt-6 flex gap-3 flex-wrap ${active ? "opacity-100" : "opacity-0"} transition-opacity duration-700`} style={{ transitionDelay: active ? "320ms" : "0ms" }}>
                                            <button
                                                onClick={() => setIsQuoteModalOpen(true)}
                                                className="inline-block rounded-full bg-[#3B9ACB] text-white px-4 py-2 md:px-5 md:py-2.5 font-medium shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 cursor-pointer"
                                            >
                                                Request Quote
                                            </button>

                                            {s.ctaSecondary && s.ctaSecondary.label !== 'Datasheets' && (
                                                <Link
                                                    href={s.ctaSecondary.href}
                                                    className="inline-block rounded-full border border-white/30 text-white px-3 py-1.5 md:px-4 md:py-2 font-medium hover:bg-white/10 transition"
                                                >
                                                    {s.ctaSecondary.label}
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* left/right arrows - modern style */}
            {length > 1 && (
                <>
                    <button
                        aria-label="Previous slide"
                        onClick={() => goTo(index - 1)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-linear-to-br from-white/95 to-white/80 p-3 shadow-lg hover:scale-105 transition-transform cursor-pointer hidden md:block"
                    >
                        <ChevronLeft className="h-5 w-5 text-[#165ba6]" />
                    </button>
                    <button
                        aria-label="Next slide"
                        onClick={() => goTo(index + 1)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-40 rounded-full bg-linear-to-br from-white/95 to-white/80 p-3 shadow-lg hover:scale-105 transition-transform cursor-pointer hidden md:block"
                    >
                        <ChevronRight className="h-5 w-5 text-[#165ba6]" />
                    </button>
                </>
            )}

            {/* pagination + progress */}
            {length > 1 && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-6 z-40 flex flex-col items-center gap-3">
                    <div className="flex gap-3">
                        {slides.map((_, i) => (
                            <button
                                key={i}
                                aria-label={`Go to slide ${i + 1}`}
                                onClick={() => goTo(i)}
                                className={`h-2 w-8 rounded-full transition-all ${i === index ? "bg-white" : "bg-white/40"}`}
                            />
                        ))}
                    </div>

                    {/* progress bar showing time left for current slide */}
                    <div className="h-1 w-40 bg-white/20 rounded-full overflow-hidden">
                        <div
                            key={index}
                            className="h-full bg-white rounded-full transition-all"
                            style={{
                                width: autoplay ? "100%" : "0%",
                                transform: autoplay ? "translateX(0%)" : "translateX(-100%)",
                                transitionDuration: `${autoplayInterval}ms`,
                                transitionTimingFunction: "linear",
                            }}
                        />
                    </div>
                </div>
            )}
        </section>
        <RequestQuoteModal open={isQuoteModalOpen} onClose={() => setIsQuoteModalOpen(false)} />
        </>
    );
}
