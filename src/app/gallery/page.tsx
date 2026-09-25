"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { X, ZoomIn } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GalleryPage() {
  const { galleryItems } = DENTELIO_DATA;
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxImage, setLightboxImage] = useState<{ url: string; title: string } | null>(null);

  const categories = ["All", "Operation Theater", "Technology", "Surgeons", "Diagnostics", "Rehabilitation"];

  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <div className="flex flex-col w-full">
      {/* Subpage Hero Header with Motion Blur */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden bg-[#0b5660] text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
            alt="Madvin Hospital Infrastructure"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b5660] via-[#0b5660]/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl space-y-4"
          >
            <span className="text-xs sm:text-[13px] font-bold tracking-[0.18em] text-[#a7e8ec] uppercase block">
              MADVIN HOSPITAL GALLERY
            </span>
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold font-heading text-white leading-tight tracking-tight">
              State-of-the-art facilities.<br />Built for surgical excellence.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section with Staggered Motion Blur */}
      <section className="bg-[#fafaf7] py-16 sm:py-20 lg:py-24 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center gap-2.5 justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold transition-all ${
                  selectedCategory === cat
                    ? "bg-[#0b5660] text-white shadow-md scale-105"
                    : "bg-white text-[#132424] border border-brand-border hover:border-[#0b5660]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Photo Grid with AnimatePresence & Motion Blur */}
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            <AnimatePresence>
              {filteredItems.map((item) => (
                <motion.div
                  layout
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
                  transition={{ duration: 0.5 }}
                  key={item.id}
                  onClick={() => setLightboxImage({ url: item.image, title: item.title })}
                  className="group relative h-72 sm:h-80 lg:h-96 rounded-3xl overflow-hidden shadow-md bg-teal-950 cursor-pointer border border-brand-border/40"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-[#0b5660]/75 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 text-white">
                    <div className="flex justify-end">
                      <span className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                        <ZoomIn className="w-5 h-5 text-white" />
                      </span>
                    </div>
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#a7e8ec] block">
                        {item.category}
                      </span>
                      <h3 className="text-lg font-bold font-heading">{item.title}</h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Lightbox Modal with Blur */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-6 right-6 p-3 rounded-full bg-white/15 hover:bg-white/25 text-white transition-colors"
            aria-label="Close image"
          >
            <X className="w-6 h-6" />
          </button>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.3 }}
            className="relative max-w-4xl w-full h-[75vh] rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={lightboxImage.url}
              alt={lightboxImage.title}
              fill
              className="object-contain"
            />
          </motion.div>
        </div>
      )}

      <FAQSection />
      <CTASection />
    </div>
  );
}
