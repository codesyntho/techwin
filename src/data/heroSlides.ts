import type { HeroSlide } from "@/components/hero/Hero";

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: "s1",
    image: "/hero/laser-1.jpg", // put images in /public/hero/
    headline: "Single-Frequency Fiber Lasers — Ultra-narrow linewidth, high stability",
    sub: "Custom solutions for LiDAR, sensing, quantum and communications.",
    ctaSecondary: { type: "product", href: "/products" },
  },
  {
    id: "s2",
    image: "/hero/laser-2.jpg",
    headline: "High-power & low-noise lasers for long-range LiDAR",
    sub: "Reliable, high-power sources with industry-leading stability.",
    ctaSecondary: { type: "application", href: "/application" },
  },
  {
    id: "s3",
    image: "/hero/laser-3.jpg",
    headline: "Frequency-stabilized seed lasers for precision sensing",
    sub: "Optimized for fiber sensing and quantum experiments.",
    ctaSecondary: { type: "contact", href: "/contact" },
  },
];
