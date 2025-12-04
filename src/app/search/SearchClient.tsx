"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { SearchResult } from "@/app/api/search/route";
import { applications } from "@/data/Application/applications";

export default function SearchClient() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    let cancelled = false;

    (async () => {
      const q = query.trim().toLowerCase();

      try {
        // 1) Static-first: try the prebuilt products JSON (works on pure static hosts)
        const productsRes = await fetch(`/data/products.json`);
        if (productsRes.ok) {
          const productsJson = await productsRes.json();
          const allProducts = productsJson.products || [];

          const fallbackResults: SearchResult[] = [];

          // Search applications (client-side data)
          for (const app of applications) {
            if (
              app.name.toLowerCase().includes(q) ||
              (app.heading && app.heading.toLowerCase().includes(q)) ||
              (app.short && app.short.toLowerCase().includes(q)) ||
              (app.keywords || []).some((k) => k.toLowerCase().includes(q))
            ) {
              fallbackResults.push({
                type: "application",
                title: app.name,
                slug: app.slug,
                description: app.short,
                image: app.image,
                url: `/application/${app.slug}`,
              });
            }
          }

          // Search product categories and products
          for (const category of allProducts) {
            const categoryTitle = category.categoryTitle || category.categorySlug || "";
            if (String(categoryTitle).toLowerCase().includes(q)) {
              fallbackResults.push({
                type: "category",
                title: categoryTitle,
                slug: category.categorySlug,
                url: `/products/${category.categorySlug}`,
              });
            }

            for (const product of category.products || []) {
              if (
                (product.title && product.title.toLowerCase().includes(q)) ||
                (product.slug && product.slug.toLowerCase().includes(q))
              ) {
                fallbackResults.push({
                  type: "product",
                  title: product.title,
                  slug: product.slug,
                  category: categoryTitle,
                  url: `/products/${category.categorySlug}/${product.slug}`,
                });
              }
            }
          }

          if (cancelled) return;

          if (fallbackResults.length > 0) {
            setResults(fallbackResults.slice(0, 10));
            setIsLoading(false);
            return;
          }
        }
      } catch (err) {
        // ignore static-read errors; we'll try server API next
        console.warn("Static products.json lookup failed, will try API", err);
      }

      // 2) Try server API (useful when Next server or serverless endpoint is available)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        const apiResults: SearchResult[] = data.results || [];
        if (cancelled) return;
        setResults(apiResults.slice(0, 10));
      } catch (error) {
        console.error("Search API error:", error);
        if (!cancelled) setResults([]);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [query]);

  const groupedResults = {
    applications: results.filter((r) => r.type === "application"),
    categories: results.filter((r) => r.type === "category"),
    products: results.filter((r) => r.type === "product"),
  };

  return (
    <div className="pt-32 pb-16">
      <div className="mx-auto max-w-[1200px] px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Results</h1>
          <p className="text-gray-600">
            {isLoading
              ? "Searching..."
              : `Found ${results.length} result${results.length !== 1 ? "s" : ""} for "${query}"`}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <div className="text-gray-500">Loading...</div>
          </div>
        ) : results.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 mb-4">No results found for "{query}"</p>
            <Link
              href="/"
              className="inline-block px-4 py-2 bg-[#3B9ACB] text-white rounded hover:bg-[#2D87B7]"
            >
              Back to Home
            </Link>
          </div>
        ) : (
          <div className="space-y-8">
            {groupedResults.applications.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Applications ({groupedResults.applications.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedResults.applications.map((result) => (
                    <Link
                      key={result.url}
                      href={result.url}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-lg hover:border-[#3B9ACB] transition-all"
                    >
                      <div className="flex gap-4">
                        {result.image && (
                          <div className="h-20 w-20 shrink-0 relative">
                            <Image
                              src={result.image}
                              alt={result.title}
                              width={80}
                              height={80}
                              className="object-cover rounded"
                            />
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{result.title}</h3>
                          <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {groupedResults.categories.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Categories ({groupedResults.categories.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedResults.categories.map((result) => (
                    <Link
                      key={result.url}
                      href={result.url}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-lg hover:border-[#3B9ACB] transition-all"
                    >
                      <h3 className="font-semibold text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-600">Category</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {groupedResults.products.length > 0 && (
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Products ({groupedResults.products.length})
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {groupedResults.products.map((result) => (
                    <Link
                      key={result.url}
                      href={result.url}
                      className="p-4 border border-gray-200 rounded-lg hover:shadow-lg hover:border-[#3B9ACB] transition-all"
                    >
                      <h3 className="font-semibold text-gray-900">{result.title}</h3>
                      <p className="text-sm text-gray-600">{result.category}</p>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
