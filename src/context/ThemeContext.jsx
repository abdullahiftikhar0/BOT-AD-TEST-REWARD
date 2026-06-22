"use client"
import { createContext, useContext, useState, useEffect, useMemo } from "react"
import { ThemeProvider, createTheme } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

// Create a context for the theme
const ThemeContext = createContext({
  mode: "dark",
  toggleColorMode: () => {},
})

// Hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext)

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState("dark")

  // Check for saved theme preference on mount
  useEffect(() => {
    const savedMode = localStorage.getItem("theme-mode")
    if (savedMode === "light" || savedMode === "dark") {
      setMode(savedMode)
    }
  }, [])

  // Save theme preference when it changes
  useEffect(() => {
    localStorage.setItem("theme-mode", mode)
  }, [mode])

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [mode],
  )

  // Create theme based on mode
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // Light mode
                primary: {
                  main: "#000000",
                },
                background: {
                  default: "#ffffff",
                  paper: "#f5f5f5",
                },
                text: {
                  primary: "#000000",
                  secondary: "#555555",
                },
              }
            : {
                // Dark mode
                primary: {
                  main: "#ffffff",
                },
                background: {
                  default: "#121212",
                  paper: "#1e1e1e",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#aaaaaa",
                },
              }),
        },
        typography: {
          fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
          h1: {
            fontWeight: 700,
          },
          h2: {
            fontWeight: 700,
          },
          h3: {
            fontWeight: 600,
          },
          h4: {
            fontWeight: 600,
          },
          h5: {
            fontWeight: 500,
          },
          h6: {
            fontWeight: 500,
          },
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                textTransform: "none",
              },
            },
          },
        },
      }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  )
} 