'use client'

import React, { useState } from 'react'
import { Target, Search, BarChart3, Info } from 'lucide-react'

export default function KeywordDensity() {
  const [text, setText] = useState('')
  const [keywords, setKeywords] = useState<{ word: string; count: number; density: number }[]>([])

  const analyzeKeywords = () => {
    if (!text.trim()) return

    const words = text.toLowerCase().match(/\b\w+\b/g) || []
    const totalCount = words.length
    const freq: any = {}
    
    words.forEach(w => {
      if (w.length > 3) { // Filter out short stop words
        freq[w] = (freq[w] || 0) + 1
      }
    })

    const sorted = Object.entries(freq)
      .map(([word, count]: [string, any]) => ({
        word,
        count,
        density: (count / totalCount) * 100
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    setKeywords(sorted)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Target className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Content Density Auditor</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your content here to analyze keyword frequency..."
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm leading-relaxed text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={analyzeKeywords}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all"
        >
          Run Analysis
        </button>
      </div>

      {keywords.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Top Keyword Distribution</h3>
          <div className="space-y-6">
            {keywords.map((k, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest">
                  <span className="text-gray-900 dark:text-white">{k.word}</span>
                  <div className="flex gap-4 text-gray-400">
                    <span>{k.count} times</span>
                    <span className="text-blue-600">{k.density.toFixed(1)}%</span>
                  </div>
                </div>
                <div className="h-1.5 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${Math.min(k.density * 10, 100)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
