'use client'

import React, { useState } from 'react'
import { Monitor, Smartphone, Tablet, Search, Globe, Maximize2, RotateCcw } from 'lucide-react'

const VIEWPORTS = [
  { name: 'Mobile', width: 375, height: 667, icon: Smartphone },
  { name: 'Tablet', width: 768, height: 1024, icon: Tablet },
  { name: 'Desktop', width: 1280, height: 800, icon: Monitor },
]

export default function ResponsiveCheckerPro() {
  const [url, setUrl] = useState('')
  const [activeUrl, setActiveUrl] = useState('')
  const [activeViewport, setActiveViewport] = useState(VIEWPORTS[0])

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Monitor className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Responsive Viewport Simulator</h3>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="w-full p-4 pl-12 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold outline-none"
            />
            <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>
          <button 
            onClick={() => setActiveUrl(url)}
            className="px-8 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
          >
            <Search className="w-4 h-4" /> Load Site
          </button>
        </div>

        <div className="flex flex-wrap gap-4 border-t border-gray-50 dark:border-[#1E2D47] pt-6">
          {VIEWPORTS.map((v, i) => (
            <button
              key={i}
              onClick={() => setActiveViewport(v)}
              className={`px-6 py-3 rounded-xl font-bold uppercase tracking-widest text-[10px] flex items-center gap-2 transition-all ${
                activeViewport.name === v.name 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-gray-100 dark:bg-white/5 text-gray-500 hover:bg-gray-200'
              }`}
            >
              <v.icon className="w-4 h-4" /> {v.name} ({v.width}px)
            </button>
          ))}
        </div>
      </div>

      <div className="relative flex justify-center bg-gray-100 dark:bg-[#0B1120] rounded-[3rem] p-12 border border-gray-200 dark:border-[#1E2D47] overflow-hidden min-h-[600px]">
        {activeUrl ? (
          <div 
            className="bg-white dark:bg-[#0D1526] rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800 dark:border-black transition-all duration-500 ease-in-out"
            style={{ width: `${activeViewport.width}px`, height: `${activeViewport.height}px`, maxWidth: '100%' }}
          >
            <iframe 
              src={activeUrl.startsWith('http') ? activeUrl : `https://${activeUrl}`}
              className="w-full h-full border-none"
              title="Responsive Preview"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center opacity-40">
            <Maximize2 className="w-16 h-16 mb-4 text-gray-400" />
            <h4 className="text-sm font-black uppercase tracking-widest text-gray-500">Live Preview Empty</h4>
            <p className="text-[10px] font-bold text-gray-400 mt-1 max-w-[200px]">Enter a URL above to simulate how it looks across different device viewports.</p>
          </div>
        )}
      </div>
    </div>
  )
}
