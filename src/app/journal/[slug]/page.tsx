"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound, useParams } from "next/navigation";
import { DENTELIO_DATA } from "@/data/dentelioData";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { ArrowLeft, Clock, Calendar, CheckCircle2, Activity, UserCheck } from "lucide-react";
import { motion } from "framer-motion";

export default function ArticleDetailPage() {
  const params = useParams();
  const slug = params?.slug as string;

  const article = DENTELIO_DATA.journalArticles.find((a) => a.slug === slug);

  if (!article) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center pt-32 pb-20 px-5 text-center">
        <h1 className="text-3xl font-bold font-heading text-brand-dark mb-4">Article Not Found</h1>
        <p className="text-brand-muted mb-6">The orthopedic guide you are looking for does not exist.</p>
        <Link
          href="/journal"
          className="px-6 py-3 bg-[#0b5660] text-white rounded-full font-semibold text-sm"
        >
          Return to Ortho Journal
        </Link>
      </div>
    );
  }

  const relatedArticles = DENTELIO_DATA.journalArticles.filter((a) => a.id !== article.id);

  return (
    <div className="flex flex-col w-full">
      {/* Article Header with Motion Blur */}
      <section className="relative pt-36 pb-16 sm:pt-44 sm:pb-20 bg-[#0b5660] text-white overflow-hidden">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 space-y-6">
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#a7e8ec] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Ortho Journal</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30, filter: "blur(12px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-4"
          >
            <span className="inline-block px-3.5 py-1 bg-white/10 rounded-full text-xs font-semibold text-[#a7e8ec]">
              {article.tag}
            </span>

            <h1 className="text-3xl sm:text-5xl lg:text-5xl font-extrabold font-heading text-white leading-tight tracking-tight">
              {article.title}
            </h1>

            <div className="flex items-center gap-4 text-xs sm:text-sm text-white/80 pt-2">
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-[#a7e8ec]" />
                <span>{article.readTime}</span>
              </div>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-[#a7e8ec]" />
                <span>{article.date}</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content with Motion Blur Reveal */}
      <section className="bg-[#fafaf7] py-16 sm:py-20 px-5 sm:px-8">
        <div className="max-w-3xl mx-auto space-y-10">
          {/* Featured Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-80 sm:h-[420px] rounded-3xl overflow-hidden shadow-md bg-teal-950"
          >
            <Image
              src={article.image}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 800px"
              className="object-cover"
            />
          </motion.div>

          {/* Body Content */}
          <div className="prose prose-lg max-w-none text-[#132424] space-y-8">
            {article.content.map((sec, idx) => (
              <motion.div
                initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
                whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.7 }}
                key={idx}
                className="space-y-6"
              >
                <h2 className="text-2xl sm:text-3xl font-bold font-heading text-[#132424]">
                  {sec.heading}
                </h2>

                <div className="space-y-4 text-base sm:text-lg text-brand-dark/90 leading-relaxed font-body">
                  {sec.paragraphs.map((p, pIdx) => (
                    <p key={pIdx}>{p}</p>
                  ))}
                </div>

                {sec.keyPoints && (
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#0b5660]/20 space-y-4 my-8 shadow-sm">
                    <h3 className="text-lg font-bold font-heading text-[#0b5660] flex items-center gap-2">
                      <Activity className="w-5 h-5" />
                      <span>Key Clinical Takeaways</span>
                    </h3>
                    <ul className="space-y-3">
                      {sec.keyPoints.map((kp, kIdx) => (
                        <li key={kIdx} className="flex items-start gap-3 text-sm sm:text-base text-brand-dark">
                          <CheckCircle2 className="w-5 h-5 text-[#0b5660] shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Share & Author Card */}
          <motion.div
            initial={{ opacity: 0, y: 25, filter: "blur(8px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true }}
            className="pt-8 border-t border-brand-border flex flex-col sm:flex-row items-center justify-between gap-6 bg-white p-6 sm:p-8 rounded-3xl shadow-sm"
          >
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#0b5660]">Clinical Department</p>
              <h4 className="text-lg font-bold font-heading text-brand-dark">Madvin Orthopedic Surgical Board</h4>
              <p className="text-xs text-brand-muted">Reviewed by Senior Consultant Orthopedic Surgeons</p>
            </div>
            <Link
              href="/#doctors"
              className="px-6 py-2.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-xs sm:text-sm font-semibold rounded-full transition-colors shadow-sm"
            >
              Meet our Surgeons
            </Link>
          </motion.div>

          {/* Related Articles */}
          <div className="pt-12 space-y-6">
            <h3 className="text-2xl font-bold font-heading text-brand-dark">
              More Clinical Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/journal/${rel.slug}`}
                  className="bg-white rounded-2xl p-5 border border-brand-border hover:border-[#0b5660] hover:shadow-md transition-all group flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold text-[#0b5660] uppercase">
                      {rel.tag}
                    </span>
                    <h4 className="text-base font-bold font-heading text-brand-dark group-hover:text-[#0b5660] transition-colors leading-snug">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-xs text-[#0b5660] font-semibold mt-4 block">
                    Read guide →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </div>
  );
}
