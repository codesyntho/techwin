import { Product } from "@/types/categories";

export const broadbandUltraLowNoise: Product = {
  slug: "broadband-low-noise",
  category: "single-frequency-fiber-lasers",
  tableCsvUrl: "https://docs.google.com/spreadsheets/d/1dray0_tpQpYOvnh-88lwq-Ejo1bUlKtECY9qyasZS4o/export?format=csv&gid=1678635405",


  meta: {
    title: "Broadband Fiber Laser Ultra-Low Noise | Techwin China Manufacturer",
    description:
      "Techwin – single frequency fiber laser systems offering broadband ultra-low noise laser solutions in Hangzhou City. For technical details or support, call +86-13958180450.",
    keywords: "broadband fiber laser, ultra-low noise laser, single-frequency fiber laser, broadband low-noise source",
  },

  title: "Broadband Ultra‑Low Noise Single‑Frequency Fiber Laser",

  shortDescription:
    "Broadband fiber laser series delivering ultra-low noise, wide spectral output and high stability for spectroscopy, metrology, coherent detection and optical sensing.",

  heroImage: { src: "/products/single-frequency/broadband-low-noise/hero.jpg",
    alt: "Broadband Ultra-Low Noise Fiber Laser",
  },
  graphImageURL: "/products/single-frequency/broadband-low-noise/graph.jpg",

  galleryImages: [
      { src: "/single-frequency/broadband-low-noise/preview.jpg", alt: "Broadband ultra-low-noise fiber laser preview" },
      { src: "/single-frequency/broadband-low-noise/hero.jpg", alt: "Broadband ultra-low-noise fiber laser hero" },
    ],
  
  datasheetUrl: "/products/single-frequency/broadband-low-noise/datasheet.jpg",
  datasheetImageSrc: "/products/single-frequency/broadband-low-noise/datasheet.jpg",
  previewImageSrc: "/products/single-frequency/broadband-low-noise/preview.jpg",

  sections: [
    {
      type: 'text',
      heading: "Broadband Fiber Laser Technology",
      image: { src: "/single-frequency/broadband-technology.jpg", alt: "broadband tech" },
      content: `A broadband fiber laser emits light across a wider spectral range while maintaining high output stability and minimal noise. Unlike narrowband lasers, these sources preserve coherence and low frequency drift across their spectrum, making them ideal for precision measurement and sensing.`,
    },
    {
      type: 'features',
      heading: "Importance of Ultra‑Low Noise Performance",
      bullets: [
        "Minimizes amplitude fluctuations",
        "Reduces frequency instability",
        "Lowers phase noise",
        "Prevents interference artifacts",
      ],
    },
    {
      type: 'features',
      heading: "Key Advantages",
      bullets: [
        "Stable, wide spectral output",
        "Very low phase noise",
        "Long operational life",
        "Compact, integrable design",
      ],
    },
    {
      type: 'specs',
      heading: "Technical Specifications Overview",
    },
  ],

  relatedProducts: [
    { slug: "broadband-low-noise", title: "Hz-Level Ultra-Narrow Linewidth Single-Frequency Fiber Laser", shortDescription: "A Hz-level ultra-narrow linewidth single-frequency fiber laser.", image: { src: "/single-frequency/ultra-narrow-linewidth.jpg", alt: "ultra narrow" }, href:"/single-frequency/broadband-low-noise/" },
    // Assuming low-noise-1550.ts exists
    { slug: "broadband-low-noise", title: "Low‑Noise 1550nm Laser", shortDescription: "A low noise 1550nm laser", image: { src: "/single-frequency/ln1550.jpg", alt: "low noise" }, href: "/single-frequency/broadband-low-noise/" },
  ],
};

export default broadbandUltraLowNoise;
