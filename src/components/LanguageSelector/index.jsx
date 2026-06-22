"use client"

import { useState } from "react"
import { Box, Menu, MenuItem, IconButton, Typography } from "@mui/material"
import { Language } from "@mui/icons-material"
import { useLanguage } from "../../context/LanguageContext"
import { motion } from "framer-motion"

const languages = [
  { code: "en", name: "English", flag: "🇺🇸" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
]

export default function LanguageSelector() {
  const { language, setLanguage } = useLanguage()
  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageSelect = (langCode) => {
    setLanguage(langCode)
    handleClose()
  }

  // Find current language details
  const currentLanguage = languages.find((lang) => lang.code === language) || languages[0]

  return (
    <>
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <IconButton
          onClick={handleClick}
          aria-controls={open ? "language-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          sx={{
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "50%",
            p: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
            <Language fontSize="small" />
            <Typography variant="caption" sx={{ fontWeight: "bold" }}>
              {currentLanguage.flag}
            </Typography>
          </Box>
        </IconButton>
      </motion.div>

      <Menu
        id="language-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "language-button",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        {languages.map((lang) => (
          <MenuItem
            key={lang.code}
            onClick={() => handleLanguageSelect(lang.code)}
            selected={lang.code === language}
            sx={{
              minWidth: 150,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{lang.name}</span>
            <span>{lang.flag}</span>
          </MenuItem>
        ))}
      </Menu>
    </>
  )
} 