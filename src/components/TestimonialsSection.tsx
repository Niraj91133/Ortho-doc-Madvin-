"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Star, ArrowLeft, ArrowRight, Quote, CheckCircle2 } from "lucide-react";
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
            Real mobility recovery stories from our patients.
          </h2>
          <p className="text-sm sm:text-base text-brand-muted">
            Read verified feedback from patients who underwent robotic joint replacement, fracture surgery, and emergency trauma care under Dr. Vinod Kumar.
          </p>
        </motion.div>

        {/* Featured Testimonial Card with Scroll Blur Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 40, filter: "blur(14px)", scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="bg-gradient-to-br from-[#0b5660] to-[#083c45] text-white rounded-3xl lg:rounded-4xl p-6 sm:p-10 lg:p-12 shadow-2xl relative overflow-hidden"
        >
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#a7e8ec]/10 rounded-full blur-3xl pointer-events-none" />

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 25, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, x: -25, filter: "blur(8px)" }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
            >
              {/* Left Photo with verified badge */}
              <div className="lg:col-span-5 relative w-full h-72 sm:h-96 rounded-2xl sm:rounded-3xl overflow-hidden shadow-xl bg-teal-950 border-2 border-white/20">
                <Image
                  src={current.image}
                  alt={current.author}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute bottom-4 left-4 right-4 bg-black/60 backdrop-blur-md p-3 rounded-2xl border border-white/10 flex items-center justify-between text-xs">
                  <span className="flex items-center gap-1.5 text-white font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Verified Google Review
                  </span>
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Quote & Details */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-6 lg:space-y-8">
                {/* Quote Icon */}
                <Quote className="w-10 h-10 text-[#a7e8ec]/40 -mb-2" />

                {/* Quote Text */}
                <blockquote className="text-lg sm:text-xl lg:text-[24px] font-heading font-normal leading-snug sm:leading-relaxed text-white/95 italic">
                  &ldquo;{current.quote}&rdquo;
                </blockquote>

                {/* Bottom Row: Author & Navigation */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/15">
                  <div>
                    <h4 className="text-lg sm:text-xl font-bold font-heading text-white">
                      {current.author}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#a7e8ec] font-semibold mt-0.5">
                      {current.role}
                    </p>
                  </div>

                  {/* Arrow Controls & Dots */}
                  <div className="flex items-center gap-4">
                    {/* Dots indicator */}
                    <div className="flex items-center gap-1.5">
                      {testimonials.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentIndex(i)}
                          className={`h-2 rounded-full transition-all ${
                            currentIndex === i ? "w-6 bg-[#a7e8ec]" : "w-2 bg-white/30"
                          }`}
                          aria-label={`Go to slide ${i + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={handlePrev}
                        className="w-10 h-10 rounded-full bg-white text-[#0b5660] hover:bg-[#a7e8ec] flex items-center justify-center transition-all shadow-md active:scale-95 hover:scale-105"
                        aria-label="Previous testimonial"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="w-10 h-10 rounded-full bg-white text-[#0b5660] hover:bg-[#a7e8ec] flex items-center justify-center transition-all shadow-md active:scale-95 hover:scale-105"
                        aria-label="Next testimonial"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
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
