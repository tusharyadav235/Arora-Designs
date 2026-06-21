"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = ["Projects", "Services", "About", "Contact"];

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-500 ${
          isScrolled ? "bg-background/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold tracking-widest uppercase font-mono">
            Arora Designs
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
            {links.map((link) => (
              <Link key={link} href={`#${link.toLowerCase()}`} className="hover:text-accent transition-colors" data-cursor="hover">
                {link}
              </Link>
            ))}
            <button 
              onClick={() => window.dispatchEvent(new Event("open-booking"))}
              className="px-6 py-2.5 bg-foreground text-background rounded-full hover:scale-105 transition-transform" 
              data-cursor="hover"
            >
              Book Consultation
            </button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <List size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl flex flex-col items-center justify-center">
          <button className="absolute top-6 right-6" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8 text-2xl font-medium tracking-wide text-center items-center">
            {links.map((link) => (
              <Link
                key={link}
                href={`#${link.toLowerCase()}`}
                className="hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new Event("open-booking"));
              }}
              className="mt-4 px-8 py-4 bg-foreground text-background rounded-full hover:scale-105 transition-transform text-lg" 
            >
              Book Consultation
            </button>
          </div>
        </div>
      )}
    </>
  );
}
