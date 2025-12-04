"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { singleFrequencyData } from "@/data/categories/singleFrequencyData";
import { seedFiberData } from "@/data/categories/seedFiberData";
import { highPowerData } from "@/data/categories/highPowerData";
import { wavelengthConversionData } from "@/data/categories/wavelengthConversionData";
import { broadbandAseData } from "@/data/categories/broadbandAseData";
import { fiberAmplifierData } from "@/data/categories/fiberAmplifierData";
import { laserTestingData } from "@/data/categories/laserTestingData";
import { pointLightSourceData } from "@/data/categories/pointLightSourceData";
import { applications } from "@/data/Application/applications";
import { SearchDropdown } from "@/components/common/SearchDropdown";
import type { SearchResult } from "@/app/api/search/route";
import { useRequestQuote } from "@/context/RequestQuoteContext";

const categoryTitleMap = [
  { title: "Single-Frequency Fiber Lasers", data: singleFrequencyData },
  { title: "Seed Lasers", data: seedFiberData },
  { title: "High-Power Fiber Lasers", data: highPowerData },
  { title: "Wavelength Conversion Lasers", data: wavelengthConversionData },
  { title: "Broadband & ASE Sources", data: broadbandAseData },
  { title: "Fiber Amplifiers", data: fiberAmplifierData },
  { title: "Testing Systems", data: laserTestingData },
  { title: "Point Light Sources", data: pointLightSourceData },
];

const productCategories = categoryTitleMap.map((item) => {
  const parts = String(item.data.url || "").split("/").filter(Boolean);
  const slug = parts.length ? parts[parts.length - 1] : "";
  return {
    title: item.title,
    slug,
    image: item.data?.hero?.image || "",
    children: (item.data?.subCategories || []).map((subCat) => ({
      title: subCat.name,
      slug: subCat.id ?? subCat.slug ?? "",
    })),
  };
});

type MobileNavProps = {
  onClose: () => void;
};

export default function MobileNav({ onClose }: MobileNavProps) {
  const [openProductCategory, setOpenProductCategory] = useState<string | null>(null);
  const [openApplicationCategory, setOpenApplicationCategory] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { openModal } = useRequestQuote();

  useEffect(() => {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (!searchQuery.trim()) {
      setSearchResults([]);
      setShowSearchDropdown(false);
      return;
    }

    setIsSearching(true);
    searchTimeoutRef.current = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.results || []);
        setShowSearchDropdown(true);
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setIsSearching(false);
      }
    }, 300); // Debounce 300ms

    return () => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
    };
  }, [searchQuery]);

  const toggleProductCategory = (slug: string) => {
    setOpenProductCategory(openProductCategory === slug ? null : slug);
  };

  const handleResultClick = () => {
    setSearchQuery("");
    setShowSearchDropdown(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-60 bg-white text-gray-900">
      <div className="flex justify-between items-center p-4 border-b">
        <h2 className="text-lg font-semibold">Menu</h2>
        <button onClick={onClose} aria-label="Close menu">
          <X className="h-6 w-6" />
        </button>
      </div>
      <div className="p-4">
        <div className="relative">
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search..."
            className="w-full rounded-full border border-gray-300 px-4 py-2 text-sm"
          />
          {showSearchDropdown && (
            <SearchDropdown
              query={searchQuery}
              isLoading={isSearching}
              results={searchResults}
              onResultClick={handleResultClick}
            />
          )}
        </div>
      </div>
      <nav className="p-4 overflow-y-auto h-full">
        <div className="space-y-4">
          <Link href="/" className="block py-2" onClick={onClose}>
            Home
          </Link>
          <Link href="/about" className="block py-2" onClick={onClose}>
            About Us
          </Link>

          <div>
            <button
              onClick={() => setOpenApplicationCategory(!openApplicationCategory)}
              className="w-full flex justify-between items-center py-2"
            >
              <span>Applications</span>
              <ChevronDown
                className={`h-5 w-5 transition-transform ${
                  openApplicationCategory ? "rotate-180" : ""
                }`}
              />
            </button>
            {openApplicationCategory && (
              <div className="pl-4 border-l">
                {applications.map((app) => (
                  <Link
                    key={app.slug}
                    href={`/application/${app.slug}`}
                    className="block py-2 text-sm"
                    onClick={onClose}
                  >
                    {app.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div>
            <h3 className="text-lg font-semibold py-2">Products</h3>
            <div className="space-y-2">
              {productCategories.map((category) => (
                <div key={category.slug}>
                  <button
                    onClick={() => toggleProductCategory(category.slug)}
                    className="w-full flex justify-between items-center py-2"
                  >
                    <span>{category.title}</span>
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        openProductCategory === category.slug ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {openProductCategory === category.slug && (
                    <div className="pl-4 border-l">
                      <Link
                        href={`/products/${category.slug}`}
                        className="block py-2 text-sm font-semibold"
                        onClick={onClose}
                      >
                        All {category.title}
                      </Link>
                      {category.children.map((child) => (
                        <Link
                          key={child.slug}
                          href={`/products/${category.slug}/${child.slug}`}
                          className="block py-2 text-sm"
                          onClick={onClose}
                        >
                          {child.title}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <Link href="/contact" className="block py-2" onClick={onClose}>
            Contact
          </Link>
          <button
            onClick={() => {
              openModal();
              onClose(); // Close mobile menu
            }}
            className="block py-2 w-full text-left"
          >
            Request Quote
          </button>
        </div>
      </nav>
    </div>
  );
}
