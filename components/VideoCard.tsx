"use client";

import { VIDEO_TITLES } from '@/lib/videos';
import { Play } from 'lucide-react';
import React from 'react';

interface VideoCardProps {
  videoId: string;
  wide?: boolean;
  onClick?: () => void;
}

export default function VideoCard({ videoId, wide = false, onClick }: VideoCardProps) {
  const widthClass = wide ? 'w-[85vw] md:w-[600px] lg:w-[720px]' : 'w-[75vw] md:w-[340px] lg:w-[400px]';
  const title = VIDEO_TITLES[videoId] || 'Belle Sisoski - Official Video';
  
  return (
    <div 
      className={`relative ${widthClass} aspect-video flex-none rounded-2xl overflow-hidden cursor-pointer group ring-1 ring-white/10 bg-neutral-900 shadow-xl transition-all duration-500 hover:ring-primary/50`} 
      onClick={onClick}
    >
      <img 
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
        onError={(e) => { 
          const target = e.currentTarget as HTMLImageElement;
          target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; 
        }}
        alt={title} 
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out filter grayscale group-hover:grayscale-0"
      />
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
      
      {/* Play Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100">
        <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center border border-primary/30 text-primary-light shadow-[0_0_30px_rgba(96,100,163,0.3)] group-hover:bg-primary group-hover:text-white transition-all duration-500">
          <Play className="w-6 h-6 fill-current ml-1" />
        </div>
      </div>
      
      {/* Content Info */}
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/95 via-black/60 to-transparent translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 ease-out flex flex-col gap-1 z-20">
        <h3 className="text-white font-sans font-medium text-sm lg:text-base tracking-tight line-clamp-1">{title}</h3>
        <div className="flex items-center gap-2">
            <span className="text-primary-light/60 text-[10px] uppercase tracking-widest font-sans font-semibold">Watch Presentation</span>
            <div className="h-px flex-1 bg-primary/20"></div>
        </div>
      </div>

      {/* Hover Decoration */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    </div>
  );
}
