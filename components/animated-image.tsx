"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

interface AnimatedImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  priority?: boolean
  fill?: boolean
}

export default function AnimatedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
}: AnimatedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isLoaded ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="relative w-full h-full"
    >
      <Image
        src={src || "/placeholder.svg"}
        alt={alt}
        width={!fill ? width : undefined}
        height={!fill ? height : undefined}
        fill={fill}
        className={className}
        priority={priority}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </motion.div>
  )
}
