"use client";
import React, { useState, ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Mail, Phone, MessageSquare, CheckCircle, ArrowRight, Building } from "lucide-react";
import { cn } from "@/lib/utils";

export type RequestQuoteProps = {
  productTitle?: string;
  productSlug?: string;
  onSubmit?: (data: any) => Promise<void> | void;
};

const InputField = ({ icon, className, ...props }: { icon: ReactNode; [key: string]: any }) => (
  <div className="relative">
    <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500">
      {icon}
    </span>
    <input
      {...props}
      className={cn(
        "w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B9ACB]/50 focus:border-transparent transition-all duration-300 shadow-sm",
        className
      )}
    />
  </div>
);

export default function RequestQuote({ productTitle, productSlug, onSubmit }: RequestQuoteProps) {
  const [formData, setFormData] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      alert("Please provide your name and email.");
      return;
    }
    setSending(true);

    const payload = {
      product: productTitle ?? productSlug ?? "Not specified",
      ...formData,
    };

    try {
      if (onSubmit) {
        await onSubmit(payload);
      } else {
        await new Promise(resolve => setTimeout(resolve, 1500));
      }
      setDone(true);
    } catch (err) {
      console.error(err);
      alert("Failed to submit your request. Please try again later.");
    } finally {
      setSending(false);
    }
  };
  
  const resetForm = () => {
    setDone(false);
    setFormData({ name: "", company: "", email: "", phone: "", message: "" });
  }

  return (
    <section className="w-full py-20 sm:py-28 bg-[#3B9ACB]">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-6xl mx-auto rounded-2xl shadow-2xl overflow-hidden bg-white">
          <div className="md:grid md:grid-cols-10">
            
            <div className="md:col-span-6 p-8 sm:p-12">
              <AnimatePresence mode="wait">
                {done ? (
                  <motion.div
                    key="thank-you"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="flex flex-col items-center justify-center h-full text-center"
                  >
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1, rotate: 360 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.2 }}>
                      <CheckCircle className="text-green-400 text-7xl mb-5" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-black">Thank You!</h3>
                    <p className="text-gray-600 mt-3 max-w-md">
                      Your quote request for <strong className="text-black">{productTitle}</strong> has been sent. We'll be in touch.
                    </p>
                    <button onClick={resetForm} className="mt-8 flex items-center gap-2 text-[#3B9ACB] hover:text-opacity-80 transition-colors font-semibold">
                      Request Another Quote <ArrowRight />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                    <h3 className="text-3xl sm:text-4xl font-bold mb-2 text-[#3B9ACB]">
                      Request a Quote
                    </h3>
                    <p className="text-gray-600 mb-8">
                      For the <strong className="text-black">{productTitle || "selected product"}</strong>. Our experts are ready to assist.
                    </p>
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField icon={<User />} name="name" value={formData.name} onChange={handleChange} placeholder="Your Name *" required />
                        <InputField icon={<Building />} name="company" value={formData.company} onChange={handleChange} placeholder="Company" />
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <InputField icon={<Mail />} name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" required />
                        <InputField icon={<Phone />} name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" />
                      </div>
                      <div className="relative">
                        <span className="absolute top-4 left-0 flex items-center pl-4 text-gray-500">
                          <MessageSquare />
                        </span>
                        <textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project requirements..."
                          rows={5}
                          className="w-full pl-12 pr-4 py-3 bg-gray-100 border border-gray-300 rounded-lg text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#3B9ACB]/50 focus:border-transparent transition-all duration-300 shadow-sm"
                        />
                      </div>
                      <motion.button
                        type="submit"
                        disabled={sending}
                        whileHover={{ scale: 1.02, boxShadow: "0px 0px 20px rgba(59, 154, 203, 0.5)" }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-4 px-6 rounded-lg font-semibold text-white bg-[#3B9ACB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-[#3B9ACB] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {sending ? "Submitting..." : "Get Personalized Quote"}
                      </motion.button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <div className="md:col-span-4 p-8 sm:p-12 bg-gray-50 border-l border-gray-200 flex flex-col">
              <h4 className="text-xl font-bold text-[#3B9ACB] mb-5 border-b border-gray-200 pb-4">What to Expect</h4>
              <ul className="space-y-4 text-gray-600">
                <li className="flex items-start gap-3"><CheckCircle className="text-[#3B9ACB] mt-1 shrink-0" /><span>A detailed quote tailored to your needs.</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-[#3B9ACB] mt-1 shrink-0" /><span>Expert consultation from our engineers.</span></li>
                <li className="flex items-start gap-3"><CheckCircle className="text-[#3B9ACB] mt-1 shrink-0" /><span>Full access to datasheets and performance data.</span></li>
              </ul>
              
              <div className="w-full mt-auto pt-10 bg-[#3B9ACB] p-4 rounded-lg">
                <h5 className="font-bold text-white mb-3">Or Contact Us Directly</h5>
                <p className="text-white/80 hover:text-white transition-colors"><a href="mailto:techwinchina@gmail.com"> techwinchina@gmail.com</a></p>
                <p className="text-white/80 hover:text-white"><a href="tel:86-517-88284299">+86-517-88284299</a></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
