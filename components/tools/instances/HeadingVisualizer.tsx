'use client'

import React, { useState } from 'react'
import { Type, Info, Layers, Check, AlertCircle } from 'lucide-react'

export default function HeadingVisualizer() {
  const [input, setInput] = useState('')
  const [headings, setHeadings] = useState<{ level: number; text: string }[]>([])

  const parseHeadings = () => {
    // Basic HTML/Markdown heading detection
    const lines = input.split('\n')
    const found: { level: number; text: string }[] = []

    lines.forEach(line => {
      // Markdown detection
      const mdMatch = line.match(/^(#{1,6})\s+(.+)$/)
      if (mdMatch) {
        found.push({ level: mdMatch[1].length, text: mdMatch[2] })
        return
      }

      // HTML detection
      const htmlMatch = line.match(/<h([1-6])[^>]*>(.*?)<\/h\1>/i)
      if (htmlMatch) {
        found.push({ level: parseInt(htmlMatch[1]), text: htmlMatch[2] })
      }
    })

    setHeadings(found)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Type className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Heading Hierarchy</h3>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste Markdown or HTML headings...&#10;# Main Title&#10;## Section One&#10;### Sub-topic"
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={parseHeadings}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all"
        >
          Visualize Structure
        </button>
      </div>

      {headings.length > 0 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-8">Structural Map</h3>
          <div className="space-y-4">
            {headings.map((h, i) => (
              <div 
                key={i} 
                style={{ marginLeft: `${(h.level - 1) * 2}rem` }}
                className="flex items-center gap-3 group"
              >
                <span className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-widest shrink-0 ${
                  h.level === 1 ? 'bg-blue-500 text-white' :
                  h.level === 2 ? 'bg-blue-500/20 text-blue-600 dark:text-[#00D4B4]' :
                  'bg-gray-100 dark:bg-white/5 text-gray-400'
                }`}>
                  H{h.level}
                </span>
                <p className={`text-sm font-bold ${h.level === 1 ? 'text-gray-900 dark:text-white' : 'text-gray-600 dark:text-[#8A9BBE]'}`}>
                  {h.text}
                </p>
              </div>
            ))}
          </div>
          
          {headings.filter(h => h.level === 1).length > 1 && (
            <div className="mt-8 p-4 bg-red-500/5 border border-red-500/10 rounded-xl flex items-center gap-3 text-red-500 text-[10px] font-black uppercase tracking-widest">
              <AlertCircle className="w-4 h-4" />
              SEO Warning: Multiple H1 tags detected. Only one H1 is recommended per page.
            </div>
          )}
        </div>
      )}

      <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
        <Layers className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
        <div className="space-y-2">
          <h4 className="text-[10px] font-black uppercase tracking-widest text-blue-600">Heading Hierarchy & SEO</h4>
          <p className="text-xs text-gray-500 dark:text-[#8A9BBE] leading-relaxed">
            A clean heading structure helps search engines understand the information architecture of your content. Always follow a logical order (H1 &gt; H2 &gt; H3) and avoid skipping levels for optimal accessibility and indexing.
          </p>
        </div>
      </div>
    </div>
  )
}
