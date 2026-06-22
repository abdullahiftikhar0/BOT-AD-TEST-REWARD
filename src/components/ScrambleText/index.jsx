"use client"

import { useState, useRef, useEffect } from "react"
import { Typography } from "@mui/material"
import { useTextScrambler } from "../../hooks/use-text-scrambler"

export default function ScrambleText({ text, speed = 50, ...props }) {
  const [isHovered, setIsHovered] = useState(false)
  const { text: displayText, startScramble, stopScramble } = useTextScrambler(text, speed)

  const handleMouseEnter = () => {
    setIsHovered(true)
    startScramble()
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    stopScramble()
  }

  return (
    <Typography
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={{
        cursor: "pointer",
        display: "inline-block",
        fontFamily: "monospace",
        ...props.sx,
      }}
    >
      {displayText}
    </Typography>
  )
} 