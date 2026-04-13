"use client";

import { useState } from "react";
import HeroSection from "@/components/hero-section";
import Process from "@/components/Process";
import AllReleases from "@/components/AllReleases";
import ResumeHero from "@/components/ResumeHero";
import VideoModal from "@/components/VideoModal";
import { ThesisSection } from "@/components/thesis-section";

export default function Home() {
    const [selectedVideoId, setSelectedVideoId] = useState<string | null>(null);

    return (
        <>
            <HeroSection/>
            <ThesisSection/>
            <Process/>
            <AllReleases onVideoSelect={setSelectedVideoId} />
            <ResumeHero/>


            <VideoModal 
                videoId={selectedVideoId} 
                isOpen={!!selectedVideoId} 
                onClose={() => setSelectedVideoId(null)} 
            />
        </>
    )
}
