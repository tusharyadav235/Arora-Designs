"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "motion/react";
import { Quotes } from "@phosphor-icons/react";

const mockTestimonials = [
  { text: "Arora Designs transformed our villa into a masterpiece. The attention to detail is unparalleled.", name: "James Carter", role: "Homeowner" },
  { text: "A truly immersive process. They listened to our vision and elevated it beyond our imagination.", name: "Sophia Reynolds", role: "CEO, Lumina" },
  { text: "Their luxury material sourcing and flawless execution make them the best in the industry.", name: "Oliver Thorne", role: "Real Estate Developer" },
];

function TestimonialCard({ t, index }: { t: any; index: number }) {
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

  return (
    <motion.div 
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="p-10 border border-white/10 bg-black/60 backdrop-blur-xl rounded-3xl relative overflow-hidden group"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 rounded-3xl z-0"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(214, 179, 106, 0.15), transparent 40%)`,
        }}
      />

      <Quotes size={48} className="text-white/5 absolute top-8 right-8 group-hover:text-accent/10 transition-colors duration-500" weight="fill" />
      <div className="relative z-10">
        <p className="text-lg text-foreground/90 leading-relaxed mb-8 group-hover:text-white transition-colors duration-500">
          "{t.text}"
        </p>
        <div>
          <h5 className="font-bold tracking-tight">{t.name}</h5>
          <p className="text-sm text-accent font-mono uppercase tracking-widest mt-1">{t.role}</p>
        </div>
      </div>
    </motion.div>
  );
}

export function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  const [testimonials, setTestimonials] = useState<any[]>(mockTestimonials);

  useEffect(() => {
    fetch(`/api/testimonials`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch(err => console.error("Failed to fetch testimonials from backend", err));
  }, []);

  return (
    <section className="py-20 md:py-32 px-6 bg-transparent relative z-10 border-b border-white/5 overflow-hidden">

      <div className="max-w-7xl mx-auto relative z-10" ref={ref}>
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-mono drop-shadow-md">
            Client Voices
          </h2>
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter drop-shadow-lg">Testimonials</h3>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id || i} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
