"use client";

import React from 'react';

interface ProjectCardProps {
  image: string;
  title: string;
  year?: string;
  description?: string;
  tags?: string[];
  onClick?: () => void;
}

export default function ProjectCard({ 
  image, 
  title, 
  year, 
  description, 
  tags = [], 
  onClick 
}: ProjectCardProps) {
  return (
    <div 
      className="relative group flex flex-col p-6 rounded-2xl border border-primary/20 bg-primary/[0.08] backdrop-blur-md hover:bg-gradient-to-b hover:from-primary/20 hover:to-black transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--color-primary)] h-full cursor-pointer"
      onClick={onClick}
    >
      {/* Project Image Container */}
      <div className="relative aspect-video w-full rounded-xl overflow-hidden border border-white/10 mb-6 group-hover:border-primary/30 transition-all duration-500">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out brightness-[0.9] group-hover:brightness-100"
        />
        {/* Subtle Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-60"></div>
      </div>

      {/* Metadata Row */}
      <div className="flex justify-between items-baseline gap-4 mb-3">
        <h3 className="text-xl font-medium text-white group-hover:text-primary-light transition-colors font-sans leading-tight">
          {title}
        </h3>
        {year && (
          <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors whitespace-nowrap">
            {year}
          </span>
        )}
      </div>

      {/* Description */}
      {description && (
        <p className="text-sm text-primary-light/70 leading-relaxed group-hover:text-primary-light transition-colors font-sans mb-8">
          {description}
        </p>
      )}

      {/* Tech Tags */}
      <div className="flex flex-wrap gap-2 mt-auto">
        {tags.map((tag, idx) => (
          <span 
            key={`${tag}-${idx}`} 
            className="px-2.5 py-1 text-[10px] font-sans font-semibold uppercase tracking-[0.1em] rounded-md bg-primary/10 text-primary-light/90 border border-primary/20 group-hover:bg-primary/20 group-hover:border-primary/40 transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Corner Accent (Matching Stack Design) */}
      <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-primary/0 rounded-br-2xl group-hover:border-primary/40 transition-all duration-500 pointer-events-none"></div>
    </div>
  );
}
