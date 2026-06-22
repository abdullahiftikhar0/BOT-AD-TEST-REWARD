"use client"

import { Box, CircularProgress } from "@mui/material"
import { motion } from "framer-motion"
import { useState, useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

export default function TransitionLoader() {
  const pathname = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [prevPath, setPrevPath] = useState("")

  useEffect(() => {
    const handleStart = (url) => {
      // Only show loader for page transitions, not for the initial load
      if (prevPath && url !== prevPath) {
        setLoading(true)
      }
    }

    const handleComplete = () => {
      setLoading(false)
    }

    // Update previous path when pathname changes
    if (pathname !== prevPath) {
      setPrevPath(pathname)
    }

    // Add event listeners
    router.events?.on("routeChangeStart", handleStart)
    router.events?.on("routeChangeComplete", handleComplete)
    router.events?.on("routeChangeError", handleComplete)

    return () => {
      // Remove event listeners
      router.events?.off("routeChangeStart", handleStart)
      router.events?.off("routeChangeComplete", handleComplete)
      router.events?.off("routeChangeError", handleComplete)
    }
  }, [pathname, prevPath, router])

  if (!loading) return null

  return (
    <Box
      component={motion.div}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
        backdropFilter: "blur(5px)",
      }}
    >
      <CircularProgress color="inherit" size={60} thickness={4} />
    </Box>
  )
} 