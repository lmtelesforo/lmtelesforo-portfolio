import {Button} from '@/components/ui/button'
import Link from 'next/link'
import {TextEffect} from "./motion-primitives/text-effect"
import {AnimatedGroup} from "@/components/motion-primitives/animated-group";
import {transitionVariants} from "@/lib/utils";
import contactBg from './icons/contact.jpg'
import AsciiRipple from './AsciiRipple'

export default function CallToAction() {
    return (
        <section id="dont-miss" className="min-h-[80vh] flex flex-col justify-center py-24 md:py-32 scroll-mt-20 lg:scroll-mt-20 relative overflow-hidden">
            {/* Background Image with Dark Overlay */}
            <div className="absolute inset-0 w-full h-full bg-cover bg-center -z-20" style={{ backgroundImage: `url(${contactBg.src})` }}>
                <div className="absolute inset-0 bg-black/75 pointer-events-none"></div>
            </div>

            {/* Seamless blend from the previous section (AllReleases bottom) */}
            <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none -z-10" />

            {/* ASCII Ripple Effect Layer */}
            <div className="absolute inset-0 -z-10 pointer-events-none opacity-60">
                <AsciiRipple />
            </div>

            <div className="mx-auto max-w-5xl rounded-3xl border border-white/10 px-6 py-24 md:py-32 lg:py-48 relative z-10 backdrop-blur-sm bg-black/5">
                <div className="text-center">
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        as="h2"
                        className="text-balance text-4xl font-semibold lg:text-5xl">
                        Don't miss a spot!
                    </TextEffect>
                    <TextEffect
                        triggerOnView
                        preset="fade-in-blur"
                        speedSegment={0.3}
                        delay={0.3}
                        as="p"
                        className="mt-4 text-muted-foreground">
                        We have limited availability, register now in the link below.
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
                            size="lg">
                            <Link href="#">
                                <span>Register</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="#">
                                <span>Contact the Host</span>
                            </Link>
                        </Button>
                    </AnimatedGroup>
                </div>
            </div>
        </section>
    )
}
