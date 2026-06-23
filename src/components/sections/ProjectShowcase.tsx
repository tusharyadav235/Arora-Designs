"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const mockProjects = [
  { title: "The Glass House", category: "Villa", imageUrl: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=2000" },
  { title: "Skyline Penthouse", category: "Apartment", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=80&w=2000" },
  { title: "Minimalist Haven", category: "Residential", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2000" },
  { title: "Lumina Office", category: "Commercial", imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=2000" },
];

export function ProjectShowcase() {
  const [projects, setProjects] = useState<any[]>(mockProjects);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"}/api/projects`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(err => console.error("Failed to fetch projects from backend", err));
  }, []);

  return (
    <section id="projects" className="py-20 md:py-32 px-6 bg-background relative z-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-accent mb-4 font-mono">
              Selected Work
            </h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter">Project Showcase</h3>
          </div>
          <p className="text-muted max-w-sm text-lg mb-2">
            A curated selection of our finest architectural and interior design achievements.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <div key={project.id || i} className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer" data-cursor="hover">
              <Image 
                src={project.imageUrl || project.image} 
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                priority={i < 2}
                className="object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
              
              <div className="absolute bottom-0 left-0 w-full p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <p className="text-accent font-mono text-xs uppercase tracking-widest mb-2">
                  {project.category}
                </p>
                <div className="flex items-center justify-between">
                  <h4 className="text-3xl font-bold text-white">{project.title}</h4>
                  <a 
                    href="tel:+919711144495" 
                    className="bg-accent/20 hover:bg-accent/40 text-accent p-3 rounded-full backdrop-blur-md transition-colors"
                    title="Call to discuss a similar project"
                    onClick={(e) => e.stopPropagation()} // Prevent card click if any
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                      <path d="M222.37,158.46l-47.11-21.11-.13-.06a16,16,0,0,0-15.17,1.4,8.12,8.12,0,0,0-.75.56L134.87,160c-15.42-7.49-31.34-23.41-38.83-38.83l20.78-24.34a8.12,8.12,0,0,0,.56-.75,16,16,0,0,0,1.4-15.17l-.06-.13L97.63,33.64a16,16,0,0,0-16.82-9.26L33.63,32.7A16,16,0,0,0,20,48.62c.24,53,24.46,102.55,68.21,139.73C125.13,219.67,167.33,236,207.38,236A16,16,0,0,0,223.3,222.37l8.32-47.18A16,16,0,0,0,222.37,158.46ZM207.38,220h0c-37.49,0-77.06-15.35-111.45-50.55C61.35,134.94,46,95.38,46,57.88L46,57.6,92.51,50.7,112.9,96l-20.91,24.5a8,8,0,0,0-.56,8.71c9,19.34,27.18,37.52,46.52,46.52a8,8,0,0,0,8.71-.56L171.16,154.3l45.3,20.39-6.9,46.51A16,16,0,0,0,207.38,220Z"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
