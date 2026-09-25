import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import { ModalProvider } from "@/context/ModalContext";
import { BookingProvider } from "@/context/BookingContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AppointmentModal from "@/components/AppointmentModal";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Madvin Hospital – Mandvi Ortho Trauma Center | Dr. Vinod Kumar",
  description:
    "Madvin Hospital (Mandvi Ortho Trauma Center) in Gaya, led by Dr. Vinod Kumar (MBBS, MS Ortho). Premier center for robotic joint replacement, complex fracture trauma, spine care, and 24x7 emergency orthopedic surgery.",
  keywords: "Madvin Hospital, Mandvi Ortho Trauma Center, Dr. Vinod Kumar, Orthopedic Doctor Gaya, Knee Replacement, Hip Replacement, Spine Surgery, Gaya Trauma Center",
  openGraph: {
    title: "Madvin Hospital – Mandvi Ortho Trauma Center | Dr. Vinod Kumar",
    description:
      "Premier center for robotic joint replacement, endoscopic spine care, and 24x7 emergency trauma surgery in Gaya, Bihar.",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakarta.variable} ${inter.variable}`}>
      <body className="bg-[#fafaf7] text-[#132424] antialiased min-h-screen flex flex-col justify-between selection:bg-[#a7e8ec] selection:text-[#083c45]">
        <BookingProvider>
          <ModalProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <AppointmentModal />
          </ModalProvider>
        </BookingProvider>
      </body>
    </html>
  );
}
