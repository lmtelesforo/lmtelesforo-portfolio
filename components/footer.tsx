"use client";

import Link from 'next/link'
import V0Icon from "@/components/icons/v0-icon";
import React from "react";
import { Twitter, Linkedin, Instagram, Facebook, Github } from "lucide-react";

const pageLinks = [
    { title: 'Home', href: '#home' },
    { title: 'About', href: '#about' },
    { title: 'Stack', href: '#tech-stack' },
    { title: 'Projects', href: '#projects' },
    { title: 'Contact', href: '#contact' },
]

const socialLinks = [
    { icon: <Linkedin size={18} />, href: 'https://www.linkedin.com/in/laira-claire-telesforo-5a44463b6/', label: 'LinkedIn' },
    { icon: <Instagram size={18} />, href: 'https://www.instagram.com/xlairaclaire/', label: 'Instagram' },
    { icon: <Facebook size={18} />, href: 'https://www.facebook.com/lairaclairee', label: 'Facebook' },
]

export default function FooterSection() {
    return (
        <footer className="pt-6 pb-4 border-t border-white/5">
            <div className="mx-auto max-w-7xl px-6">
                <div className="flex flex-col items-start text-left space-y-4 mb-4">
                    {/* Branding & Bio */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-start gap-4">
                            <img
                                src="/favicon.png"
                                alt="lmtelesforo icon"
                                className="w-10 h-10 object-contain rounded-lg"
                            />
                        </div>
                        <p className="text-primary-light text-sm leading-relaxed max-w-none">
                            CS Senior at UPLB & Full-stack Developer. Bridging the gap between complex computer vision models and seamless full-stack applications.
                        </p>
                        <div className="flex items-center justify-start gap-4">
                            {socialLinks.map((social, index) => (
                                <Link 
                                    key={index} 
                                    href={social.href}
                                    target="_blank"
                                    className="size-10 rounded-full border border-white/20 flex items-center justify-center text-primary-light hover:text-white hover:border-primary-light transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    {social.icon}
                                </Link>
                            ))}
                        </div>
                        <Link 
                            href="mailto:lcmtelesforo@gmail.com"
                            className="text-[#7980DA] hover:text-primary-light font-medium transition-colors block"
                        >
                            lcmtelesforo@gmail.com
                        </Link>
                    </div>
                </div>

                {/* Bottom Row */}
                <div className="pt-4 mb-2 border-t border-white/5">
                    <span className="text-white/40 text-[10px] font-mono uppercase tracking-widest">
                        © 2026 Laira Claire Telesforo. All rights reserved.
                    </span>
                </div>
            </div>
        </footer>
    )
}

