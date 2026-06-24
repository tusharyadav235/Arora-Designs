"use client";

import { useState, useEffect } from "react";
import { Plus, Trash, Eye, CaretRight } from "@phosphor-icons/react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<"consultations" | "projects" | "testimonials">("consultations");
  
  const [consultations, setConsultations] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);

  // Fetch Data
  const fetchData = async () => {
    try {
      if (activeTab === "consultations") {
        const res = await fetch(`/api/consultations`);
        setConsultations(await res.json());
      } else if (activeTab === "projects") {
        const res = await fetch(`/api/projects`);
        setProjects(await res.json());
      } else if (activeTab === "testimonials") {
        const res = await fetch(`/api/testimonials`);
        setTestimonials(await res.json());
      }
    } catch (e) {
      console.error("Failed to fetch data", e);
    }
  };

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  // Handle Deletes
  const handleDeleteProject = async (id: number) => {
    await fetch(`/api/projects/${id}`, { method: "DELETE" });
    fetchData();
  };

  const handleDeleteTestimonial = async (id: number) => {
    await fetch(`/api/testimonials/${id}`, { method: "DELETE" });
    fetchData();
  };

  // State for forms
  const [newProject, setNewProject] = useState({ title: "", category: "", imageUrl: "" });
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/projects`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProject),
    });
    setNewProject({ title: "", category: "", imageUrl: "" });
    fetchData();
  };

  const [newTestimonial, setNewTestimonial] = useState({ name: "", role: "", text: "" });
  const handleAddTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/testimonials`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTestimonial),
    });
    setNewTestimonial({ name: "", role: "", text: "" });
    fetchData();
  };

  return (
    <div className="min-h-screen bg-background pt-32 px-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Arora Designs Admin</h1>
        
        <div className="flex gap-4 mb-12 border-b border-white/10 pb-4 overflow-x-auto">
          {["consultations", "projects", "testimonials"].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`px-6 py-3 rounded-full font-medium transition-colors whitespace-nowrap ${activeTab === tab ? "bg-accent text-background" : "bg-secondary text-foreground hover:bg-white/10"}`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        {activeTab === "consultations" && (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold mb-6">Recent Consultations</h2>
            {consultations.length === 0 ? <p className="text-muted">No consultations found.</p> : null}
            {consultations.map((c) => (
              <div key={c.id} className="bg-secondary p-6 rounded-2xl border border-white/5">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-accent">{c.name}</h3>
                    <p className="text-muted font-mono">{c.phone}</p>
                  </div>
                  <span className="text-xs text-muted">{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-foreground/80 bg-background/50 p-4 rounded-xl border border-white/5">
                  {c.details}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === "projects" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold mb-6">Manage Projects</h2>
              {projects.length === 0 ? <p className="text-muted">No projects found.</p> : null}
              {projects.map((p) => (
                <div key={p.id} className="bg-secondary p-4 rounded-2xl border border-white/5 flex gap-4 items-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-background">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold">{p.title}</h3>
                    <p className="text-accent text-sm font-mono uppercase">{p.category}</p>
                  </div>
                  <button onClick={() => handleDeleteProject(p.id)} className="p-3 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-colors">
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-secondary p-8 rounded-3xl border border-white/5 h-fit">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="text-accent" /> Add New Project</h3>
              <form onSubmit={handleAddProject} className="space-y-4">
                <input required type="text" placeholder="Project Title" value={newProject.title} onChange={(e) => setNewProject({...newProject, title: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                <input required type="text" placeholder="Category (e.g. Residential)" value={newProject.category} onChange={(e) => setNewProject({...newProject, category: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                <input required type="url" placeholder="Image URL (Unsplash)" value={newProject.imageUrl} onChange={(e) => setNewProject({...newProject, imageUrl: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                <button type="submit" className="w-full bg-accent text-background font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">Add Project</button>
              </form>
            </div>
          </div>
        )}

        {activeTab === "testimonials" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-4">
              <h2 className="text-2xl font-bold mb-6">Manage Testimonials</h2>
              {testimonials.length === 0 ? <p className="text-muted">No testimonials found.</p> : null}
              {testimonials.map((t) => (
                <div key={t.id} className="bg-secondary p-6 rounded-2xl border border-white/5 flex justify-between items-start gap-4">
                  <div>
                    <p className="text-foreground/90 italic mb-4">"{t.text}"</p>
                    <h3 className="font-bold text-accent">{t.name}</h3>
                    <p className="text-sm text-muted font-mono uppercase">{t.role}</p>
                  </div>
                  <button onClick={() => handleDeleteTestimonial(t.id)} className="p-3 shrink-0 bg-red-500/20 text-red-500 rounded-xl hover:bg-red-500/30 transition-colors">
                    <Trash size={20} />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="bg-secondary p-8 rounded-3xl border border-white/5 h-fit">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2"><Plus className="text-accent" /> Add Testimonial</h3>
              <form onSubmit={handleAddTestimonial} className="space-y-4">
                <input required type="text" placeholder="Client Name" value={newTestimonial.name} onChange={(e) => setNewTestimonial({...newTestimonial, name: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                <input required type="text" placeholder="Role (e.g. Homeowner)" value={newTestimonial.role} onChange={(e) => setNewTestimonial({...newTestimonial, role: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent" />
                <textarea required rows={4} placeholder="Testimonial Quote" value={newTestimonial.text} onChange={(e) => setNewTestimonial({...newTestimonial, text: e.target.value})} className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-accent resize-none" />
                <button type="submit" className="w-full bg-accent text-background font-bold py-3 rounded-xl hover:opacity-90 transition-opacity">Add Testimonial</button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
