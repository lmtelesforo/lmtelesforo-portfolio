"use client";

import React from 'react';

interface PhotoCardProps {
  image: string;
  title: string;
  category: string;
  tags?: string[];
  wide?: boolean;
  onClick?: () => void;
}

export default function PhotoCard({ image, title, category, tags = [], wide = false, onClick }: PhotoCardProps) {
  const widthClass = wide ? 'w-[85vw] md:w-[600px] lg:w-[720px]' : 'w-[75vw] md:w-[340px] lg:w-[400px]';
  
  return (
    <div 
      className={`relative ${widthClass} aspect-video flex-none rounded-2xl overflow-hidden cursor-pointer group ring-1 ring-white/10 bg-neutral-900 shadow-xl transition-all duration-500 hover:ring-primary/50`} 
      onClick={onClick}
    >
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-out filter grayscale-0 group-hover:grayscale-0 brightness-[0.9]"
      />
      
      {/* Overlay Gradient (static) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90 transition-opacity duration-500"></div>
      
      {/* Content Info (visible on hover) */}
      <div className="absolute inset-0 p-6 flex flex-col justify-end opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/85 backdrop-blur-[1px]">
        <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <div className="flex items-center gap-2 mb-2">
                <span className="text-primary-light/90 text-[10px] uppercase tracking-[0.2em] font-sans font-bold">{category}</span>
                <div className="h-px flex-1 bg-primary/30"></div>
            </div>
            
            <h3 className="text-white font-sans font-medium text-base lg:text-xl tracking-tight mb-4 leading-tight">{title}</h3>
            
            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5">
                {tags.map((tag, idx) => (
                    <span 
                        key={`${tag}-${idx}`} 
                        className="px-2 py-0.5 text-[9px] lg:text-[10px] font-sans font-bold uppercase tracking-wider rounded bg-primary/20 text-white border border-primary/30 backdrop-blur-sm"
                    >
                        {tag}
                    </span>
                ))}
            </div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
