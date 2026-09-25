"use client";

import React from "react";
import Link from "next/link";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { Instagram, Facebook, Linkedin, Activity, PhoneCall, Mail, MapPin, Lock } from "lucide-react";

export default function Footer() {
  const { clinicName, subtitle, phone, altPhone, email, address } = DENTELIO_DATA;

  const exploreLinks = [
    { name: "Home", href: "/" },
    { name: "About Hospital", href: "/about" },
    { name: "Orthopedic Treatments", href: "/services" },
    { name: "Our Senior Surgeons", href: "/doctors" },
    { name: "Hospital Gallery", href: "/gallery" },
    { name: "Ortho Journal & Guides", href: "/journal" },
    { name: "Contact & OPD Schedule", href: "/contact" },
  ];

  const specialtyLinks = [
    { name: "Robotic Knee Replacement", href: "/services" },
    { name: "Hip & Shoulder Arthroplasty", href: "/services" },
    { name: "Endoscopic Spine Surgery", href: "/services" },
    { name: "ACL Arthroscopy & Sports Injury", href: "/services" },
    { name: "24x7 Emergency Trauma Unit", href: "/contact" },
    { name: "Pediatric Orthopedics (Clubfoot/DDH)", href: "/services" },
  ];

  return (
    <footer className="bg-[#083c45] text-white pt-16 sm:pt-20 pb-10 px-5 sm:px-8 lg:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto space-y-12 sm:space-y-16">
        {/* Main Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12">
          {/* Brand & Socials (4 cols) */}
          <div className="lg:col-span-4 space-y-5">
            <Link 
              href="/" 
              className="flex items-center gap-2 inline-flex"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 text-white flex items-center justify-center">
                <Activity className="w-4 h-4 text-[#a7e8ec]" />
              </div>
              <div>
                <span className="text-2xl font-extrabold font-heading tracking-tight text-white block leading-none">
                  {clinicName}
                </span>
                <span className="text-[10px] font-bold tracking-wider text-[#a7e8ec] uppercase block mt-1">
                  {subtitle}
                </span>
              </div>
            </Link>
            <p className="text-sm text-white/75 max-w-sm leading-relaxed">
              A premier center of excellence for robotic joint replacements, spine surgery, sports medicine, and 24x7 emergency orthopedic trauma care.
            </p>

            <div className="flex items-center gap-3.5 pt-2 text-white/80">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 hover:text-white flex items-center justify-center transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Specialty Links (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a7e8ec]">
              Key Specialties
            </h4>
            <ul className="space-y-2.5">
              {specialtyLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Links (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a7e8ec]">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-xs sm:text-sm text-white/80 hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/admin"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#a7e8ec] hover:text-white bg-white/10 px-2.5 py-1 rounded-md transition-all hover:bg-white/20"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Admin Panel</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#a7e8ec]">
              Emergency & OPD
            </h4>
            <div className="space-y-3 text-xs sm:text-sm text-white/80">
              <p className="flex items-start gap-2.5">
                <PhoneCall className="w-4 h-4 text-[#a7e8ec] shrink-0 mt-0.5" />
                <span>
                  <strong className="block text-white">Emergency 24x7:</strong>
                  <a href={`tel:${phone}`} className="hover:text-white transition-colors">
                    {phone}
                  </a>
                  <br />
                  <a href={`tel:${altPhone}`} className="hover:text-white transition-colors">
                    {altPhone}
                  </a>
                </span>
              </p>
              <p className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-[#a7e8ec] shrink-0 mt-0.5" />
                <a href={`mailto:${email}`} className="hover:text-white transition-colors">
                  {email}
                </a>
              </p>
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#a7e8ec] shrink-0 mt-0.5" />
                <span className="text-white/70">{address}</span>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Admin Dashboard Link */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <p>© 2026 {clinicName} (Mandvi Ortho Trauma Center). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link
              href="/admin"
              className="text-[#a7e8ec] hover:text-white flex items-center gap-1.5 font-semibold bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-lg border border-white/10 transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Dashboard & OPD Management</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
