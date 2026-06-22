"use client"

import { Box, Typography, useTheme, Skeleton } from "@mui/material"
import { useState, useEffect } from "react"
import { FigmaIcon, UnityIcon, AndroidIcon, DatabaseIcon } from "../SkillIcons"
import Card3D from "../Card3D"

export default function SkillCard({ name, icon }) {
  const theme = useTheme()
  const [iconLoading, setIconLoading] = useState(true)

  // Simulate icon loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIconLoading(false)
    }, Math.random() * 800 + 400) // Random time between 400-1200ms for more natural loading
    
    return () => clearTimeout(timer)
  }, [])

  const getIcon = () => {
    switch (icon) {
      case "figma":
        return <FigmaIcon />
      case "unity":
        return <UnityIcon />
      case "android":
        return <AndroidIcon />
      case "database":
        return <DatabaseIcon />
      default:
        return <DatabaseIcon />
    }
  }

  return (
    <Card3D intensity={8}>
      <Box
        sx={{
          p: 3,
          textAlign: "center",
          backgroundColor: "rgba(30, 30, 30, 0.9)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          borderRadius: 1,
        }}
      >
        {iconLoading ? (
          <Skeleton 
            variant="circular" 
            width={50} 
            height={50} 
            animation="wave"
            sx={{ 
              bgcolor: theme.palette.mode === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }}
          />
        ) : (
          getIcon()
        )}
        
        {iconLoading ? (
          <Skeleton 
            variant="text" 
            width="70%" 
            height={30} 
            animation="wave"
            sx={{ 
              bgcolor: theme.palette.mode === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
            }}
          />
        ) : (
          <Typography variant="subtitle1" fontWeight="bold" color="white">
            {name}
          </Typography>
        )}
      </Box>
    </Card3D>
  )
} 