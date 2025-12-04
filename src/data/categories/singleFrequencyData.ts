// src/data/categories/singleFrequencyData.ts

export type BreadcrumbItem = { label: string; href?: string };

export type HeroData = {
  title: string;
  tagline: string;
  image: string;
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
  id?: string;
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

export const singleFrequencyData: CategoryData = {
  url: "/products/single-frequency-fiber-lasers",
  metaTitle: "Single-Frequency Fiber Lasers | Techwin Manufacturer in Hangzhou City",
  metaDescription:
    "Single-Frequency Fiber Lasers by Techwin – ultra-narrow linewidth lasers for LiDAR, sensing, quantum and communications. Call +86-13958180450.",

  hero: {
    title: "Single-Frequency Fiber Lasers",
    tagline:
      "Ultra-narrow linewidth, high stability fiber lasers for precision sensing, LiDAR, communications and quantum applications.",
    image: "/category/Single-Frequency-Fiber-Lasers.jpg",
    imageAlt: "Single-Frequency Fiber Lasers — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Single-Frequency Fiber Lasers", href: "/products/single-frequency" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Brochure", href: "/downloads/single-frequency-brochure.pdf" },
  },

  intro: {
    heading: "What is a Single-Frequency Fiber Laser?",
    description:
      "A single-frequency fiber laser emits light at a single longitudinal mode with ultra-narrow linewidth (typically Hz to kHz), providing exceptional spectral purity, phase stability and low noise. These lasers are engineered for applications demanding the highest coherence and frequency stability. Techwin designs high-performance single-frequency fiber lasers used in scientific research, industrial sensing, quantum experiments and telecommunications worldwide.",
  },

  keyFeatures: [
    "Ultra-narrow linewidth (Hz-level) for exceptional coherence",
    "Low phase and intensity noise characteristics",
    "High frequency and wavelength stability",
    "Compact, integrable fiber laser design",
    "Available at 1.0 µm, 1.5 µm and 2.0 µm",
    "Customizable control and modulation options",
  ],

  subCategories: [
    {
      id: "ultra-narrow-linewidth",
      name: "Ultra-Narrow Linewidth Fiber Laser",
      shortDescription:
        "Hz-level ultra-narrow linewidth single-frequency fiber laser delivering exceptional coherence, phase stability, and spectral purity for scientific, industrial, sensing, and quantum applications.",
    },
    {
      id: "narrow-linewidth",
      name: "Narrow Linewidth Fiber Laser",
      shortDescription:
        "kHz-level narrow-linewidth single-frequency fiber laser with high spectral purity and low phase noise for precision measurement and coherent systems.",
    },
    {
      id: "sensor-stabilized",
      name: "High-Sensitivity Sensor-Stabilized Fiber Laser",
      shortDescription:
        "Frequency-stabilized fiber laser optimized for precision fiber sensing, distributed sensing networks and high-sensitivity detection applications.",
    },
    {
      id: "stabilized",
      name: "Frequency-Stabilized Fiber Laser",
      shortDescription:
        "Environmentally compensated frequency-stabilized laser for long-term wavelength stability in laboratory and field environments.",
    },
    {
      id: "ultra-low-noise",
      name: "Ultra-Low Noise Fiber Laser Series",
      shortDescription:
        "Ultra-low noise single-frequency fiber lasers optimized for precision measurement, quantum applications and high-resolution sensing systems.",
    },
    {
      id: "broadband-low-noise",
      name: "Broadband Ultra-Low Noise Fiber Laser",
      shortDescription:
        "Broadband fiber laser series delivering ultra-low noise, wide spectral output and high stability for spectroscopy, metrology, coherent detection and optical sensing.",
    },
  ],

  technicalBenefits: [
    "Linewidth: Ultra-narrow (Hz → kHz) for maximum coherence",
    "Output power: Stable single-frequency emission (100 mW → 500 W model-dependent)",
    "Frequency stability: Excellent long-term stability (< ±0.1 pm typical)",
    "Noise performance: Ultra-low RIN and phase noise architecture",
    "Fiber options: PM or SM outputs with custom connector choices",
    "Modulation: Phase/frequency/amplitude options on selected models",
  ],

  applications: [
    "Precision laser sensing and interferometry",
    "LiDAR and remote sensing systems",
    "Quantum optics and quantum technologies",
    "Optical communications and coherent transmission",
    "Distributed fiber sensing (DAS/DTS/FBG interrogation)",
    "Scientific research, spectroscopy and metrology",
  ],

  cta: {
    heading: "Need an ultra-narrow linewidth fiber laser for precision applications?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",
  notes:
    "Techwin offers full customization: wavelength locking, power tuning, phase/frequency control, fiber type selection and complete OEM integration. Each unit is factory-tested for linewidth, stability and environmental performance.",
};

export default singleFrequencyData;