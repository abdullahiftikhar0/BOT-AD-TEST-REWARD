"use client"

import { Box, Typography, useTheme } from "@mui/material"
import { FigmaIcon, UnityIcon, AndroidIcon, DatabaseIcon } from "../SkillIcons"
import Card3D from "../Card3D"

export default function SkillCard({ name, icon }) {
  const theme = useTheme()

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
        {getIcon()}
        <Typography variant="subtitle1" fontWeight="bold" color="white">
          {name}
        </Typography>
      </Box>
    </Card3D>
  )
} 