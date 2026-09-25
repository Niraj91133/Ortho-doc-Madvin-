"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { DENTELIO_DATA } from "@/data/dentelioData";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { ArrowRight, Clock, BookOpen, Activity } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function JournalPage() {
  const { journalArticles } = DENTELIO_DATA;
  const [selectedTag, setSelectedTag] = useState("All");

  const tags = ["All", "Joint Replacement", "Spine Care", "Sports Medicine"];

  const filteredArticles =
    selectedTag === "All"
      ? journalArticles
      : journalArticles.filter((item) => item.tag === selectedTag);

  return (
    <div className="flex flex-col w-full">
      {/* Journal Hero Header with Motion Blur */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden bg-[#0b5660] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=2000&q=80"
            alt="Madvin Ortho Journal Header"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b5660] via-[#0b5660]/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 space-y-4"
          >
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#a7e8ec] uppercase block">
              MADVIN ORTHO JOURNAL
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold font-heading text-white leading-tight tracking-tight">
              Clinical insights for<br />pain-free movement.
            </h1>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-5"
          >
            <p className="text-base sm:text-lg text-white/85 leading-relaxed">
              Evidence-based orthopedic surgical guides, joint health essentials, and recovery roadmaps authored by Madvin Hospital specialists.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Articles Section with Staggered Motion Blur */}
      <section className="bg-[#fafaf7] py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Header & Tag Filter */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <span className="text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#0b5660] uppercase block">
                LATEST FROM MADVIN ORTHO
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#132424] mt-1">
                Clinical Research & Patient Guides
              </h2>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {tags.map((t) => (
                <button
                  key={t}
                  onClick={() => setSelectedTag(t)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold transition-all ${
                    selectedTag === t
                      ? "bg-[#0b5660] text-white shadow-md scale-105"
                      : "bg-white text-[#132424] border border-brand-border hover:border-[#0b5660]"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* 3 Dark Teal Cards Grid with Staggered Blur Reveal */}
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredArticles.map((article) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.95, filter: "blur(8px)" }}
                  transition={{ duration: 0.55 }}
                  key={article.id}
                  whileHover={{ y: -6 }}
                  className="bg-[#0b5660] text-white rounded-3xl p-5 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 group"
                >
                  {/* Image */}
                  <div className="relative w-full h-56 rounded-2xl overflow-hidden bg-teal-950 mb-5">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#132424]/85 backdrop-blur-md px-3 py-1 rounded-full text-[11px] font-semibold text-[#a7e8ec]">
                      {article.tag}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="space-y-3 flex-grow flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-[11px] text-[#a7e8ec]">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{article.readTime}</span>
                        <span>•</span>
                        <span>{article.date}</span>
                      </div>

                      <h3 className="text-xl font-bold font-heading text-white group-hover:text-[#a7e8ec] transition-colors leading-snug">
                        {article.title}
                      </h3>

                      <p className="text-sm text-white/80 leading-relaxed line-clamp-3">
                        {article.excerpt}
                      </p>
                    </div>

                    {/* Read Link */}
                    <div className="pt-5 border-t border-white/10 mt-4">
                      <Link
                        href={`/journal/${article.slug}`}
                        className="inline-flex items-center gap-2 text-sm font-semibold text-[#fafaf7] group-hover:text-[#a7e8ec] transition-colors"
                      >
                        <span>Read Clinical Guide</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </div>
  );
}
