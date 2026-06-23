import { Navigation } from "@/components/ui/Navigation";
import { VideoExperience } from "@/components/VideoExperience";
import dynamic from "next/dynamic";

const ProjectShowcase = dynamic(() => import("@/components/sections/ProjectShowcase").then(mod => mod.ProjectShowcase));
const WhyChooseUs = dynamic(() => import("@/components/sections/WhyChooseUs").then(mod => mod.WhyChooseUs));
const Testimonials = dynamic(() => import("@/components/sections/Testimonials").then(mod => mod.Testimonials));
const About = dynamic(() => import("@/components/sections/About").then(mod => mod.About));
const ContactCTA = dynamic(() => import("@/components/sections/ContactCTA").then(mod => mod.ContactCTA));
const Footer = dynamic(() => import("@/components/ui/Footer").then(mod => mod.Footer));

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
