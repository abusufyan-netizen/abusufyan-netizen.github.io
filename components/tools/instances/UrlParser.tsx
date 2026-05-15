'use client'

import React, { useState } from 'react'
import { Link2, Search, Copy, Check, RotateCcw } from 'lucide-react'

export default function UrlParser() {
  const [url, setUrl] = useState('')
  const [parts, setParts] = useState<{ label: string; value: string }[]>([])

  const parseUrl = () => {
    try {
      const parsed = new URL(url.trim().startsWith('http') ? url.trim() : `https://${url.trim()}`)
      const res = [
        { label: 'Protocol', value: parsed.protocol },
        { label: 'Hostname', value: parsed.hostname },
        { label: 'Pathname', value: parsed.pathname },
        { label: 'Search Params', value: parsed.search },
        { label: 'Hash', value: parsed.hash },
        { label: 'Port', value: parsed.port || '80/443' },
      ]
      setParts(res)
    } catch (e) {
      setParts([{ label: 'Error', value: 'Invalid URL format' }])
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Link2 className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">URL Inspector</h3>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/path?query=val#hash"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
          />
          <button 
            onClick={parseUrl}
            className="px-8 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
          >
            Parse
          </button>
        </div>
      </div>

      {parts.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="space-y-4">
            {parts.map((p, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{p.label}</span>
                <span className="text-xs font-mono text-blue-600 dark:text-[#00D4B4] break-all text-right ml-4">{p.value}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
