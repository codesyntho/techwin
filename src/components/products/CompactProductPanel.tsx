// src/components/products/FeatureAndApplicationsPanel.tsx
"use client";

import React, { useMemo } from "react";
import Link from "next/link";

type ProductImage = {
  src: string;
  alt?: string;
};

type ProductSection = {
  type?: string;
  heading?: string;
  content?: string;
  bullets?: string[];
  specGroups?: any[];
};

type RelatedProduct = { title: string; href?: string };

type ProductMinimal = {
  slug?: string;
  title: string;
  shortDescription?: string;
  sections?: ProductSection[];
  datasheetUrl?: string;
  datasheetImageSrc?: string | ProductImage;
  previewImageSrc?: string | ProductImage;
  heroImage?: string | ProductImage;
  relatedProducts?: RelatedProduct[];
};

type Props = {
  product: ProductMinimal;
  specSummary?: Record<string, string>;
  contactEmail?: string; // optional, shown as subtle link only
};

/**
 * Advanced variant:
 * - Full-bleed primary blue background
 * - Centered white card container (this is the "page container" you wanted white)
 * - No phone number and no "Request Quote" button (only Datasheet CTA)
 * - Robust applications extraction: avoids duplicating shortDescription
 */
export default function FeatureAndApplicationsPanel({
  product,
  specSummary = {},
  contactEmail = "sales@techwin.example",
}: Props) {
  // helper: simple similarity check to avoid returning identical text
  const similar = (a?: string, b?: string) => {
    if (!a || !b) return false;
    const x = a.trim().replace(/\s+/g, " ").toLowerCase();
    const y = b.trim().replace(/\s+/g, " ").toLowerCase();
    if (x === y) return true;
    // if one contains the other largely, treat as similar
    const min = Math.min(x.length, y.length);
    if (min > 60 && (x.includes(y) || y.includes(x))) return true;
    return false;
  };

  // derive features (first available "features" bullets)
  const features = useMemo(() => {
    const f: string[] = [];
    (product.sections || []).forEach((s) => {
      if (
        (s.type || "").toLowerCase() === "features" &&
        Array.isArray(s.bullets)
      ) {
        f.push(...(s.bullets || []));
      }
    });
    if (f.length === 0) {
      (product.sections || []).forEach((s) => {
        if (Array.isArray(s.bullets)) f.push(...(s.bullets || []));
      });
    }
    return f.slice(0, 8);
  }, [product.sections]);

  // applications: robust multi-step extraction to avoid duplicating shortDescription
  const applications = useMemo(() => {
    const apps: string[] = [];

    // 1) preferred: find a dedicated Applications section (heading contains 'application' OR type === 'applications')
    const appSection =
      (product.sections || []).find(
        (s) =>
          (s.type || "").toLowerCase() === "applications" ||
          (s.heading || "").toLowerCase().includes("application")
      ) || null;

    if (appSection && appSection.content) {
      const parts = appSection.content
        .split(/\.\s+/)
        .map((p) => p.trim())
        .filter(Boolean);
      // filter out parts that are same/as-long-as shortDescription
      const distinct = parts.filter(
        (p) => !similar(p, product.shortDescription)
      );
      distinct.slice(0, 4).forEach((p) => apps.push(p.endsWith(".") ? p : p));
    }

    // 2) if not enough, try to extract keywords from shortDescription (OCT, sensing, metrology...)
    if (apps.length < 2 && product.shortDescription) {
      const sd = product.shortDescription;
      const keywords = [
        "OCT",
        "oct",
        "sensing",
        "metrology",
        "fiber",
        "imaging",
        "quantum",
        "scientific",
        "industrial",
      ];
      const found: string[] = [];
      for (const kw of keywords) {
        const re = new RegExp(`\\b${kw}\\b`, "i");
        if (re.test(sd)) {
          // craft friendly phrase
          const label =
            kw.toLowerCase() === "oct"
              ? "Optical Coherence Tomography (OCT) imaging"
              : kw.toLowerCase() === "fiber"
              ? "Fiber testing & diagnostics"
              : kw[0].toUpperCase() + kw.slice(1).toLowerCase();
          if (!found.includes(label)) found.push(label);
        }
      }
      found.slice(0, 3).forEach((f) => !apps.includes(f) && apps.push(f));
    }

    // 3) if still not enough, create use-cases from features (convert feature -> "Used for ...")
    if (apps.length < 1 && features.length > 0) {
      const fromFeatures = features.slice(0, 3).map((ft) => {
        // shorten a long feature to a short phrase
        const s = ft.split(/[,.;]/)[0];
        return s.length > 90 ? s.slice(0, 90).trim() + "…" : s;
      });
      fromFeatures.forEach((f) => {
        const candidate = `Used for ${
          f.charAt(0).toLowerCase() === " " ? f.slice(1) : f
        }`;
        if (
          !apps.includes(candidate) &&
          !similar(candidate, product.shortDescription)
        )
          apps.push(candidate);
      });
    }

    // 4) final fallback: a single trimmed line that's different from shortDescription
    if (apps.length === 0) {
      const sd = product.shortDescription || "";
      const fallback = sd.length > 140 ? sd.slice(0, 137).trim() + "…" : sd;
      if (!similar(fallback, sd)) apps.push(fallback);
      else apps.push("Laboratory & industrial testing, imaging, and sensing.");
    }

    // ensure uniqueness and shortness
    const uniq = Array.from(new Set(apps.map((a) => a.trim()))).slice(0, 4);
    return uniq;
  }, [product.sections, product.shortDescription, features]);

  const chips = useMemo(
    () => Object.entries(specSummary || {}).slice(0, 4),
    [specSummary]
  );

  return (
    <section className="w-full bg-[#3B9ACB] py-12">
      <div className="max-w-6xl mx-auto px-6">
        {/* White container card */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Top stripe */}
          <div className="bg-white/70 px-6 md:px-10 py-8">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
              <div className="flex-1">
                <h1 className="mt-1 text-2xl md:text-3xl font-extrabold text-[#3B9ACB] leading-tight">
                  {product.title}
                </h1>
                {product.shortDescription && (
                  <p className="mt-3 text-md text-black max-w-3xl pb-8">
                    {product.shortDescription}
                  </p>
                )}
                {chips.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {chips.map(([k, v]) => (
                      <span
                        key={k}
                        className="text-sm bg-[#3B9ACB]/10 text-black/80 px-3 py-1 rounded-full 
                   backdrop-blur-sm border border-white/10 flex items-center gap-1"
                        title={`${k}: ${v}`}
                      >
                        <strong>{k}:</strong>
                        <span className="opacity-95">{v}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* — IMAGES BLOCK REMOVED — */}

          {/* Main content */}
          <div className="px-6 md:px-10 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              <div className="lg:col-span-7">
                <div className="border border-gray-100 rounded-xl p-6 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-slate-900">
                      Key features
                    </h2>
                    <span className="text-xs text-slate-500">Highlights</span>
                  </div>

                  <ul className="space-y-3">
                    {features.length > 0 ? (
                      features.map((f, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 p-3 rounded-md bg-gradient-to-r from-white to-slate-50 border border-slate-100"
                        >
                          <div className="flex-shrink-0 mt-0.5">
                            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#3B9ACB]/10 text-[#0b4860]">
                              ✓
                            </span>
                          </div>
                          <div className="text-sm text-slate-800 leading-snug">
                            {f}
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-sm text-slate-600">
                        No feature data available.
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5">
                <div className="rounded-xl p-6 bg-gradient-to-b from-white to-slate-50 border border-gray-100 shadow-sm">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Applications
                    </h3>
                    <span className="text-xs text-slate-500">Use cases</span>
                  </div>

                  <div className="space-y-3">
                    {applications.length > 0 ? (
                      applications.map((a, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-md border border-slate-100 bg-white/80 hover:shadow-sm transition"
                        >
                          <div className="text-sm text-slate-800 leading-snug">
                            {a}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-sm text-slate-600">
                        No applications listed.
                      </div>
                    )}
                  </div>

                  <div className="h-px my-5 bg-slate-100" />

                  {product.relatedProducts &&
                    product.relatedProducts.length > 0 && (
                      <>
                        <div className="text-xs text-slate-500 mb-2">
                          Related
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {product.relatedProducts.slice(0, 3).map((r, idx) => (
                            <Link
                              key={idx}
                              href={r.href || "#"}
                              className="text-xs px-3 py-1 rounded-full bg-[#eef8fb] text-[#0b4860] hover:bg-[#def0f6] transition"
                            >
                              {r.title}
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
