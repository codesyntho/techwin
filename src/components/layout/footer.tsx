// src/components/layout/footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, X, Instagram, Youtube, Linkedin } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Support", href: "/support" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" },
];

const productCategories = [
  {
    title: "Single-Frequency Fiber Lasers",
    href: "/products/single-frequency-fiber-lasers",
  },
  { title: "Seed Lasers", href: "/products/seed-lasers" },
  {
    title: "High-Power Fiber Lasers",
    href: "/products/high-power-fiber-lasers",
  },
  {
    title: "Wavelength Conversion Lasers",
    href: "/products/wavelength-conversion-lasers",
  },
  { title: "Broadband & ASE Sources", href: "/products/broadband-ase-sources" },
  { title: "Fiber Amplifiers", href: "/products/fiber-amplifiers" },
  { title: "Testing Systems", href: "/products/testing-systems" },
  { title: "SLED Light Sources", href: "/products/point-light-sources" },
];

export default function Footer() {
  return (
    <footer className="bg-[#3B9ACB] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* grid: logo | quick links | product categories | policy | contact+follow */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 items-start">
          {/* Logo */}
          <div className="md:col-span-1 flex items-start">
            <Link href="/" className="flex items-center gap-3 shrink-0">
              <Image
                src="/techwin-logo-rectangle.png"
                alt="Techwin"
                width={160}
                height={48}
                className="object-contain"
              />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="text-white/90 hover:text-white"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Product Categories</h4>
            <ul className="space-y-2 text-sm">
              {productCategories.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="text-white/90 hover:text-white"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Policy */}
          <div>
            <h4 className="text-sm font-semibold mb-4">Policy</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/privacy-policy"
                  className="text-white/90 hover:text-white"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-white/90 hover:text-white">
                  Terms of Use
                </Link>
              </li>
              <li>
                <Link
                  href="/sitemap"
                  className="text-white/90 hover:text-white"
                >
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + Follow (left-aligned on desktop now) */}
          <div className="flex flex-col items-start md:items-start">
            <div className="text-sm">
              <h4 className="text-sm font-semibold mb-3">Contact</h4>
              <p className="leading-relaxed text-white/90 max-w-[280px] text-left">
                Techwin – Single Frequency Fiber Laser Solutions
                <br />
                Email:{" "}
                <Link
                  href="mailto:techwinchina@gmail.com"
                  className="underline hover:text-white"
                >
                  techwinchina@gmail.com
                </Link>
                <br />
                <Link
                  href="tel:+8657188284299"
                  className="underline hover:text-white"
                >
                  Tel: +86-57188284299
                </Link>
              </p>
            </div>

            {/* Follow Us (placed under contact) */}
            <div className="mt-6 md:mt-8 w-full md:w-auto">
              {/* keep this left for all breakpoints */}
              <p className="text-sm text-white/90 mb-3 text-left">
                Connect with us
              </p>

              <div className="flex items-center gap-3 justify-start">
                {/* Buttons use white background with brand-colored icons */}
                <Link
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white hover:opacity-95"
                >
                  <Facebook className="h-5 w-5" style={{ color: "#1877F2" }} />
                </Link>
                <Link
                  href="https://www.instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white hover:opacity-95"
                >
                  <Instagram className="h-5 w-5" style={{ color: "#E1306C" }} />
                </Link>

                <Link
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white hover:opacity-95"
                >
                  <X
                    className="h-5 w-5 stroke-3"
                    style={{ color: "#000000" }}
                  />
                </Link>

                <Link
                  href="https://www.linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white hover:opacity-95"
                >
                  <Linkedin className="h-5 w-5" style={{ color: "#0A66C2" }} />
                </Link>

                <Link
                  href="https://www.youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  className="flex items-center justify-center h-10 w-10 rounded-full bg-white hover:opacity-95"
                >
                  <Youtube className="h-5 w-5" style={{ color: "#FF0000" }} />
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* bottom row */}
        <div className="mt-8 border-t border-white/20 pt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-sm text-white/80 leading-relaxed text-left md:text-left">
            Copyrights Reserved © {new Date().getFullYear()}{" "}
            <strong>Techwin</strong>. | All rights reserved. | Designed,
            developed and maintained by{" "}
            <Link
              href="https://www.wishlan.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-white"
            >
              <strong>Wishlan</strong>
            </Link>
            .
          </div>
        </div>
      </div>
    </footer>
  );
}
