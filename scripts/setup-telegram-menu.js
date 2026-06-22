/**
 * One-time script to attach this site as a Telegram Mini App menu button.
 *
 * Usage:
 *   TELEGRAM_BOT_TOKEN=your_token SITE_URL=https://your-site.vercel.app node scripts/setup-telegram-menu.js
 */

const token = process.env.TELEGRAM_BOT_TOKEN
const siteUrl = process.env.SITE_URL
const buttonText = process.env.BUTTON_TEXT || "Open Portfolio"

if (!token) {
  console.error("Missing TELEGRAM_BOT_TOKEN environment variable.")
  process.exit(1)
}

if (!siteUrl) {
  console.error("Missing SITE_URL environment variable (your deployed HTTPS URL).")
  process.exit(1)
}

if (!siteUrl.startsWith("https://")) {
  console.error("SITE_URL must use HTTPS. Telegram Mini Apps require a secure URL.")
  process.exit(1)
}

const payload = {
  menu_button: {
    type: "web_app",
    text: buttonText,
    web_app: { url: siteUrl.replace(/\/$/, "") },
  },
}

async function main() {
  const response = await fetch(`https://api.telegram.org/bot${token}/setChatMenuButton`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })

  const data = await response.json()

  if (!data.ok) {
    console.error("Telegram API error:", data.description || data)
    process.exit(1)
  }

  console.log("Menu button configured successfully.")
  console.log(`Users can open ${siteUrl} from your bot's menu button in Telegram.`)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
