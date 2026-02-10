"use client"

import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import HeartsEffect from "./HeartsEffect"

export default function DiaryPage({ setCurrentPage }) {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  const handleContinue = () => {
    setCurrentPage("apology")
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <HeartsEffect show={showContent} />
      <motion.div
        initial={{ rotateY: -90, opacity: 0 }}
        animate={{ rotateY: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-sm border border-pink-300/20 rounded-lg p-8 max-w-md w-full shadow-2xl"
        style={{ perspective: "1000px" }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: showContent ? 1 : 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center"
        >
          <h1 className="text-3xl text-pink-300 mb-8 leading-relaxed">🥰</h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="mb-6"
          >
            <img
              src="/poke-milk-and-mocha.gif"
              alt="Poke Milk and Mocha"
              className="w-48 h-48 mx-auto rounded-lg"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <p className="text-purple-200 text-lg mb-8 leading-relaxed">
              Oliii li li li 😚 <br /> Sorry Gubbiii 😁, Just kidding .<br /> Gift bek lo ,..<br />Nin Bag Tagd Nodu 😉...
            </p>

          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
