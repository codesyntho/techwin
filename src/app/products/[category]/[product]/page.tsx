// src/app/products/[category]/[product]/page.tsx
import React from "react";
import { notFound } from "next/navigation";

import {
  getAllProductPaths,
  getProductData,
  getAllProducts,
} from "@/lib/products";

import ProductDetailHero from "@/components/products/ProductDetailHero";
import ProductGallery from "@/components/products/ProductGallery";
import ProductSpecs from "@/components/products/ProductSpecs";
import ProductDescription from "@/components/products/ProductDescription";
import ProductTabs from "@/components/products/ProductTabs";
import DownloadAndDatasheet from "@/components/products/DownloadAndDatasheet";
import RelatedProducts from "@/components/products/RelatedProducts";
import RequestQuote from "@/components/products/RequestQuote";
import Breadcrumbs from "@/components/products/Breadcrumbs";
import ProductComparisonTable from "@/components/products/ProductComparisonTable";
import { Product } from "@/types/categories";
import Image from "next/image";
import { Download, ArrowRight } from "lucide-react";
import CompactProductPanel from "@/components/products/CompactProductPanel";
import ProductGraphsAndTableSection from "@/components/products/ProductGraphsAndTableSection";

export async function generateStaticParams() {
  return getAllProductPaths();
}

/**
 * Helper: normalize possible image shapes into a string src.
 * Accepts: string, { src, alt }, undefined, null
 */
function resolveImgSrc(img?: any): string | undefined {
  if (!img) return undefined;
  if (typeof img === "string") return img;
  if (typeof img === "object" && img.src) return img.src;
  return undefined;
}

export default async function ProductPage({
  params,
}: {
  params:
    | Promise<{ category: string; product: string }>
    | { category: string; product: string };
}) {
  const resolved = await params;
  const { category, product } =
    resolved || ({} as { category?: string; product?: string });

  const productData = await getProductData(category, product);

  if (!productData) {
    notFound();
  }

  const p: Product = productData;

  const heroProps = {
    title: p.title,
    description: p.shortDescription,
    // If the product exposes a gallery, prefer that so the hero becomes a slider.
    image:
      (p as any).galleryImages && (p as any).galleryImages.length
        ? (p as any).galleryImages
        : p.heroImage,
    ctas: [
      { label: "Request Quote", href: "#request-quote" },
      { label: "Download Datasheet", href: p.datasheetUrl || "#" },
    ],
  };

  const specSummary = {
    Bandwidth: "Wide-spectrum (multi-λ)",
    Coherence: "Low coherence (OCT-ready)",
    Stability: "Long-term stable output",
    Form: "Compact, integration-ready",
  };

  const crumbs = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    {
      label: category
        .replace(/-/g, " ")
        .replace(/\b\w/g, (c: string) => c.toUpperCase()),
      href: `/products/${category}`,
    },
    { label: p.title },
  ];

  const specsForTable =
    p.sections
      .find((s) => s.type === "specs")
      ?.specGroups?.[0].rows.reduce(
        (acc: Record<string, any>, row: any) => ({
          ...acc,
          [row.name]: row.value,
        }),
        {}
      ) ?? {};

  // Fetch full product catalogue for the "all categories & products" block (small sitemap-like block)
  let allProductsByCategory: Record<string, { slug: string; title: string }[]> =
    {};
  try {
    const allProducts = await getAllProducts(); // { category: string, products: Array<{slug,title}> }[]
    allProductsByCategory = allProducts.reduce((acc, item) => {
      acc[item.categorySlug] = item.products;
      return acc;
    }, {} as Record<string, { slug: string; title: string }[]>);
  } catch (err) {
    allProductsByCategory = {};
  }

  // Determine a datasheet image source for ProductTabs:
  // Priority:
  // 1) p.datasheetImageSrc
  // 2) p.previewImageSrc
  // 3) p.datasheet?.preview (if your product structure uses nested datasheet preview)
  // 4) p.heroImage (fallback)
  const datasheetImageCandidate =
    resolveImgSrc((p as any).datasheetImageSrc) ||
    resolveImgSrc((p as any).previewImageSrc) ||
    resolveImgSrc((p as any).datasheet?.preview) ||
    resolveImgSrc(p.heroImage);

  // Also prepare a safe hero src for the Downloads tab area
  const safeHeroSrc =
    resolveImgSrc(p.heroImage) ??
    resolveImgSrc(p.previewImageSrc) ??
    "/products/Single-Frequency-Fiber-Lasers/ultra-narrow-linewidth.jpg";
  const safeHeroSrcEncoded = safeHeroSrc ? encodeURI(safeHeroSrc) : safeHeroSrc;

  return (
    <main className="bg-white min-h-screen">
      <div className="container mx-auto px-6 pt-8">
        <Breadcrumbs items={crumbs} />
      </div>

      <ProductDetailHero {...heroProps} />

      <ProductGraphsAndTableSection
        graphImageURL={p.graphImageURL}
        tableCsvUrl={p.tableCsvUrl}
        tableData={p.tableData}
      />

      <div className="lg:col-span-7">
        <CompactProductPanel
          product={p}
          specSummary={specSummary}
          contactEmail="sales@techwin.example"
        />
      </div>

      {/* Pass all sections to the enhanced ProductDescription component */}
      <ProductDescription
        sections={p.sections}
        previewImageSrc={p.previewImageSrc}
      />

      {/* Data-driven Product Tabs */}
      <ProductTabs
        tabs={(() => {
          const TABS: {
            id: string;
            label: string;
            icon?: string;
            content: React.ReactNode;
          }[] = [];

          // Overview Tab
          TABS.push({
            id: "overview",
            label: "Overview",
            icon: "overview",
            content: (
              <p className="text-lg leading-relaxed">{p.shortDescription}</p>
            ),
          });

          // Specs Tab
          if (Object.keys(specsForTable).length > 0) {
            TABS.push({
              id: "specifications",
              label: "Specifications",
              icon: "specifications",
              content: (
                <ProductSpecs
                  specs={specsForTable}
                  datasheetUrl={p.datasheetUrl}
                />
              ),
            });
          }

          // Comparison Tab
          const comparisonSection = p.sections.find(
            (s) => s.type === "comparison"
          );
          if (comparisonSection) {
            TABS.push({
              id: "comparison",
              label: "Comparison",
              icon: "comparison",
              content: <ProductComparisonTable section={comparisonSection} />,
            });
          }

          // Applications Tab
          const applicationsSection = p.sections.find((s) =>
            (s.heading || "").toLowerCase().includes("application")
          );
          if (applicationsSection) {
            TABS.push({
              id: "applications",
              label: "Applications",
              icon: "applications",
              content: (
                <div className="space-y-4">
                  <p>{applicationsSection.content}</p>
                  <ul className="list-disc pl-5 space-y-2">
                    {applicationsSection.bullets?.map(
                      (b: string, i: number) => (
                        <li key={i}>{b}</li>
                      )
                    )}
                  </ul>
                </div>
              ),
            });
          }

          // Downloads Tab with rich content
          // TABS.push({
          //   id: "downloads",
          //   label: "Downloads",
          //   icon: "downloads",
          //   content: (
          //     <div className="space-y-8">
          //       <div>
          //         <h3 className="text-2xl font-bold text-white mb-4">{p.title} — Downloads</h3>
          //         <p>Download technical datasheets, view application notes, and access CAD files to integrate our laser into your setup.</p>
          //       </div>
          //       <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
          //         <div className="lg:col-span-2 w-full h-64 relative rounded-lg overflow-hidden">
          //           {safeHeroSrcEncoded ? (
          //             <Image src={safeHeroSrcEncoded} alt={p.title || "Product Preview"} fill sizes="(max-width: 1024px) 100vw, 40vw" className="object-cover" />
          //           ) : (
          //             <div className="w-full h-full bg-gray-200" />
          //           )}
          //         </div>
          //         <div className="lg:col-span-3">
          //           <h4 className="text-xl font-semibold text-white mb-2">Main Datasheet</h4>
          //           <p className="text-gray-300 text-sm mb-4">{p.slug}-datasheet.pdf</p>
          //           <a href={p.datasheetUrl} download className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold bg-[#00a9e0] text-white transition-transform hover:scale-105">
          //             <Download size={18} />
          //             Download
          //           </a>
          //         </div>
          //       </div>
          //       <div>
          //         <h4 className="text-xl font-semibold text-white mb-4 mt-6">Additional Resources</h4>
          //         <div className="space-y-3">
          //           <a href="#" className="flex justify-between items-center p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
          //             <span>Application Note: Sensing</span>
          //             <ArrowRight />
          //           </a>
          //           <a href="#" className="flex justify-between items-center p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
          //             <span>CAD Files (.step)</span>
          //             <ArrowRight />
          //           </a>
          //           <a href="#" className="flex justify-between items-center p-4 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
          //             <span>User Manual</span>
          //             <ArrowRight />
          //           </a>
          //         </div>
          //       </div>
          //     </div>
          //   ),
          // });

          return TABS;
        })()}
        sidebar={
          <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 shadow-lg border border-white/10">
            <h3 className="text-xl font-bold text-white mb-4">
              Request a Quote
            </h3>
            <p className="text-gray-300/90 text-sm mb-6">
              Get pricing and technical details for the{" "}
              <span className="font-bold text-white">{p.title}</span>.
            </p>
            <a
              href="#request-quote"
              className="block w-full text-center px-6 py-3 mt-4 rounded-lg font-semibold text-white transition-all duration-300 bg-[#00a9e0] hover:scale-105"
              style={{ boxShadow: `0 4px 15px -5px #00a9e0` }}
            >
              Proceed to Quote Form
            </a>
          </div>
        }
        // pass both datasheetImageSrc and heroImage for maximum compatibility
        datasheetImageSrc={datasheetImageCandidate}
        heroImage={p.heroImage}
      />

      {p.relatedProducts && p.relatedProducts.length > 0 && (
        <section className="container mx-auto px-6 py-8">
          <RelatedProducts
            items={p.relatedProducts}
            title="You may also like"
          />
        </section>
      )}

      {/* All categories/products (sitemap-like) */}
      {Object.keys(allProductsByCategory).length > 0 && (
        <section className="bg-gray-50/50 py-16">
          <div className="container mx-auto px-6">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">
                Explore Our Full Product Catalog
              </h2>
              <p className="mt-4 text-lg leading-6 text-gray-600 max-w-2xl mx-auto">
                From advanced fiber lasers to precision optics, browse our
                comprehensive range of solutions organized by category.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(allProductsByCategory).map(([catSlug, prods]) => (
                <div
                  key={catSlug}
                  className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col"
                >
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-3 capitalize">
                      {catSlug.replace(/-/g, " ")}
                    </h3>
                    <ul className="space-y-2 text-gray-600">
                      {prods.slice(0, 4).map((prod) => (
                        <li key={prod.slug} className="flex items-center">
                          <ArrowRight className="h-4 w-4 text-[#00a9e0] mr-3 shrink-0" />
                          <a
                            href={`/products/${catSlug}/${prod.slug}`}
                            className="hover:text-[#00a9e0] transition-colors duration-200"
                          >
                            {prod.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="mt-auto bg-gray-50 p-4 text-center">
                    <a
                      href={`/products/${catSlug}`}
                      className="font-semibold text-[#006bb3] hover:text-[#00a9e0] transition-colors duration-200 group"
                    >
                      View All in {catSlug.replace(/-/g, " ")}
                      <ArrowRight className="inline-block h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reverted RequestQuote to be a standard section */}
      <section id="request-quote" className="py-12 bg-white">
        <RequestQuote productTitle={p.title} productSlug={p.slug} />
      </section>
    </main>
  );
}
