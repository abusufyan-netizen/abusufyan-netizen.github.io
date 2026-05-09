'use client'
import { useEffect } from 'react'

export default function ToolUsageTracker() {
  useEffect(() => {
    // Only increment once per session to be "Realistic" and not spammy
    const sessionKey = 'wtk_session_tracked'
    if (!sessionStorage.getItem(sessionKey)) {
      fetch('/api/stats/increment', { method: 'POST' })
        .then(() => sessionStorage.setItem(sessionKey, 'true'))
        .catch(console.error)
    }
  }, [])

  return null
}
