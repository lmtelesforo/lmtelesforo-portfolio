import React from "react"
import type {Metadata} from 'next'
import {Geist, Geist_Mono} from 'next/font/google'
import {Analytics} from '@vercel/analytics/next'
import './globals.css'

import SplashCursor from "@/components/SplashCursor";
import FooterSection from "@/components/footer";
import {HeroHeader} from "@/components/header";
import SmoothScroll from "@/components/SmoothScroll";

const _geist = Geist({subsets: ["latin"]});
const _geistMono = Geist_Mono({subsets: ["latin"]});

export const metadata: Metadata = {
    title: 'lmtelesforo',
    description: 'Creative Portfolio of lmtelesforo — AI/ML Research & Full-Stack Development',
    generator: 'lmtelesforo',
    icons: {
        icon: '/favicon.png',
        apple: '/favicon.png',
    },
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark scroll-smooth">
        <body className="font-sans antialiased">
        <SmoothScroll>
            <SplashCursor />
            <HeroHeader/>
            {children}
            <FooterSection/>
            <Analytics/>
        </SmoothScroll>
        </body>
        </html>
    )
}
