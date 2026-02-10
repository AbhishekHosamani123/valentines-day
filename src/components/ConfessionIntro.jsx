"use client"

import { motion } from "motion/react"
import { Heart, Sparkles } from "lucide-react"
import { useRef, useEffect, useState } from "react"
import HeartsEffect from "./HeartsEffect"

export default function ConfessionIntro({ onComplete, name = "Gubbiii" }) {
  const [showHearts, setShowHearts] = useState(true)
  const [showButtons, setShowButtons] = useState(false)
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 })
  const noBtnRef = useRef(null)

  // Ensure name is a string and has a fallback
  const partnerName = name || "Gubbiii";

  const moveNoButton = (e) => {
    // If event or ref is missing, fall back to random
    if (!e || !noBtnRef.current) {
      const x = (Math.random() - 0.5) * 200
      const y = (Math.random() - 0.5) * 200
      setNoButtonPos({ x, y })
      return
    }

    // Get button center
    const rect = noBtnRef.current.getBoundingClientRect()
    const btnCenter = {
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2
    }

    // Get cursor position (handle touch or mouse)
    const clientX = e.touches ? e.touches[0].clientX : e.clientX
    const clientY = e.touches ? e.touches[0].clientY : e.clientY

    // Vector from cursor to button
    let dx = btnCenter.x - clientX
    let dy = btnCenter.y - clientY

    // If cursor is right on top (0 dist), pick a random direction
    if (dx === 0 && dy === 0) { dx = Math.random() - 0.5; dy = Math.random() - 0.5 }

    // Normalize
    const dist = Math.sqrt(dx * dx + dy * dy)
    const moveDist = 150 // Move this many pixels away

    const moveX = (dx / dist) * moveDist
    const moveY = (dy / dist) * moveDist

    // Calculate new position relative to INITIAL (0,0)
    // NewPos = CurrentPos + MoveVector
    let newX = noButtonPos.x + moveX
    let newY = noButtonPos.y + moveY

    // Clamp to a radius from the original spot (to keep it "near" the Yes button)
    const maxRadius = 180
    const currentRadius = Math.sqrt(newX * newX + newY * newY)

    if (currentRadius > maxRadius) {
      const angle = Math.atan2(newY, newX)
      newX = Math.cos(angle) * maxRadius
      newY = Math.sin(angle) * maxRadius
    }

    setNoButtonPos({ x: newX, y: newY })
  }

  useEffect(() => {
    if (showHearts) {
      const timer = setTimeout(() => setShowHearts(false), 4500)
      return () => clearTimeout(timer)
    }
  }, [showHearts])

  return (
    <>
      <HeartsEffect show={showHearts} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="min-h-screen flex flex-col items-center justify-center text-white px-6 py-8"
      >
        <div className="w-full max-w-2xl">
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl text-center relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <motion.div
                animate={{
                  scale: [1, 1.05, 1],
                  rotate: [0, 5, -5, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative"
              >
                <Heart className="w-16 h-16 text-pink-400 fill-current mx-auto" />

                {[...Array(6)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      scale: [0, 1, 0],
                      rotate: [0, 180, 360],
                      opacity: [0, 0.8, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: i * 0.3,
                    }}
                    className="absolute"
                    style={{
                      left: `${50 + 35 * Math.cos((i * 60 * Math.PI) / 180)}%`,
                      top: `${50 + 35 * Math.sin((i * 60 * Math.PI) / 180)}%`,
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    <Sparkles className="w-3 h-3 text-yellow-300" />
                  </motion.div>
                ))}
              </motion.div>

              {/* Add teddy-hug.gif above the birthday text */}
              <div className="flex justify-center mb-4">
                <img src="/teddy-hug.gif" alt="Teddy Hug" className="w-32 h-32 md:w-40 md:h-40 object-contain" />
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl md:text-4xl font-bold">
                  <span className="bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">{partnerName} Will you be my Valentine?</span>
                  <span className="ml-2">🥹</span>
                </h2>

                <motion.p
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="text-base md:text-lg text-pink-200 leading-relaxed"
                >
                  “I figured if I’m going to smile all day, it might as well be because of you 😊🌹💘”
                </motion.p>
              </div>

              <div className="flex justify-center gap-4">
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onComplete}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-10 md:px-12 py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    YES 🥰
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </motion.button>

                <motion.button
                  ref={noBtnRef}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: 1,
                    y: noButtonPos.y,
                    x: noButtonPos.x
                  }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300, damping: 20 }}
                  // Run away on any interaction!
                  onMouseEnter={moveNoButton}
                  onTouchStart={moveNoButton}
                  onClick={moveNoButton}
                  className="bg-gray-500/50 backdrop-blur-sm text-white px-10 md:px-12 py-4 rounded-full font-semibold text-base md:text-lg shadow-lg hover:bg-gray-600/50 transition-all duration-300 relative z-20" // added z-20 just in case
                >
                  NO 🥺
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  )
}
