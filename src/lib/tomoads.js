export const REWARD_PLACEMENT_ID = "6a633347-22d1-4697-9ca5-203804301f83"

const REWARD_TIMEOUT_MS = 120000

let rewardResolver = null
let rewardInitialized = false

function waitForTomoAds(timeoutMs = 10000) {
  return new Promise((resolve, reject) => {
    if (window.TomoAds?.showReward) {
      resolve(window.TomoAds)
      return
    }

    const startedAt = Date.now()
    const interval = setInterval(() => {
      if (window.TomoAds?.showReward) {
        clearInterval(interval)
        resolve(window.TomoAds)
        return
      }

      if (Date.now() - startedAt >= timeoutMs) {
        clearInterval(interval)
        reject(new Error("TomoAds failed to load"))
      }
    }, 100)
  })
}

export function initTomoAdsReward() {
  if (rewardInitialized || typeof window === "undefined") return

  const registerCallback = () => {
    if (!window.TomoAds?.onReward) return false

    window.TomoAds.onReward((event) => {
      if (!rewardResolver) return

      if (event.status === "granted") {
        rewardResolver.resolve(event)
      } else {
        rewardResolver.reject(event)
      }
      rewardResolver = null
    })

    rewardInitialized = true
    return true
  }

  if (registerCallback()) return

  const interval = setInterval(() => {
    if (registerCallback()) clearInterval(interval)
  }, 100)
}

export function showRewardAd() {
  return new Promise(async (resolve, reject) => {
    try {
      const TomoAds = await waitForTomoAds()
      initTomoAdsReward()

      const timeoutId = setTimeout(() => {
        if (!rewardResolver) return
        rewardResolver.reject(new Error("Reward ad timed out"))
        rewardResolver = null
      }, REWARD_TIMEOUT_MS)

      rewardResolver = {
        resolve: (event) => {
          clearTimeout(timeoutId)
          resolve(event)
        },
        reject: (error) => {
          clearTimeout(timeoutId)
          reject(error)
        },
      }

      TomoAds.showReward(REWARD_PLACEMENT_ID)
    } catch (error) {
      reject(error)
    }
  })
}
