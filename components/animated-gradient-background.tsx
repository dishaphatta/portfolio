"use client"

import { useEffect, useRef } from "react"

const lerp = (start: number, end: number, t: number) => start + (end - start) * t

export default function AnimatedGradientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let time = 0

    // cursor logical and smoothed
    const cursor = { x: window.innerWidth / 2, y: window.innerHeight / 2 }
    const smooth = { x: window.innerWidth / 2, y: window.innerHeight / 2 }

    // Resize / DPR
    const resizeCanvas = () => {
      const dpr = Math.max(1, window.devicePixelRatio || 1)
      canvas.width = window.innerWidth * dpr
      canvas.height = window.innerHeight * dpr
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    window.addEventListener("resize", resizeCanvas)
    resizeCanvas()

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      cursor.x = e.clientX
      cursor.y = e.clientY
    }
    window.addEventListener("mousemove", handleMouseMove)

    // Your color palette for background/orbs
    const palette = [
      { r: 92, g: 253, b: 222 }, // #5cfdde
      { r: 174, g: 254, b: 238 }, // #aefeee
      { r: 249, g: 83, b: 123 }, // #f9537b
      { r: 251, g: 164, b: 185 }, // #fba4b9
      { r: 255, g: 228, b: 235 }, // #ffe4eb
    ]

    // Orb class using same palette
    class GradientOrb {
      x: number
      y: number
      radius: number
      color: { r: number; g: number; b: number }
      speedX: number
      speedY: number
      pulseSpeed: number
      pulseOffset: number

      constructor() {
        this.x = Math.random() * window.innerWidth
        this.y = Math.random() * window.innerHeight
        this.radius = Math.random() * 300 + 200
        this.color = palette[Math.floor(Math.random() * palette.length)]
        this.speedX = (Math.random() - 0.5) * 0.5
        this.speedY = (Math.random() - 0.5) * 0.5
        this.pulseSpeed = Math.random() * 0.02 + 0.01
        this.pulseOffset = Math.random() * Math.PI * 2
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x < -this.radius || this.x > window.innerWidth + this.radius) {
          this.speedX = -this.speedX
        }
        if (this.y < -this.radius || this.y > window.innerHeight + this.radius) {
          this.speedY = -this.speedY
        }

        this.x = Math.max(-this.radius, Math.min(window.innerWidth + this.radius, this.x))
        this.y = Math.max(-this.radius, Math.min(window.innerHeight + this.radius, this.y))
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const pulse = Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.3 + 0.7
        const currentRadius = this.radius * pulse

        const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, currentRadius)
        const alpha = 0.15 * pulse
        gradient.addColorStop(0, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha})`)
        gradient.addColorStop(0.5, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, ${alpha * 0.5})`)
        gradient.addColorStop(1, `rgba(${this.color.r}, ${this.color.g}, ${this.color.b}, 0)`)

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(this.x, this.y, currentRadius, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Instantiate orbs
    const orbs: GradientOrb[] = []
    const orbCount = Math.min(6, Math.floor((window.innerWidth * window.innerHeight) / 200000))
    for (let i = 0; i < orbCount; i++) {
      orbs.push(new GradientOrb())
    }

    // Animation loop
    const animate = () => {
      time += 0.016

      // smooth cursor interpolation (lag)
      smooth.x = lerp(smooth.x, cursor.x, 0.15)
      smooth.y = lerp(smooth.y, cursor.y, 0.15)

      // Background gradient using provided palette
      const bgGrad = ctx.createLinearGradient(0, 0, window.innerWidth, window.innerHeight)
      // bgGrad.addColorStop(0, "#bffff2")  // lighter cyan
      // bgGrad.addColorStop(0.25, "#e0fffb") // very light teal
      // bgGrad.addColorStop(0.5, "#ffc1d2") // pastel pink
      // bgGrad.addColorStop(0.75, "#ffdce5") // very light pink
      // bgGrad.addColorStop(1, "#fff4f7")    // near-white pink
      bgGrad.addColorStop(0, "#5cfdde")
      bgGrad.addColorStop(0.1, "#5cfdde")
      bgGrad.addColorStop(0.25, "#aefeee")
      bgGrad.addColorStop(0.5, "#f9537b")
      bgGrad.addColorStop(0.75, "#fba4b9")
      bgGrad.addColorStop(1, "#ffe4eb")

      

      ctx.globalCompositeOperation = "source-over"
      ctx.fillStyle = bgGrad
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)

      // Draw orbs
      orbs.forEach((orb) => {
        orb.update()
        orb.draw(ctx, time)
      })

      // Cursor-following filled blurred circle in #ffffea
      const glowRadius = Math.max(window.innerWidth, window.innerHeight) * 0.35
      const cursorGradient = ctx.createRadialGradient(
        smooth.x,
        smooth.y,
        0,
        smooth.x,
        smooth.y,
        glowRadius
      )
      cursorGradient.addColorStop(0, "rgba(255, 187, 0, 0.9)") // stronger center
      cursorGradient.addColorStop(0.35, "rgba(255, 187, 0, 0.9)")
      cursorGradient.addColorStop(1, "rgba(255, 187, 0, 0)")

      ctx.save()
      ctx.filter = "blur(60px)"
      ctx.globalCompositeOperation = "screen"
      ctx.fillStyle = cursorGradient
      ctx.beginPath()
      ctx.arc(smooth.x, smooth.y, glowRadius, 0, Math.PI * 2)
      ctx.fill()
      ctx.restore()

      // Subtle noise texture
      if (time % 0.1 < 0.016) {
        for (let i = 0; i < 50; i++) {
          const x = Math.random() * window.innerWidth
          const y = Math.random() * window.innerHeight
          const alpha = Math.random() * 0.02
          ctx.fillStyle = `rgba(100, 116, 139, ${alpha})`
          ctx.fillRect(x, y, 1, 1)
        }
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      window.removeEventListener("mousemove", handleMouseMove)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none"
      aria-hidden="true"
    />
  )
}
