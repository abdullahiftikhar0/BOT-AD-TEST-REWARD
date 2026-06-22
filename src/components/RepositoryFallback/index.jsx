"use client"

import { Box, Card, Typography, Button, useTheme } from "@mui/material"
import { Code } from "@mui/icons-material"
import { motion } from "framer-motion"

export default function RepositoryFallback({ id, name, description, repoUrl, index }) {
  const theme = useTheme()

  // Function to format repository name for display
  const formatRepoName = (name) => {
    return name.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase())
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.02 }}
      style={{ width: "100%", height: "100%" }}
    >
      <Card
        sx={{
          height: 280,
          width: "100%",
          position: "relative",
          overflow: "hidden",
          borderRadius: 1,
          boxShadow: "none",
          bgcolor: "rgba(30, 30, 30, 0.6)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Repository header with background image */}
        <Box
          sx={{
            height: "50%",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(/src/assets/images/placeholder.svg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "brightness(0.7)",
            },
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              p: 2,
              background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
            }}
          >
            <Typography variant="h6" component="h3" fontWeight="bold" sx={{ color: "white" }}>
              {formatRepoName(name)}
            </Typography>
            <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.7)", fontSize: "0.75rem" }}>
              {description.length > 60 ? `${description.substring(0, 60)}...` : description}
            </Typography>
          </Box>
        </Box>

        {/* Repository details */}
        <Box sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}>
          {/* Repository stats */}
          <Box sx={{ display: "flex", gap: 3, mb: 2 }}>
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  bgcolor: "#f1e05a", // JavaScript color
                }}
              />
              <Typography variant="caption" sx={{ color: "white", fontSize: "0.7rem" }}>
                JavaScript
              </Typography>
            </Box>
          </Box>

          {/* Issues and contributors info */}
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.7rem" }}>
                Issues
              </Typography>
              <Typography variant="body2" sx={{ color: "white", fontSize: "0.8rem" }}>
                {Math.floor(Math.random() * 10)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" sx={{ color: "rgba(255, 255, 255, 0.5)", fontSize: "0.7rem" }}>
                Contributors
              </Typography>
              <Typography variant="body2" sx={{ color: "white", fontSize: "0.8rem" }}>
                {Math.floor(Math.random() * 5) + 1}
              </Typography>
            </Box>
          </Box>

          {/* View project button */}
          <Box sx={{ mt: "auto", display: "flex", justifyContent: "center" }}>
            <Button
              variant="outlined"
              size="small"
              href={repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              startIcon={<Code sx={{ fontSize: 14 }} />}
              sx={{
                borderRadius: 50,
                color: "white",
                borderColor: "rgba(255, 255, 255, 0.3)",
                backgroundColor: "rgba(255, 255, 255, 0.05)",
                textTransform: "uppercase",
                fontSize: "0.65rem",
                py: 0.5,
                px: 2,
                "&:hover": {
                  backgroundColor: "white",
                  color: "black",
                  borderColor: "white",
                },
              }}
            >
              VIEW PROJECT
            </Button>
          </Box>
        </Box>
      </Card>
    </motion.div>
  )
} 