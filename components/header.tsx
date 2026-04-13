'use client'
import Link from 'next/link'
import {Menu, X} from 'lucide-react'
import {Button} from '@/components/ui/button'
import React from 'react'
import V0Icon from "@/components/icons/v0-icon";

export const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="bg-background/50 fixed z-50 w-full border-b backdrop-blur-3xl">
                <div className="mx-auto max-w-6xl px-1 transition-all duration-300">
                    <div className="relative flex flex-wrap items-center justify-between gap-6 pt-3 pb-[17px] lg:gap-0 lg:pt-2 lg:pb-[13px]">
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <Link
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2 pt-1">
                                <img
                                    src="/favicon.png"
                                    alt="lmtelesforo icon"
                                    className="w-10 h-10 object-contain rounded-lg"
                                />
                            </Link>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden">
                                <Menu
                                    className="in-data-[state=active]:rotate-180 in-data-[state=active]:scale-0 in-data-[state=active]:opacity-0 m-auto size-6 duration-200"/>
                                <X className="in-data-[state=active]:rotate-0 in-data-[state=active]:scale-100 in-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200"/>
                            </button>
                        </div>

                        <div
                            className="bg-background in-data-[state=active]:block lg:in-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0 lg:shadow-none dark:shadow-none dark:lg:bg-transparent">
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:items-center sm:gap-6 sm:space-y-0 md:w-fit mr-2">
                                <Link href="#home" className="text-sm font-medium text-muted-foreground hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                                    Home
                                </Link>
                                <Link href="#about" className="text-sm font-medium text-muted-foreground hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                                    About
                                </Link>
                                <Link href="#tech-stack" className="text-sm font-medium text-muted-foreground hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                                    Stack
                                </Link>
                                <Link href="#projects" className="text-sm font-medium text-muted-foreground hover:text-white hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.8)] transition-all duration-300">
                                    Projects
                                </Link>
                                <Button
                                    asChild
                                    size="sm"
                                    className="ml-0 sm:ml-0 rounded-full bg-gradient-to-r from-[#7980DA] to-[#C8B9E0] hover:opacity-90 border-none text-white font-medium shadow-[0_0_15px_rgba(121,128,218,0.4)] px-6">
                                    <Link href="#contact">Contact</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
