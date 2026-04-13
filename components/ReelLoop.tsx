import laira from './icons/projects/laira.jpg';

interface ReelLoopProps {
  imageUrl?: string;
  name?: string;
}

const ReelLoop: React.FC<ReelLoopProps> = ({ imageUrl = laira.src, name = "Laira" }) => {
  return (
    <div className="relative group lg:mt-0 mt-12 w-full max-w-[360px] lg:max-w-none mx-auto">
      {/* Add custom shimmer animation 
          (Ideally, add this to your tailwind.config.js or global CSS)
      */}
      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>

      {/* Glass Panel Wrapper */}
      <div className="relative p-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl transition-transform duration-700 ease-out group-hover:rotate-0 rotate-3">
        
        {/* Main Photo Container */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-zinc-950 border border-[#6064A3]/20">
          
          {/* Content Layer */}
          <div className="absolute inset-0 flex items-center justify-center bg-[#030303] overflow-hidden">
            <div className="w-full h-full relative">
              
              {/* Decorative Background Elements */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full blur-[100px] animate-pulse bg-[#6064A3]/30"></div>
              <div className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-[80px] bg-[#937E9C]/25"></div>
              
              {/* Spinning Rings (Decorative) */}
              <div className="absolute inset-0 flex items-center justify-center opacity-40">
                <div className="flex animate-[spin_10s_linear_infinite] w-72 h-72 border-white/5 border rounded-full items-center justify-center">
                  <div className="w-56 h-56 border-[#6064A3]/20 border rounded-full"></div>
                </div>
              </div>

              {/* The Photo */}
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={name} 
                  className="absolute inset-0 w-full h-full object-cover z-10 brightness-[0.85] group-hover:brightness-100 transition-all duration-700"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                   <div className="text-[#6064A3]/40 font-mono text-xs tracking-widest uppercase italic">Project View</div>
                </div>
              )}

              {/* Bottom Gradient Overlay */}
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/80 to-transparent z-20"></div>

              {/* Name and Subtitle Overlay */}
              <div className="absolute bottom-5 left-5 z-30 flex flex-col">
                <p className="text-white font-medium tracking-wide text-lg group-hover:translate-x-1 transition-transform duration-500 uppercase">
                  {name}
                </p>
                <p className="text-white/60 font-mono text-[10px] tracking-[0.2em] group-hover:translate-x-1 transition-transform duration-700 uppercase mt-0.5">
                  Software Developer
                </p>
              </div>

              {/* "DEVELOPER" Badge - Restored and updated */}
              <div className="absolute top-4 right-4 px-3 py-1.5 backdrop-blur-md rounded-full border border-white/10 flex items-center gap-2 bg-black/40 z-30">
                <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-[#B3A6C4] shadow-[0_0_8px_rgba(179,166,196,0.8)]"></div>
                <span className="text-[9px] uppercase tracking-[0.25em] font-medium text-white/90">FULL-STACK</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Background Icon (Spinning Star) - Using Dusty Grape */}
      <div className="absolute -bottom-10 -left-10 text-[#6064A3]/10 -z-10">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="120" 
          height="120" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.5" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="animate-[spin_25s_linear_infinite]"
        >
          <path d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
        </svg>
      </div>
    </div>
  );
};

export default ReelLoop;