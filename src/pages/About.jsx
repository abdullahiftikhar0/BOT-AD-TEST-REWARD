"use client"
import { useEffect, useRef, useState } from "react"
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  useTheme,
} from "@mui/material"
import Layout from "../layouts/Layout"
import SkillCard from "../components/SkillCard"
import { motion, useInView, useAnimation } from "framer-motion"
import ScrollReveal from "../components/ScrollReveal"
import { staggerContainer } from "../hooks/useScrollAnimation"
import ParticleBackground from "../components/ui/particle-background"

export default function AboutPage() {
  const theme = useTheme()
  const skillsRef = useRef(null)
  const isInView = useInView(skillsRef, { once: true, amount: 0.2, rootMargin: "-50px" })
  const controls = useAnimation()
  const [skillValues, setSkillValues] = useState({})

  // Start animation when skill bars come into view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
      
      // Animate skill bars with a staggered effect
      const timeoutIds = codingSkills.map((skill, index) => {
        return setTimeout(() => {
          setSkillValues(prev => ({
            ...prev,
            [skill.name]: skill.value
          }))
        }, index * 150)
      })
      
      return () => {
        timeoutIds.forEach(id => clearTimeout(id))
      }
    }
  }, [isInView, controls])

  const skills = [
    { name: "FIGMA", icon: "figma" },
    { name: "UNITY", icon: "unity" },
    { name: "APP DEVELOPMENT", icon: "android" },
    { name: "Database Administration", icon: "database" },
  ]

  const codingSkills = [
    { name: "HTML", value: 80 },
    { name: "CSS", value: 60 },
    { name: "JavaScript", value: 55 },
    { name: "React", value: 25 },
    { name: "C++", value: 95 },
    { name: "Python", value: 85 },
    { name: "Java", value: 70 },
    { name: "SQL", value: 97 },
  ]

  const education = [
    {
      institution: "INFORMATION TECHNOLOGY UNIVERSITY",
      qualification: "BS-Computer Science",
      year: "2027 - Present",
      score: "CGPA: 3.81",
    },
    {
      institution: "PUNJAB GROUP OF COLLEGES",
      qualification: "Pre-Engineering",
      year: "2023",
      score: "Marks: 975/1100",
    },
    {
      institution: "UNIQUE GROUP OF INSTITUTIONS",
      qualification: "MATRIC-BIO",
      year: "2021",
      score: "92.36%",
    },
  ]

  // Add animation class to table rows when they come into view
  useEffect(() => {
    const tableRows = document.querySelectorAll(".education-table tbody tr")
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, index) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("fade-in")
            }, index * 200)
          }
        })
      },
      { threshold: 0.1 },
    )

    tableRows.forEach((row) => {
      observer.observe(row)
    })

    return () => {
      tableRows.forEach((row) => {
        observer.unobserve(row)
      })
    }
  }, [])

  return (
    <Layout activePage="ABOUTME" title="ABOUT ME">
      <ParticleBackground />
      <Container maxWidth="lg">
        <ScrollReveal>
          <Box component="section" sx={{ mt: 4 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: "uppercase" }}>
                  WHO I AM
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Typography
                  variant="h3"
                  component="h1"
                  sx={{
                    fontWeight: "bold",
                    mb: 4,
                    textTransform: "uppercase",
                    lineHeight: 1.2,
                  }}
                >
                  TRANSFORMING YOUR VISION INTO A DYNAMIC WEB EXPERIENCE THROUGH METICULOUSLY CRAFTED DESIGNS, INTUITIVE
                  USER INTERFACES, AND ROBUST FUNCTIONALITY.
                </Typography>

                <Grid container spacing={4}>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.mode === "dark" ? "grey.400" : "grey.700", mb: 2 }}
                    >
                      Hi there! I&apos;m Abdullah, a web and application designer with a passion for creating
                      exceptional digital experiences. With over 2 years of experience, I have skills in designing
                      websites and applications that are not only visually appealing but also functional and
                      user-friendly.
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <Typography
                      variant="body1"
                      sx={{ color: theme.palette.mode === "dark" ? "grey.400" : "grey.700", mb: 2 }}
                    >
                      I specialize in crafting bespoke websites and applications using the latest technologies and
                      design trends, including HTML5, CSS3, JavaScript, React Native, Flutter and popular content
                      management systems like WordPress, Joomla, and Shopify.
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <Box component="section" sx={{ mt: 6 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: "uppercase", color: theme.palette.mode === "dark" ? "white" : "black" }}>
                  MY SKILLS
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                  <Grid container spacing={2}>
                    {skills.map((skill, index) => (
                      <Grid item xs={12} sm={6} md={6} key={index}>
                        <ScrollReveal delay={index * 0.1} direction="scale">
                          <SkillCard name={skill.name} icon={skill.icon} />
                        </ScrollReveal>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </Grid>
            </Grid>
          </Box>
        </ScrollReveal>

        <Box component="section" sx={{ mt: 6 }} ref={skillsRef}>
          <ScrollReveal>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: "uppercase", color: theme.palette.mode === "dark" ? "white" : "black" }}>
                  CODING SKILLS
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <Grid container spacing={3}>
                  {codingSkills.map((skill, index) => (
                    <Grid item xs={12} sm={6} key={index}>
                      <ScrollReveal delay={index * 0.1}>
                        <Box sx={{ mb: 2 }}>
                          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <Typography variant="body1" fontWeight="medium" color={theme.palette.mode === "dark" ? "white" : "black"}>
                              {skill.name}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{
                                color: theme.palette.mode === "dark" ? "white" : "black",
                                bgcolor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.1)",
                                px: 1,
                                py: 0.5,
                                borderRadius: 1,
                                fontSize: "0.75rem",
                              }}
                            >
                              {`${skill.value}%`}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              position: "relative",
                              height: 6,
                              backgroundColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.05)",
                              borderRadius: 4,
                              overflow: "hidden",
                            }}
                          >
                            <Box
                              sx={{
                                position: "absolute",
                                top: 0,
                                left: 0,
                                height: "100%",
                                width: `${skillValues[skill.name] || 0}%`,
                                background: getSkillGradient(skill.value),
                                borderRadius: 4,
                                transition: "width 1.5s cubic-bezier(0.65, 0, 0.35, 1)",
                              }}
                            />
                          </Box>
                        </Box>
                      </ScrollReveal>
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </ScrollReveal>
        </Box>

        <Box component="section" sx={{ mt: 6, mb: 6 }}>
          <ScrollReveal>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2}>
                <Typography variant="subtitle1" fontWeight="bold" sx={{ textTransform: "uppercase", color: theme.palette.mode === "dark" ? "white" : "black" }}>
                  EDUCATION
                </Typography>
              </Grid>
              <Grid item xs={12} md={10}>
                <TableContainer component={Paper} className="education-table">
                  <Table
                    sx={{
                      "& th": {
                        backgroundColor: theme.palette.mode === "dark" ? "rgba(30, 30, 30, 0.6)" : "#f0f0f0",
                        fontWeight: 600,
                      },
                      "& td, & th": {
                        padding: "16px",
                        borderBottom: `1px solid ${
                          theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.1)" : "rgba(0, 0, 0, 0.1)"
                        }`,
                      },
                      "& tr:nth-of-type(even)": {
                        backgroundColor: theme.palette.mode === "dark" ? "rgba(30, 30, 30, 0.3)" : "rgba(0, 0, 0, 0.02)",
                      },
                      "& tr.fade-in": {
                        animation: "fadeIn 0.6s ease forwards",
                      },
                    }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell>Institution</TableCell>
                        <TableCell>Qualification</TableCell>
                        <TableCell>Year</TableCell>
                        <TableCell>Score</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {education.map((item, index) => (
                        <TableRow key={index}>
                          <TableCell>{item.institution}</TableCell>
                          <TableCell>{item.qualification}</TableCell>
                          <TableCell>{item.year}</TableCell>
                          <TableCell>{item.score}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
            </Grid>
          </ScrollReveal>
        </Box>
      </Container>
    </Layout>
  )
}

// Helper function to get gradient colors based on skill level
function getSkillGradient(value) {
  if (value >= 90) {
    // Green gradient for high proficiency
    return "linear-gradient(90deg, #2e7d32 0%, #4caf50 100%)"
  }
  if (value >= 70) {
    // Blue gradient for good proficiency
    return "linear-gradient(90deg, #1565c0 0%, #2196f3 100%)"
  }
  if (value >= 50) {
    // Orange gradient for moderate proficiency
    return "linear-gradient(90deg, #e65100 0%, #ff9800 100%)"
  }
  // Red gradient for basic proficiency
  return "linear-gradient(90deg, #b71c1c 0%, #f44336 100%)"
}

function getSkillColor(value) {
  if (value >= 90) return "#4caf50" // Green for high proficiency
  if (value >= 70) return "#2196f3" // Blue for good proficiency
  if (value >= 50) return "#ff9800" // Orange for moderate proficiency
  return "#f44336" // Red for basic proficiency
} 