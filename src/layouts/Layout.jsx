"use client"
import { useState, useEffect } from "react"
import { Box, useMediaQuery, useTheme } from "@mui/material"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import PageTransition from "../components/PageTransition"
import { motion } from "framer-motion"

export default function Layout({ children, activePage, title }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down("md"))

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  // Close sidebar when clicking outside on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && sidebarOpen) {
        const sidebar = document.getElementById("sidebar")
        const menuToggle = document.querySelector(".menu-toggle")

        if (
          sidebar &&
          !sidebar.contains(event.target) &&
          menuToggle &&
          !menuToggle.contains(event.target)
        ) {
          setSidebarOpen(false)
        }
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isMobile, sidebarOpen])

  // Add subtle background animation
  const backgroundVariants = {
    initial: {
      backgroundPositionX: "0%",
      backgroundPositionY: "0%",
    },
    animate: {
      backgroundPositionX: "100%",
      backgroundPositionY: "100%",
      transition: {
        duration: 20,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
      },
    },
  }

  // Separate background properties to avoid style conflicts
  const backgroundStyle =
    theme.palette.mode === "dark"
      ? {
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(30, 30, 30, 0.05) 0%, rgba(30, 30, 30, 0) 20%), radial-gradient(circle at 90% 80%, rgba(30, 30, 30, 0.05) 0%, rgba(30, 30, 30, 0) 20%)",
          backgroundSize: "200% 200%",
          backgroundColor: "#121212",
        }
      : {
          backgroundImage:
            "radial-gradient(circle at 10% 20%, rgba(200, 200, 200, 0.05) 0%, rgba(200, 200, 200, 0) 20%), radial-gradient(circle at 90% 80%, rgba(200, 200, 200, 0.05) 0%, rgba(200, 200, 200, 0) 20%)",
          backgroundSize: "200% 200%",
          backgroundColor: "#ffffff",
        }

  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={backgroundVariants}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        ...backgroundStyle,
      }}
    >
      <Header activePage={activePage} title={title} toggleSidebar={toggleSidebar} />

      <Sidebar open={sidebarOpen} activePage={activePage} onClose={() => setSidebarOpen(false)} />

      <PageTransition>
        <Box component="main" sx={{ flexGrow: 1 }}>
          {children}
        </Box>
      </PageTransition>

      <Footer />
    </motion.div>
  )
} 