"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { ShieldCheck, Palette, Users, Clock, Leaf, TrendUp } from "@phosphor-icons/react";

const features = [
  { icon: Palette, title: "Personalized Design", desc: "Tailored aesthetics that perfectly reflect your individual taste and lifestyle." },
  { icon: Users, title: "Expert Team", desc: "Award-winning architects and designers dedicated to perfection." },
  { icon: ShieldCheck, title: "Luxury Materials", desc: "Sourcing only the finest, sustainable materials from around the globe." },
  { icon: Clock, title: "On-Time Delivery", desc: "Meticulous project management ensuring your dream space is ready on schedule." },
  { icon: TrendUp, title: "Innovative Solutions", desc: "Integrating smart home technology seamlessly into luxury design." },
  { icon: Leaf, title: "Sustainable Focus", desc: "Eco-friendly practices without compromising on high-end aesthetics." },
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden p-10 bg-black/60 backdrop-blur-xl border border-white/10 rounded-3xl group"
    >
      {/* Spotlight hover effect */}
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(214, 179, 106, 0.15), transparent 40%)`,
        }}
      />
      
      <div className="relative z-10">
        <div className="w-14 h-14 rounded-full bg-black/40 border border-white/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 group-hover:bg-accent/20 group-hover:border-accent/30">
          <Icon size={28} className="text-accent" />
        </div>
        <h4 className="text-xl font-bold mb-4 tracking-tight">{feature.title}</h4>
        <p className="text-muted leading-relaxed group-hover:text-foreground/90 transition-colors duration-500">{feature.desc}</p>
      </div>
    </motion.div>
  );
}

export function WhyChooseUs() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="services" className="py-20 md:py-32 px-6 relative z-10 border-y border-white/5 overflow-hidden">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full opacity-60 mix-blend-screen"
        >
          <source src="/videos/silkdesign.webm" type="video/webm" />
        </video>
        {/* Dark gradient overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-mono drop-shadow-md">
            Our Edge
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter mb-6 drop-shadow-lg">Why Choose Arora Designs</h3>
          <p className="text-foreground/80 text-lg max-w-2xl mx-auto drop-shadow-md">
            We don't just design spaces; we curate lifestyles. Our holistic approach ensures every detail is flawless, bringing your vision to life.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={i} feature={feature} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
