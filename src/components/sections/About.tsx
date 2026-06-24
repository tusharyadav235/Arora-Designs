import Image from "next/image";

export function About() {
  return (
    <section id="about" className="py-20 md:py-32 px-6 bg-transparent relative z-10 border-t border-white/5 overflow-hidden">

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
        <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl group">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-700 z-10 pointer-events-none" />
          <Image 
            src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=2000"
            alt="Interior Design Studio"
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-1000"
          />
        </div>
        
        <div className="bg-black/40 backdrop-blur-xl border border-white/10 p-10 md:p-14 rounded-[2rem] shadow-2xl">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-accent mb-6 font-mono drop-shadow-md">
            The Studio
          </h2>
          <h3 className="text-5xl md:text-6xl font-bold tracking-tighter mb-8 leading-tight drop-shadow-lg">
            Redefining<br />Modern Luxury
          </h3>
          <p className="text-foreground/80 text-lg leading-relaxed mb-8 drop-shadow-md">
            Founded on the principle that spaces should evoke emotion, Arora Designs merges architectural rigor with high-end interior styling.
          </p>
          <p className="text-foreground/80 text-lg leading-relaxed mb-12 drop-shadow-md">
            Every project is a unique narrative, meticulously crafted to reflect the lifestyle and aspirations of our clients. We believe in timeless aesthetics, premium materials, and flawless execution.
          </p>
          
          <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
            <div>
              <div className="text-4xl font-bold text-foreground mb-2 drop-shadow-md">15+</div>
              <div className="text-sm text-accent uppercase tracking-widest font-mono drop-shadow-md">Years Experience</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-foreground mb-2 drop-shadow-md">80+</div>
              <div className="text-sm text-accent uppercase tracking-widest font-mono drop-shadow-md">Global Projects</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
