
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

// ---------------------------------------------------------------------------
// SLED (Super Luminescent LED) category data
// ---------------------------------------------------------------------------

export const sledLightData: CategoryData = {
  url: "/products/sled-light-sources",

  metaTitle:
    "Super luminescent LED (SLED) Light Source Solutions | Techwin China",
  metaDescription:
    "Super luminescent LED (SLED) solutions by Techwin in Hangzhou City. Call +86-13958180450 for stable, accurate and high-performance optical SLED light source systems for professional use.",

  hero: {
    title: "Super Luminescent LED (SLED) Solutions – High-Stability SLED Light Source",
    tagline:
      "Stable broadband illumination and low-coherence SLED modules for OCT, sensing and precision photonics.",
    image: "/category/Point-Light-Source-Solutions.jpg",
    imageAlt: "Super luminescent LED (SLED) light source module — Techwin",
    breadcrumb: [
      { label: "Home", href: "/" },
      { label: "Products", href: "/products" },
      { label: "SLED Light Sources", href: "/sled-light-sources" },
    ],
    ctaPrimary: { label: "Request Quote", href: "/contact" },
    ctaSecondary: { label: "Download SLED Brochure", href: "/downloads/sled-brochure.pdf" },
  },

  intro: {
    heading: "Super Luminescent LED (SLED) Solutions – High-Stability SLED Light Source",
    description:
      "Super luminescent LED (SLED) technology provides broadband, low-coherence illumination ideal for interferometry, fiber sensing and OCT imaging. Techwin supplies stable SLED modules across 1.0 µm, 1.5 µm and 2.0 µm bands with integrated drive electronics and thermal control for professional research and industrial use. This page is managed and supported by techwin – single frequency fiber laser, well-known for optical manufacturing quality in Hangzhou City.",
  },

  keyFeatures: [
    "Broad spectral emission with stable spectral shape",
    "Low coherence length and reduced speckle noise",
    "High output stability over extended operation",
    "Compact, fiber-coupled packages for easy integration",
    "Advanced thermal and current control for spectral stability",
    "Long operational lifetime and low maintenance",
  ],

  subCategories: [
    {
      id: "point-light-source-1um",
      name: "1.0 µm Point Light Source",
      shortDescription:
        "Broadband 1.0 µm SLED modules for fiber sensing, OCT and lab testing with high output and stable spectral profile.",
      details:
        "1.0 µm SLED systems deliver wide spectral bandwidth, strong output power and integrated thermal control. Ideal for precision metrology, sensor networks and component inspection where low coherence and stable illumination are required.",
    },
    {
      id: "point-light-source-1_5um",
      name: "1.5 µm Point Light Source",
      shortDescription:
        "Telecom-compatible 1.5 µm SLED modules optimized for fiber-based systems, distributed sensing and long-distance testing.",
      details:
        "1.5 µm SLED models offer optimal performance for fiber-optic environments, with low attenuation in fiber, stable spectral distribution and narrow power fluctuations—used widely in DAS/DTS, FBG interrogation and telecom research.",
    },
    {
      id: "point-light-source-2_0um",
      name: "2.0 µm Point Light Source",
      shortDescription:
        "Mid-IR 2.0 µm SLED solutions for specialized sensing, gas detection and material analysis with controlled noise and stable broadband output.",
      details:
        "2.0 µm SLED devices target mid-IR sensing and specialized industrial applications. They provide wide bandwidth, stable emission and robust thermal management for long-term operational reliability in research and industrial settings.",
    },
  ],

  technicalBenefits: [
    "Low coherence length minimizing interference artifacts",
    "Stable spectral profile with integrated temperature/current control",
    "Low speckle and predictable noise behavior for imaging",
    "Compact, fiber-coupled packages with multiple connector options",
    "Long lifetime diode architecture with high reliability",
    "Custom wavelength and bandwidth tuning available on request",
  ],

  applications: [
    "Optical coherence tomography (OCT) and biomedical imaging",
    "Fiber Bragg grating (FBG) interrogation and distributed sensing",
    "Interferometric testing and high-resolution measurement",
    "Optical spectrum testing and component characterization",
    "Material inspection and spectral analysis",
    "R&D and academic photonics experiments",
  ],

  cta: {
    heading: "Need a reliable SLED light source for imaging, sensing or testing?",
    primary: { label: "Request a Quote", href: "/contact" },
    secondary: { label: "Contact Sales", href: "tel:+8657188284299" },
  },

  contactPhone: "+86-571-88284299",

  notes:
    "SLED products include integrated drive electronics and thermal control. Custom options: fiber connector type, bandwidth trimming, output power levels and calibrated spectral reports. All units are tested for spectral stability and long-term reliability.",
};
