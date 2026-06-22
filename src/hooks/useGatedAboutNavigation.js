import { useState, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { showRewardAd } from "../lib/tomoads"

export function useGatedAboutNavigation() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isRewardLoading, setIsRewardLoading] = useState(false)

  const navigateToAbout = useCallback(
    async (event) => {
      if (event?.preventDefault) {
        event.preventDefault()
      }

      if (location.pathname !== "/") {
        navigate("/about")
        return
      }

      setIsRewardLoading(true)
      try {
        await showRewardAd()
        navigate("/about")
      } catch {
        navigate("/404")
      } finally {
        setIsRewardLoading(false)
      }
    },
    [location.pathname, navigate],
  )

  const isGatedFromHome = location.pathname === "/"

  return { navigateToAbout, isRewardLoading, isGatedFromHome }
}
