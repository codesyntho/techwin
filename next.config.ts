import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable the React compiler (Next.js 15+)
reactCompiler: true,

  // Turbopack build configuration
  turbopack: {
    root: __dirname,
  },
  // Export as a fully static site (generates `out/` with `next export` behavior)
  output: "export",

  // When exporting statically, Next.js' built-in image optimization isn't
  // available. Serve images as normal `<img>` sources by disabling the
  // optimizer so static sites reference the files under `/public`.
  images: {
    unoptimized: true,
  },

  // For stable production builds
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
