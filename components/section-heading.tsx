"use client"

import { motion } from "framer-motion"
import { useIntersectionObserver } from "@/hooks/use-intersection-observer"

interface SectionHeadingProps {
  title: string
  description?: string
}

export default function SectionHeading({ title, description }: SectionHeadingProps) {
  const [isVisible, ref] = useIntersectionObserver()

  return (
    <div ref={ref} className="text-center max-w-3xl mx-auto mb-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
        {description && (
          <motion.p
            className="mt-4 text-muted-foreground"
            initial={{ opacity: 0 }}
            animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </div>
  )
}
