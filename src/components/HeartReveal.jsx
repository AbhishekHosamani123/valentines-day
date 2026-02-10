"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import { Heart, Sparkles } from "lucide-react"

export default function HeartReveal({ onComplete }) {
  const [showText, setShowText] = useState(false)

  useEffect(() => {
    const textTimer = setTimeout(() => setShowText(true), 2000)
    const completeTimer = setTimeout(() => {
      // Smooth transition to next screen
      onComplete()
    }, 6000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1 }}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      <div className="relative">
        <motion.div
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="relative"
        >
          {/* <Heart className="w-48 h-48 text-pink-400 fill-current drop-shadow-2xl" /> */}

          {/* Subtle glowing effect */}
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-30"
          />
        </motion.div>

        {/* Heart pieces splitting smoothly */}
        <motion.div
          initial={{ x: 0, rotate: 0, opacity: 1 }}
          animate={{ x: -120, rotate: -45, opacity: 0 }}
          transition={{ delay: 2.5, duration: 2.5, ease: "easeInOut" }}
          className="relative z-10"
        >
          <Heart
            className="w-48 h-48 text-pink-400 fill-current"
            style={{ clipPath: "polygon(0 0, 50% 0, 50% 100%, 0 100%)" }}
          />
           <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            className="absolute inset-0 bg-pink-400 rounded-full blur-2xl opacity-30"
          />
        </motion.div>

        <motion.div
          initial={{ x: 0, rotate: 0, opacity: 1 }}
          animate={{ x: 120, rotate: 45, opacity: 0 }}
          transition={{ delay: 2.5, duration: 2.5, ease: "easeInOut" }}
          className="absolute top-0 left-0 z-10"
        >
          <Heart
            className="w-48 h-48 text-pink-400 fill-current"
            style={{ clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)" }}
          />
        </motion.div>

        {/* Beautiful sparkle explosion */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.1, 1.5, 0],
              x: Math.cos((i * 30 * Math.PI) / 180) * 150,
              y: Math.sin((i * 30 * Math.PI) / 180) * 150,
            }}
            transition={{
              delay: 2.8 + i * 0.1,
              duration: 2.5,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
          >
            <Sparkles className="w-6 h-6 text-yellow-300" />
          </motion.div>
        ))}

        {/* Floating hearts */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`heart-${i}`}
            initial={{ opacity: 0, scale: 0, y: 0 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0.1, 1.2, 0.5],
              y: -200,
              x: (Math.random() - 0.5) * 200,
              rotate: [0, 360],
            }}
            transition={{
              delay: 3.2 + i * 0.2,
              duration: 3,
              ease: "easeOut",
            }}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[999]"
          >
            <Heart className="w-5 h-5 text-pink-300 fill-current" />
          </motion.div>
        ))}
      </div>

      {/* Enhanced text with smooth transitions */}
      {showText && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.8 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute bottom-20 text-center px-6"
        >
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl px-8 py-4 border border-white/20">
            <p className="text-3xl font-bold  bg-gradient-to-r from-pink-300 to-purple-300 bg-clip-text text-transparent">
              My heart opens for you...<span className="text-black">✨</span>
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
