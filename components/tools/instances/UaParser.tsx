'use client'

import React, { useState, useEffect } from 'react'
import { Monitor, Smartphone, Globe, Shield, Info } from 'lucide-react'

export default function UaParser() {
  const [ua, setUa] = useState('')
  const [parsed, setParsed] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUa(navigator.userAgent)
      parse(navigator.userAgent)
    }
  }, [])

  const parse = (str: string) => {
    const res: any = {
      browser: 'Unknown',
      os: 'Unknown',
      device: 'Desktop',
      engine: 'Unknown'
    }

    if (str.includes('Firefox')) res.browser = 'Firefox'
    else if (str.includes('Edg')) res.browser = 'Edge'
    else if (str.includes('Chrome')) res.browser = 'Chrome'
    else if (str.includes('Safari')) res.browser = 'Safari'

    if (str.includes('Windows')) res.os = 'Windows'
    else if (str.includes('Android')) { res.os = 'Android'; res.device = 'Mobile' }
    else if (str.includes('iPhone')) { res.os = 'iOS'; res.device = 'Mobile' }
    else if (str.includes('Macintosh')) res.os = 'macOS'
    else if (str.includes('Linux')) res.os = 'Linux'

    setParsed(res)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Monitor className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">User Agent Inspector</h3>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Browser & OS Detection</p>
          </div>
        </div>

        <textarea
          value={ua}
          onChange={(e) => { setUa(e.target.value); parse(e.target.value) }}
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />
      </div>

      {parsed && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { label: 'Browser', value: parsed.browser, icon: Globe, color: 'text-blue-500' },
            { label: 'OS', value: parsed.os, icon: Shield, color: 'text-green-500' },
            { label: 'Device', value: parsed.device, icon: Smartphone, color: 'text-purple-500' },
          ].map((item, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-6 shadow-sm flex flex-col items-center text-center">
              <item.icon className={`w-8 h-8 mb-4 ${item.color}`} strokeWidth={1.5} />
              <span className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">{item.label}</span>
              <span className="text-sm font-black text-gray-900 dark:text-white">{item.value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
