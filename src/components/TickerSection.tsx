"use client";

import React from "react";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Star } from "lucide-react";

export default function TickerSection() {
  const { tickerItems } = DENTELIO_DATA;

  return (
    <div className="bg-[#083c45] border-t border-b border-white/10 py-4 sm:py-5 overflow-hidden select-none">
      <div className="flex whitespace-nowrap">
        {/* First track */}
        <div className="flex items-center gap-8 shrink-0 animate-marquee">
          {tickerItems.map((item, index) => (
            <div key={`track1-${index}`} className="flex items-center gap-6">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/95 uppercase">
                {item}
              </span>
              <Star className="w-3.5 h-3.5 fill-[#a7e8ec] text-[#a7e8ec] shrink-0" />
            </div>
          ))}
        </div>

        {/* Duplicate track for seamless infinite loop */}
        <div className="flex items-center gap-8 shrink-0 animate-marquee" aria-hidden="true">
          {tickerItems.map((item, index) => (
            <div key={`track2-${index}`} className="flex items-center gap-6">
              <span className="text-xs sm:text-sm font-semibold tracking-wide text-white/95 uppercase">
                {item}
              </span>
              <Star className="w-3.5 h-3.5 fill-[#a7e8ec] text-[#a7e8ec] shrink-0" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
