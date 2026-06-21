"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import { MapPin, Phone, Clock, Star, WhatsappLogo, X } from "@phosphor-icons/react";

export function ContactCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-100, 100]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleOpenBooking = () => setIsModalOpen(true);
    window.addEventListener("open-booking", handleOpenBooking);
    return () => window.removeEventListener("open-booking", handleOpenBooking);
  }, []);

  const handleWhatsAppDirect = () => {
    window.open('https://wa.me/919711144495', '_blank');
  };

  return (
    <section id="contact" ref={ref} className="relative py-32 md:py-40 px-6 overflow-hidden bg-background border-t border-white/5 z-10">
      
      {/* Background Video Layer */}
      <div className="absolute inset-0 w-full h-full z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="object-cover w-full h-full opacity-50 mix-blend-screen"
        >
          <source src="/videos/silkdesign.webm" type="video/webm" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-background"></div>
      </div>
      
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-20 items-center">
        {/* Left Side: Info */}
        <div className="text-left">
          <h2 className="text-[11px] tracking-[0.2em] uppercase text-accent mb-6 font-mono drop-shadow-md">
            Get In Touch
          </h2>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tighter leading-none mb-8 drop-shadow-lg">
            Let's Design Your<br />Dream Space
          </h2>
          <p className="text-lg text-foreground/80 mb-12 max-w-lg leading-relaxed drop-shadow-md">
            Ready to transform your vision into reality? Schedule a private consultation with our principal designers or visit our studio.
          </p>

          <div className="space-y-8 mb-12">
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-md">
                <MapPin size={22} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 drop-shadow-md">Arora Designs Studio</h4>
                <p className="text-foreground/80 leading-relaxed max-w-sm drop-shadow-md">
                  Shop Plot, 63, Patparganj Rd, Block A, Ganesh Nagar, New Delhi, Delhi, 110092
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-md">
                <Phone size={22} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 drop-shadow-md">Contact</h4>
                <p className="text-foreground/80 drop-shadow-md">097111 44495</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-md">
                <Clock size={22} className="text-accent" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 drop-shadow-md">Hours</h4>
                <p className="text-foreground/80 drop-shadow-md">Open Daily · Closes 9 pm</p>
              </div>
            </div>
            
            <div className="flex items-start gap-5">
              <div className="w-12 h-12 rounded-full bg-black/60 border border-white/10 flex items-center justify-center shrink-0 backdrop-blur-md">
                <Star size={22} className="text-accent" weight="fill" />
              </div>
              <div>
                <h4 className="font-bold text-lg mb-1 drop-shadow-md">Highly Rated</h4>
                <p className="text-foreground/80 drop-shadow-md">4.6/5 Google Reviews</p>
                <p className="text-foreground/80 text-sm mt-2 italic max-w-sm border-l-2 border-accent/50 pl-3 drop-shadow-md">
                  "Nice designs very creative best place to visit and best service..."
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="bg-foreground text-background px-8 py-4 rounded-full font-bold text-lg hover:scale-105 transition-transform w-full sm:w-auto shadow-lg"
            >
              Book Consultation
            </button>
            <button 
              onClick={handleWhatsAppDirect}
              className="bg-black/60 backdrop-blur-md border border-white/20 text-foreground px-8 py-4 rounded-full font-bold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors w-full sm:w-auto shadow-lg"
            >
              <WhatsappLogo size={24} />
              Chat on WhatsApp
            </button>
          </div>
        </div>

        {/* Right Side: Map/Image Placeholder */}
        <div className="relative aspect-square md:aspect-[4/3] rounded-3xl overflow-hidden border border-white/20 group cursor-pointer shadow-2xl" onClick={handleWhatsAppDirect} data-cursor="hover">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000" 
            alt="Arora Designs Studio Location" 
            className="w-full h-full object-cover opacity-60 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          
          <div className="absolute bottom-8 left-8 right-8">
            <p className="text-sm font-mono text-accent uppercase tracking-widest mb-2">Visit Us</p>
            <h3 className="text-3xl font-bold text-white mb-2">New Delhi Studio</h3>
            <p className="text-white/80 text-sm leading-relaxed">Experience our premium PVC flooring, wallpapers, and bespoke designs in person.</p>
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </section>
  );
}

function BookingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [formData, setFormData] = useState({ name: "", phone: "", details: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081"}/api/consultations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } catch (err) {
      console.error("Failed to save consultation to backend", err);
    }

    const text = `Hello Arora Designs, I would like to book a consultation.\n\n*Name:* ${formData.name}\n*Phone:* ${formData.phone}\n*Project Details:* ${formData.details}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/919711144495?text=${encodedText}`, "_blank");
    setFormData({ name: "", phone: "", details: "" });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-xl"
            onClick={onClose}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="relative bg-black/40 border border-white/20 p-8 md:p-14 rounded-[2rem] w-full max-w-xl z-10 shadow-2xl backdrop-blur-2xl overflow-hidden"
          >
            {/* Ambient glow inside modal */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-accent/20 blur-[80px] rounded-[100%] pointer-events-none mix-blend-screen" />
            
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 hover:bg-white/10 hover:rotate-90 transition-all duration-300 z-20"
            >
              <X size={20} />
            </button>
            
            <div className="relative z-10">
              <h2 className="text-[10px] tracking-[0.3em] uppercase text-accent mb-4 font-mono">Private Consultation</h2>
              <h3 className="text-4xl md:text-5xl font-bold mb-3 tracking-tighter">Design Your Dream.</h3>
              <p className="text-white/60 mb-10 text-lg">Leave your details below, and our principal designers will connect with you.</p>
              
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="relative group">
                  <input 
                    required
                    type="text" 
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="peer w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder-transparent"
                    placeholder="Your Name"
                  />
                  <label htmlFor="name" className="absolute left-0 -top-3.5 text-xs text-accent font-mono uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest cursor-text">
                    Your Name
                  </label>
                </div>

                <div className="relative group">
                  <input 
                    required
                    type="tel" 
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="peer w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:ring-0 focus:border-accent transition-colors placeholder-transparent"
                    placeholder="Phone Number"
                  />
                  <label htmlFor="phone" className="absolute left-0 -top-3.5 text-xs text-accent font-mono uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest cursor-text">
                    Phone Number
                  </label>
                </div>

                <div className="relative group">
                  <textarea 
                    required
                    id="details"
                    rows={2}
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    className="peer w-full bg-transparent border-0 border-b border-white/20 px-0 py-3 text-white focus:outline-none focus:ring-0 focus:border-accent transition-colors resize-none placeholder-transparent"
                    placeholder="Project Details"
                  />
                  <label htmlFor="details" className="absolute left-0 -top-3.5 text-xs text-accent font-mono uppercase tracking-widest transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-white/40 peer-placeholder-shown:top-3 peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-accent peer-focus:uppercase peer-focus:tracking-widest cursor-text">
                    Project Details
                  </label>
                </div>
                
                <button 
                  type="submit"
                  className="w-full bg-accent text-background font-bold py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 mt-8 shadow-[0_0_20px_rgba(214,179,106,0.3)] hover:shadow-[0_0_30px_rgba(214,179,106,0.5)]"
                >
                  <WhatsappLogo size={24} weight="fill" />
                  Send Request
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
