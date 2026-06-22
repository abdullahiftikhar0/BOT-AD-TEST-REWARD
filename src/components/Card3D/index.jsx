"use client"

import React, { useState, useRef } from "react"
import { motion } from "framer-motion"

export default function Card3D({
  children,
  className = "",
  intensity = 10,
  borderRadius = 8,
  shadow = true,
  glare = true,
}) {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)
  const [scale, setScale] = useState(1)
  const [glarePosition, setGlarePosition] = useState({ x: 0, y: 0 })
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (!cardRef.current) return

    const rect = cardRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const mouseX = e.clientX
    const mouseY = e.clientY

    // Calculate rotation based on mouse position relative to card center
    const rotateY = ((mouseX - centerX) / (rect.width / 2)) * intensity
    const rotateX = -((mouseY - centerY) / (rect.height / 2)) * intensity

    // Calculate glare position
    const glareX = ((mouseX - rect.left) / rect.width) * 100
    const glareY = ((mouseY - rect.top) / rect.height) * 100

    setRotateX(rotateX)
    setRotateY(rotateY)
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseEnter = () => {
    setScale(1.03)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
    setScale(1)
    setGlarePosition({ x: 0, y: 0 })
  }

  return (
    <motion.div
      ref={cardRef}
      className={`relative ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
      }}
      animate={{
        rotateX,
        rotateY,
        scale,
        boxShadow: shadow ? (scale > 1 ? "0 20px 40px rgba(0, 0, 0, 0.2)" : "0 0 0 rgba(0, 0, 0, 0)") : "none",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      {children}

      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, transparent 70%)",
            backgroundPosition: `${glarePosition.x}% ${glarePosition.y}%`,
            backgroundSize: "200% 200%",
            opacity: scale > 1 ? 1 : 0,
          }}
          animate={{
            opacity: scale > 1 ? 0.4 : 0,
          }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        />
      )}
    </motion.div>
  )
} 