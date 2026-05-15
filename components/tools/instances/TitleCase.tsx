'use client'

import React, { useState } from 'react'
import { Type, ArrowRight, Copy, Check, RotateCcw } from 'lucide-react'

export default function TitleCase() {
  const [text, setText] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const toTitleCase = () => {
    const smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|v.?|vs.?|via)$/i
    const res = text.toLowerCase().split(' ').map((word, index, array) => {
      if (index > 0 && index < array.length - 1 && word.match(smallWords)) {
        return word
      }
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(' ')
    setResult(res)
  }

  const toSentenceCase = () => {
    const res = text.toLowerCase().charAt(0).toUpperCase() + text.toLowerCase().slice(1)
    setResult(res)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Type className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Text Case Converter</h3>
        </div>

        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="ENTER TEXT HERE TO TRANSFORM..."
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-medium text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <button onClick={toTitleCase} className="py-3 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-[9px] hover:bg-blue-700">Title Case</button>
          <button onClick={toSentenceCase} className="py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white rounded-xl font-bold uppercase tracking-widest text-[9px]">Sentence Case</button>
          <button onClick={() => setResult(text.toUpperCase())} className="py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white rounded-xl font-bold uppercase tracking-widest text-[9px]">UPPERCASE</button>
          <button onClick={() => setResult(text.toLowerCase())} className="py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-white rounded-xl font-bold uppercase tracking-widest text-[9px]">lowercase</button>
        </div>
      </div>

      {result && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Transformed Text</h3>
            <button onClick={() => { navigator.clipboard.writeText(result); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <p className="text-sm font-medium text-gray-800 dark:text-[#F0F6FF] leading-relaxed">{result}</p>
        </div>
      )}
    </div>
  )
}
