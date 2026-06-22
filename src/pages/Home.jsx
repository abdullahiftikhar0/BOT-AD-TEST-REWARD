import { useNavigate } from "react-router-dom"
import { Box, Container, Typography, Button, Grid, useTheme, CircularProgress, Skeleton } from "@mui/material"
import { useState, useEffect } from "react"
import Layout from "../layouts/Layout"
import CounterSection from "../components/CounterSection"
import { motion } from "framer-motion"
import ParticleBackground from "../components/ui/particle-background"
import { useLanguage } from "../context/LanguageContext"
import ScrollReveal from "../components/ScrollReveal"
import profileImage from "../assets/images/imgme.jpg"
import resumePDF from "../assets/documents/AbdullahIftikharResume.pdf"

export default function Home() {
  const navigate = useNavigate()
  const theme = useTheme()
  const { t } = useLanguage()
  const [pageLoading, setPageLoading] = useState(true)
  const [imageLoaded, setImageLoaded] = useState(false)
  const [profileHovered, setProfileHovered] = useState(false)

  useEffect(() => {
    // Simulate page content loading
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 800)
    
    // Preload profile image
    const img = new Image()
    img.src = profileImage
    img.onload = () => setImageLoaded(true)
    
    return () => clearTimeout(timer)
  }, [])

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: theme.palette.mode === "dark" ? "0 0 8px rgba(255, 255, 255, 0.5)" : "0 0 8px rgba(0, 0, 0, 0.3)",
    },
    tap: { scale: 0.95 },
  }

  const profileImageVariants = {
    hover: { 
      scale: 1.05,
      rotateZ: [0, -3, 3, -3, 0],
      transition: { 
        scale: { duration: 0.3 },
        rotateZ: { duration: 0.5, repeat: Infinity, repeatType: "loop" }
      }
    },
    initial: { scale: 1 }
  }

  if (pageLoading) {
    return (
      <Layout activePage="HOME" title="M. Abdullah Iftikhar">
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
          <Typography variant="h6">Loading profile...</Typography>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout activePage="HOME" title="M. Abdullah Iftikhar">
      {/* Particle Background */}
      <ParticleBackground />

      <Container maxWidth="lg" sx={{ mt: 4, position: "relative", zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center" direction={{ xs: "column-reverse", md: "row" }}>
          <Grid item xs={12} md={6}>
            <ScrollReveal>
              <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ textTransform: "uppercase" }}>
                {t("available")}
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Typography variant="h3" fontWeight="bold" gutterBottom>
                {t("developer")}
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Typography
                variant="body1"
                sx={{ color: theme.palette.mode === "dark" ? "grey.400" : "grey.700", mb: 3 }}
              >
                {t("journey")}
              </Typography>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => navigate("/about")}
                    sx={{
                      borderRadius: "50px",
                      px: 3,
                      borderColor: theme.palette.mode === "dark" ? "white" : "black",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                        color: theme.palette.mode === "dark" ? "black" : "white",
                        borderColor: theme.palette.mode === "dark" ? "white" : "black",
                      },
                    }}
                  >
                    {t("learn")}
                  </Button>
                </motion.div>

                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                  <Button
                    variant="outlined"
                    size="large"
                    onClick={() => window.open(resumePDF, "_blank")}
                    sx={{
                      borderRadius: "50px",
                      px: 3,
                      borderColor: theme.palette.mode === "dark" ? "white" : "black",
                      color: theme.palette.mode === "dark" ? "white" : "black",
                      "&:hover": {
                        backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                        color: theme.palette.mode === "dark" ? "black" : "white",
                        borderColor: theme.palette.mode === "dark" ? "white" : "black",
                      },
                    }}
                  >
                    {t("download")}
                  </Button>
                </motion.div>
              </Box>
            </ScrollReveal>
          </Grid>

          <Grid item xs={12} md={6} sx={{ display: "flex", justifyContent: "center" }}>
            <ScrollReveal direction="scale">
              <motion.div
                initial="initial"
                animate={profileHovered ? "hover" : "initial"}
                variants={profileImageVariants}
                onHoverStart={() => setProfileHovered(true)}
                onHoverEnd={() => setProfileHovered(false)}
                style={{
                  position: 'relative',
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  cursor: 'pointer'
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: { xs: 280, md: 350 },
                    height: { xs: 280, md: 350 },
                    borderRadius: "50%",
                    overflow: "hidden",
                    boxShadow: profileHovered
                      ? (theme.palette.mode === "dark" 
                          ? "0 0 30px rgba(255, 255, 255, 0.4)" 
                          : "0 0 30px rgba(0, 0, 0, 0.4)")
                      : (theme.palette.mode === "dark"
                          ? "0 8px 20px rgba(255, 255, 255, 0.2)"
                          : "0 8px 20px rgba(0, 0, 0, 0.2)"),
                    border: `3px solid ${theme.palette.mode === "dark" ? "white" : "black"}`,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    transition: "box-shadow 0.3s ease",
                    "&::after": profileHovered ? {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: "linear-gradient(135deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%)",
                      zIndex: 1
                    } : {}
                  }}
                >
                  {!imageLoaded ? (
                    <Skeleton 
                      variant="circular" 
                      width="100%" 
                      height="100%" 
                      animation="wave"
                      sx={{ 
                        bgcolor: theme.palette.mode === "dark" ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        transform: 'none'
                      }}
                    />
                  ) : (
                    <Box
                      component="img"
                      src={profileImage}
                      alt="Profile"
                      sx={{
                        width: '100%',
                        height: '100%',
                        objectFit: "cover",
                        display: 'block',
                        transition: "filter 0.3s ease, transform 0.3s ease",
                        filter: profileHovered ? "brightness(1.1) contrast(1.1)" : "none",
                        transform: profileHovered ? "scale(1.05)" : "scale(1)"
                      }}
                    />
                  )}
                </Box>
              </motion.div>
            </ScrollReveal>
          </Grid>
        </Grid>

        <Box sx={{ my: 8 }}>
          <ScrollReveal>
            <CounterSection />
          </ScrollReveal>
        </Box>
      </Container>
    </Layout>
  )
} 