'use client'

import React, { useState } from 'react'
import { Globe, Search, CheckCircle2, XCircle, Info, Activity, Monitor, Smartphone } from 'lucide-react'

const FEATURES = [
  { id: 'web-gpu', name: 'WebGPU', status: { chrome: 'supported', safari: 'partial', firefox: 'partial', edge: 'supported' }, desc: 'Modern graphics API for high-performance 3D and compute.' },
  { id: 'shared-array-buffer', name: 'SharedArrayBuffer', status: { chrome: 'supported', safari: 'supported', firefox: 'supported', edge: 'supported' }, desc: 'Share memory between the main thread and web workers.' },
  { id: 'view-transitions', name: 'View Transitions API', status: { chrome: 'supported', safari: 'partial', firefox: 'unsupported', edge: 'supported' }, desc: 'Simple way to create animated transitions between DOM states.' },
  { id: 'subgrid', name: 'CSS Subgrid', status: { chrome: 'supported', safari: 'supported', firefox: 'supported', edge: 'supported' }, desc: 'Allows nested grids to inherit track definitions from parent.' },
  { id: 'pwa', name: 'Progressive Web Apps', status: { chrome: 'supported', safari: 'partial', firefox: 'partial', edge: 'supported' }, desc: 'Installable web applications with offline capabilities.' },
]

export default function BrowserCompatChecker() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState(FEATURES)

  const filter = (val: string) => {
    setQuery(val)
    setResults(FEATURES.filter(f => f.name.toLowerCase().includes(val.toLowerCase())))
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Globe className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Web Feature Compatibility Checker</h3>
        </div>

        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => filter(e.target.value)}
            placeholder="Search web features (e.g., WebGPU, Subgrid)..."
            className="w-full p-4 pl-12 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
      </div>

      <div className="space-y-6">
        {results.map((f, i) => (
          <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${i * 0.1}s` }}>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
              <div>
                <h4 className="text-lg font-black text-gray-900 dark:text-white">{f.name}</h4>
                <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium mt-1">{f.desc}</p>
              </div>
              <div className="flex gap-2">
                {Object.entries(f.status).map(([browser, state]) => (
                  <div key={browser} className="flex flex-col items-center">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                      state === 'supported' ? 'bg-green-500/10 border-green-500/20 text-green-500' :
                      state === 'partial' ? 'bg-yellow-500/10 border-yellow-500/20 text-yellow-500' :
                      'bg-red-500/10 border-red-500/20 text-red-500'
                    }`}>
                      {state === 'supported' ? <CheckCircle2 className="w-5 h-5" /> :
                       state === 'partial' ? <Activity className="w-5 h-5" /> :
                       <XCircle className="w-5 h-5" />}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-widest text-gray-400 mt-2">{browser}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-gray-50 dark:border-[#1E2D47] flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Monitor className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Baseline 2025</span>
              </div>
              <div className="flex items-center gap-2">
                <Smartphone className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Widely Supported</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
