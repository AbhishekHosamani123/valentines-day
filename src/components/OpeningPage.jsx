"use client"

import { motion } from "framer-motion"

export default function OpeningPage({ onComplete }) {
  const handleLetMeTalk = () => {
    setTimeout(() => {
      onComplete()
    }, 500)
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center relative">
      {/* Floating cute elements */}
      <motion.div
        className="absolute top-20 left-10 text-2xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
        }}
      >
        🌙
      </motion.div>

      <motion.div
        className="absolute top-10 md:top-32 right-8 md:right-16 text-xl"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -10, 0],
        }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          delay: 1,
        }}
      >
        ✨
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mb-8 relative"
      >
        {/* Cute glow effect around teddy */}
        <div className="absolute inset-0 bg-gradient-to-r from-pink-400/20 to-purple-400/20 rounded-full blur-xl scale-110"></div>
        {/* Replace teddy gif with emoji */}
        <div className="w-64 h-64 mx-auto rounded-2xl relative z-10 flex items-center justify-center text-[10rem]">
          🫣
        </div>

        {/* Floating hearts around teddy */}
        <motion.div
          className="absolute -top-2 -right-2 text-lg"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          💕
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="space-y-6 max-w-md"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="text-pink-200 text-xl leading-relaxed"
        >
          le le le 🫣... 
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="text-purple-200 text-xl leading-relaxed"
        >
          Na Ninag Gift kodbek la , na mart an bittidde nod 😅 vyas aagad la adik 😁😉…
        </motion.p>
      </motion.div>

      <motion.button
        initial={{ opacity: 0, y: 30, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 2, ease: [0.25, 0.46, 0.45, 0.94] }}
        onClick={handleLetMeTalk}
        className="mt-8 px-8 py-4 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-2xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 inline-block text-center z-50 relative"
        whileHover={{
          scale: 1.03,
          boxShadow: "0 0 35px rgba(236, 72, 153, 0.4)",
          y: -2,
        }}
        whileTap={{ scale: 0.97 }}
      >
        <span className="relative z-10">see the gift</span>
      </motion.button>

      {/* Bottom floating elements */}
      <motion.div
        className="absolute bottom-20 left-8 text-xl"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 10, 0],
        }}
        transition={{
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          delay: 2,
        }}
      >
        🌸
      </motion.div>
    </div>
  )
}
