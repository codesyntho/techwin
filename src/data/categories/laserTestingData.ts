// laserTestingData.ts
// Full type definitions + CategoryData object for the Laser Testing and Measurement Systems category
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

export const laserTestingData: CategoryData = {
  url: "/products/testing-systems",

  metaTitle:
    "Laser Testing and Measurement Systems in Hangzhou City| Techwin China",
  metaDescription:
    "Laser testing and measurement systems by Techwin Single Frequency Fiber Laser in Hangzhou City. Call +86-13958180450 for stable, precise and reliable optical evaluation.",

  hero: {
    title: "Laser Testing and Measurement Systems",
    tagline:
      "Precision spectral and noise testing solutions for labs, production and R&D — verify performance before deployment.",
    image: "/category/Laser-Testing-and-Measurement-Systems.jpg",
    imageAlt:
      "Laser testing and measurement system — spectral and noise analyzer units by Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "Laser Testing Systems", href: "/laser-testing-systems" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Testing Brochure", href: "/downloads/laser-testing-brochure.pdf" },
  },

  intro: {
    heading: "Laser Testing and Measurement",
    description:
      "Laser performance evaluation is an essential requirement for research labs, industrial fabrication units, material processing facilities, and scientific institutes. A stable and accurate measurement setup ensures that every laser source functions within its required operational limits. The laser testing solutions on this page provide advanced instruments designed for reliability, precision, and long-term stability across spectral and noise domains.",
  },

  keyFeatures: [
    "High-resolution spectral analysis for linewidth and frequency stability",
    "Wide-band noise detection for phase and intensity noise characterization",
    "Real-time acquisition and data visualization with user-friendly UI",
    "Flexible inputs: fiber-coupled and free-space configurations",
    "Stable internal reference modules and traceable calibration",
    "Rugged mechanical designs for production and laboratory environments",
  ],

  subCategories: [
    {
      id: "spectral-testing-system",
      name: "Spectral Testing System",
      shortDescription:
        "High-resolution spectral analyzer for linewidth, wavelength drift and frequency stability measurements.",
      details:
        "Designed for laboratories and production lines that require precise wavelength and frequency measurement. Key functions include accurate wavelength measurement, linewidth and spectral purity verification, long-term frequency drift monitoring, mode-hopping detection and compatibility with fiber and free-space inputs.",
    },
    {
      id: "noise-testing-system",
      name: "Noise Testing System",
      shortDescription:
        "Dedicated noise tester for relative intensity noise, phase noise and long-term power stability analysis.",
      details:
        "Evaluates short- and long-term noise characteristics critical for high-precision systems. Functions include RIN measurement, phase noise analysis, power stability monitoring, environmental stress testing and frequency noise detection with wide detection bandwidth and high sensitivity.",
    },
  ],

  technicalBenefits: [
    "Accurate linewidth and spectral purity verification for single-frequency lasers",
    "Real-time mode-hopping and frequency drift detection to ensure reliability",
    "High-sensitivity noise floor for precise RIN and phase noise measurements",
    "Stable internal references enabling repeatable, traceable results",
    "Fast acquisition and processing for production throughput",
    "User-friendly interfaces and exportable test reports for QA documentation",
  ],

  applications: [
    "Fiber laser development and production QA",
    "Quantum optics and metrology research",
    "LiDAR system calibration and remote sensing verification",
    "Communication module evaluation and coherent detection testing",
    "Medical device laser calibration and validation",
    "Aerospace and defense laboratory testing",
  ],

  cta: {
    heading:
      "Need reliable spectral or noise testing solutions for your lasers or production line?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",

  notes:
    "Our testing systems are engineered and supported from Hangzhou City. Each instrument is supplied with calibration options, software reporting tools and service support. For pricing, technical datasheets, or customization, contact our engineering team.",
};
