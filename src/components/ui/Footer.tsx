import Link from "next/link";
import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

export function Footer() {
  return (
    <footer className="bg-secondary py-20 px-6 border-t border-white/5 relative z-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2">
          <h2 className="text-2xl font-bold tracking-widest uppercase font-mono mb-6">
            Arora Designs
          </h2>
          <p className="text-muted max-w-sm leading-relaxed">
            Designing spaces that inspire. Extraordinary luxury interior design studio creating unforgettable immersive experiences.
          </p>
        </div>
        
        <div>
          <h4 className="font-medium mb-6 uppercase tracking-wider text-sm text-foreground">Explore</h4>
          <ul className="space-y-4 text-muted">
            <li><Link href="#projects" className="hover:text-accent transition-colors block w-fit" data-cursor="hover">Projects</Link></li>
            <li><Link href="#services" className="hover:text-accent transition-colors block w-fit" data-cursor="hover">Services</Link></li>
            <li><Link href="#about" className="hover:text-accent transition-colors block w-fit" data-cursor="hover">About Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-medium mb-6 uppercase tracking-wider text-sm text-foreground">Connect</h4>
          <ul className="space-y-4 text-muted">
            <li>
              <a href="#" className="flex items-center gap-1 hover:text-accent transition-colors group w-fit">
                Instagram <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1 hover:text-accent transition-colors group w-fit">
                LinkedIn <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center gap-1 hover:text-accent transition-colors group w-fit">
                Behance <ArrowUpRight className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10 text-sm text-muted/60">
        <p>&copy; {new Date().getFullYear()} Arora Designs. All rights reserved.</p>
        
        <div className="flex gap-6 items-center">
          <Link href="/privacy-policy" className="hover:text-white transition-colors" data-cursor="hover">Privacy Policy</Link>
          <Link href="/terms-of-service" className="hover:text-white transition-colors" data-cursor="hover">Terms of Service</Link>
          
          <div className="w-px h-4 bg-white/20 hidden md:block"></div>
          
          <p className="flex items-center gap-1">
            Created by 
            <a 
              href="https://www.dreamify.info" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-white hover:text-accent transition-colors font-medium ml-1"
              data-cursor="hover"
            >
              Dreamify
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
