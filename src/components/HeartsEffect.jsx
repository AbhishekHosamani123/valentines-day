"use client"

import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

export default function HeartsEffect({ show, onComplete, count = 25 }) {
  const [hearts, setHearts] = useState([])

  useEffect(() => {
    if (show) {
      const newHearts = []
      const screenWidth = typeof window !== "undefined" ? window.innerWidth : 800
      const screenHeight = typeof window !== "undefined" ? window.innerHeight : 600
      for (let i = 0; i < count; i++) {
        const x = Math.random() * screenWidth;
        newHearts.push({
          id: i,
          x: x,
          y: screenHeight - (Math.random() * 30),
          delay: Math.random() * 2.5,
          size: 10 + Math.random() * 16,
          color: [
            "text-pink-400",
            "text-red-400",
            "text-purple-400",
            "text-rose-400",
            "text-fuchsia-400",
          ][Math.floor(Math.random() * 5)],
          drift: (Math.random() - 0.5) * 120,
          rotation: Math.random() * 360,
        })
      }
      setHearts(newHearts)
      // Call onComplete after the animation duration
      const timeout = setTimeout(() => {
        if (onComplete) onComplete()
      }, 4500)
      return () => clearTimeout(timeout)
    } else {
      setHearts([])
    }
  }, [show, count, onComplete])

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-40 pointer-events-none w-full h-full">
          {hearts.map((heart) => (
            <motion.div
              key={heart.id}
              initial={{
                x: heart.x,
                y: heart.y,
                opacity: 0,
                scale: 0,
                rotate: heart.rotation,
              }}
              animate={{
                y: -200,
                x: heart.x,
                opacity: [0, 1, 1, 0.8, 0],
                scale: [0, 1.4, 1.2, 0.9, 0.4],
                rotate: heart.rotation + 720,
              }}
              transition={{
                duration: 4,
                delay: heart.delay,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
              className="absolute pointer-events-none"
            >
              <Heart
                className={`${heart.color} fill-current drop-shadow-lg`}
                size={heart.size}
                style={{
                  filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.6))",
                }}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AnimatePresence>
  )
} 