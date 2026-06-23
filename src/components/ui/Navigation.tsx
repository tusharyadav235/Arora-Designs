"use client";

import { useState } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";
import Link from "next/link";
import { List, X } from "@phosphor-icons/react";
import clsx from "clsx";

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
        className={clsx(
          "fixed top-0 left-0 w-full z-50 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isScrolled ? "py-4" : "py-6 md:py-8"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
      >
        <div 
          className={clsx(
            "max-w-7xl mx-auto px-6 h-16 md:h-20 flex items-center justify-between transition-all duration-700",
            isScrolled ? "bg-[#0f0f0e]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),0_4px_30px_rgba(0,0,0,0.5)] md:px-8 mx-4 md:mx-auto" : "bg-transparent"
          )}
        >
          <Link href="/" className="text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-display">
            Arora <span className="font-light text-accent">Designs</span>
          </Link>

          <div className="hidden md:flex items-center gap-10 text-[13px] font-medium tracking-[0.1em] uppercase">
            {links.map((link) => (
              <Link 
                key={link} 
                href={`#${link.toLowerCase()}`} 
                className="relative group py-2" 
                data-cursor="hover"
              >
                <span className="text-foreground/80 group-hover:text-white transition-colors duration-300 z-10 relative">
                  {link}
                </span>
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-accent transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
            <motion.button 
              onClick={() => window.dispatchEvent(new Event("open-booking"))}
              className="px-6 py-3 bg-white text-black hover:bg-accent hover:text-black rounded-full font-bold tracking-widest text-[11px] transition-colors duration-300" 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              data-cursor="hover"
            >
              BOOK CONSULTATION
            </motion.button>
          </div>

          <button className="md:hidden" onClick={() => setIsOpen(true)}>
            <List size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 z-[60] bg-[#0f0f0e]/95 backdrop-blur-2xl flex flex-col items-center justify-center">
          <button className="absolute top-6 right-6 p-4" onClick={() => setIsOpen(false)}>
            <X size={32} />
          </button>
          <div className="flex flex-col gap-8 text-2xl font-display font-bold tracking-widest text-center items-center uppercase">
            {links.map((link, i) => (
              <motion.div
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, type: "spring", stiffness: 100, damping: 20 }}
              >
                <Link
                  href={`#${link.toLowerCase()}`}
                  className="hover:text-accent transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link}
                </Link>
              </motion.div>
            ))}
            <motion.button 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 100, damping: 20 }}
              onClick={() => {
                setIsOpen(false);
                window.dispatchEvent(new Event("open-booking"));
              }}
              className="mt-8 px-8 py-4 bg-white text-black rounded-full text-sm font-bold transition-transform active:scale-95" 
            >
              BOOK CONSULTATION
            </motion.button>
          </div>
        </div>
      )}
    </>
  );
}
