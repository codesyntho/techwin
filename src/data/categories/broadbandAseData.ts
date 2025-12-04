// broadbandAseData.ts
// If you already have CategoryData / supporting types, import them instead of duplicating.
// Example: import { CategoryData } from "@/types";

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
export type IntroData = { heading: string; description: string };
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

export const broadbandAseData: CategoryData = {
  url: "/products/broadband-ase-sources",
  metaTitle: "Broadband & ASE Light Sources | Techwin - Single Frequency Fiber Laser",
  metaDescription:
    "Broadband & ASE Light Sources by Techwin - Single Frequency Fiber Laser in Hangzhou City, offering stable optical performance for research and industry. Call +86-13958180450.",

  hero: {
    title: "Broadband & ASE Light Sources – High-Performance Solutions",
    tagline:
      "Stable spectral output and low-noise broadband illumination for testing, sensing, imaging and photonics research.",
    image: "/category/Broadband-ASE-Sources.jpg",
    imageAlt: "Broadband ASE light source module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Broadband & ASE Sources", href: "/broadband-ase-sources" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Brochure", href: "/downloads/broadband-ase-brochure.pdf" },
  },

  intro: {
    heading: "Broadband and ASE Light Sources",
    description:
      "Techwin presents a complete range of broadband & ASE light sources engineered for research, industrial testing, fiber sensing and biomedical imaging. These systems provide stable, low-coherence optical illumination with low noise and dependable spectral uniformity across 1.0 µm, 1.5 µm and 2.0 µm bands.",
  },

  keyFeatures: [
    "Wide spectral bandwidth with stable, repeatable output",
    "Low relative intensity noise (RIN) and noise-optimized performance",
    "Compact, robust mechanical design for lab and field use",
    "Precise spectral shaping and configurable wavelength bands",
    "Easy integration with fiber-coupled or free-space setups",
    "Long-term stability and calibrated performance",
  ],

  subCategories: [
    {
      id: "broadband-light-source",
      name: "Broadband Light Source",
      shortDescription:
        "Wideband, low-coherence illumination for component testing, OCT, interferometry and fiber sensing.",
      details:
        "Engineered to deliver smooth, uniform spectral coverage and low coherence length for applications requiring high measurement repeatability and low speckle artifacts.",
    },
    {
      id: "ase-light-source-1um",
      name: "ASE Light Source (1.0 µm)",
      shortDescription:
        "Stable ASE emission around 1.0 µm for fiber component analysis, sensing and telecom testbeds.",
      details:
        "Compact ASE module offering high spectral stability and low noise, ideal for fiber sensor interrogation and optical measurement setups working near 1.0 µm.",
    },
    {
      id: "ase-light-source-1.5um",
      name: "ASE Light Source (1.5 µm)",
      shortDescription:
        "Telecom-grade ASE source for FBG testing, DAS/DTS development and lab calibration.",
      details:
        "Provides a wide spectral profile, low amplitude noise and long-term stability—commonly used in telecom testing and distributed sensing environments.",
    },
    {
      id: "ase-light-source-2um",
      name: "ASE Light Source (2.0 µm)",
      shortDescription:
        "Mid-IR ASE module for specialty sensing, component characterization and research applications.",
      details:
        "Designed for mid-infrared testbeds with robust thermal control and stable broadband emission for component-level evaluation and R&D workflows.",
    },
    {
      id: "sled-light-source",
      name: "Super Luminescent LED (SLED)",
      shortDescription:
        "Broadband SLED modules offering wide bandwidth, low coherence and long operational lifetime for OCT and imaging.",
      details:
        "SLED devices combine wide spectral output with low speckle and long lifetime—perfect for OCT imaging, fiber sensing and spectral calibration tasks.",
    },
  ],

  technicalBenefits: [
    "Low coherence length and spectrally smooth output for interference-based systems.",
    "Noise-optimized architecture for improved measurement SNR.",
    "Configurable spectral shaping and bandwidth options.",
    "High mechanical and thermal stability for continuous operation.",
    "Fiber-coupled outputs, connector choices and integration-ready modules.",
    "Factory calibration and traceable spectral characterization.",
  ],

  applications: [
    "Optical component testing and characterization",
    "Fiber sensing (FBG interrogation, DAS/DTS)",
    "Optical coherence tomography (OCT) and biomedical imaging",
    "Telecommunication testing and calibration",
    "Material inspection and spectral analysis",
    "Academic and industrial photonics R&D",
  ],

  cta: {
    heading: "Need stable broadband illumination or ASE sources for testing or imaging?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",
  notes:
    "Products are available across 1.0 µm, 1.5 µm and 2.0 µm bands. Custom spectral shaping, fiber output options, and calibrated units are offered. Contact Techwin for datasheets, integration support and OEM configurations.",
};
