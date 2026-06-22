"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "@mui/material"

export default function ParticleBackground() {
  const canvasRef = useRef(null)
  const theme = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let particles = []

    // Set canvas to full screen
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Recreate particles when canvas is resized
      initParticles()
    }

    // Initialize particles
    const initParticles = () => {
      particles = []
      const particleCount = Math.min(Math.floor(window.innerWidth / 10), 100) // Responsive particle count

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 3 + 1
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const speedX = Math.random() * 0.5 - 0.25
        const speedY = Math.random() * 0.5 - 0.25

        // Use theme colors for particles
        const colors =
          theme.palette.mode === "dark"
            ? ["rgba(255, 255, 255, 0.3)", "rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 0.2)"]
            : ["rgba(0, 0, 0, 0.3)", "rgba(0, 0, 0, 0.1)", "rgba(0, 0, 0, 0.2)"]

        const color = colors[Math.floor(Math.random() * colors.length)]

        particles.push({ x, y, size, speedX, speedY, color })
      }
    }

    // Update and draw particles
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw and update each particle
      particles.forEach((particle, index) => {
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Connect particles that are close to each other
        connectParticles(particle, index)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Draw lines between nearby particles
    const connectParticles = (particle, index) => {
      for (let i = index + 1; i < particles.length; i++) {
        const dx = particle.x - particles[i].x
        const dy = particle.y - particles[i].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle =
            theme.palette.mode === "dark"
              ? `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
              : `rgba(0, 0, 0, ${0.1 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particle.x, particle.y)
          ctx.lineTo(particles[i].x, particles[i].y)
          ctx.stroke()
        }
      }
    }

    // Initialize
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme.palette.mode])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  )
} 