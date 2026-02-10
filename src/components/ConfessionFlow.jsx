
"use client"

import { useRef, useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import Loader from "@/components/Loader"
import HeartReveal from "@/components/HeartReveal"
import ConfessionIntro from "@/components/ConfessionIntro"
import SpecialMessage from "@/components/SpecialMessage"
import PhotoGallery from "@/components/PhotoGallery"
import VoiceNote from "@/components/VoiceNote"
import FloatingElements from "@/components/FloatingElements"
import BackgroundMusic from "@/components/BackgroundMusic"
import OpeningPage from "@/components/OpeningPage"
import GiftPage from "@/components/GiftPage"
import DiaryPage from "@/components/DiaryPage"

export default function ConfessionFlow({ name, message, photos, musicUrl }) {
    const [currentScreen, setCurrentScreen] = useState("loader")
    const [musicStarted, setMusicStarted] = useState(false)

    const musicRef = useRef(null)

    const handleScreenChange = (screen) => {
        setCurrentScreen(screen)
        if (screen === "heartReveal" && !musicStarted) {
            setMusicStarted(true)
        }
    }

    const handleVoicePlay = () => {
        musicRef.current?.pause()
    }

    const handleVoicePause = () => {
        musicRef.current?.resume()
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-pink-950/35 via-black/40 to-fuchsia-950/35 relative overflow-hidden">

            <div className="fixed inset-0 z-0 blur-xl opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 25% 30%, rgba(236,72,153,0.7), transparent 40%)",
            }} />

            <div className="fixed inset-0 z-0 blur-xl opacity-10" style={{
                backgroundImage: "radial-gradient(circle at 75% 75%, rgba(99,102,241,0.7), transparent 40%)",
            }} />

            <div className="fixed inset-0 z-0 blur-2xl opacity-5" style={{
                backgroundImage: "radial-gradient(circle at 50% 50%, rgba(228,193,255,0.6), transparent 40%)",
            }} />


            {/* Cute floating elements */}
            <FloatingElements />

            {musicStarted && <BackgroundMusic ref={musicRef} src={musicUrl} />}

            <AnimatePresence mode="wait">
                {currentScreen === "loader" && <Loader key="loader" onComplete={() => handleScreenChange("heartReveal")} />}
                {currentScreen === "heartReveal" && (
                    <HeartReveal key="heartReveal" onComplete={() => handleScreenChange("confessionIntro")} />
                )}
                {currentScreen === "confessionIntro" && (
                    <ConfessionIntro key="confessionIntro" onComplete={() => handleScreenChange("message")} name={name} />
                )}
                {currentScreen === "message" && (
                    <SpecialMessage key="message" onComplete={() => handleScreenChange("photos")} message={message} />
                )}
                {currentScreen === "photos" && <PhotoGallery key="photos" onComplete={() => handleScreenChange("openingPage")} photos={photos} />}
                {currentScreen === "openingPage" && <OpeningPage key="openingPage" onComplete={() => handleScreenChange("gift")} />}
                {currentScreen === "gift" && <GiftPage key="gift" onComplete={() => handleScreenChange("diary")} />}
                {currentScreen === "diary" && <DiaryPage key="diary" />}
            </AnimatePresence>

            {/* Watermark */}
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{
                    duration: 2.5,
                    delay: 1,
                }}
                className="fixed bottom-4 right-4 text-[13px] text-white/40 pointer-events-none z-50 font-light">
                @AbhiBuilds
            </motion.div>
        </div>
    )
}
