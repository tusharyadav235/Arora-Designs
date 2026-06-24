"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Palette, Users, Clock, Leaf, TrendUp } from "@phosphor-icons/react";
import clsx from "clsx";

const features = [
  { icon: Palette, title: "Personalized Design", desc: "Tailored aesthetics that perfectly reflect your individual taste and lifestyle.", className: "md:col-span-2 md:row-span-2", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000" },
  { icon: Users, title: "Expert Team", desc: "Award-winning architects and designers dedicated to perfection.", className: "md:col-span-1 md:row-span-1" },
  { icon: ShieldCheck, title: "Luxury Materials", desc: "Sourcing only the finest, sustainable materials from around the globe.", className: "md:col-span-1 md:row-span-1" },
  { icon: Clock, title: "On-Time Delivery", desc: "Meticulous project management ensuring your dream space is ready on schedule.", className: "md:col-span-2 md:row-span-1", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=1000" },
  { icon: TrendUp, title: "Innovative Solutions", desc: "Integrating smart home technology seamlessly into luxury design.", className: "md:col-span-1 md:row-span-2", image: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&q=80&w=800" },
  { icon: Leaf, title: "Sustainable Focus", desc: "Eco-friendly practices without compromising on high-end aesthetics.", className: "md:col-span-1 md:row-span-1" },
  { icon: ShieldCheck, title: "Turnkey Service", desc: "From concept to final handover, we handle every single detail.", className: "md:col-span-1 md:row-span-1" },
];

function FeatureCard({ feature, index }: { feature: any; index: number }) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => setOpacity(1);
  const handleMouseLeave = () => setOpacity(0);
  
  const Icon = feature.icon;
  // Apply a spring-based staggered entry
  const springTransition = { type: "spring" as const, stiffness: 100, damping: 20, delay: index * 0.1 };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={springTransition}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={clsx(
        "relative overflow-hidden p-8 lg:p-10 bg-[#161615]/80 backdrop-blur-2xl group",
        "border border-white/5 rounded-3xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        "hover:border-white/10 transition-colors duration-500",
        feature.className
      )}
    >
      {feature.image && (
        <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl">
          <img 
            src={feature.image} 
            alt={feature.title} 
            className="w-full h-full object-cover opacity-30 group-hover:scale-110 group-hover:opacity-40 transition-all duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] mix-blend-luminosity" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#161615] via-[#161615]/80 to-transparent" />
        </div>
      )}

      {/* Spotlight hover effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
        style={{
          opacity,
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(214, 179, 106, 0.08), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10 flex flex-col h-full">
        <div className="w-14 h-14 rounded-2xl bg-black/40 border border-white/5 flex items-center justify-center mb-8 group-hover:scale-[1.02] transition-transform duration-500 group-hover:bg-accent/10 group-hover:border-accent/20">
          <Icon size={28} className="text-accent" />
        </div>
        <div className="mt-auto">
          <h4 className="text-2xl font-bold mb-3 tracking-tight font-display">{feature.title}</h4>
          <p className="text-muted leading-relaxed group-hover:text-foreground/90 transition-colors duration-500 max-w-[90%]">
            {feature.desc}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="py-24 md:py-40 px-6 relative z-10 overflow-hidden bg-transparent">
      {/* Abstract Background Elements */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-accent/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none z-0" />
      
      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div 
          className="text-left md:text-center max-w-3xl mx-auto mb-20 md:mb-28"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ type: "spring", stiffness: 80, damping: 20 }}
        >
          <div className="overflow-hidden mb-6 inline-block">
            <motion.h2 
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
              className="text-xs md:text-sm tracking-[0.2em] uppercase text-accent font-mono inline-block drop-shadow-md"
            >
              Our Edge
            </motion.h2>
          </div>
          <div className="overflow-hidden mb-6">
            <motion.h3 
              initial={{ y: "100%" }}
              animate={isInView ? { y: 0 } : { y: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.2 }}
              className="text-5xl md:text-7xl font-bold tracking-tighter drop-shadow-lg font-display"
            >
              Why Choose Arora Designs
            </motion.h3>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="text-foreground/70 text-xl max-w-2xl md:mx-auto drop-shadow-md"
          >
            We don't just design spaces; we curate lifestyles. Our holistic approach ensures every detail is flawless, bringing your vision to life.
          </motion.p>
        </motion.div>

        {/* Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-3 gap-6 auto-rows-[250px]">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
