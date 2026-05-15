'use client'

import React, { useState } from 'react'
import { Split, FileText, Check, AlertCircle } from 'lucide-react'

export default function TextSimilarity() {
  const [text1, setText1] = useState('')
  const [text2, setText2] = useState('')
  const [similarity, setSimilarity] = useState<number | null>(null)

  const calculateSimilarity = () => {
    const s1 = text1.toLowerCase().replace(/[^\w\s]/g, '')
    const s2 = text2.toLowerCase().replace(/[^\w\s]/g, '')
    
    if (!s1 || !s2) {
      setSimilarity(0)
      return
    }

    const set1 = new Set(s1.split(/\s+/))
    const set2 = new Set(s2.split(/\s+/))
    
    const intersection = new Set([...set1].filter(x => set2.has(x)))
    const union = new Set([...set1, ...set2])
    
    const result = (intersection.size / union.size) * 100
    setSimilarity(result)
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block ml-1">Document A</label>
          <textarea
            value={text1}
            onChange={(e) => setText1(e.target.value)}
            placeholder="Paste first text here..."
            className="w-full h-48 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
          />
        </div>
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <label className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-4 block ml-1">Document B</label>
          <textarea
            value={text2}
            onChange={(e) => setText2(e.target.value)}
            placeholder="Paste second text here..."
            className="w-full h-48 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
          />
        </div>
      </div>

      <button
        onClick={calculateSimilarity}
        className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
      >
        <Split className="w-4 h-4" /> Compare Similarity
      </button>

      {similarity !== null && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-12 shadow-sm text-center">
          <div className="text-6xl font-black text-blue-600 dark:text-[#00D4B4] mb-2">{similarity.toFixed(1)}%</div>
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-gray-400">Jaccard Similarity Index</p>
          <div className="mt-8 max-w-md mx-auto h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${similarity}%` }} />
          </div>
        </div>
      )}
    </div>
  )
}
