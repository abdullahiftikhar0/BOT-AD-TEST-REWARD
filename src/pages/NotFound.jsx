"use client"

import { useState, useEffect } from "react"
import { Box, Container, Typography, Button, useTheme, CircularProgress } from "@mui/material"
import Layout from "../layouts/Layout"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ParticleBackground from "../components/ui/particle-background"

export default function NotFound() {
  const navigate = useNavigate()
  const theme = useTheme()
  const [pageLoading, setPageLoading] = useState(true)

  useEffect(() => {
    // Simulate page loading
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 800)
    
    return () => clearTimeout(timer)
  }, [])

  if (pageLoading) {
    return (
      <Layout activePage="" title="Page Not Found">
        <ParticleBackground />
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: 'calc(100vh - 150px)',
            flexDirection: 'column',
            gap: 2
          }}
        >
          <CircularProgress size={60} thickness={4} color="inherit" />
          <Typography variant="h6">Loading...</Typography>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout activePage="" title="Page Not Found">
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ mt: 10, position: "relative", zIndex: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Typography variant="h1" component="h1" fontWeight="bold" sx={{ mb: 4 }}>
              404
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Typography variant="h4" component="h2" sx={{ mb: 4 }}>
              Page Not Found
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Typography variant="body1" sx={{ mb: 6, color: "text.secondary" }}>
              The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
            </Typography>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate("/")}
              sx={{
                borderRadius: "50px",
                px: 4,
                py: 1.5,
                borderColor: theme.palette.mode === "dark" ? "white" : "black",
                color: theme.palette.mode === "dark" ? "white" : "black",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                  color: theme.palette.mode === "dark" ? "black" : "white",
                  borderColor: theme.palette.mode === "dark" ? "white" : "black",
                },
              }}
            >
              Go back to Home
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Layout>
  )
} 