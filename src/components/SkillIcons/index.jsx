"use client"

import { Box } from "@mui/material"
import { motion } from "framer-motion"

export const FigmaIcon = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 2,
    }}
  >
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 38 57"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ rotate: 0 }}
      whileHover={{ rotate: 360 }}
      transition={{ duration: 0.8 }}
    >
      <path fill="#FF7262" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" />
      <path fill="#1ABCFE" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" />
      <path fill="#0ACF83" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" />
      <path fill="#A259FF" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" />
      <path fill="#F24E1E" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" />
    </motion.svg>
  </Box>
)

export const UnityIcon = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 2,
    }}
  >
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 256 263"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <path
        fill="#FFFFFF"
        d="M166.872 131.237l45.91-79.275 22.184 79.275-22.185 79.256-45.909-79.256zm-22.376 12.874l45.916 79.262-79.966-20.486-57.77-58.776h91.82zm45.906-105.033l-45.906 79.275h-91.82l57.77-58.78 79.956-20.495zm65.539 65.18L227.933.06l-104.54 27.925-15.475 27.207-31.401-.225L0 131.244l76.517 76.259 31.388-.232 15.497 27.207 104.528 27.92L255.94 158.22l-15.906-26.982 15.906-26.978z"
      />
    </motion.svg>
  </Box>
)

export const AndroidIcon = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 2,
    }}
  >
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <path
        fill="#3DDC84"
        d="M17.523 15.3414c-.5511 0-.9993-.4486-.9993-.9997s.4483-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993.0001.5511-.4482.9997-.9993.9997m-11.046 0c-.5511 0-.9993-.4486-.9993-.9997s.4482-.9993.9993-.9993c.5511 0 .9993.4483.9993.9993 0 .5511-.4483.9997-.9993.9997m11.4045-6.02l1.9973-3.45a.416.416 0 00-.1521-.5676.416.416 0 00-.5676.1521l-2.0223 3.499a11.6223 11.6223 0 00-4.8054-1.0285c-1.8075 0-3.4734.3766-4.8056 1.0285l-2.0223-3.499a.4161.4161 0 00-.5677-.1521.4157.4157 0 00-.1521.5676l1.9973 3.45C2.6802 11.1323.7212 13.8533.7212 17h22.5576c0-3.1467-1.959-5.8677-5.3873-7.6786"
      />
    </motion.svg>
  </Box>
)

export const DatabaseIcon = () => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      mb: 2,
    }}
  >
    <motion.svg
      width="60"
      height="60"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 0.3 }}
    >
      <path
        fill="#00758F"
        d="M12 3C7.58 3 4 4.79 4 7s3.58 4 8 4 8-1.79 8-4-3.58-4-8-4M4 9v3c0 2.21 3.58 4 8 4s8-1.79 8-4V9c0 2.21-3.58 4-8 4s-8-1.79-8-4m0 5v3c0 2.21 3.58 4 8 4s8-1.79 8-4v-3c0 2.21-3.58 4-8 4s-8-1.79-8-4z"
      />
    </motion.svg>
  </Box>
) 