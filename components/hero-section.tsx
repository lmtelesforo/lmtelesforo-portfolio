import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { InfiniteSlider } from '@/components/ui/infinite-slider'
import { ProgressiveBlur } from '@/components/ui/progressive-blur'
import { TextEffect } from "@/components/motion-primitives/text-effect";
import { AnimatedGroup } from "@/components/motion-primitives/animated-group";
import V0Icon from "@/components/icons/v0-icon";
import VercelWordmarkIcon from "@/components/icons/vercel-wordmark-icon";
import GlobantLogoIcon from "@/components/icons/globant-logo-icon";
import DecryptedText from "@/components/DecryptedText";
import ReelLoop from "@/components/ReelLoop";
import Marquee from "@/components/Marquee";
import Dither from "@/components/Dither";
import { transitionVariants } from "@/lib/utils";
import { Linkedin, Instagram, Facebook, ChevronDown } from 'lucide-react'

export default function HeroSection() {
    const currentDate = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    }).toUpperCase();

    return (
        <main id="home" className="overflow-x-hidden">
            <section className='lg:max-h-[100vh] relative overflow-hidden bg-transparent flex flex-col justify-center gap-y-12'>
                <div className='absolute inset-0 w-full h-full bg-cover bg-center -z-10' style={{ backgroundImage: "url('/image_f7dee3.jpg')", filter: 'brightness(1.5)' }}>
                    <div className="absolute inset-0 bg-black/5 pointer-events-none"></div>
                    <Dither
                        waveColor={[0, 0, 0]}
                        disableAnimation={false}
                        enableMouseInteraction
                        mouseRadius={0.15}
                        colorNum={4}
                        pixelSize={2}
                        waveAmplitude={0.3}
                        waveFrequency={3}
                        waveSpeed={0.01}
                    />
                </div>
                <div
                    className="pb-24 pt-12 md:pb-32 lg:pb-52 lg:pt-37 lg:grid lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid-rows-2">
                    <div className="relative mx-auto flex max-w-xl flex-col px-6 lg:block lg:mt-30">
                        <div className="mx-auto max-w-2xl text-center lg:ml-0 lg:text-left">
                            <div className='mt-4 lg:mt-0'>
                                <DecryptedText
                                    text={`${currentDate} — PHILIPPINES`}
                                    animateOn="view"
                                    revealDirection="start"
                                    sequential
                                    useOriginalCharsOnly={false}
                                    speed={70}
                                    className='font-mono text-primary-light uppercase tracking-[0.2em]'
                                />
                            </div>
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="max-w-fit text-balance text-6xl font-semibold md:text-7xl xl:text-7xl mt-6">
                                AI/ML Research &
                            </TextEffect>
                            <TextEffect
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                as="h1"
                                className="max-w-fit text-balance text-6xl font-semibold md:text-7xl xl:text-7xl">
                                Full-Stack Development
                            </TextEffect>
                            <TextEffect
                                per="line"
                                preset="fade-in-blur"
                                speedSegment={0.3}
                                delay={0.5}
                                as="p"
                                className="mt-8 max-w-2xl text-pretty text-lg text-primary-light">
                                CS Senior at UPLB & Full-stack Developer. I bridge the gap between complex computer vision models and seamless full-stack applications.
                            </TextEffect>
                            <AnimatedGroup
                                variants={{
                                    container: {
                                        visible: {
                                            transition: {
                                                staggerChildren: 0.05,
                                                delayChildren: 0.75,
                                            },
                                        },
                                    },
                                    ...transitionVariants,
                                }}
                                className="mt-12 flex flex-wrap items-center justify-center gap-4 lg:justify-start"
                            >
                                <Button
                                    asChild
                                    size="icon"
                                    className="w-12 h-12 rounded-full">
                                    <Link href="https://www.linkedin.com/in/laira-claire-telesforo-5a44463b6/" target="_blank" aria-label="LinkedIn">
                                        <Linkedin className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="icon"
                                    variant="ghost"
                                    className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10">
                                    <Link href="https://www.instagram.com/xlairaclaire/" target="_blank" aria-label="Instagram">
                                        <Instagram className="w-5 h-5" />
                                    </Link>
                                </Button>
                                <Button
                                    asChild
                                    size="icon"
                                    variant="ghost"
                                    className="w-12 h-12 rounded-full bg-white/5 backdrop-blur-sm hover:bg-white/10">
                                    <Link href="https://www.facebook.com/lairaclairee" target="_blank" aria-label="Facebook">
                                        <Facebook className="w-5 h-5" />
                                    </Link>
                                </Button>
                            </AnimatedGroup>
                        </div>
                    </div>
                    
                    {/* Right Column: Scaled-down ReelLoop Integration */}
                    <div className="flex items-center justify-center px-6 lg:px-0 mt-11 lg:mt-20 border-white">
                        <div className="w-full max-w-[360px]">
                            <ReelLoop />
                        </div>
                    </div>
                </div>

                {/* Slow Bouncing Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: 1, y: [0, 8, 0] }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 1.5
                    }}
                    className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-default select-none group z-20"
                >
                    <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/60 group-hover:text-white transition-colors">
                        Scroll
                    </span>
                    <ChevronDown className="w-5 h-5 text-white/40 group-hover:text-white/80 transition-colors" />
                </motion.div>
                
                {/* Smooth blend to Marquee */}
                <div className="absolute left-0 right-0 bottom-0 h-48 bg-gradient-to-t from-background to-transparent pointer-events-none z-10" />
            </section>
            
            <section className="bg-background">
                <Marquee />
            </section>
        </main>
    )
}
