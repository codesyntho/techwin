import { Product } from "@/types/categories";

export const oneMicronSingleFrequencyFiberLaser: Product = {
  slug: "1um",
  category: "single-frequency-fiber-lasers",

  meta: {
    title: "Techwin 1.0 µm Single-Frequency Fiber Laser | High Stability Systems",
    description:
      "High-stability 1.0 µm Single-Frequency Fiber Laser systems by Techwin in Hangzhou City. Precision design, narrow linewidth, reliable output. Call +86-13958180450.",
    keywords:
      "1.0 µm fiber laser, single-frequency fiber laser, narrow linewidth 1.0um, high stability fiber laser, Techwin 1.0um laser",
  },

  title: "1.0 µm Single-Frequency Fiber Laser",
  shortDescription:
    "The 1.0 μm ultra-narrow linewidth fiber laser is a laser with completely independent intellectual property rights and internationally advanced performance. It employs a special resonant cavity structure design, combined with noise suppression and linewidth narrowing technology, to achieve ultra-narrow linewidth laser output down to the kHz level. Product features: ultra-narrow linewidth; no mode hopping, no burst noise; high side-mode suppression ratio; low relative intensity noise  good vibration resistance and high/low temperature performance. Applications: gravitational wave detection; fiber optic sensing; underwater hydrophones; lidar; coherent communication; quantum precision measurement.",

  heroImage: { src: "/products/single-frequency/1um/hero.jpg",
    alt: "1.0 µm Single-Frequency Fiber Laser",
  },
  

  galleryImages: [
      { src: "/products/single-frequency/1um/hero1.jpg", alt: "1.0µm single-frequency fiber laser preview" },
      { src: "/products/single-frequency/1um/hero1.jpg", alt: "1.0µm single-frequency fiber laser hero" },
    ],

  datasheetUrl: "/products/single-frequency/1um/datasheet.jpg",
  datasheetImageSrc: "/products/single-frequency/1um/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/1um/preview.jpg",

  sections: [
    {
      type: "text",
      heading: "Overview of the 1.0 µm Wavelength Range",
      image: { src: "/single-frequency/1um-overview.jpg", alt: "1.0 µm overview" },
      content:
        "The 1.0 µm region is widely used in LIDAR, sensing, metrology and material characterization. Techwin’s 1.0 µm single-frequency systems deliver narrow linewidth, excellent coherence and stable output required for long-distance and high-precision tasks.",
    },

    {
      type: "features",
      heading: "Key Performance Features",
      bullets: [
        "Narrow linewidth output (kHz-level or better, model dependent)",
        "Low intensity and phase noise for high SNR",
        "High beam quality (M² near 1) for precise coupling",
        "Robust thermal and vibration-resistant design",
        "Long-term operational reliability for continuous use",
      ],
    },

    {
      type: "text",
      heading: "Design Architecture",
      content:
        "Compact fiber-based architecture using single-frequency cavities, integrated isolators, high-performance FBGs and active thermal stabilization to ensure single longitudinal mode operation with minimal spectral drift.",
    },

    {
      type: "features",
      heading: "Technical Advantages",
      bullets: [
        "Long coherence length for precision metrology",
        "Reliable frequency control suitable for coherent LIDAR and seismic sensing",
        "Efficient power stability across varying conditions",
        "Customizable linewidth and power configurations",
      ],
    },

    {
      type: "text",
      heading: "Applications",
      content:
        "The 1.0 µm single-frequency series supports distributed fiber sensing (DAS/DTS/BOTDR/BOTDA), coherent LIDAR, optical metrology, atomic and molecular experiments, telecom research and industrial measurement systems.",
    },

    {
      type: "features",
      heading: "Integration & Environmental Tolerance",
      bullets: [
        "Analog and digital control interfaces (optional Ethernet/Serial)",
        "Easy fiber-optic coupling and OEM-ready modules",
        "Temperature regulation and mechanical rigidity for field deployment",
        "Low maintenance requirements and long MTBF",
      ],
    },

    {
      type: "text",
      heading: "Service, Support & Ordering",
      content:
        "Techwin provides technical consultation, integration guidance, calibration, warranty support and configurable options. When ordering please specify wavelength, output power, linewidth requirements and package type to match your system needs.",
    },
  ],

  relatedProducts: [
    {
      slug: "1um",
      title: "Narrow Linewidth Fiber Laser",
      shortDescription: "Stable kHz-level narrow-linewidth laser.",
      image: { src: "/single-frequency/narrow-linewidth-hero.jpg", alt: "Narrow Linewidth Fiber Laser" },
      href: "/single-frequency/1um/",
    },
    {
      slug: "1um",
      title: "Hz-Level Ultra-Narrow Linewidth Fiber Laser",
      shortDescription: "Hz-level ultra-narrow linewidth single-frequency fiber laser.",
      image: { src: "/single-frequency/ultra-narrow-linewidth.jpg", alt: "Ultra Narrow Linewidth Fiber Laser" },
      href: "/single-frequency/1um/",
    },
  ],
};

export default oneMicronSingleFrequencyFiberLaser;
