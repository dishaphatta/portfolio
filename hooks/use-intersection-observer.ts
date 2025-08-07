"use client"

import { useEffect, useState, useRef, type RefObject } from "react"

interface UseIntersectionObserverProps {
  threshold?: number
  rootMargin?: string
  freezeOnceVisible?: boolean
}

export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = "0px",
  freezeOnceVisible = true,
}: UseIntersectionObserverProps = {}): [boolean, RefObject<HTMLDivElement>] {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)

          if (freezeOnceVisible && ref.current) {
            observer.unobserve(ref.current)
          }
        } else {
          if (!freezeOnceVisible) {
            setIsVisible(false)
          }
        }
      },
      { threshold, rootMargin },
    )

    const currentRef = ref.current

    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [threshold, rootMargin, freezeOnceVisible])

  return [isVisible, ref]
}
