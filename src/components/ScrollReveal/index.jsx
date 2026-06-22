"use client"

import { motion } from "framer-motion"
import { useScrollAnimation } from "../../hooks/useScrollAnimation"

export default function ScrollReveal({
  children,
  variants,
  className = "",
  delay = 0,
  threshold = 0.2,
  triggerOnce = true,
  duration = 0.6,
  direction = "up",
}) {
  // Choose animation variant based on direction
  let animationVariant

  if (variants) {
    animationVariant = variants
  } else {
    switch (direction) {
      case "up":
        animationVariant = {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: "easeOut", delay },
          },
        }
        break
      case "down":
        animationVariant = {
          hidden: { opacity: 0, y: -30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: "easeOut", delay },
          },
        }
        break
      case "left":
        animationVariant = {
          hidden: { opacity: 0, x: -30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: "easeOut", delay },
          },
        }
        break
      case "right":
        animationVariant = {
          hidden: { opacity: 0, x: 30 },
          visible: {
            opacity: 1,
            x: 0,
            transition: { duration, ease: "easeOut", delay },
          },
        }
        break
      case "scale":
        animationVariant = {
          hidden: { opacity: 0, scale: 0.9 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: { duration, ease: "easeOut", delay },
          },
        }
        break
      case "none":
        animationVariant = {
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { duration, ease: "easeOut", delay },
          },
        }
        break
      default:
        animationVariant = {
          hidden: { opacity: 0, y: 30 },
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration, ease: "easeOut", delay },
          },
        }
    }
  }

  const { ref, controls } = useScrollAnimation({
    threshold,
    triggerOnce,
    variants: animationVariant,
  })

  return (
    <motion.div ref={ref} initial="hidden" animate={controls} variants={animationVariant} className={className}>
      {children}
    </motion.div>
  )
} 