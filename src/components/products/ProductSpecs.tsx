// src/components/products/ProductSpecs.tsx
"use client";
import React from "react";
import { motion, Variants } from "framer-motion";
import {
  Thermometer,
  Waves,
  Zap,
  Ruler,
  Maximize,
  Minimize,
  HelpCircle,
  PhoneCall,
  ChevronRight,
} from "lucide-react";

export type Specs = Record<string, string>;
export type ProductSpecsProps = {
  specs: Specs;
  ctaLabel?: string;
  datasheetUrl?: string;
};

// Reverted to original color scheme for a white card design
const PRIMARY = "#3B9ACB";
const ACCENT_LIGHT = "#F0F8FF";

const iconMap: Record<string, React.ElementType> = {
  linewidth: Waves,
  wavelength: Waves,
  power: Zap,
  temperature: Thermometer,
  dimensions: Ruler,
  "max output": Maximize,
  "min output": Minimize,
};

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
    },
  },
};

export default function ProductSpecs({
  specs = {},
  ctaLabel = "Request Quote",
  datasheetUrl = "/contact",
}: ProductSpecsProps) {
  const entries = Object.entries(specs);

  const gridStyle = {
    backgroundColor: '#ffffff',
    backgroundImage: `
      linear-gradient(rgba(0, 0, 0, 0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(0, 0, 0, 0.03) 1px, transparent 1px)
    `,
    backgroundSize: '20px 20px',
  };

  return (
    // Added style for the grid background pattern
    <div
      className="rounded-2xl shadow-lg border border-gray-200/80 overflow-hidden"
      style={gridStyle}
    >
      {/* Header section with a light gray background */}
      <div className="p-6 bg-gray-200">
        <h2
          id="product-specs"
          className="text-2xl font-bold"
          style={{ color: PRIMARY }}
        >
          Technical Specifications
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Key parameters for the selected model.
        </p>
      </div>

      {/* Main body with transparent background to show the grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 gap-px bg-gray-200/80"
      >
        {entries.length > 0 ? (
          entries.map(([key, value]) => {
            const foundKey = Object.keys(iconMap).find(k =>
              key.toLowerCase().includes(k)
            );
            const Icon =
              iconMap[key.toLowerCase()] ??
              (foundKey ? iconMap[foundKey] : undefined) ??
              HelpCircle;
            return (
              <motion.div
                key={key}
                variants={itemVariants}
                className="p-4 bg-white/80 backdrop-blur-sm flex items-center gap-4" // Added transparency to see grid
              >
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: ACCENT_LIGHT }}
                >
                  <Icon size={20} strokeWidth={2} style={{ color: PRIMARY }} />
                </div>
                <div>
                  <p className="text-sm font-semibold capitalize text-black">
                    {key.replace(/_/g, " ")}
                  </p>
                  <p className="text-base" style={{ color: PRIMARY }}>{value}</p>
                </div>
              </motion.div>
            );
          })
        ) : (
          <div className="col-span-full p-6 bg-white">
            <p className="text-center text-gray-500">
              No specifications available at the moment.
            </p>
          </div>
        )}
      </motion.div>

      {/* Footer with buttons */}
      <div className="p-4 bg-gray-50/50">
        <div className="flex flex-col sm:flex-row gap-3">
          {datasheetUrl && (
            <a
              href="/contact"
              target="/contact"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm text-white transition-all"
              style={{ backgroundColor: PRIMARY }}
            >
              <PhoneCall size={16} />
              Contact Us
            </a>
          )}
          <a
            href="#request-quote"
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg font-semibold text-sm border border-gray-300 text-gray-700 hover:bg-gray-100 transition-all"
          >
            {ctaLabel}
            <ChevronRight size={16} />
          </a>
        </div>
        <p className="text-xs text-center text-gray-500 mt-3">
          Need a custom configuration? Contact our sales team.
        </p>
      </div>
    </div>
  );
}
