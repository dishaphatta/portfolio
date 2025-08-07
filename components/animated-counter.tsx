"use client"

import { useEffect, useState } from "react"

interface AnimatedCounterProps {
  from: number
  to: number
  duration?: number
  decimals?: number
  formatter?: (value: number) => string
}

export default function AnimatedCounter({
  from,
  to,
  duration = 1000,
  decimals = 0,
  formatter = (val) => val.toString(),
}: AnimatedCounterProps) {
  const [value, setValue] = useState(from)

  useEffect(() => {
    const startTime = performance.now()

    const updateCounter = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      const current = from + (to - from) * progress
      setValue(current)

      if (progress < 1) {
        requestAnimationFrame(updateCounter)
      }
    }

    requestAnimationFrame(updateCounter)
  }, [from, to, duration])

  return <span>{formatter(parseFloat(value.toFixed(decimals)))}</span>
}
