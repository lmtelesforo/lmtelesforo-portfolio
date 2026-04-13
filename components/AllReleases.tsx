"use client";

import React, { useState } from 'react';
import { PHOTO_LIBRARY, PhotoProject } from '@/lib/photos';
import ProjectCard from './ProjectCard';
import LetterGlitch from './Glitch';
import { ArrowUpDown } from 'lucide-react';

interface TabContentProps {
  projects: PhotoProject[];
}

function TabContent({ projects }: TabContentProps) {
  if (projects.length === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto px-6 lg:px-12">
      {projects.map((project, idx) => (
        <ProjectCard 
          key={`${project.id}-${project.year}-${idx}`}
          image={project.image}
          title={project.title}
          year={project.year}
          description={project.description}
          tags={project.tags}
        />
      ))}
    </div>
  );
}

export default function AllReleases() {
  const [isDescending, setIsDescending] = useState(true); // Default to Newest First

  // Unified project list since categorization was removed
  const allProjects = PHOTO_LIBRARY.fullstack;

  const sortedProjects = [...allProjects].sort((a, b) => {
    const yearA = parseInt(a.year || '0');
    const yearB = parseInt(b.year || '0');
    return isDescending ? yearB - yearA : yearA - yearB;
  });

  return (
    <section id="projects" className="flex flex-col min-h-screen py-21 relative justify-center overflow-hidden scroll-mt-7 lg:scroll-mt-8">
      {/* Dynamic Glitch Background */}
      <div className="absolute inset-0 w-full h-full -z-30 opacity-15 overflow-hidden">
        <LetterGlitch
          glitchColors={['#7980DA', '#C8B9E0', '#4A4E8C']}
          glitchSpeed={50}
          centerVignette={true}
          outerVignette={false}
          smooth={true}
          paused={true}
          characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789"
        />
      </div>

      {/* Seamless blend from the previous section (Matched to Process bottom) */}
      <div className="absolute top-0 left-0 right-0 h-[350px] bg-gradient-to-b from-black/96 via-black/76 to-transparent pointer-events-none -z-10" />

      {/* Seamless blend to the footer */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent pointer-events-none -z-10" />

      {/* Decorative background gradients */}
      <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[190px] opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-primary-dark/10 rounded-full blur-[120px] opacity-20"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-12 w-full mb-16 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 backdrop-blur-md">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                    <span className="text-xs font-medium uppercase tracking-widest text-primary-light/90 font-sans">Project Showcase</span>
                </div>
                <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white leading-[1.1]">
                    Projects<span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary-light to-primary-dark">.</span>
                </h2>
            </div>
            
            <p className="text-primary-light/40 text-sm font-sans uppercase tracking-widest max-w-[300px] text-right hidden md:block">
                Bridging the gap between intelligent models and seamless digital experiences.
            </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto w-full px-6 lg:px-12 mb-10 relative z-10">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-4">
             <span className="text-[11px] md:text-xs font-sans font-bold tracking-[0.2em] uppercase text-white px-4 py-2 relative">
                AI/ML & FULL-STACK
                <div className="absolute inset-0 m-auto w-12 h-12 bg-primary/10 rounded-full blur-xl -z-10 animate-pulse"></div>
                <div className="absolute bottom-[-16px] left-0 w-full h-[4px] bg-gradient-to-r from-primary via-primary-light to-primary shadow-[0_0_20px_var(--color-primary)] z-20"></div>
             </span>
          </div>

          {/* Sort Toggle (Matching Card Style) */}
          <button 
            onClick={() => setIsDescending(!isDescending)}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full border border-primary/20 bg-primary/[0.08] backdrop-blur-md hover:bg-primary/[0.12] transition-all duration-300 group"
          >
            <ArrowUpDown className={`w-3.5 h-3.5 text-primary-light/70 group-hover:text-primary-light transition-transform duration-500 ${!isDescending ? 'rotate-180' : ''}`} />
            <span className="text-[10px] font-sans font-bold tracking-[0.15em] uppercase text-white/60 group-hover:text-white transition-colors">
              {isDescending ? 'Newest First' : 'Oldest First'}
            </span>
          </button>
        </div>
      </div>

      <div className="w-full relative z-10">
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
           <TabContent projects={sortedProjects} />
        </div>
      </div>

    </section>
  );
}
