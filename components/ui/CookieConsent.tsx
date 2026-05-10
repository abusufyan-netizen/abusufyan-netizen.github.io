'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  const updateConsent = (isAccepted: boolean) => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('consent', 'update', {
        'ad_storage': isAccepted ? 'granted' : 'denied',
        'ad_user_data': isAccepted ? 'granted' : 'denied',
        'ad_personalization': isAccepted ? 'granted' : 'denied',
        'analytics_storage': isAccepted ? 'granted' : 'denied'
      })
    }
  }

  useEffect(() => {
    // Check if consent was already given
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Small delay to ensure smooth hydration and visibility
      const timer = setTimeout(() => setVisible(true), 4000)
      return () => clearTimeout(timer)
    } else {
      // Re-apply consent if already given
      updateConsent(consent === 'accepted')
    }
  }, [])

  const accept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    updateConsent(true)
    setVisible(false)
  }

  const decline = () => {
    localStorage.setItem('cookie-consent', 'declined')
    updateConsent(false)
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed bottom-6 left-6 right-6 sm:left-auto sm:max-w-sm z-[200] transition-all duration-500 transform translate-y-0"
      style={{ animation: 'fadeIn 0.5s ease-out' }}
    >
      <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-[2rem] shadow-2xl p-6 flex flex-col gap-5 ring-1 ring-black/5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-50 dark:bg-blue-900/20 rounded-full flex items-center justify-center shrink-0">
             <span className="text-xl">🍪</span>
          </div>
          <h3 className="font-bold text-gray-900 dark:text-white text-sm uppercase tracking-widest">Privacy Preference</h3>
        </div>
        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed font-medium">
          We use cookies to enhance your experience and serve relevant ads via Google AdSense. 
          Read our <Link href="/privacy/" className="text-blue-600 dark:text-blue-400 font-bold underline">Privacy Policy</Link>.
        </p>
        <div className="flex gap-3">
          <button
            onClick={decline}
            className="flex-1 px-4 py-3 text-xs font-bold text-gray-500 dark:text-slate-400 bg-gray-50 dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="flex-1 px-4 py-3 text-xs font-bold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-95"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}
