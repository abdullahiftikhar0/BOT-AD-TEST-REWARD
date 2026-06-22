"use client"

import {
  Box,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  Avatar,
  IconButton,
} from "@mui/material"
import {
  Home,
  Folder,
  Settings,
  Email,
  Download,
  CalendarMonth,
  LocationOn,
  Code,
  ChevronLeft,
  ChevronRight,
} from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import { useState, useEffect, useRef } from "react"
import { useThemeContext } from "../../context/ThemeContext"
import ThemeToggle from "../ThemeToggle"
import profileImage from "../../assets/images/imgme.jpg"
import resumePDF from "../../assets/documents/AbdullahIftikharResume.pdf"

// Text scrambler function component
const TextScrambler = ({ text, isActive }) => {
  const [displayText, setDisplayText] = useState(text)
  const [isHovering, setIsHovering] = useState(false)
  const intervalRef = useRef(null)
  const chars = "!<>-_\\/[]{}—=+*^?#________"

  useEffect(() => {
    // Clear any existing interval when component unmounts or hover state changes
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!isHovering) {
      // Reset text immediately when not hovering
      setDisplayText(text)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
      return
    }

    let iteration = 0
    const maxIterations = text.length * 2

    // Clear any existing interval
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    // Start the scrambling effect
    intervalRef.current = setInterval(() => {
      if (iteration >= maxIterations) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
        setDisplayText(text)
        return
      }

      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            // If it's a space, keep it as a space
            if (char === " ") return " "

            // If we've "revealed" this character, return the original
            if (index < iteration / 2) {
              return text[index]
            }

            // Otherwise return a random character
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join(""),
      )

      iteration += 1
    }, 50)

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isHovering, text])

  return (
    <span
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false)
        setDisplayText(text) // Immediately reset text when mouse leaves
      }}
      style={{
        fontFamily: "inherit",
        fontWeight: isActive ? "bold" : "normal",
        color: isActive ? "white" : "rgba(255,255,255,0.7)",
        transition: "color 0.3s ease",
      }}
    >
      {displayText}
    </span>
  )
}

export default function Sidebar({ open, activePage, onClose }) {
  const theme = useTheme()
  const navigate = useNavigate()
  const { mode, toggleColorMode } = useThemeContext()
  const [isCollapsed, setIsCollapsed] = useState(false)

  // Load collapsed state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setIsCollapsed(savedState === "true")
    }
  }, [])

  // Save collapsed state to localStorage
  const toggleCollapsed = () => {
    const newState = !isCollapsed
    setIsCollapsed(newState)
    localStorage.setItem("sidebar-collapsed", String(newState))
  }

  const menuItems = [
    { name: "HOME", icon: <Home />, path: "/" },
    { name: "WORKS", icon: <Folder />, path: "/works" },
    { name: "ABOUTME", icon: <Settings />, path: "/about" },
    { name: "HIRE ME", icon: <Email />, path: "/hire-me" },
  ]

  const handleNavigation = (path) => {
    navigate(path)
    onClose()
  }

  const sidebarVariants = {
    hidden: { x: -300, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    exit: {
      x: -300,
      opacity: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const itemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
      },
    },
  }

  const drawerWidth = isCollapsed ? 80 : 280

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: drawerWidth,
          background: "linear-gradient(135deg, rgba(0, 0, 0, 0.95) 0%, rgba(20, 20, 20, 0.9) 100%)",
          color: "white",
          borderRight: "none",
          boxShadow: "5px 0 15px rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          overflowX: "hidden",
          transition: "width 0.3s ease",
        },
      }}
      id="sidebar"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            variants={sidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{ height: "100%", display: "flex", flexDirection: "column" }}
          >
            {/* Collapse toggle button */}
            <Box sx={{ position: "absolute", top: 10, right: 10, zIndex: 10 }}>
              <IconButton
                onClick={toggleCollapsed}
                sx={{
                  color: "white",
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.2)",
                  },
                }}
                size="small"
              >
                {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
              </IconButton>
            </Box>

            {/* Theme toggle button */}
            <Box
              sx={{
                position: "absolute",
                top: 10,
                right: isCollapsed ? 10 : 50,
                zIndex: 10,
                display: isCollapsed ? "none" : "block",
              }}
            >
              <ThemeToggle />
            </Box>

            {/* Decorative top pattern */}
            <Box
              sx={{
                height: 80,
                width: "100%",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%)",
                backgroundSize: "20px 20px",
                opacity: 0.3,
                position: "absolute",
                top: 0,
                left: 0,
              }}
            />

            {/* Profile Section */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                "&::after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: "10%",
                  width: "80%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                },
              }}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 300, damping: 25 }}
                whileHover={{ 
                  scale: 1.1,
                  rotate: [0, -5, 5, -5, 0],
                  boxShadow: "0 0 15px rgba(255, 255, 255, 0.5)"
                }}
              >
                <Box
                  component="img"
                  src={profileImage}
                  alt="Profile"
                  sx={{
                    width: isCollapsed ? 50 : 120,
                    height: isCollapsed ? 50 : 120,
                    borderRadius: "50%",
                    objectFit: "cover",
                    border: `2px solid ${theme.palette.mode === "dark" ? "white" : "black"}`,
                    mb: 2,
                    transition: "width 0.3s ease, height 0.3s ease, transform 0.3s ease, filter 0.3s ease",
                    "&:hover": {
                      filter: "brightness(1.2)",
                    },
                  }}
                />
              </motion.div>

              {!isCollapsed && (
                <>
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Typography
                      variant="h5"
                      sx={{
                        fontWeight: "bold",
                        background: "linear-gradient(45deg, #ffffff 30%, #aaaaaa 90%)",
                        backgroundSize: "200% 200%",
                        animation: "gradientFlow 5s ease infinite",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textAlign: "center",
                      }}
                    >
                      Abdullah Iftikhar
                    </Typography>
                  </motion.div>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 25 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        background: "rgba(255, 255, 255, 0.1)",
                        borderRadius: "20px",
                        px: 2,
                        py: 0.5,
                        mt: 1,
                      }}
                    >
                      <Code sx={{ fontSize: 16 }} />
                      <Typography
                        variant="body2"
                        sx={{
                          letterSpacing: 1,
                          fontWeight: "medium",
                        }}
                      >
                        CS STUDENT
                      </Typography>
                    </Box>
                  </motion.div>
                </>
              )}
            </Box>

            {/* Navigation Menu */}
            <Box sx={{ flexGrow: 1, px: 2, py: 3 }}>
              {!isCollapsed && (
                <Typography
                  variant="overline"
                  sx={{
                    display: "block",
                    px: 1,
                    mb: 1,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: 2,
                  }}
                >
                  Navigation
                </Typography>
              )}

              <List sx={{ px: 0 }}>
                {menuItems.map((item) => (
                  <motion.div key={item.name} variants={itemVariants}>
                    <ListItem
                      button
                      onClick={() => handleNavigation(item.path)}
                      component="a"
                      sx={{
                        mb: 1.5,
                        borderRadius: "12px",
                        transition: "all 0.3s ease",
                        position: "relative",
                        overflow: "hidden",
                        pl: isCollapsed ? 1 : 2,
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        cursor: "pointer",
                        "&::before":
                          activePage === item.name
                            ? {
                                content: '""',
                                position: "absolute",
                                left: 0,
                                top: "20%",
                                height: "60%",
                                width: "4px",
                                background: "linear-gradient(180deg, rgba(255,255,255,0.8), rgba(255,255,255,0.2))",
                                borderRadius: "0 4px 4px 0",
                              }
                            : {},
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.08)",
                          transform: "translateX(5px)",
                          "&::after": {
                            opacity: 1,
                            transform: "translateX(0)",
                          },
                        },
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent)",
                          opacity: 0,
                          transform: "translateX(-100%)",
                          transition: "transform 0.5s ease, opacity 0.5s ease",
                        },
                        ...(activePage === item.name && {
                          background: "rgba(255, 255, 255, 0.1)",
                          backdropFilter: "blur(5px)",
                          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
                        }),
                      }}
                    >
                      <ListItemIcon
                        sx={{
                          color: activePage === item.name ? "white" : "rgba(255,255,255,0.7)",
                          minWidth: isCollapsed ? 0 : 40,
                          mr: isCollapsed ? 0 : 2,
                          justifyContent: "center",
                          transition: "color 0.3s ease",
                        }}
                      >
                        <motion.div whileHover={{ rotate: [0, -10, 10, -10, 0] }} transition={{ duration: 0.5 }}>
                          {item.icon}
                        </motion.div>
                      </ListItemIcon>

                      {!isCollapsed && (
                        <ListItemText
                          primary={
                            <TextScrambler
                              text={
                                item.name === "ABOUTME"
                                  ? "About Me"
                                  : item.name === "HIRE ME"
                                    ? "Contact"
                                    : item.name.charAt(0) + item.name.slice(1).toLowerCase()
                              }
                              isActive={activePage === item.name}
                            />
                          }
                          sx={{
                            "& .MuiTypography-root": {
                              fontSize: "1rem",
                            },
                          }}
                        />
                      )}

                      {!isCollapsed && activePage === item.name && (
                        <Box
                          sx={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            bgcolor: "white",
                            boxShadow: "0 0 10px rgba(255,255,255,0.8)",
                            mr: 1,
                          }}
                        />
                      )}
                    </ListItem>
                  </motion.div>
                ))}
              </List>
            </Box>

            {/* Bottom Section */}
            <Box
              sx={{
                p: 3,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "10%",
                  width: "80%",
                  height: "1px",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)",
                },
              }}
            >
              {!isCollapsed && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, type: "spring", stiffness: 300, damping: 25 }}
                >
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    onClick={() => window.open(resumePDF, "_blank")}
                    sx={{
                      borderRadius: "50px",
                      color: "white",
                      borderColor: "rgba(255,255,255,0.3)",
                      background: "rgba(255, 255, 255, 0.05)",
                      backdropFilter: "blur(5px)",
                      px: 3,
                      py: 1,
                      position: "relative",
                      overflow: "hidden",
                      "&:hover": {
                        borderColor: "white",
                        boxShadow: "0 0 15px rgba(255, 255, 255, 0.3)",
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: "-100%",
                        width: "100%",
                        height: "100%",
                        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                        transition: "0.5s",
                      },
                      "&:hover::before": {
                        left: "100%",
                      },
                    }}
                  >
                    <TextScrambler text="Download CV" isActive={false} />
                  </Button>
                </motion.div>
              )}

              {isCollapsed ? (
                <IconButton
                  onClick={() => window.open(resumePDF, "_blank")}
                  sx={{
                    color: "white",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 0.2)",
                    },
                    mt: 2,
                  }}
                >
                  <Download />
                </IconButton>
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, type: "spring", stiffness: 300, damping: 25 }}
                  className="float"
                >
                  <Box
                    sx={{
                      mt: 3,
                      p: 2.5,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
                      borderRadius: "16px",
                      width: "100%",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(5px)",
                      position: "relative",
                      overflow: "hidden",
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: -50,
                        left: -50,
                        width: 100,
                        height: 100,
                        background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                        opacity: 0.5,
                      },
                    }}
                  >
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: "8px",
                          bgcolor: "rgba(255,255,255,0.1)",
                          mr: 1.5,
                        }}
                      >
                        <CalendarMonth sx={{ fontSize: "1.1rem" }} />
                      </Box>
                      <Typography variant="body2" fontWeight="medium" letterSpacing={0.5}>
                        3/5/2025
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 28,
                          height: 28,
                          borderRadius: "8px",
                          bgcolor: "rgba(255,255,255,0.1)",
                          mr: 1.5,
                        }}
                      >
                        <LocationOn sx={{ fontSize: "1.1rem" }} />
                      </Box>
                      <Typography variant="body2" fontWeight="medium" letterSpacing={0.5}>
                        Lahore, Pakistan
                      </Typography>
                    </Box>
                  </Box>
                </motion.div>
              )}
            </Box>

            {/* Decorative bottom pattern */}
            <Box
              sx={{
                height: 80,
                width: "100%",
                background:
                  "linear-gradient(90deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%)",
                backgroundSize: "20px 20px",
                opacity: 0.3,
                position: "absolute",
                bottom: 0,
                left: 0,
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Drawer>
  )
} 