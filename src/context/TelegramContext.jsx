"use client"
import { createContext, useContext, useEffect, useMemo, useState } from "react"

const TelegramContext = createContext({
  webApp: null,
  user: null,
  isTelegram: false,
})

export const useTelegram = () => useContext(TelegramContext)

export function TelegramProvider({ children }) {
  const [webApp, setWebApp] = useState(null)
  const [user, setUser] = useState(null)
  const [isTelegram, setIsTelegram] = useState(false)

  useEffect(() => {
    const tg = window.Telegram?.WebApp
    if (!tg?.initData) return

    setIsTelegram(true)
    setWebApp(tg)
    setUser(tg.initDataUnsafe?.user ?? null)

    tg.ready()
    tg.expand()

    document.body.classList.add("telegram-mini-app")

    const applyTheme = () => {
      const bg = tg.themeParams?.bg_color
      if (bg) {
        tg.setHeaderColor(bg)
        tg.setBackgroundColor(bg)
      }
    }

    applyTheme()
    tg.onEvent("themeChanged", applyTheme)

    return () => {
      tg.offEvent("themeChanged", applyTheme)
      document.body.classList.remove("telegram-mini-app")
    }
  }, [])

  const value = useMemo(
    () => ({ webApp, user, isTelegram }),
    [webApp, user, isTelegram],
  )

  return <TelegramContext.Provider value={value}>{children}</TelegramContext.Provider>
}
