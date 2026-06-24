"use client";

import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "motion/react";
import clsx from "clsx";

const mockProjects = [
  { title: "The Glass House", category: "Villa", imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" },
  { title: "Skyline Penthouse", category: "Apartment", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000" },
  { title: "Minimalist Haven", category: "Residential", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" },
  { title: "Lumina Office", category: "Commercial", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" },
  { title: "The Zenith Retreat", category: "Villa", imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=2000" },
];

function ProjectCard({ project, index }: { project: any; index: number }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect on the image
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <motion.div 
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ type: "spring", stiffness: 80, damping: 20, delay: index * 0.1 }}
      className={clsx(
        "group relative overflow-hidden rounded-2xl cursor-pointer bg-card/50 backdrop-blur-sm border border-white/5",
        "shadow-2xl transition-all duration-700 hover:border-white/20 hover:shadow-accent/5",
        // Alternate aspect ratios to break symmetry
        index % 2 === 0 ? "aspect-[4/5] md:aspect-[3/4]" : "aspect-square md:aspect-[4/3]"
      )}
      data-cursor="hover"
    >
      <motion.div style={{ y, height: "120%" }} className="absolute -top-[10%] -left-0 w-full z-0">
        <img 
          src={project.imageUrl || project.image} 
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1.5s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
        />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0e]/90 via-[#0f0f0e]/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-700 z-10" />
      
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-10 translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] z-20">
        <div className="overflow-hidden mb-3">
          <p className="text-accent font-mono text-xs md:text-sm uppercase tracking-widest translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 delay-100 ease-[cubic-bezier(0.16,1,0.3,1)]">
            {project.category}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <h4 className="text-3xl md:text-4xl font-bold text-white font-display tracking-tight drop-shadow-md">{project.title}</h4>
          <a 
            href="tel:+919711144495" 
            className="bg-white/5 hover:bg-accent hover:text-black text-white p-4 rounded-full backdrop-blur-md transition-all duration-300 border border-white/10 hover:border-transparent opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
            title="Call to discuss a similar project"
            onClick={(e) => e.stopPropagation()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
              <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.41-38.83-38.83l20.78-24.34a8.12,8.12,0,0,0,.56-.75,16,16,0,0,0,1.4-15.17l-.06-.13L97.63,33.64a16,16,0,0,0-16.82-9.26L33.63,32.7A16,16,0,0,0,20,48.62c.24,53,24.46,102.55,68.21,139.73C125.13,219.67,167.33,236,207.38,236A16,16,0,0,0,223.3,222.37l8.32-47.18A16,16,0,0,0,222.37,158.46ZM207.38,220h0c-37.49,0-77.06-15.35-111.45-50.55C61.35,134.94,46,95.38,46,57.88L46,57.6,92.51,50.7,112.9,96l-20.91,24.5a8,8,0,0,0-.56,8.71c9,19.34,27.18,37.52,46.52,46.52a8,8,0,0,0,8.71-.56L171.16,154.3l45.3,20.39-6.9,46.51A16,16,0,0,0,207.38,220Z"></path>
            </svg>
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export function ProjectShowcase() {
  const [projects, setProjects] = useState<any[]>(mockProjects);
  const headerRef = useRef(null);
  const isInView = useInView(headerRef, { once: true, margin: "-10%" });

  useEffect(() => {
    fetch(`/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => console.error("Failed to fetch projects from backend", err));
  }, []);

  return (
    <section id="projects" className="py-24 md:py-40 px-6 bg-transparent relative z-10">
      <div className="max-w-7xl mx-auto">
        <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between mb-24 gap-8">
          <div className="flex-1">
            <div className="overflow-hidden mb-6 inline-block">
              <motion.h2 
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                className="text-xs md:text-sm tracking-[0.2em] uppercase text-accent font-mono inline-block"
              >
                Selected Work
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h3 
                initial={{ y: "100%" }}
                animate={isInView ? { y: 0 } : { y: "100%" }}
                transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.1 }}
                className="text-5xl md:text-7xl font-bold tracking-tighter font-display"
              >
                Project Showcase
              </motion.h3>
            </div>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-muted max-w-sm text-lg md:text-xl leading-relaxed"
          >
            A curated selection of our finest architectural and interior design achievements.
          </motion.p>
        </div>

        {/* Offset Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-start">
          <div className="flex flex-col gap-8 md:gap-16 mt-0">
            {projects.filter((_, i) => i % 2 === 0).map((project, i) => (
              <ProjectCard key={project.id || `even-${i}`} project={project} index={i * 2} />
            ))}
          </div>
          <div className="flex flex-col gap-8 md:gap-16 mt-0 md:mt-24 lg:mt-32">
            {projects.filter((_, i) => i % 2 !== 0).map((project, i) => (
              <ProjectCard key={project.id || `odd-${i}`} project={project} index={i * 2 + 1} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
