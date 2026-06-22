"use client"
import { useState } from "react"
import { Box, Container, Typography, TextField, Button, Alert, useTheme, CircularProgress } from "@mui/material"
import Layout from "../layouts/Layout"
import { motion } from "framer-motion"
import * as Yup from "yup"
import { Formik, Form } from "formik"
import ScrollReveal from "../components/ScrollReveal"
import ParticleBackground from "../components/ui/particle-background"

// Define validation schema using Yup
const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be less than 50 characters")
    .required("Name is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^\+?[0-9\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string()
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters")
    .required("Message is required"),
})

export default function HireMePage() {
  const theme = useTheme()
  const [alertMessage, setAlertMessage] = useState("")
  const [alertSeverity, setAlertSeverity] = useState("success")
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [pageLoading, setPageLoading] = useState(true)

  // Simulate page content loading
  useState(() => {
    const timer = setTimeout(() => {
      setPageLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  }

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setAlertMessage("Your message has been sent successfully! I'll get back to you soon.")
      setAlertSeverity("success")
      setFormSubmitted(true)
      resetForm()
    } catch (error) {
      setAlertMessage("There was an error sending your message. Please try again later.")
      setAlertSeverity("error")
      setFormSubmitted(true)
    } finally {
      setSubmitting(false)
    }
  }

  const inputStyles = {
    "& .MuiInputBase-root": {
      borderRadius: 0,
      backgroundColor: "transparent",
      color: theme.palette.mode === "dark" ? "white" : "black",
      "& fieldset": {
        borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.2)" : "rgba(0, 0, 0, 0.2)",
        borderWidth: "1px",
      },
      "&:hover fieldset": {
        borderColor: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.4)" : "rgba(0, 0, 0, 0.4)",
      },
      "&.Mui-focused fieldset": {
        borderColor: theme.palette.mode === "dark" ? "white" : "black",
        borderWidth: "1px",
      },
    },
    "& .MuiInputBase-input": {
      padding: "16px",
      fontSize: "1rem",
      "&::placeholder": {
        color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.5)" : "rgba(0, 0, 0, 0.5)",
        opacity: 1,
      },
    },
    "& .MuiFormHelperText-root": {
      color: "#f44336",
      marginLeft: 0,
      marginTop: 0.5,
    },
    mb: 3,
  }

  if (pageLoading) {
    return (
      <Layout activePage="HIRE ME" title="HIRE ME">
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
          <Typography variant="h6">Loading form...</Typography>
        </Box>
      </Layout>
    )
  }

  return (
    <Layout activePage="HIRE ME" title="HIRE ME">
      <ParticleBackground />
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
        <Box component="section" sx={{ mt: 4, mb: 6, maxWidth: 800, mx: "auto" }}>
          <ScrollReveal>
            <Typography
              variant="body1"
              sx={{
                color: theme.palette.mode === "dark" ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.7)",
                mb: 4,
                fontSize: "1rem",
                lineHeight: 1.6,
              }}
            >
              Whether you have a question, a suggestion, or just want to say hello, this is the place to do it. Please
              fill out the form below with your details and message, and I&apos;ll get back to you as soon as possible.
            </Typography>
          </ScrollReveal>

          <ScrollReveal delay={0.1}>
            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontWeight: "bold",
                mb: 4,
                fontSize: { xs: "2rem", sm: "2.5rem" },
              }}
            >
              Contact Me
            </Typography>
          </ScrollReveal>

          {formSubmitted && (
            <ScrollReveal>
              <Alert
                severity={alertSeverity}
                sx={{
                  mb: 3,
                  bgcolor: alertSeverity === "success" ? "rgba(76, 175, 80, 0.1)" : "rgba(244, 67, 54, 0.1)",
                  color: alertSeverity === "success" ? "#4caf50" : "#f44336",
                  border: `1px solid ${alertSeverity === "success" ? "#4caf50" : "#f44336"}`,
                  "& .MuiAlert-icon": {
                    color: alertSeverity === "success" ? "#4caf50" : "#f44336",
                  },
                }}
                onClose={() => setFormSubmitted(false)}
              >
                {alertMessage}
              </Alert>
            </ScrollReveal>
          )}

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur, isSubmitting }) => (
              <Form>
                <ScrollReveal delay={0.2}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="name"
                    placeholder="Name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                    sx={inputStyles}
                    InputLabelProps={{ shrink: false }}
                    required
                    disabled={isSubmitting}
                    InputProps={{
                      endAdornment: isSubmitting && (
                        <CircularProgress size={20} sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      )
                    }}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.3}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="email"
                    placeholder="Email"
                    type="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.email && Boolean(errors.email)}
                    helperText={touched.email && errors.email}
                    sx={inputStyles}
                    InputLabelProps={{ shrink: false }}
                    required
                    disabled={isSubmitting}
                    InputProps={{
                      endAdornment: isSubmitting && (
                        <CircularProgress size={20} sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      )
                    }}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.4}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="phone"
                    placeholder="Phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.phone && Boolean(errors.phone)}
                    helperText={touched.phone && errors.phone}
                    sx={inputStyles}
                    InputLabelProps={{ shrink: false }}
                    required
                    disabled={isSubmitting}
                    InputProps={{
                      endAdornment: isSubmitting && (
                        <CircularProgress size={20} sx={{ color: "rgba(255, 255, 255, 0.7)" }} />
                      )
                    }}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.5}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    name="message"
                    placeholder="Message"
                    multiline
                    rows={6}
                    value={values.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.message && Boolean(errors.message)}
                    helperText={touched.message && errors.message}
                    sx={inputStyles}
                    InputLabelProps={{ shrink: false }}
                    required
                    disabled={isSubmitting}
                  />
                </ScrollReveal>

                <ScrollReveal delay={0.6}>
                  <motion.div
                    whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  >
                    <Button
                      type="submit"
                      variant="contained"
                      disabled={isSubmitting}
                      sx={{
                        mt: 2,
                        py: 1.5,
                        px: 4,
                        backgroundColor: "white",
                        color: "black",
                        borderRadius: 0,
                        fontWeight: "bold",
                        "&:hover": {
                          backgroundColor: "rgba(255, 255, 255, 0.8)",
                        },
                        "&.Mui-disabled": {
                          backgroundColor: "rgba(255, 255, 255, 0.3)",
                          color: "rgba(0, 0, 0, 0.5)",
                        },
                        minWidth: '180px',
                      }}
                    >
                      {isSubmitting ? (
                        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <CircularProgress size={20} sx={{ color: "black", mr: 1, opacity: 0.7 }} />
                          Sending...
                        </Box>
                      ) : (
                        "SEND MESSAGE"
                      )}
                    </Button>
                  </motion.div>
                </ScrollReveal>
              </Form>
            )}
          </Formik>

          <ScrollReveal delay={0.7}>
            <Box sx={{ mt: 6 }}>
              <Typography variant="h5" component="h3" sx={{ mb: 3, fontWeight: "bold" }}>
                Connect With Me
              </Typography>
              <Box sx={{ display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: 4 }}>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1, color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    contact@abdullahiftikhar.com
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1, color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    +92 123 456 7890
                  </Typography>
                </Box>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1, color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    Based In
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    Lahore, Pakistan
                  </Typography>
                </Box>
              </Box>
            </Box>
          </ScrollReveal>
        </Box>
      </Container>
    </Layout>
  )
} 