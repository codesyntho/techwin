// src/components/products/ProductDetailHero.tsx
"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

export type Crumb = { label: string; href?: string };

export type HeroProps = {
  title?: string;
  description?: string;
  image?:
    | string
    | { src: string; alt?: string }
    | Array<string | { src: string; alt?: string }>;
  heroImage?: { src: string; alt?: string };
  galleryImages?: Array<string | { src: string; alt?: string }>;
  ctas?: { label: string; href: string }[];
  breadcrumbs?: Crumb[];
  autoplay?: boolean;
  autoplayInterval?: number;
  pauseOnHover?: boolean;
};

const normalizeImages = (
  image?:
    | string
    | { src: string; alt?: string }
    | Array<string | { src: string; alt?: string }>
) => {
  if (!image) return [];
  if (Array.isArray(image))
    return image.map((img) =>
      typeof img === "string" ? { src: img, alt: "" } : img
    );
  return [typeof image === "string" ? { src: image, alt: "" } : image];
};

const PRIMARY = "#06a6d6";
const TRANS_MS = 520;
const EASING = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * useSlider: improved to accept forcedDirection for goTo so repeated next/prev clicks
 * always produce the correct animation direction (no reversed incoming slide).
 */
const useSlider = (itemCount: number, initialIndex = 0) => {
  const [index, setIndex] = useState(initialIndex);
  const [prevIndex, setPrevIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const [animate, setAnimate] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const goTo = (newIndex: number, forcedDirection?: "next" | "prev") => {
    if (isAnimating || newIndex === index || itemCount <= 1) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);

    // prefer forcedDirection when provided (ensures repeated next/prev clicks behave)
    const newDirection =
      forcedDirection ??
      ((newIndex > index && !(index === itemCount - 1 && newIndex === 0)) ||
      (index === 0 && newIndex === itemCount - 1)
        ? "next"
        : "prev");

    setIsAnimating(true);
    setDirection(newDirection);
    setPrevIndex(index);
    setIndex(newIndex);
    setAnimate(false); // initial state before transition

    // ensure we apply initial positions before starting transition
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimate(true));
    });

    timeoutRef.current = window.setTimeout(() => {
      setIsAnimating(false);
      setPrevIndex(null);
      setAnimate(false);
    }, TRANS_MS + 120);
  };

  const goNext = () => {
    if (itemCount <= 1) return;
    goTo((index + 1) % itemCount, "next");
  };
  const goPrev = () => {
    if (itemCount <= 1) return;
    goTo((index - 1 + itemCount) % itemCount, "prev");
  };

  // cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return { index, prevIndex, direction, isAnimating, animate, goTo, goNext, goPrev };
};

const ProductDetailHero: React.FC<HeroProps> = ({
  title = "1.0 μm Single-Frequency Fiber Laser",
  description = "Precision optics for long-distance sensing, coherent detection and quantum experiments.",
  image,
  heroImage,
  galleryImages,
  ctas = [],
  breadcrumbs = [],
  autoplay = false,
  autoplayInterval = 4500,
  pauseOnHover = true,
}) => {
  const images = useMemo(() => {
    if (image) return normalizeImages(image);
    if (galleryImages && galleryImages.length) return normalizeImages(galleryImages);
    if (heroImage) return normalizeImages(heroImage);
    return [];
  }, [image, galleryImages, heroImage]);

  const { index, prevIndex, direction, isAnimating, animate, goTo, goNext, goPrev } =
    useSlider(images.length);

  const [isHovering, setIsHovering] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // autoplay (optional)
  useEffect(() => {
    if (!autoplay || images.length <= 1 || (pauseOnHover && isHovering)) return;
    const id = window.setInterval(goNext, autoplayInterval);
    return () => window.clearInterval(id);
  }, [autoplay, autoplayInterval, images.length, isHovering, pauseOnHover, goNext]);

  // keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext]);

  const primaryCta = ctas.length > 0 ? ctas[0] : null;

  return (
    <>
      {breadcrumbs?.length > 0 && (
        <div
          className="w-full bg-white border-b"
          style={{ borderColor: "#e6eef4", paddingTop: "var(--site-header-height, 64px)" }}
        >
          <div className="max-w-7xl mx-auto px-6 md:px-8 py-4">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  {idx < breadcrumbs.length - 1 && crumb.href ? (
                    <Link href={crumb.href} className="text-slate-600 hover:text-[#0ea5c9] transition-colors">
                      {crumb.label}
                    </Link>
                  ) : (
                    <span
                      className={idx === breadcrumbs.length - 1 ? "font-semibold" : "text-slate-600"}
                      style={idx === breadcrumbs.length - 1 ? { color: PRIMARY } : {}}
                    >
                      {crumb.label}
                    </span>
                  )}
                  {idx < breadcrumbs.length - 1 && <span className="text-slate-400">/</span>}
                </div>
              ))}
            </nav>
          </div>
        </div>
      )}

      <section className="relative w-full bg-white overflow-hidden" aria-labelledby="product-hero-title">
        <div className="py-25 md:py-25">
          <div className="max-w-7xl mx-auto px-4 md:px-6"> {/* reduced outer side padding */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
              <div className="space-y-8 mt-10 lg:mt-0">
                <h1 id="product-hero-title" className="text-4xl md:text-5xl font-extrabold leading-tight" style={{ color: "#3B9ACB" }}>
                  {title}
                </h1>

                {/* DESCRIPTION BLOCK: replaced with requested sentence-splitting logic */}
                {/* Description: automatically split long text into shorter paragraphs (2 sentences each) */}
                {(() => {
                  // configure how many sentences per paragraph
                  const sentencesPerParagraph = 2;

                  // normalize text and split into sentences (keeps punctuation)
                  const raw = description?.toString?.() ?? "";
                  // naive sentence splitter that works well for English: splits on . ? ! followed by space+capital or line end
                  const sentenceParts = raw
                    .replace(/\n+/g, " ") // collapse existing newlines
                    .split(/(?<=[.?!])\s+(?=[A-Z0-9"“‘’']|$)/g)
                    .map((s) => s.trim())
                    .filter(Boolean);

                  // group sentences into paragraphs
                  const paragraphs: string[] = [];
                  for (let i = 0; i < sentenceParts.length; i += sentencesPerParagraph) {
                    const group = sentenceParts.slice(i, i + sentencesPerParagraph).join(" ");
                    paragraphs.push(group);
                  }

                  // fallback: if no sentences found, show whole text but with normal wrapping
                  const toRender = paragraphs.length > 0 ? paragraphs : [raw];

                  return (
                    <div className="text-slate-700 text-base md:text-lg leading-relaxed max-w-xl">
                      {toRender.map((para, idx) => (
                        <p key={idx} className="opacity-95 mb-6 break-words" style={{ marginTop: 0 }}>
                          {para}
                        </p>
                      ))}
                    </div>
                  );
                })()}

                {primaryCta && (
                  <div>
                    <Link href={primaryCta.href} className="inline-flex items-center gap-3 px-6 py-3 rounded-md font-semibold transition-all duration-200" style={{ background: PRIMARY, color: "#fff" }} aria-label={primaryCta.label}>
                      {primaryCta.label}
                      <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
              </div>

              <div
                className="relative flex flex-col items-center justify-start w-full"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
              >
                <div
                  className="relative w-full rounded-xl overflow-hidden"
                  style={{
                    background: "#fff",
                    border: `3px solid ${PRIMARY}`,
                    boxShadow: "0 10px 30px rgba(6,166,214,0.06)",
                  }}
                >
                  {/* viewport */}
                  <div
                    className="relative w-full h-[520px] md:h-[560px] overflow-hidden"
                    onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
                    onTouchEnd={(e) => {
                      if (!touchStartX.current) return;
                      const diff = e.changedTouches[0].clientX - touchStartX.current;
                      if (Math.abs(diff) > 40) diff > 0 ? goPrev() : goNext();
                      touchStartX.current = null;
                    }}
                  >
                    {/* slides */}
                    {images.length > 0 ? images.map((img, i) => {
                      let transform = "translateX(120%)";
                      let opacity = 0;
                      const isActive = i === index;
                      const isPrev = i === prevIndex;

                      if (!isAnimating) {
                        if (isActive) {
                          transform = "translateX(0)";
                          opacity = 1;
                        } else {
                          transform = "translateX(120%)";
                          opacity = 0;
                        }
                      } else {
                        if (isActive) {
                          transform = animate ? "translateX(0)" : (direction === "next" ? "translateX(120%)" : "translateX(-120%)");
                          opacity = animate ? 1 : 0;
                        } else if (isPrev) {
                          transform = animate ? (direction === "next" ? "translateX(-110%)" : "translateX(110%)") : "translateX(0)";
                          opacity = animate ? 0 : 1;
                        } else {
                          transform = "translateX(120%)";
                          opacity = 0;
                        }
                      }

                      return (
                        <div
                          key={img.src + "-" + i}
                          style={{
                            position: "absolute",
                            inset: 0,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transform,
                            opacity,
                            zIndex: isActive ? 40 : isPrev ? 30 : 10,
                            transition: `transform ${TRANS_MS}ms ${EASING}, opacity ${TRANS_MS * 0.85}ms ease`,
                            willChange: "transform, opacity",
                            pointerEvents: isActive ? "auto" : "none",
                          }}
                        >
                          {/* full image area (fills container) */}
                          <div className="relative w-full h-full mt-[25px] mb-[25px] flex items-center justify-center">
                            <Image
                              src={img.src}
                              alt={img.alt || `Image ${i + 1}`}
                              fill
                              className="object-contain object-center"
                              style={{ objectPosition: "center" }}
                              priority={isActive || isPrev}
                            />
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="w-full h-full flex items-center justify-center text-slate-500">No image available</div>
                    )}

                    {/* arrows */}
                    {images.length > 1 && (
                      <>
                        <button
                          onClick={goPrev}
                          aria-label="Previous image"
                          className="absolute top-1/2 left-3 -translate-y-1/2 z-40 rounded-full p-3 bg-white/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{
                            opacity: isHovering ? 1 : 0,
                            transform: `translateY(-50%) translateX(${isHovering ? 0 : -12}px)`,
                            transition: `opacity 260ms ease, transform 260ms ${EASING}`,
                            border: `2px solid ${PRIMARY}`,
                            color: PRIMARY,
                          }}
                        >
                          <ChevronLeft size={24} />
                        </button>

                        <button
                          onClick={goNext}
                          aria-label="Next image"
                          className="absolute top-1/2 right-3 -translate-y-1/2 z-40 rounded-full p-3 bg-white/90 shadow-lg focus:outline-none focus:ring-2 focus:ring-offset-2"
                          style={{
                            opacity: isHovering ? 1 : 0,
                            transform: `translateY(-50%) translateX(${isHovering ? 0 : 12}px)`,
                            transition: `opacity 260ms ease, transform 260ms ${EASING}`,
                            border: `2px solid ${PRIMARY}`,
                            color: PRIMARY,
                          }}
                        >
                          <ChevronRight size={24} />
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* single dot */}
                <div className="mt-4 flex items-center justify-center">
                  <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: "#e6eef4" }} aria-hidden title={`Image ${index + 1} of ${images.length}`}>
                    <div className="rounded-full transition-all" style={{ width: images.length > 0 ? 10 : 0, height: images.length > 0 ? 10 : 0, background: PRIMARY }} />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 border-t border-slate-100" />
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetailHero;
