export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  points: string[];
}

export interface DoctorItem {
  id: string;
  name: string;
  role: string;
  experience: string;
  image: string;
  bio?: string;
  qualifications?: string;
  opdHours?: string;
  emergency?: string;
  specialties?: string[];
}

export interface TestimonialItem {
  id: string;
  quote: string;
  author: string;
  role: string;
  rating: number;
  image: string;
  procedure?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
}

export interface JournalArticle {
  id: string;
  slug: string;
  tag: string;
  title: string;
  subtitle: string;
  excerpt: string;
  image: string;
  readTime: string;
  date: string;
  content: {
    heading: string;
    paragraphs: string[];
    keyPoints?: string[];
  }[];
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  span?: string;
}

export const DENTELIO_DATA = {
  clinicName: "Madvin Hospital",
  clinicSubName: "Mandvi Ortho Trauma Center",
  subtitle: "Advanced Orthopedic, Joint Replacement & 24x7 Trauma Center",
  doctorName: "Dr. Vinod Kumar",
  doctorRole: "Senior Consultant Orthopedic Surgeon & Trauma Specialist",
  doctorQualifications: "MBBS, MS (Orthopedics)",
  doctorExperience: "18+ Years Clinical & Surgical Excellence",
  phone: "+91 70048 03925",
  altPhone: "070048 03925",
  email: "care@madvinhospital.com",
  address: "Mandvi Ortho Trauma Center, Jail Road, Opposite S P Kothi, Gewalbigha, Gaya, Bihar 823001",
  mapQuery: "Mandvi+Ortho+Trauma+Center+Gaya+Bihar",
  rating: "5.0",
  ratingCount: "15,000+ Surgeries & Recoveries",
  opdTimings: "Morning: 10:00 AM - 02:00 PM | Evening: 04:30 PM - 08:00 PM (Emergency 24x7 Open)",
  
  hero: {
    badge: "MANDVI ORTHO TRAUMA CENTER · GAYA · 24X7 EMERGENCY",
    heading: "Pain-free movement,\nin expert hands.",
    description: "Led by Senior Orthopedic Surgeon Dr. Vinod Kumar (MBBS, MS Ortho), Madvin Hospital delivers robotic joint replacement, advanced fracture trauma repair, spine care, and 24x7 emergency surgical relief in Gaya.",
    primaryCta: "Book OPD Appointment",
    secondaryCta: "Meet Dr. Vinod Kumar",
    trustText: "Rated 5.0 ★★★★★ by 15,000+ Patients",
    bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85",
    altBgImage: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=2000&q=85"
  },

  approach: {
    badge: "DR. VINOD KUMAR'S CLINICAL APPROACH",
    heading: "Restoring active mobility with precision, minimally invasive surgical excellence.",
    stats: [
      { value: "5.0 ★", label: "Patient satisfaction rating" },
      { value: "15k+", label: "Successful orthopedic surgeries" },
      { value: "18+", label: "Years of specialized surgical care" }
    ]
  },

  tickerItems: [
    "Robotic Joint Replacement · 24x7 Emergency Trauma",
    "Minimally Invasive Spine Surgery",
    "Sports Injury & Arthroscopic Care",
    "Advanced Physiotherapy & Rapid Recovery",
    "Robotic Joint Replacement · 24x7 Emergency Trauma",
    "Minimally Invasive Spine Surgery",
  ],

  services: [
    {
      id: "joint-replacement",
      title: "Robotic Joint Replacement",
      tagline: "Total Knee, Hip & Shoulder Arthroplasty",
      description: "State-of-the-art sub-millimeter precision computer & robotic-assisted joint replacement ensuring minimal tissue disruption, rapid same-day rehabilitation, and extended implant longevity.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80",
      points: [
        "Robotic-guided Total & Partial Knee Replacement",
        "Dual-mobility & ceramic Hip Arthroplasty",
        "Fast-track recovery program with same-day walking"
      ]
    },
    {
      id: "arthroscopy-sports",
      title: "Arthroscopy & Sports Medicine",
      tagline: "Keyhole surgery for ligament & cartilage repair",
      description: "Minimally invasive keyhole arthroscopic procedures for ACL/PCL reconstructions, rotator cuff repairs, meniscus preservation, and complex athletic sports injuries.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1200&q=80",
      points: [
        "ACL, PCL & multi-ligament knee reconstruction",
        "Shoulder instability, Bankart & Rotator Cuff repair",
        "Platelet-Rich Plasma (PRP) & regenerative therapies"
      ]
    },
    {
      id: "spine-surgery",
      title: "Spine & Disc Care",
      tagline: "Endoscopic decompression & deformity correction",
      description: "Comprehensive diagnosis and cutting-edge surgical management for herniated discs, spinal stenosis, sciatica, spondylolisthesis, and scoliosis corrections.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      points: [
        "Endoscopic keyhole microdiscectomy & decompression",
        "Cervical & Lumbar spinal fusion with instrumentation",
        "Non-surgical targeted epidural nerve root blocks"
      ]
    },
    {
      id: "trauma-fracture",
      title: "24x7 Trauma & Fracture Care",
      tagline: "Immediate multi-trauma emergency surgery",
      description: "Round-the-clock specialized orthopedic trauma response for complex compound fractures, pelvic-acetabular injuries, non-unions, and critical poly-trauma stabilization.",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1200&q=80",
      points: [
        "24x7 Emergency OT and trauma surgeon availability",
        "Modern titanium locking plates & intramedullary nailing",
        "High-energy accident and limb reconstruction center"
      ]
    },
    {
      id: "pediatric-ortho",
      title: "Pediatric Orthopedics & Rehab",
      tagline: "Congenital deformity & growth plate treatment",
      description: "Gentle, expert surgical and non-surgical correction of clubfoot, developmental dysplasia of hip (DDH), limb alignment deformities, and sports injuries in growing children.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80",
      points: [
        "Ponseti method for CTEV / Clubfoot correction",
        "Growth modulation and limb lengthening surgeries",
        "Advanced pediatric gait rehabilitation"
      ]
    }
  ],

  inside: {
    badge: "INSIDE MADVIN HOSPITAL",
    heading: "World-class surgical care.\nComfort you can trust.",
    instruction: "Drag to explore →",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
        caption: "Ultra-clean Laminar Airflow Modular Operation Theaters"
      },
      {
        url: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80",
        caption: "High-resolution Digital X-Ray & C-Arm fluoroscopy suite"
      },
      {
        url: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
        caption: "Dedicated Orthopedic Intensive Care & Recovery Units"
      },
      {
        url: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
        caption: "Advanced Physiotherapy & Robotic Gait Training Hall"
      },
      {
        url: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
        caption: "Private Deluxe Patient Suites with 24x7 monitoring"
      }
    ]
  },

  howItWorks: {
    badge: "HOW IT WORKS",
    heading: "Your journey to painless, confident movement.",
    steps: [
      {
        step: 1,
        title: "Clinical Evaluation.",
        description: "Comprehensive diagnostic imaging, digital X-rays, and unhurried consultation.",
        icon: "calendar",
        image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=800&q=80"
      },
      {
        step: 2,
        title: "Precision Treatment.",
        description: "Personalized surgical or non-surgical therapy tailored to your bone and joint health.",
        icon: "user",
        image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80"
      },
      {
        step: 3,
        title: "Full Recovery & Rehab.",
        description: "Structured physiotherapy plan to get you walking comfortably and returning to life.",
        icon: "sparkles",
        image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
      }
    ]
  },

  doctors: [
    {
      id: "dr-vinod-kumar",
      name: "Dr. Vinod Kumar",
      role: "Founder & Senior Consultant Orthopedic Surgeon",
      experience: "18+ Years Surgical Experience",
      qualifications: "MBBS, MS (Orthopedics)",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=85",
      bio: "Chief Orthopedic & Trauma Surgeon at Mandvi Ortho Trauma Center (Madvin Hospital), Gaya. Renowned for over 15,000 successful surgeries in robotic & conventional knee/hip replacement, complex poly-trauma fracture management, arthroscopy, and spine care.",
      opdHours: "Morning: 10:00 AM – 02:00 PM | Evening: 04:30 PM – 08:00 PM (Mon - Sat)",
      emergency: "24x7 Emergency Trauma Unit Available",
      specialties: [
        "Robotic & Minimal Access Joint Replacement (Knee & Hip)",
        "Complex Pelvic & Acetabular Fracture Fixation",
        "Arthroscopic Knee & Shoulder Ligament Reconstruction",
        "Minimally Invasive Spine & Disc Decompression",
        "Bone Deformity Correction & Pediatric Orthopedics"
      ]
    }
  ],

  whyDentelio: {
    badge: "WHY MADVIN HOSPITAL",
    heading: "Advanced orthopedic care\ndesigned around you.",
    images: [
      "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=900&q=80",
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80"
    ],
    features: [
      {
        icon: "heart",
        title: "Sub-Millimeter Precision & Expert Hands",
        description: "Dr. Vinod Kumar combines state-of-the-art precision surgical techniques with fast-track recovery protocols."
      },
      {
        icon: "sparkles",
        title: "Fast-Track Rapid Recovery",
        description: "Our multimodal pain management protocols allow most joint replacement patients to stand within hours."
      },
      {
        icon: "shield",
        title: "24x7 Emergency Trauma & ICU",
        description: "Immediate emergency surgical readiness, digital C-arm, blood storage support, and dedicated post-op ICU care."
      }
    ]
  },

  testimonials: [
    {
      id: "t1",
      quote: "Dr. Vinod Kumar is an exceptionally skilled orthopedic surgeon in Gaya. He handled my family member's complex fracture and joint surgery with unmatched precision. Within weeks the mobility returned without complications. The staff and care at Mandvi Ortho Trauma Center are truly commendable.",
      author: "Upendra Kumar Sharma",
      role: "Verified Google Review · Complex Fracture & Joint Care",
      rating: 5,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "t2",
      quote: "Very polite and experienced doctor. Dr. Vinod Kumar gives sufficient time to listen to bone and joint issues carefully. Highly satisfied with the diagnosis, rapid recovery treatment, and transparent advice. Best orthopedic center in Gaya.",
      author: "Nikita Chhetri",
      role: "Verified Google Review · Knee & Joint Consultation",
      rating: 5,
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=800&q=80"
    },
    {
      id: "t3",
      quote: "Best orthopedic and 24x7 emergency trauma hospital in Gaya. When my brother had a late night vehicular accident, Dr. Vinod Kumar arrived immediately and operated to stabilize the multiple fractures. He is a true lifesaver. 100% recommended.",
      author: "Sachin Yadav",
      role: "Verified Google Review · 24x7 Emergency Trauma Care",
      rating: 5,
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80"
    }
  ],

  faqs: [
    {
      id: "faq-1",
      question: "How long does it take to walk after robotic knee or hip replacement?",
      answer: "With our advanced fast-track surgical protocol and specialized anesthesia, most patients are able to stand and take supported steps within 4 to 6 hours after surgery, and walk comfortably independently within 2 to 3 weeks."
    },
    {
      id: "faq-2",
      question: "Do you offer cashless mediclaim and Ayushman / TPA insurance tie-ups?",
      answer: "Yes, Madvin Hospital supports all major health insurance TPAs (Star Health, HDFC Ergo, ICICI Lombard, Care Health, Medi Assist, etc.) and offers seamless cashless hospitalization assistance."
    },
    {
      id: "faq-3",
      question: "Is spine surgery safe, and what is endoscopic spine surgery?",
      answer: "Modern endoscopic spine surgery is minimally invasive, performed through a tiny keyhole incision using high-definition cameras. It preserves muscles, minimizes blood loss, and allows discharge within 24 hours with exceptional safety."
    },
    {
      id: "faq-4",
      question: "Do you have 24x7 emergency trauma and fracture facilities?",
      answer: "Yes, our Emergency Trauma Care unit operates 24 hours a day, 365 days a year with on-duty orthopedic trauma surgeons, digital X-Ray, modern modular operation theaters, and blood storage facility."
    }
  ],

  cta: {
    badge: "24x7 Orthopedic & Emergency Care",
    heading: "Your journey to a pain-free life starts here.",
    description: "Consult our senior orthopedic surgeons today and discover advanced treatments for lasting joint, spine, and bone health.",
    buttonText: "Book Orthopedic Consultation",
    bgImage: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=2000&q=85"
  },

  journalArticles: [
    {
      id: "j1",
      slug: "what-to-expect-during-robotic-knee-replacement",
      tag: "Joint Replacement",
      title: "What to expect during robotic knee replacement surgery",
      subtitle: "Precision planning for lifetime joint comfort",
      excerpt: "A comprehensive clinical guide on how robotic 3D navigation ensures accurate implant positioning and rapid postoperative recovery.",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
      readTime: "5 min read",
      date: "September 2026",
      content: [
        {
          heading: "How Robotic Navigation Transforms Joint Arthroplasty",
          paragraphs: [
            "Robotic knee replacement does not mean a machine performs the surgery on its own. Instead, it acts as an ultra-high precision extension of the orthopedic surgeon's hands, tracking bone morphology in real-time with sub-millimeter accuracy.",
            "Traditional joint replacements rely heavily on mechanical cutting jigs. In contrast, 3D computer-guided systems generate a virtual map of your unique knee anatomy, ensuring implants are placed in perfect alignment with your natural hip-knee-ankle axis.",
            "By protecting surrounding collateral ligaments and healthy soft tissue, patients experience significantly less postoperative pain, reduced swelling, and accelerated return to walking."
          ],
          keyPoints: [
            "Personalized 3D surgical pre-planning tailored to your specific bone structure.",
            "Minimal soft-tissue trauma and preservation of healthy bone margin.",
            "Patients typically begin walking on the same day of surgery."
          ]
        }
      ]
    },
    {
      id: "j2",
      slug: "understanding-endoscopic-spine-surgery-for-sciatica",
      tag: "Spine Care",
      title: "Understanding endoscopic spine surgery for sciatica & slipped disc",
      subtitle: "Keyhole relief without large incisions",
      excerpt: "Learn how modern spine surgeons decompress pinched nerves through a tiny 7mm keyhole incision with zero muscle damage.",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
      readTime: "4 min read",
      date: "September 2026",
      content: [
        {
          heading: "Targeted Nerve Decompression with Rapid Discharge",
          paragraphs: [
            "Sciatica occurs when a herniated or bulging lumbar disc compresses the sciatic nerve root, sending sharp radiating pain down the buttock, leg, and foot. When conservative therapies fail, endoscopic discectomy is the gold standard.",
            "Through a tiny pencil-sized incision under local or regional anesthesia, an ultra-fine high-definition endoscope is navigated directly to the herniated disc fragment, removing only the compressive part without destabilizing the spine.",
            "Because no spinal muscles or bone arches are cut, recovery is rapid, and patients typically walk out of the hospital within 24 hours."
          ],
          keyPoints: [
            "Tiny 7-8mm incision requiring minimal to no sutures.",
            "Immediate relief from shooting leg pain and numbness.",
            "Fast return to office work within 7 to 10 days."
          ]
        }
      ]
    },
    {
      id: "j3",
      slug: "acl-tear-recovery-guide-for-athletes",
      tag: "Sports Medicine",
      title: "The complete ACL tear recovery & rehab roadmap for athletes",
      subtitle: "From injury to returning to high-performance sports",
      excerpt: "A step-by-step clinical overview of arthroscopic ACL reconstruction, hamstring/patellar tendon grafting, and functional physical therapy.",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1000&q=80",
      readTime: "6 min read",
      date: "September 2026",
      content: [
        {
          heading: "Structured Milestones from Surgery to Field",
          paragraphs: [
            "Anterior Cruciate Ligament (ACL) tears are among the most common knee injuries in athletes. Modern arthroscopic reconstruction uses autologous tendon grafts to rebuild a robust new ligament with anatomic positioning.",
            "Rehabilitation begins immediately in the hospital with range-of-motion exercises, followed by progressive quadriceps strengthening, balance training, and proprioception drills.",
            "With modern sports rehabilitation protocols, over 90% of athletes successfully return to competitive agility sports between 6 to 9 months post-surgery."
          ],
          keyPoints: [
            "Anatomic tunnel placement using high-definition 4K arthroscopy.",
            "Early weight-bearing with protective functional knee braces.",
            "Structured return-to-sport testing to prevent re-injury."
          ]
        }
      ]
    }
  ],

  galleryItems: [
    {
      id: "g1",
      title: "Robotic Joint Replacement OT Suite",
      category: "Operation Theater",
      image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1 md:col-span-2 row-span-2"
    },
    {
      id: "g2",
      title: "Modern Modular Surgical Suite",
      category: "Technology",
      image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1 md:col-span-2"
    },
    {
      id: "g3",
      title: "Orthopedic Surgical Care Team",
      category: "Surgeons",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1"
    },
    {
      id: "g4",
      title: "High Precision Ortho Instruments",
      category: "Equipment",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1"
    },
    {
      id: "g5",
      title: "Spine & Joint Diagnostic Lab",
      category: "Diagnostics",
      image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1 md:col-span-2"
    },
    {
      id: "g6",
      title: "Advanced Physical Rehab Hall",
      category: "Rehabilitation",
      image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1"
    },
    {
      id: "g7",
      title: "Digital C-Arm X-Ray Station",
      category: "Equipment",
      image: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1"
    },
    {
      id: "g8",
      title: "24x7 Emergency Trauma Ward",
      category: "Emergency",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80",
      span: "col-span-1 md:col-span-2"
    }
  ]
};
