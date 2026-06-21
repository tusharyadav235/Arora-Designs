import { Navigation } from "@/components/ui/Navigation";
import { Footer } from "@/components/ui/Footer";
import { VideoExperience } from "@/components/VideoExperience";
import { ProjectShowcase } from "@/components/sections/ProjectShowcase";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Testimonials } from "@/components/sections/Testimonials";
import { About } from "@/components/sections/About";
import { ContactCTA } from "@/components/sections/ContactCTA";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* 
        The cinematic video scrub experience (Sections 1-6).
        This component is extremely tall (1000vh) and handles its own pinned video and overlays.
      */}
      <VideoExperience />

      {/* Subsequent Sections (7-11) */}
      <ProjectShowcase />
      <WhyChooseUs />
      <Testimonials />
      <About />
      <ContactCTA />

      <Footer />
    </main>
  );
}
