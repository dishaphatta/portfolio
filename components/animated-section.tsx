"use client"

import type { ReactNode } from "react"
import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"
import { cn } from "@/lib/utils"

interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  delay?: number
}

export default function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const [isVisible, ref] = useIntersectionObserver()

  return (
    <div ref={ref} className={cn("w-full", className)}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.6, delay: delay * 0.1, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </div>
  )
}
