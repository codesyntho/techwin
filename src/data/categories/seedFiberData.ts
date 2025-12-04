// seedFiberData.ts
// Full type definitions + CategoryData object for the Seed Fiber Lasers category.
// Place under src/data/categories/ or import into your pages as needed.

export type BreadcrumbItem = { label: string; href?: string };

export type HeroData = {
  title: string;
  tagline: string;
  image: string; // path under /public/
  imageAlt?: string;
  breadcrumb?: BreadcrumbItem[];
  ctaPrimary?: { label: string; href: string; external?: boolean } | null;
  ctaSecondary?: { label: string; href: string; external?: boolean } | null;
};

export type IntroData = {
  heading: string;
  description: string;
};

export type SubCategoryItem = {
  id?: string; // optional slug/id for linking
  name: string;
  shortDescription: string;
  details?: string;
};

export type CategoryData = {
  url: string;
  metaTitle: string;
  metaDescription: string;

  hero: HeroData;
  intro: IntroData;
  keyFeatures: string[];
  subCategories: SubCategoryItem[];
  technicalBenefits: string[];
  applications: string[];
  cta: {
    heading?: string;
    primary: { label: string; href: string; external?: boolean };
    secondary?: { label: string; href: string; external?: boolean } | null;
  };
  contactPhone?: string;
  notes?: string;
};

export const seedFiberData: CategoryData = {
  url: "/products/seed-lasers",

  metaTitle:
    "Techwin – High-Precision Seed Fiber Laser Manufacturer in Hangzhou City",
  metaDescription:
    "Techwin – High-Precision Seed Fiber Lasers Manufacturer in Hangzhou City. Call +86-13958180450 for reliable 1 micron, 1.5 micron, and 2.0 µm seed laser solutions worldwide.",

  hero: {
    title: "High-Precision Seed Fiber Lasers",
    tagline:
      "Stable narrow-linewidth seed lasers for amplifiers, LiDAR, communications and precision sensing.",
    image: "/category/High-Precision-Seed-Fiber-Lasers.jpg",
    imageAlt: "High-precision seed fiber laser module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Seed Fiber Lasers", href: "/seed-fiber-lasers" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Brochure", href: "/downloads/seed-laser-brochure.pdf" },
  },

  intro: {
    heading: "What is a Seed Fiber Laser?",
    description:
      "A seed fiber laser acts as the initial light source (or “seed”) for high-power laser systems. It produces a highly stable, narrow-linewidth laser output that is later amplified through fiber amplifiers. These lasers provide a stable foundation for systems where wavelength accuracy, coherence, and low noise are essential. Techwin designs and manufactures high-precision seed fiber lasers used across industrial, scientific, and communication applications.",
  },

  keyFeatures: [
    "Ultra-narrow linewidth and high coherence",
    "Low relative intensity noise (RIN)",
    "Excellent wavelength and power stability",
    "Compact, integration-friendly mechanical packaging",
    "Available at 1.0 µm, 1.5 µm and 2.0 µm",
    "Modulation options: phase, frequency, amplitude",
  ],

  subCategories: [
    {
      id: "1.0um-narrow-linewidth-seed-laser",
      name: "1.0 µm Narrow Linewidth Seed Laser",
      shortDescription:
        "Stable single-frequency 1.0 µm seed laser with ultra-narrow linewidth for coherent communication and precision measurement.",
      details:
        "Provides stable single-frequency output at 1.0 µm with ultra-narrow linewidth and low phase noise—ideal for Yb-doped amplifier seeding, interferometry and laboratory/industrial measurement systems.",
    },
    {
      id: "1.0um-frequency-stabilized-seed-laser",
      name: "1.0 µm Frequency-Stabilized Seed Laser",
      shortDescription:
        "Environmentally compensated frequency-stabilized 1.0 µm seed laser for long-term wavelength stability.",
      details:
        "Designed for systems needing long-term wavelength stability using temperature/environmental control, frequently used in fiber sensing, optical metrology and coherent LiDAR setups.",
    },
    {
      id: "1.0um-ultra-low-noise-seed-laser",
      name: "1.0 µm Ultra-Low Noise Seed Laser",
      shortDescription:
        "Ultra-low RIN 1.0 µm seed laser providing high spectral purity for precision frequency systems.",
      details:
        "Optimized for very low RIN and spectral purity—suitable for optical clocks, precision interferometry and high-end metrology.",
    },
    {
      id: "1.5um-narrow-linewidth-seed-laser",
      name: "1.5 µm Narrow Linewidth Seed Laser",
      shortDescription:
        "1.5 µm narrow-linewidth seed laser for communications research, DAS and high-resolution spectroscopy.",
      details:
        "Operates with high wavelength stability and narrow spectral width—ideal for telecom research, distributed acoustic sensing (DAS) and precise spectroscopy.",
    },
    {
      id: "1.5um-phase-modulated-seed-laser",
      name: "1.5 µm Phase-Modulated Seed Laser",
      shortDescription:
        "Phase-modulation capable 1.5 µm seed laser for encoding and coherent detection systems.",
      details:
        "Provides phase modulation capability for signal encoding and advanced coherent detection used in communication networks and sensing systems.",
    },
    {
      id: "2.0um-single-frequency-seed-laser",
      name: "2.0 µm Single-Frequency Seed Laser",
      shortDescription:
        "Stable single-frequency 2.0 µm seed source for mid-IR sensing, gas detection and specialty OEM systems.",
      details:
        "Delivers single-frequency emission at 2.0 µm with ultra-stable wavelength performance—suited for gas sensing, medical lasers and mid-IR instrumentation.",
    },
    {
      id: "2.0um-phase-modulated-fiber-seed-source",
      name: "2.0 µm Phase-Modulated Fiber Seed Source",
      shortDescription:
        "Phase-modulated 2.0 µm seed source for adaptive optics, lidar and specialized research.",
      details:
        "Enables controlled phase modulation at 2.0 µm while maintaining low noise and narrow linewidth—useful in lidar research and scientific experiments.",
    },
  ],

  technicalBenefits: [
    "Linewidth: Ultra-narrow (Hz → kHz) for precision applications",
    "Output power: Seed-level power up to several hundred mW (model dependent)",
    "Frequency stability: excellent long-term stability (< ±0.1 pm typical)",
    "Noise performance: ultra-low RIN architecture",
    "Fiber options: PM or SM outputs and custom connectors",
    "Modulation: phase/frequency/amplitude options on selected models",
  ],

  applications: [
    "Seed sources for high-power fiber laser amplification",
    "LiDAR and remote sensing",
    "Optical communications and coherent transmission",
    "Distributed sensing (DAS / DTS) and FBG interrogation",
    "Scientific research, spectroscopy and metrology",
    "Medical and defense laser systems",
  ],

  cta: {
    heading: "Need a high-stability seed laser for your system?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",
  notes:
    "Techwin offers customization: wavelength locking, power tuning, phase control, fiber type selection and OEM integration. Each unit is factory-tested for linewidth, stability and environmental robustness.",
};
