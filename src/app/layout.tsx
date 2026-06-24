import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Outfit } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Arora Designs | Luxury Interior Design Studio",
  description: "Extraordinary luxury interior design. Designing Spaces That Inspire.",
  openGraph: {
    title: "Arora Designs | Luxury Interior Design Studio",
    description: "Extraordinary luxury interior design. Designing Spaces That Inspire.",
    type: "website",
    siteName: "Arora Designs",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arora Designs",
    description: "Extraordinary luxury interior design.",
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground relative">
        {/* Global Fixed Background Wave Video */}
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="object-cover w-full h-full opacity-80 mix-blend-screen"
          >
            <source src="/videos/silkdesign.mp4" type="video/mp4" />
            <source src="/videos/silkdesign.webm" type="video/webm" />
          </video>
          {/* Subtle gradient so text remains readable globally */}
          <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/40"></div>
        </div>
        
        <div className="relative z-10 flex flex-col min-h-screen">
          <SmoothScroll>
            <CustomCursor />
          {children}
          </SmoothScroll>
        </div>
      </body>
    </html>
  );
}
