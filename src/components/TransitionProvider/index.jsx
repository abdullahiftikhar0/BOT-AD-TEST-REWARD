"use client"

import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import TransitionLoader from "../TransitionLoader"

export default function TransitionProvider({ children }) {
  const pathname = usePathname()
  const [isFirstMount, setIsFirstMount] = useState(true)

  // Skip initial animation on first mount
  useEffect(() => {
    setIsFirstMount(false)
  }, [])

  return (
    <>
      <TransitionLoader />
      <AnimatePresence mode="wait" initial={isFirstMount}>
        <motion.div
          key={pathname}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            duration: 0.3,
          }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
} 