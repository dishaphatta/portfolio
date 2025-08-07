"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedCardProps {
  children: ReactNode
  className?: string
  index?: number
}

export default function AnimatedCard({ children, className, index = 0 }: AnimatedCardProps) {
  const [isVisible, ref] = useIntersectionObserver()

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{
          duration: 0.5,
          delay: index * 0.1,
          ease: [0.25, 0.1, 0.25, 1.0],
        }}
        whileHover={{
          y: -5,
          transition: { duration: 0.2 },
        }}
      >
        {children}
      </motion.div>
    </div>
  )
}
