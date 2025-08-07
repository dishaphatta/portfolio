"use client"

import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface AnimatedTextProps {
  text: string
  className?: string
  once?: boolean
}

export default function AnimatedText({ text, className = "", once = true }: AnimatedTextProps) {
  const [isVisible, ref] = useIntersectionObserver({ freezeOnceVisible: once })

  const words = text.split(" ")

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
  }

  return (
    <div ref={ref} className="overflow-hidden">
      <motion.div
        className={`inline-block ${className}`}
        variants={container}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {words.map((word, index) => (
          <motion.span key={index} className="inline-block mr-1" variants={child}>
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  )
}
