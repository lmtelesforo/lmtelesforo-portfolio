"use client";

import React from 'react';
import stackBg from './icons/stack-bg.jpg';
import Particles from './Particles';

export default function Process() {
    return (
        <section id="tech-stack" className="min-h-screen flex flex-col overflow-hidden w-full pt-20 pb-32 relative justify-center scroll-mt-10 lg:scroll-mt-11">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-top -z-20" style={{ backgroundImage: `url(${stackBg.src})`, filter: 'brightness(1) contrast(1.1)' }}>
                <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>
            </div>

            {/* Particles background layer */}
            <div className="absolute inset-0 w-full h-full pointer-events-none -z-15 overflow-hidden">
                <div style={{ width: '100%', height: '100%', position: 'relative' }}>
                    <Particles
                        particleColors={["#fff1fcff"]}
                        particleCount={500}
                        particleSpread={15}
                        speed={0.001}
                        particleBaseSize={240}
                        sizeRandomness={0.4}
                        moveParticlesOnHover
                        alphaParticles={true}
                        particleHoverFactor={5}
                        disableRotation={false}
                        pixelRatio={1}
                    />
                </div>
            </div>

            {/* Seamless blend from the previous black section */}
            <div className="absolute top-0 left-0 right-0 h-48 bg-gradient-to-b from-[#000000] to-transparent pointer-events-none -z-10" />

            {/* Seamless blend to the next section (Matched to AllReleases top) */}
            <div className="absolute bottom-0 left-0 right-0 h-[500px] bg-gradient-to-t from-black via-black to-transparent pointer-events-none -z-10" />

            {/* Decorative gradients */}
            <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/4 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] mix-blend-screen opacity-60"></div>
                <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-primary-dark/10 rounded-full blur-[100px] mix-blend-screen opacity-40"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full relative z-10">
                {/* Header */}
                <div className="mb-16 md:text-center max-w-5xl mx-auto">
                    <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-sm">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></div>
                        <span className="text-xs font-medium uppercase tracking-widest text-primary-light/90 font-sans">The Process</span>
                    </div>
                    <h2 className="text-5xl md:text-7xl font-sans tracking-tight text-white mb-6 leading-[1.1]">
                        Technical Stack<span className="text-transparent bg-clip-text bg-gradient-to-br from-primary via-primary-light to-primary-dark">.</span>
                    </h2>
                    <p className="text-lg text-primary-light/70 font-light leading-relaxed mx-auto font-sans mb-12">
                        A specialized toolkit at the intersection of machine learning and full-stack engineering.
                    </p>
                </div>

                {/* Steps Container */}
                <div className="relative">
                    {/* Grid Area */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4 md:px-0">
                        {[
                            { 
                                num: "01", 
                                title: "Machine Intelligence & CV", 
                                desc: "Engineering predictive models for infrastructure. Specialized in SqueezeNet, U-Net, and OpenCV.", 
                                tags: ["Python", "TensorFlow", "PyTorch", "OpenCV", "SqueezeNet", "U-Net"],
                                svg: <><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><circle cx="12" cy="12" r="3"/><path d="M12 9v-2"/><path d="M12 15v2"/><path d="M15 12h2"/><path d="M9 12H7"/></> 
                            },
                            { 
                                num: "02", 
                                title: "Frontend Architecture & UX", 
                                desc: "Crafting performant interfaces. Experience as Software Engineer Intern at Limitless Lab.", 
                                tags: ["ReactJS", "Next.js", "TypeScript", "Tailwind CSS", "Flutter", "Dart"],
                                svg: <><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></> 
                            },
                            { 
                                num: "03", 
                                title: "Backend Engineering & Systems", 
                                desc: "Secure data flow and API design. Focused on Node.js/Express environments and DevOps.", 
                                tags: ["Node.js", "Express.js", "FastAPI", "Java", "C/C++", "SQL"],
                                svg: <><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6" y1="6" y2="6"/><line x1="6" x2="6" y1="18" y2="18"/></> 
                            },
                            { 
                                num: "04", 
                                title: "Database Design & Strategy", 
                                desc: "Architecting scalable data engines using relational and non-relational solutions.", 
                                tags: ["PostgreSQL", "MySQL", "MariaDB", "MongoDB", "Firebase", "Supabase"],
                                svg: <><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14a9 3 0 0 0 18 0V5"/><path d="M3 12a9 3 0 0 0 18 0"/></> 
                            }
                        ].map((step, idx) => (
                            <React.Fragment key={step.num}>
                                <div className="relative group flex flex-col p-6 rounded-xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-gradient-to-b hover:from-primary/10 hover:to-black transition-all duration-500 hover:border-primary/40 hover:shadow-[0_0_30px_-10px_var(--color-primary)] h-full min-h-[350px]">
                                    <div className="flex justify-between items-start mb-auto">
                                        <span className="font-mono text-xs text-primary/70 group-hover:text-primary transition-colors">{step.num}</span>
                                        <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-transparent border border-primary/20 text-primary-light shadow-[inset_0_0_10px_rgba(255,255,255,0.05)] group-hover:scale-110 group-hover:shadow-[0_0_15px_var(--color-primary)] group-hover:border-primary/60 transition-all duration-500">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                {step.svg}
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative z-10 flex flex-col justify-end">
                                        <h3 className="text-2xl font-medium text-white mb-3 group-hover:text-primary-light transition-colors font-sans leading-tight">{step.title}</h3>
                                        <p className="text-sm text-primary-light/80 leading-relaxed group-hover:text-primary-light transition-colors font-sans mb-6">{step.desc}</p>
                                        
                                        {/* Tech Chips */}
                                        <div className="flex flex-wrap gap-2 mt-auto">
                                            {step.tags.map(tag => (
                                                <span key={tag} className="px-2.5 py-1 text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-[0.1em] rounded-md bg-primary/20 text-white border border-primary/40 group-hover:bg-primary/30 group-hover:border-primary/60 transition-colors duration-300">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-primary/0 rounded-br-xl group-hover:border-primary/50 transition-all duration-500 pointer-events-none"></div>
                                </div>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
