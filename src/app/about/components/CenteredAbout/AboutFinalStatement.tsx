'use client';

import { motion } from "framer-motion";

export default function AboutFinalStatement() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-[1100px] mx-auto px-4">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="
            relative rounded-3xl 
            p-6 md:p-8 
            bg-white/95 backdrop-blur-sm
            border border-[#dff1ff]
            shadow-[0_15px_45px_rgba(48,135,192,0.12)]
          "
        >
          {/* Top color line */}
          <div className="absolute top-0 left-0 w-full h-[3px] rounded-t-3xl bg-linear-to-r from-[#5BB7E1] to-[#3087C0]" />

          {/* TEXT */}
          <div className="text-center space-y-3">
            <h2 className="text-2xl md:text-3xl font-bold text-[#08263b]">
              Techwin — Advancing Precision Through Innovation & Reliability
            </h2>

            <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-[80%] mx-auto">
              Techwin continues to uphold its reputation as a reliable optoelectronic
              technology manufacturer — combining innovation, precision, and quality
              into every laser system. With advanced R&D and global outreach, we support
              professionals seeking dependable optical solutions.
            </p>

            <p className="text-base text-slate-700 leading-relaxed max-w-[70%] mx-auto">
              For more information or to request a quote, contact us at 
              <span className="font-semibold text-[#3087C0]"><a href="tel:+8657188284299">+86-57188284299</a> </span>
              or visit our facility in Hangzhou City.
            </p>
          </div>

          {/* BUTTONS */}
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <a
              href="/contact"
              className="
                px-5 py-2.5 rounded-xl bg-[#3087C0] 
                text-white text-sm md:text-base font-semibold 
                shadow hover:shadow-lg hover:brightness-110 
                transition duration-200
              "
            >
              Contact Sales
            </a>

            <button
              onClick={() =>
                window.dispatchEvent(new CustomEvent('openRequestQuote'))
              }
              className="
                px-5 py-2.5 rounded-xl border border-[#3087C0]
                text-[#3087C0] bg-white 
                text-sm md:text-base font-medium
                hover:bg-[#f0f8ff]
                transition duration-200
              "
            >
              Request Quote
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
