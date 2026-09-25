"use client";

import React, { useState } from "react";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function FAQSection() {
  const { faqs } = DENTELIO_DATA;
  const [openId, setOpenId] = useState<string | null>(faqs[0].id);

  const toggleFAQ = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 border-t border-brand-border/40 overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        {/* Left Header with Motion Blur */}
        <motion.div
          initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="lg:col-span-5 space-y-4"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
            PATIENT FAQ
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold font-heading text-[#132424] tracking-tight leading-tight">
            Everything you want to know, made simple.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted leading-relaxed pt-2">
            Clear, transparent clinical guidance regarding our joint replacement, spine surgery, cashless hospitalization, and emergency admission procedures.
          </p>
        </motion.div>

        {/* Right Accordion List with Staggered Frame-by-Frame Blur */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.12, delayChildren: 0.05 },
            },
          }}
          className="lg:col-span-7 flex flex-col gap-3.5"
        >
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                variants={{
                  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
                  },
                }}
                className="bg-[#0b5660] text-white rounded-2xl sm:rounded-3xl border border-white/10 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md"
              >
                <button
                  onClick={() => toggleFAQ(faq.id)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-heading font-semibold text-base sm:text-lg hover:bg-[#083c45]/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-white/95 leading-snug">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center shrink-0 text-white">
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(6px)" }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-6 sm:px-6 sm:pb-6 pt-0 text-sm sm:text-base text-white/85 leading-relaxed border-t border-white/10 mt-1">
                        <p className="pt-3">{faq.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
