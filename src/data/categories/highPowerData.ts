// types.ts
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
  details?: string; // longer description (optional)
};

export type CategoryData = {
  // routing & SEO
  url: string;
  metaTitle: string;
  metaDescription: string;

  // page content
  hero: HeroData;
  intro: IntroData;
  keyFeatures: string[]; // short bullets
  subCategories: SubCategoryItem[];
  technicalBenefits: string[]; // deeper bullets
  applications: string[]; // list of application strings
  cta: {
    heading?: string;
    primary: { label: string; href: string; external?: boolean };
    secondary?: { label: string; href: string; external?: boolean } | null;
  };
  // optional: notes, support contact
  contactPhone?: string;
  notes?: string;
};

// highPowerData.ts
export const highPowerData: CategoryData = {
  url: "/products/high-power-fiber-lasers",
  metaTitle: "High Power Single-Frequency Fiber Lasers | Techwin Industrial Manufacturer",
  metaDescription:
    "Techwin manufactures high power single-frequency fiber lasers in Hangzhou City. Call +86-13958180450 for reliable industrial laser exporter solutions and global delivery.",

  hero: {
    title: "High Power Single-Frequency Fiber Lasers",
    tagline:
      "High precision, high-power single-frequency fiber lasers engineered for industrial, scientific, and long-range sensing applications.",
    image: "/category/High-Power-Single-Frequency-Fiber-Lasers.jpg",
    imageAlt: "High-power single-frequency fiber laser module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "High-Power Fiber Lasers", href: "/high-power-fiber-lasers" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download Datasheet", href: "/downloads/high-power-datasheet.pdf", external: false },
  },

  intro: {
    heading: "High Power Single-Frequency Fiber Lasers",
    description:
      "High precision industries rely on high power fiber laser systems for demanding applications that require exceptional beam quality, stability, and narrow linewidth. The High-Power Single-Frequency Fiber Lasers from Techwin are designed to deliver outstanding optical performance with superior reliability, ideal for industrial, scientific, and research environments.",
  },

  keyFeatures: [
    "Excellent beam quality with single-frequency operation and high spectral purity",
    "High output power suitable for long-distance and high-intensity applications",
    "Low noise and narrow linewidth for high-resolution sensing and measurement",
    "Compact, rack-mountable and reliable industrial design",
    "Available at 1.0 µm, 1.5 µm and 2.0 µm wavelength bands",
    "Efficient thermal management for continuous operation",
  ],

  subCategories: [
    {
      id: "kilowatt-level-fiber-laser-combustion-diagnostics",
      name: "Kilowatt-Level Fiber Laser for Combustion Diagnostics",
      shortDescription:
        "High-power CW/kilowatt fiber laser optimized for combustion and plasma diagnostics with stable continuous output for real-time analysis.",
      details:
        "Designed for high-temperature measurement and real-time observation of combustion phenomena. Provides stable continuous power and thermal control to enable precision analysis of dynamic flame characteristics.",
    },
    {
      id: "high-power-cw-single-frequency-fiber-laser-1um",
      name: "High-Power CW Single-Frequency Fiber Laser (1.0 µm)",
      shortDescription:
        "Versatile high-power 1.0 µm single-frequency system for interferometry, remote sensing, and industrial research.",
      details:
        "Narrow linewidth and low RIN make it suitable for high-resolution interferometry, seeding amplifiers, and long-range sensing platforms.",
    },
    {
      id: "high-power-cw-single-frequency-fiber-laser-1-5um",
      name: "High-Power CW Single-Frequency Fiber Laser (1.5 µm)",
      shortDescription:
        "High-power 1.5 µm single-frequency source tailored for telecom-grade and distributed sensing systems.",
      details:
        "Optimized for 1550 nm ecosystems: communications research, frequency standards and distributed sensing with robust thermal and spectral stability.",
    },
    {
      id: "high-power-cw-single-frequency-fiber-laser-2um",
      name: "High-Power CW Single-Frequency Fiber Laser (2.0 µm)",
      shortDescription:
        "Mid-IR single-frequency high-power laser for gas detection, environmental monitoring and specialty industrial use.",
      details:
        "Provides strong absorption characteristics useful in gas sensing, material inspection and defense applications requiring mid-IR wavelengths.",
    },
    {
      id: "long-distance-high-resolution-lidar-fiber-laser",
      name: "Long-Distance High-Resolution LiDAR Fiber Laser",
      shortDescription:
        "High-stability laser source engineered for long-range, high-resolution LiDAR and remote mapping systems.",
      details:
        "Delivers narrow linewidth and excellent power stability to maximize detection range and resolution in geospatial and airborne LiDAR systems.",
    },
  ],

  technicalBenefits: [
    "Stable single-longitudinal-mode operation for ultra-narrow linewidth performance",
    "Low phase and intensity noise enabling coherent detection and Doppler measurement",
    "Scalable output power from laboratory watt-class to industrial kilowatt-class",
    "Modular architecture for easy integration and serviceability",
    "Advanced thermal management and back-reflection protection",
    "Customizable control interfaces for OEM integration and remote monitoring",
  ],

  applications: [
    "Combustion and plasma diagnostics",
    "Optical communications and coherent detection",
    "Long-range LiDAR and remote sensing",
    "Precision material processing and micro-machining",
    "Laser-based spectroscopy and metrology",
    "Interferometry and coherent detection systems",
  ],

  cta: {
    heading: "Ready to scale your optical system with high-power single-frequency lasers?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",
  notes:
    "Customization available: output power (W → kW), wavelength selection, narrow linewidth tuning, rack/bench configurations and integrated monitoring solutions.",
};
