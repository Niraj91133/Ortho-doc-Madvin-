"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Star, ArrowLeft, ArrowRight, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function TestimonialsSection() {
  const { testimonials } = DENTELIO_DATA;
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const current = testimonials[currentIndex];

  return (
    <section className="bg-[#fafaf7] py-20 sm:py-24 lg:py-28 px-5 sm:px-8 lg:px-12 overflow-hidden">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Header with Motion Blur */}
        <motion.div
          initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7 }}
          className="text-center space-y-3 max-w-2xl mx-auto"
        >
          <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
            PATIENT STORIES & MOBILITY RECOVERY
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold font-heading text-[#132424] tracking-tight">
            Kind words from brighter smiles.
          </h2>
        </motion.div>

        {/* Featured Testimonial Card with Scroll Blur Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)", scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="bg-[#0b5660] text-white rounded-3xl lg:rounded-4xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -25, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Photo */}
              <div className="lg:col-span-5 relative w-full h-72 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-teal-950">
                <Image
                  src={current.image}
                  alt={current.author}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
              </div>

              {/* Right Quote & Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:space-y-8">
                {/* Star Rating */}
                <div className="flex items-center gap-1.5 text-amber-300">
                  {[...Array(current.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-300 text-amber-300" />
                  ))}
                  <span className="text-xs text-white/80 ml-2 font-semibold">Verified Patient Recovery</span>
                </div>

                {/* Quote */}
                <blockquote className="text-xl sm:text-2xl lg:text-[26px] font-heading font-medium leading-snug sm:leading-relaxed text-white/95 italic">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Bottom Row: Author & Navigation */}
                <div className="flex items-center justify-between pt-4 border-t border-white/15">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
                      {current.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a7e8ec] font-semibold mt-0.5">
                      {current.role}
                    </p>
                  </div>

                  {/* Arrow Controls */}
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handlePrev}
                      className="w-11 h-11 rounded-full bg-white text-[#0b5660] hover:bg-[#a7e8ec] flex items-center justify-center transition-all shadow-md active:scale-95 hover:scale-105"
                      aria-label="Previous testimonial"
                    >
                      <ArrowLeft className="w-5 h-5" />
                    </button>
                    <button
                      onClick={handleNext}
                      className="w-11 h-11 rounded-full bg-white text-[#0b5660] hover:bg-[#a7e8ec] flex items-center justify-center transition-all shadow-md active:scale-95 hover:scale-105"
                      aria-label="Next testimonial"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
