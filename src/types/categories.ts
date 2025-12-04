// src/types/categories.ts

// --- Backend Data Types ---
// These types represent the raw data structure returned by the backend API.

export interface ICloudinaryImage {
  url: string;
  public_id: string;
}

export interface IProductSection {
  type: string;
  content: any;
  // optional helpful fields for chart/table assets that some products provide
  tableCsvUrl?: string;
  graphImageURL?: string;
}

export interface BackendProduct {
  id: string;
  slug: string;
  title: string;
  shortDescription?: string;
  categories: string[];
  images: ICloudinaryImage[];
  specs?: { [key: string]: any };
  sections: IProductSection[];
  price?: number;
  featured?: boolean;
  createdAt: string;
  updatedAt: string;
  // product-level assets (optional)
  tableCsvUrl?: string;
  graphImageURL?: string;
}


// --- Frontend Data Types ---
// These types represent the transformed data structure that frontend components use.

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

export type LogoItem = {
  src: string;
  alt?: string;
  href?: string;
  title?: string;
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
  trustLogos?: LogoItem[];
  counters?: { label: string; value: string }[];
  faqs?: { q: string; a: string }[];
  downloads?: { label: string; href: string; type?: string }[];
  specGroups?: { label: string; rows: { name: string; value: string }[] }[];
};

export interface ProductImage {
  src: string;
  alt?: string;
}

/**
 * Specs helpers — allow both old and new shapes
 */
export type SpecsRow = { name: string; value: string };

export type SpecsBlock = {
  label?: string;
  rows: SpecsRow[];
};

/**
 * ProductSection: widened to accept multiple possible shapes seen in product data files.
 * - accepts 'rows' (legacy)
 * - accepts 'blocks' (grouped specs)
 * - accepts 'specGroups' or 'groups' (alternate naming)
 */
export interface ProductSection {
  type: "text" | "features" | "specs" | "comparison" | string; // keep flexible
  heading?: string;
  content?: string;
  image?: ProductImage;
  bullets?: string[];

  // specs-related — accept many possible shapes to avoid TS errors when product files vary
  rows?: SpecsRow[];                       // legacy flat rows
  blocks?: SpecsBlock[];                   // grouped blocks (your "blocks" variant)
  specGroups?: SpecsBlock[];               // alternate name used in some files
  groups?: SpecsBlock[];                   // another alternate name
  // help for comparison tables
  comparisonTable?: {
    headers: string[];
    rows: (string | { text: string; highlight?: boolean })[][];
  };

  // optional chart/table assets for this section
  tableCsvUrl?: string;
  graphImageURL?: string;
}

export interface FrontendProduct {
  slug: string;
  category: string;
  published?: boolean;
  featured?: boolean;
  meta: {
    title: string;
    description: string;
    keywords?: string;
  };
  title: string;
  shortDescription: string;

  heroImage: ProductImage;
  galleryImages: ProductImage[];

  // make previewImageSrc accept both string and ProductImage
  previewImageSrc?: string | ProductImage;

  // datasheet file URL (PDF, etc.)
  datasheetUrl?: string;

  tableData?: {
    headers: string[];
    rows: string[][];
    title?: string;
    caption?: string;
  };
  
  // datasheet preview image (980 × 320) - separate from datasheetUrl
  datasheetImageSrc?: string | ProductImage;

  sections: ProductSection[];
  relatedProducts?: {
    slug: string;
    title: string;
    shortDescription: string;
    image: ProductImage;
    href: string;
  }[];

  // optional product-level assets
  tableCsvUrl?: string;
  graphImageURL?: string;
}

// Alias for clarity
export type Product = FrontendProduct;
export type Category = CategoryData
