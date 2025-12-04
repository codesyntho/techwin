// wavelengthConversionData.ts
// -------------------------------------------------------------
// FULL TYPE DEFINITIONS (as you required)
// -------------------------------------------------------------

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

// -------------------------------------------------------------
// WAVELENGTH CONVERSION CATEGORY DATA
// -------------------------------------------------------------

export const wavelengthConversionData: CategoryData = {
  url: "/products/wavelength-conversion-lasers",

  metaTitle: "Wavelength Conversion Laser Solutions in Hangzhou City| Techwin China",
  metaDescription:
    "Wavelength Conversion Laser Solutions for UV, Visible & IR Applications by Techwin – single frequency fiber laser in Hangzhou City. Contact +86-13958180450 for details.",

  hero: {
    title: "Wavelength Conversion Laser Solutions – High-Precision Performance",
    tagline:
      "Reliable wavelength conversion systems (UV / Visible / IR) for spectroscopy, lithography, imaging and precision research.",
    image: "/category/Wavelength-Conversion-Laser-Solutions-High-Precision-Performance.jpg",
    imageAlt: "Wavelength conversion laser system producing UV and visible output — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Wavelength Conversion", href: "/wavelength-conversion" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: {
      label: "Download Brochure",
      href: "/downloads/wavelength-conversion-brochure.pdf",
    },
  },

  intro: {
    heading: "What Is a Wavelength Conversion Laser?",
    description:
      "A wavelength conversion laser system outputs wavelengths different from the fundamental source by using nonlinear optical processes such as SHG, THG and frequency mixing. Techwin’s wavelength conversion family delivers narrow-linewidth, low-noise UV, visible and IR outputs for demanding scientific, industrial and biomedical applications.",
  },

  keyFeatures: [
    "Stable frequency conversion efficiency with low drift",
    "Narrow linewidth outputs for high-precision measurements",
    "Precise wavelength tuning across UV / visible / near-IR bands",
    "Rugged construction for continuous laboratory and industrial use",
    "High durability components for long-term operation",
    "Custom configurations for OEM integration and research requirements",
  ],

  subCategories: [
    {
      id: "193nm-wavelength-conversion-laser",
      name: "193 nm Wavelength Conversion Laser",
      shortDescription:
        "Deep-UV 193 nm system used for semiconductor lithography, micro-fabrication and advanced photochemistry.",
      details:
        "Provides extremely short wavelength and high photon energy for precision lithography, thin-film measurement, UV photochemistry and surface testing applications.",
    },
    {
      id: "266nm-wavelength-conversion-laser",
      name: "266 nm Wavelength Conversion Laser",
      shortDescription:
        "High-stability 266 nm UV laser for spectroscopy, micro-marking and forensic material analysis.",
      details:
        "Engineered for narrow-linewidth 266 nm output suitable for Raman spectroscopy, UV fluorescence studies, forensic tests and high-precision micro-marking.",
    },
    {
      id: "355nm-wavelength-conversion-laser",
      name: "355 nm Wavelength Conversion Laser",
      shortDescription:
        "Balanced UV 355 nm laser ideal for micromachining, PCB marking, medical device manufacturing and fluorescence excitation.",
      details:
        "Delivers clean UV output with high beam stability for micromachining, marking, non-contact processing and UV fluorescence research.",
    },
    {
      id: "532nm-wavelength-conversion-laser",
      name: "532 nm Wavelength Conversion Laser",
      shortDescription:
        "Stable 532 nm green laser widely used for imaging, alignment, holography and fluorescence excitation.",
      details:
        "Narrow-linewidth green beam ideal for alignment, biological imaging, holography and laboratory optical setups requiring stable visible wavelengths.",
    },
    {
      id: "780nm-wavelength-conversion-laser",
      name: "780 nm Wavelength Conversion Laser",
      shortDescription:
        "Near-IR 780 nm source used in atomic physics, rubidium experiments, spectroscopy and quantum optics.",
      details:
        "Highly stable 780 nm output optimized for rubidium optical pumping, precision spectroscopy and quantum optical experiments.",
    },
    {
      id: "795nm-wavelength-conversion-laser",
      name: "795 nm Wavelength Conversion Laser",
      shortDescription:
        "795 nm IR source for D1 Rb spectroscopy, metrology, nonlinear optics and frequency reference systems.",
      details:
        "Provides stable narrow-linewidth 795 nm emission used in D1 rubidium transitions, metrology setups, quantum optics and frequency stabilization.",
    },
  ],

  technicalBenefits: [
    "Narrow-linewidth UV / visible / IR operation",
    "Low-noise stabilized frequency conversion",
    "Precision wavelength tuning and calibration",
    "Robust thermal design minimizing drift over long use",
    "High conversion efficiency with superior optical engineering",
    "Traceable QC: wavelength, power and stability testing reports included",
  ],

  applications: [
    "Semiconductor inspection & lithography (193 nm / 266 nm / 355 nm)",
    "Raman spectroscopy & material testing",
    "Micromachining & precision micro-processing",
    "Fluorescence imaging & biological applications",
    "Optical pumping & atomic physics",
    "Quantum optics & nonlinear optical research",
  ],

  cta: {
    heading: "Need UV, Visible, or IR wavelength conversion laser solutions?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Call Now", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",

  notes:
    "Custom wavelength, power, beam quality and packaging options available. All units pass linewidth, power and stability tests before shipping. Contact Techwin for integration support and OEM builds.",
};
