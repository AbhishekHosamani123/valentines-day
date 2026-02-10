"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Heart, Star, Sparkles } from "lucide-react"

export default function FloatingElements() {
    const elements = [
        { Icon: Heart, color: "text-pink-400", size: "w-3 h-3" },
        { Icon: Star, color: "text-yellow-300", size: "w-2 h-2" },
        { Icon: Sparkles, color: "text-purple-300", size: "w-2 h-2" },
    ]

    const [floatingItems, setFloatingItems] = useState([])
    const [stars, setStars] = useState([])

    useEffect(() => {
        const width = window.innerWidth
        const height = window.innerHeight

        const items = Array.from({ length: 10 }).map((_, i) => ({
            x: Math.random() * width,
            delay: Math.random() * 10,
            duration: Math.random() * 6 + 8,
            Element: elements[i % elements.length],
        }))
        setFloatingItems(items)

        const twinkles = Array.from({ length: 20 }).map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: Math.random() * 5,
            duration: Math.random() * 4 + 3,
        }))
        setStars(twinkles)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none z-10">
            {floatingItems.map(({ x, delay, duration, Element }, i) => (
                <motion.div
                    key={i}
                    className="absolute opacity-25"
                    initial={{ x, y: window.innerHeight + 50, opacity: 0 }}
                    animate={{
                        y: -100,
                        x: Math.random() * window.innerWidth,
                        rotate: [0, 360],
                        opacity: [0, 0.3, 0],
                    }}
                    transition={{
                        duration,
                        delay,
                        repeat: Infinity,
                        ease: "easeOut",
                    }}
                >
                    <Element.Icon className={`${Element.color} ${Element.size} fill-current`} />
                </motion.div>
            ))}

            {stars.map(({ left, top, delay, duration }, i) => (
                <motion.div
                    key={`star-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                    style={{ left, top }}
                    animate={{ opacity: [0, 0.6, 0], scale: [0, 1, 0] }}
                    transition={{ duration, delay, repeat: Infinity }}
                />
            ))}
        </div>
    )
}
