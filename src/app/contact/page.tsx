// src/app/contact/page.tsx
"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Users, Wrench, Box } from "lucide-react";

const PRIMARY = "#3087C0";
const TEXT_DARK = "#08263b";

export default function ContactPage() {
  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-white pt-30 md:pt-30" style={{ color: TEXT_DARK }}>
      {/* HERO - increased vertical spacing */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 -z-10"
          aria-hidden
          style={{
            background:
              "linear-gradient(180deg, rgba(48,135,192,0.06) 0%, rgba(91,183,225,0.03) 35%, rgba(255,255,255,0) 100%)",
            backdropFilter: "blur(6px)",
          }}
        />

        {/* slightly darker overlay for contrast but heading will be PRIMARY */}
        <div className="absolute inset-0 bg-black/12 md:bg-black/18 -z-5" aria-hidden />

        <div className="max-w-6xl mx-auto px-6 py-20 md:py-20"> {/* bigger top/bottom padding */}
          <motion.h1
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-semibold"
            style={{ color: PRIMARY, textShadow: "none" }} // heading uses PRIMARY, no glow
          >
            Contact Us
          </motion.h1>

          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, delay: 0.06 }}
            className="mt-4 max-w-2xl text-lg"
            style={{ color: TEXT_DARK }} // paragraph dark (not white)
          >
            We're here to assist you with sales, technical support, OEM partnerships, and distributor
            inquiries.
          </motion.p>
        </div>
      </section>

      {/* MAIN CONTENT - add a small positive top margin so hero padding doesn't overlap */}
      <main className="max-w-6xl mx-auto px-6 mt-8 pb-28"> {/* more bottom spacing */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* FORM */}
          <section className="md:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl p-8 backdrop-blur-md bg-white/90 border shadow-lg"
              style={{ borderColor: "rgba(48,135,192,0.12)" }}
            >
              <h2 className="text-2xl font-semibold" style={{ color: PRIMARY }}>
                Send a Message
              </h2>

              <p className="text-sm text-slate-700 mt-1">
                Fill the form and our team will get back within 1&ndash;2 business days.
              </p>

              <form className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-600">Name</span>
                  <input
                    className="rounded-xl px-4 py-3 bg-white border"
                    placeholder="Your full name"
                    style={{ borderColor: "rgba(48,135,192,0.18)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-600">Email</span>
                  <input
                    className="rounded-xl px-4 py-3 bg-white border"
                    placeholder="you@company.com"
                    style={{ borderColor: "rgba(48,135,192,0.18)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-600">Phone</span>
                  <input
                    className="rounded-xl px-4 py-3 bg-white border"
                    placeholder="+91 98765 43210"
                    style={{ borderColor: "rgba(48,135,192,0.18)" }}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-xs text-slate-600">Company</span>
                  <input
                    className="rounded-xl px-4 py-3 bg-white border"
                    placeholder="Company name"
                    style={{ borderColor: "rgba(48,135,192,0.18)" }}
                  />
                </div>

                <div className="md:col-span-2 flex flex-col gap-2">
                  <span className="text-xs text-slate-600">Message</span>
                  <textarea
                    rows={6}
                    className="rounded-xl px-4 py-3 bg-white border resize-none"
                    placeholder="Tell us about your project..."
                    style={{ borderColor: "rgba(48,135,192,0.18)" }}
                  />
                </div>

                <div className="md:col-span-2 mt-2">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-2xl text-white font-medium shadow-lg"
                    style={{ background: PRIMARY }}
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </motion.div>

            {/* Inquiry Cards */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: "Sales Inquiry", icon: <Users size={20} /> },
                { title: "Technical Support", icon: <Wrench size={20} /> },
                { title: "Distributor Partners", icon: <Box size={20} /> },
              ].map((c) => (
                <div
                  key={c.title}
                  className="rounded-2xl p-4 bg-white/90 backdrop-blur-md border shadow-sm"
                  style={{ borderColor: "rgba(48,135,192,0.12)" }}
                >
                  <div className="flex items-start gap-3">
                    <div className="p-3 rounded-xl bg-blue-50 border" style={{ borderColor: "rgba(48,135,192,0.12)" }}>
                      {c.icon}
                    </div>
                    <div>
                      <div className="text-sm font-semibold" style={{ color: PRIMARY }}>
                        {c.title}
                      </div>
                      <div className="text-xs text-slate-600">Priority support for enterprises</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* COMPANY INFO + VISIBLE MAP */}
          <aside className="md:col-span-5">
            <div
              className="rounded-3xl p-6 backdrop-blur-md bg-white/90 border shadow-lg sticky top-24"
              style={{ borderColor: "rgba(48,135,192,0.12)" }}
            >
              <h3 className="text-lg font-semibold" style={{ color: PRIMARY }}>
                Techwin Industry Co., Ltd
              </h3>

              <ul className="mt-4 space-y-4 text-sm" style={{ color: TEXT_DARK }}>
                <li className="flex gap-3 items-start">
                  <MapPin size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Address</div>
                    <div>8th Floor Unit A, Block 2, No. 206 Zhenhua Road</div>
                    <div>Hangzhou City, Zip Code: 310030</div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <Phone size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Contact</div>
                    {/* <div>Franks Chow — Mobile: <a href="tel:+8613958180450" className="underline">+86-13958180450</a></div> */}
                    <div>Tel: <a href="tel:+8657188284299" className="underline">+86-57188284299</a></div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <Mail size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div>
                      <a href="mailto:techwinchina@gmail.com" className="underline">techwinchina@gmail.com</a>,{" "}
                      <a href="mailto:sales@techwin-china.com" className="underline">sales@techwin-china.com</a>
                    </div>
                    <div className="text-xs text-slate-600">WeChat: +86-57188284299</div>
                  </div>
                </li>

                <li className="flex gap-3 items-start">
                  <Clock size={20} className="text-blue-600" />
                  <div>
                    <div className="font-medium">Business hours</div>
                    <div>Mon – Fri: 09:00 — 18:00 (local)</div>
                  </div>
                </li>
              </ul>

              {/* Map (visible) - uses output=embed for reliable embedding + visible border/shadow */}
              <div className="mt-6 rounded-2xl overflow-hidden border" style={{ borderColor: "rgba(48,135,192,0.12)", height: 240 }}>
                <iframe
                  title="Techwin China - Hangzhou"
                  src="https://maps.google.com/maps?q=30.31323,120.06863&z=16&output=embed"
                  className="w-full h-full"
                  style={{ border: 0 }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="mt-3 text-xs text-slate-500">Click the map to open in Google Maps.</div>
            </div>

            {/* Quick links */}
            <div className="mt-4 rounded-2xl p-4 backdrop-blur-md bg-white/90 border" style={{ borderColor: "rgba(48,135,192,0.12)" }}>
              <div className="text-sm font-semibold" style={{ color: PRIMARY }}>
                Quick links
              </div>
              <ul className="mt-3 text-sm text-slate-700 space-y-2">
                <li>Documentation & Manuals</li>
                <li>Warranty & RMA</li>
                <li>OEM Partnership</li>
              </ul>
            </div>
          </aside>
        </div>
      </main>
    </div>
  );
}
