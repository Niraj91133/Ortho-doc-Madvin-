"use client";

import React, { useState } from "react";
import Image from "next/image";
import { DENTELIO_DATA } from "@/data/dentelioData";
import { useBooking } from "@/context/BookingContext";
import FAQSection from "@/components/FAQSection";
import CTASection from "@/components/CTASection";
import { Phone, Mail, MapPin, Clock, CheckCircle2, ShieldCheck, Activity } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
  const { clinicName, subtitle, phone, altPhone, email, address } = DENTELIO_DATA;
  const { addAppointment } = useBooking();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [assignedToken, setAssignedToken] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      const record = addAppointment({
        patientName: formData.name,
        phone: formData.phone,
        email: formData.email,
        service: formData.department || "General Orthopedic Inquiry",
        doctor: "Dr. Vinod Kumar",
        date: new Date().toISOString().split("T")[0],
        timeSlot: "General OPD",
        notes: formData.message || "Online website contact inquiry",
      });
      setAssignedToken(record.tokenNumber);
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 700);
  };

  return (
    <div className="flex flex-col w-full">
      {/* Contact Hero Section with Motion Blur */}
      <section className="relative pt-36 pb-20 sm:pt-44 sm:pb-28 overflow-hidden bg-[#0b5660] text-white">
        {/* Background Image Container */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=80"
            alt="Madvin Hospital Contact & Care Center"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0b5660] via-[#0b5660]/95 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Header Copy with Motion Blur */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(12px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6 space-y-4"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full">
                <Activity className="w-3.5 h-3.5 text-[#a7e8ec]" />
                <span className="text-[11px] sm:text-xs font-bold tracking-[0.16em] text-[#a7e8ec] uppercase">
                  CONTACT {clinicName.toUpperCase()}
                </span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-extrabold font-heading text-white leading-tight tracking-tight">
                Let’s make your orthopedic<br />consultation simple.
              </h1>
              <p className="text-base sm:text-lg text-white/85 leading-relaxed max-w-lg pt-2">
                Need urgent orthopedic trauma care, a joint replacement second opinion, or spine surgery consultation? Send us your inquiry or visit our 24x7 emergency desk.
              </p>

              <div className="pt-4 flex flex-col gap-2 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#a7e8ec]" />
                  <span>Cashless Hospitalization & All Major TPAs Supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#a7e8ec]" />
                  <span>24x7 Trauma Surgeons & Modular OT on Standby</span>
                </div>
              </div>
            </motion.div>

            {/* Right Contact Form Card with Motion Blur */}
            <motion.div
              initial={{ opacity: 0, y: 30, filter: "blur(14px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="lg:col-span-6"
            >
              <div className="bg-[#132424]/85 backdrop-blur-md border border-white/15 p-6 sm:p-8 rounded-3xl shadow-2xl text-white">
                {isSubmitted ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="w-14 h-14 bg-[#a7e8ec]/20 text-[#a7e8ec] rounded-full flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold font-heading text-white">Inquiry Received!</h3>
                    <p className="text-sm text-white/80 max-w-xs mx-auto">
                      Thank you for contacting Madvin Hospital. Our OPD patient coordinator will call you at {formData.phone || "your number"} shortly.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="mt-4 px-6 py-2.5 bg-[#0b5660] text-white rounded-full text-xs font-semibold hover:bg-[#083c45] transition-colors"
                    >
                      Send Another Request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Patient / Attendant Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Rameshwar Prasad"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3.5 bg-[#0b5660]/70 border border-white/20 rounded-2xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#a7e8ec]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium text-white/80 mb-1.5">
                          Mobile Number *
                        </label>
                        <input
                          type="tel"
                          required
                          placeholder="+91 98765 00000"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full p-3.5 bg-[#0b5660]/70 border border-white/20 rounded-2xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#a7e8ec]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-white/80 mb-1.5">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="patient@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full p-3.5 bg-[#0b5660]/70 border border-white/20 rounded-2xl text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#a7e8ec]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-white/80 mb-1.5">
                        Department / Orthopedic Concern
                      </label>
                      <select
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        className="w-full p-3.5 bg-[#0b5660]/70 border border-white/20 rounded-2xl text-sm text-white focus:outline-none focus:border-[#a7e8ec]"
                      >
                        <option value="" className="bg-[#132424] text-white">Select treatment type...</option>
                        <option value="Robotic Knee / Hip Replacement" className="bg-[#132424] text-white">Robotic Knee / Hip Replacement</option>
                        <option value="Endoscopic Spine Surgery & Sciatica" className="bg-[#132424] text-white">Endoscopic Spine Surgery & Sciatica</option>
                        <option value="ACL / Sports Arthroscopy" className="bg-[#132424] text-white">ACL / Sports Arthroscopy</option>
                        <option value="Fracture & Trauma Emergency" className="bg-[#132424] text-white">Fracture & Trauma Emergency</option>
                        <option value="Pediatric Orthopedics (Clubfoot)" className="bg-[#132424] text-white">Pediatric Orthopedics (Clubfoot)</option>
                        <option value="General Joint Pain & Arthritis OPD" className="bg-[#132424] text-white">General Joint Pain & Arthritis OPD</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-2 py-3.5 bg-[#0b5660] hover:bg-[#083c45] text-white text-sm font-bold rounded-2xl transition-all shadow-md active:scale-95 disabled:opacity-50"
                    >
                      {isSubmitting ? "Submitting Inquiry..." : "Submit Consultation Request"}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Direct Contact Cards */}
      <section className="bg-[#fafaf7] py-16 sm:py-20 px-5 sm:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0b5660]/10 text-[#0b5660] flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">24x7 Emergency</p>
              <h4 className="text-base font-bold text-brand-dark mt-1">{phone}</h4>
              <p className="text-xs text-brand-muted mt-0.5">Instant Trauma Ambulance & OT</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0b5660]/10 text-[#0b5660] flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">Email Inquiries</p>
              <h4 className="text-base font-bold text-brand-dark mt-1">{email}</h4>
              <p className="text-xs text-brand-muted mt-0.5">Online report review & queries</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0b5660]/10 text-[#0b5660] flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">Hospital Location</p>
              <h4 className="text-sm font-bold text-brand-dark mt-1 leading-snug">{address}</h4>
              <p className="text-xs text-brand-muted mt-0.5">Easy accessibility & parking</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-brand-border shadow-sm flex flex-col justify-between space-y-4">
            <div className="w-10 h-10 rounded-2xl bg-[#0b5660]/10 text-[#0b5660] flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-brand-muted">OPD Timings</p>
              <h4 className="text-base font-bold text-brand-dark mt-1">10:00 AM – 8:00 PM</h4>
              <p className="text-xs text-brand-muted mt-0.5">Emergency open 24 hours daily</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection />
      <CTASection />
    </div>
  );
}
