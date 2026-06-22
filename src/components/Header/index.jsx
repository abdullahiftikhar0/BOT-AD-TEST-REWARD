"use client"
import { useState, useEffect } from "react"
import { Box, Typography, IconButton, useTheme, useMediaQuery } from "@mui/material"
import { Menu, DarkMode, LightMode, Language, GitHub } from "@mui/icons-material"
import { Link, useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import ThemeToggle from "../ThemeToggle"
import ScrambleText from "../ScrambleText"
import LanguageSelector from "../LanguageSelector"
import { useLanguage } from "../../context/LanguageContext"

export default function Header({ activePage, title, toggleSidebar }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const { t } = useLanguage()

  const navItems = [
    { name: "HOME", path: "/", translationKey: "home" },
    { name: "ABOUTME", path: "/about", translationKey: "about" },
    { name: "WORKS", path: "/works", translationKey: "works" },
    { name: "HIRE ME", path: "/hire-me", translationKey: "hire" },
  ]

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  }

  const navVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const navItemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.3,
      },
    },
  }

  return (
    <Box component="header" sx={{ py: 3, px: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
        <motion.div
          whileHover={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 0.5 }}
          style={{
            background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
            borderRadius: "50%",
            padding: "8px",
            marginRight: "16px",
          }}
        >
          <IconButton
            onClick={toggleSidebar}
            sx={{
              color: theme.palette.mode === "dark" ? "white" : "black",
              border: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}`,
            }}
          >
            <Menu />
          </IconButton>
        </motion.div>

        <motion.div variants={titleVariants} initial="hidden" animate="visible" style={{ flexGrow: 1 }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: "bold",
              fontSize: { xs: "2rem", sm: "3rem", md: "4rem" },
              textAlign: { xs: "center", md: "left" },
              background:
                theme.palette.mode === "dark"
                  ? "linear-gradient(45deg, #ffffff 30%, #aaaaaa 90%)"
                  : "linear-gradient(45deg, #000000 30%, #555555 90%)",
              backgroundSize: "200% 200%",
              animation: "gradientFlow 5s ease infinite",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {title}
          </Typography>
        </motion.div>

        <Box sx={{ display: "flex", gap: 2 }}>
          <LanguageSelector />
          <ThemeToggle />
        </Box>
      </Box>

      <motion.div variants={navVariants} initial="hidden" animate="visible">
        <Box
          component="nav"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            mb: 2,
            justifyContent: { xs: "center", md: "flex-start" },
          }}
        >
          {navItems.map((item) => (
            <motion.div key={item.name} variants={navItemVariants}>
              <Link
                to={item.path}
                style={{
                  textDecoration: "none",
                  color: theme.palette.mode === "dark" ? "white" : "black",
                }}
              >
                <Box
                  sx={{
                    position: "relative",
                    "&::after": {
                      content: '""',
                      position: "absolute",
                      width: activePage === item.name ? "100%" : "0%",
                      height: "2px",
                      bottom: "-4px",
                      left: "0",
                      backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                      transition: "width 0.3s ease",
                    },
                    "&:hover::after": {
                      width: "100%",
                    },
                  }}
                >
                  <ScrambleText
                    text={t(item.translationKey)}
                    variant="body1"
                    speed={30}
                    sx={{
                      fontWeight: activePage === item.name ? "bold" : "normal",
                      fontSize: activePage === item.name ? "1.2rem" : "1rem",
                      fontFamily: "inherit",
                      transition: "all 0.3s ease",
                    }}
                  />
                </Box>
              </Link>
            </motion.div>
          ))}
        </Box>
      </motion.div>
    </Box>
  )
} 