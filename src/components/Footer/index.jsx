"use client"
import { Box, Container, Button, Typography, useTheme } from "@mui/material"
import { Instagram, LinkedIn, Email } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import { motion } from "framer-motion"
import ScrambleText from "../ScrambleText"

export default function Footer() {
  const theme = useTheme()
  const navigate = useNavigate()

  const socialVariants = {
    hover: {
      scale: 1.2,
      rotate: [0, -10, 10, -10, 0],
      transition: { duration: 0.5 },
    },
  }

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: theme.palette.mode === "dark" ? "0 0 8px rgba(255, 255, 255, 0.5)" : "0 0 8px rgba(0, 0, 0, 0.3)",
    },
    tap: { scale: 0.95 },
  }

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        bgcolor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
        color: theme.palette.mode === "dark" ? "white" : "black",
        mt: "auto",
        borderTop: `1px solid ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"}`,
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            alignItems: "center",
            justifyContent: "space-between",
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            <motion.a
              href="https://instagram.com/abdulllahiftikhar"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              whileHover="hover"
              style={{
                color: theme.palette.mode === "dark" ? "white" : "black",
                background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                borderRadius: "50%",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Instagram fontSize="medium" />
            </motion.a>

            <motion.a
              href="https://linkedin.com/in/abdullahi-iftikhar"
              target="_blank"
              rel="noopener noreferrer"
              variants={socialVariants}
              whileHover="hover"
              style={{
                color: theme.palette.mode === "dark" ? "white" : "black",
                background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                borderRadius: "50%",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkedIn fontSize="medium" />
            </motion.a>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                borderRadius: "20px",
                padding: "8px 16px",
              }}
            >
              <motion.div variants={socialVariants} whileHover="hover">
                <Email fontSize="medium" />
              </motion.div>
              <Typography>ai868419@gmail.com</Typography>
            </Box>
          </Box>

          <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
            <Button
              variant="outlined"
              onClick={() => navigate("/hire-me")}
              sx={{
                borderRadius: "50px",
                px: 3,
                py: 1,
                borderColor: theme.palette.mode === "dark" ? "white" : "black",
                color: theme.palette.mode === "dark" ? "white" : "black",
                background: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.05)",
                "&:hover": {
                  backgroundColor: theme.palette.mode === "dark" ? "white" : "black",
                  color: theme.palette.mode === "dark" ? "black" : "white",
                  borderColor: theme.palette.mode === "dark" ? "white" : "black",
                },
                position: "relative",
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: "-100%",
                  width: "100%",
                  height: "100%",
                  background: `linear-gradient(90deg, transparent, ${theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)"}, transparent)`,
                  transition: "0.5s",
                },
                "&:hover::before": {
                  left: "100%",
                },
              }}
            >
              <ScrambleText
                text="Let's Talk"
                speed={30}
                sx={{
                  fontFamily: "inherit",
                  fontWeight: "normal",
                  fontSize: "1rem",
                }}
              />
            </Button>
          </motion.div>
        </Box>
      </Container>
    </Box>
  )
} 