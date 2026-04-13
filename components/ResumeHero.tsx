import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {TextEffect} from "./motion-primitives/text-effect"
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import {transitionVariants} from "@/lib/utils";
import resumeBg from './icons/contact.jpg'
import AsciiRipple from './AsciiRipple'

export default function ResumeHero() {
    return (
        <section id="contact" className="min-h-[100vh] flex flex-col justify-center py-12 md:py-20 scroll-mt-9 lg:scroll-mt-10 relative overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-center -z-20" style={{ backgroundImage: `url(${resumeBg.src})`, filter: 'brightness(1.15)' }}>
                <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
            </div>

            {/* Seamless blend from the previous section (AllReleases bottom) */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none -z-10" />

            {/* ASCII Ripple Effect Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-100">
                <AsciiRipple />
            </div>

            <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 px-8 py-16 md:py-24 lg:py-32 relative z-10 backdrop-blur-md bg-black/10 mb-7">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="span"
                        className="text-muted-foreground uppercase tracking-[0.2em] text-xs font-mono block mb-6">
                        CONTACT
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-bold lg:text-5xl leading-tight">
                        Ready to build the future?
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="mt-6 text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
                        Whether you need a full-stack solution, an AI integration, or a partner in social innovation—I'm ready to dive in. Let’s start the conversation.
                    </TextEffect>
                    <AnimatedGroup
                        triggerOnView
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
                        className="mt-12 flex flex-wrap justify-center gap-4"
                    >
                        <Button
                            asChild
                            size="lg"
                            className="h-12 px-8 rounded-full bg-gradient-to-r from-[#7980DA] to-[#C8B9E0] hover:opacity-90 border-none text-white font-medium shadow-[0_0_20px_rgba(121,128,218,0.4)]">
                            <Link href="mailto:lcmtelesforo@gmail.com">
                                <span className="flex items-center gap-2">Get in Touch <span className="text-lg">↗</span></span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline"
                            className="h-12 px-8 rounded-full border-white/10 hover:bg-white/5 backdrop-blur-md text-white/80 font-medium">
                            <Link href="https://drive.google.com/drive/folders/1g-uHl7ca25sZJWB5klszJ77OBviHOnEP?usp=sharing" target="_blank">
                                <span>View Resume/CV</span>
                            </Link>
                        </Button>
                    </AnimatedGroup>
                </div>
            </div>

            {/* Seamless blend to the next section (CallToAction) */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-black via-black/80 to-transparent pointer-events-none -z-10" />
        </section>
    )
}
