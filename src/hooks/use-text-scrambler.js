"use client"

import { useState, useEffect, useRef } from "react"

// Characters to use in the scrambling effect
const chars = "!<>-_\\/[]{}—=+*^?#________"

export function useTextScrambler(originalText, speed = 50) {
  const [text, setText] = useState(originalText)
  const [isScrambling, setIsScrambling] = useState(false)
  const intervalRef = useRef(null)

  // Function to start the scrambling effect
  const startScramble = () => {
    if (isScrambling) return
    setIsScrambling(true)
  }

  // Function to stop the scrambling effect and immediately reset text
  const stopScramble = () => {
    setIsScrambling(false)
    setText(originalText)
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  useEffect(() => {
    if (!isScrambling) {
      setText(originalText)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    let iteration = 0
    const maxIterations = originalText.length * 2

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Start the scrambling effect
    intervalRef.current = setInterval(() => {
      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setText(originalText)
        setIsScrambling(false)
        return
      }

      setText(
        originalText
          .split("")
          .map((char, index) => {
            // If it's a space, keep it as a space
            if (char === " ") return " "

            // If we've "revealed" this character, return the original
            if (index < iteration / 2) {
              return originalText[index]
            }

            // Otherwise return a random character
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")
      )

      iteration += 1
    }, speed)

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isScrambling, originalText, speed])

  return { text, startScramble, stopScramble }
} 