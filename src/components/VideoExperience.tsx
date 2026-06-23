"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export function VideoExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!containerRef.current || !videoRef.current) return;

    const video = videoRef.current;
    
    const ctx = gsap.context(() => {
      let rAF: number;
      
      // Target time proxy for GSAP updates
      const proxy = { time: 0 };
      
      // Linear Interpolation for ultra-smooth easing
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      const render = () => {
        if (video.duration) {
          const diff = Math.abs(video.currentTime - proxy.time);
          // Only update DOM if the difference is meaningful (saves CPU)
          if (diff > 0.005) {
            video.currentTime = lerp(video.currentTime, proxy.time, 0.08); // 0.08 is the smoothing friction
          }
        }
        rAF = requestAnimationFrame(render);
      };

      const initScrollTrigger = () => {
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true, // Set to true since we handle the smoothing manually via rAF lerp
          onUpdate: (self) => {
            if (!video.duration || isNaN(video.duration)) return;
            // Instantly update the proxy, but don't touch the DOM directly here
            proxy.time = self.progress * video.duration;
          },
        });
        
        // Start the continuous render loop
        render();
      };

      if (video.readyState >= 1) {
        initScrollTrigger();
      } else {
        video.onloadedmetadata = initScrollTrigger;
      }

      return () => {
        if (rAF) cancelAnimationFrame(rAF);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-[1000vh] bg-background">
      {/* Pinned Video Container */}
      <div className="sticky top-0 w-full h-[100dvh] overflow-hidden bg-background">
        <video
          ref={videoRef}
          src="/videos/arora-designs.mp4"
          className="absolute top-0 left-0 w-full h-full object-cover opacity-60"
          style={{ transform: "translateZ(0)", willChange: "transform" }}
          muted
          playsInline
          preload="auto"
        />

        {/* Section 1: Hero (0-15%) */}
        <OverlaySection start={0} end={15}>
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h2 className="text-[11px] tracking-[0.2em] uppercase text-accent mb-6 font-mono">
              Arora Designs
            </h2>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-none mb-6">
              Designing Spaces<br />That Inspire
            </h1>
            <p className="text-muted max-w-[65ch] text-lg mb-10">
              Extraordinary luxury interior design studio.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto px-6">
              <Link href="#projects" className="bg-foreground text-background px-8 py-4 rounded-full font-medium hover:scale-105 transition-transform flex items-center justify-center w-full sm:w-auto">
                Explore Projects
              </Link>
              <button 
                onClick={() => window.dispatchEvent(new Event("open-booking"))}
                className="bg-transparent border border-foreground/20 text-foreground px-8 py-4 rounded-full font-medium hover:bg-foreground/5 transition-colors w-full sm:w-auto"
              >
                Book Consultation
              </button>
            </div>
          </div>
        </OverlaySection>

        {/* Section 2: Kitchen (20-35%) */}
        <OverlaySection start={20} end={35}>
          <div className="flex flex-col items-start justify-end h-full p-8 md:p-24 pb-32">
            <h3 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Luxury Modular<br/>Kitchens</h3>
            <p className="text-muted max-w-md mb-10 text-lg">
              Custom cabinetry, premium finishes, and smart space planning tailored to your culinary lifestyle.
            </p>
            <div className="grid grid-cols-2 gap-4 mb-10">
              <div className="p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-black/40">
                <div className="text-3xl font-bold text-accent mb-1">100+</div>
                <div className="text-sm text-muted">Premium Finishes</div>
              </div>
              <div className="p-6 border border-white/10 rounded-2xl backdrop-blur-md bg-black/40">
                <div className="text-3xl font-bold text-accent mb-1">Bespoke</div>
                <div className="text-sm text-muted">Space Planning</div>
              </div>
            </div>
            <Link href="#projects" className="bg-accent text-background px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity inline-block text-center">
              Explore Kitchens
            </Link>
          </div>
        </OverlaySection>

        {/* Section 3: Dining (40-55%) */}
        <OverlaySection start={40} end={55}>
          <div className="flex flex-col items-end justify-center h-full p-8 md:p-24 text-right">
            <h3 className="text-4xl md:text-6xl font-bold mb-4 tracking-tighter">Elegant Dining</h3>
            <p className="text-muted max-w-md mb-10 text-lg ml-auto">
              Where luxury furniture meets designer lighting. Curated experiences for unforgettable gatherings.
            </p>
            <Link href="#projects" className="border border-accent text-accent px-8 py-3.5 rounded-full font-medium hover:bg-accent/10 transition-colors inline-block text-center">
              View Collections
            </Link>
          </div>
        </OverlaySection>

        {/* Section 4: Living Room (60-75%) */}
        <OverlaySection start={60} end={75}>
          <div className="flex flex-col items-center justify-center h-full text-center p-8 md:p-24">
            <h3 className="text-4xl md:text-6xl font-bold mb-6 tracking-tighter">Modern Living Spaces</h3>
            <p className="text-muted max-w-lg mb-10 text-lg">
              Comfort meets luxury. Timeless design with functional elegance crafted for daily living.
            </p>
            <Link href="#projects" className="bg-foreground text-background px-8 py-3.5 rounded-full font-medium hover:scale-105 transition-transform inline-block text-center">
              View Projects
            </Link>
          </div>
        </OverlaySection>

        {/* Section 5: Staircase (80-90%) */}
        <OverlaySection start={80} end={90}>
          <div className="flex flex-col items-start justify-center h-full p-8 md:p-24">
            <h3 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter leading-none">
              Architectural<br />Details
            </h3>
            <p className="text-muted max-w-sm text-lg">
              Precision craftsmanship. Luxury finishes. Bespoke design in every corner.
            </p>
          </div>
        </OverlaySection>

        {/* Section 6: Terrace (95-100%) */}
        <OverlaySection start={95} end={100}>
          <div className="flex flex-col items-center justify-end h-full pb-32 text-center p-8 md:p-24">
            <h3 className="text-5xl md:text-7xl font-bold mb-6 tracking-tighter">Open Sky Living</h3>
            <p className="text-muted max-w-lg mb-10 text-lg">
              Nature meets architecture. Luxury outdoor spaces with panoramic views.
            </p>
            <button 
              onClick={() => window.dispatchEvent(new Event("open-booking"))}
              className="bg-accent text-background px-10 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              Start Your Journey
            </button>
          </div>
        </OverlaySection>
      </div>
    </section>
  );
}

function OverlaySection({
  start,
  end,
  children,
}: {
  start: number;
  end: number;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const parent = ref.current.closest("section");
    if (!parent) return;

    const ctx = gsap.context(() => {
      // Use autoAlpha to handle visibility so it doesn't block pointer events when hidden
      gsap.fromTo(
        ref.current,
        { autoAlpha: 0, y: 30 },
        {
          autoAlpha: 1,
          y: 0,
          scrollTrigger: {
            trigger: parent,
            start: `${start}% top`,
            end: `${start + 5}% top`,
            scrub: true,
          },
        }
      );

      gsap.to(ref.current, {
        autoAlpha: 0,
        y: -30,
        scrollTrigger: {
          trigger: parent,
          start: `${end - 5}% top`,
          end: `${end}% top`,
          scrub: true,
        },
      });
    });

    return () => ctx.revert();
  }, [start, end]);

  return (
    <div
      ref={ref}
      className="absolute top-0 left-0 w-full h-full pointer-events-auto flex flex-col justify-center"
      style={{ visibility: "hidden" }} // Handled by autoAlpha
    >
      {children}
    </div>
  );
}
