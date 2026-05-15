'use client'

import React, { useState } from 'react'
import { FileCode, Zap, Copy, Check, RotateCcw } from 'lucide-react'

export default function HtmlMinifier() {
  const [html, setHtml] = useState('')
  const [minified, setMinified] = useState('')
  const [copied, setCopied] = useState(false)

  const minifyHtml = () => {
    const res = html
      .replace(/<!--[\s\S]*?-->/g, '') // Remove comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/>\s+</g, '><') // Remove spaces between tags
      .trim()
    setMinified(res)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileCode className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">HTML Input</h3>
        </div>

        <textarea
          value={html}
          onChange={(e) => setHtml(e.target.value)}
          placeholder="<html>\n  <body>\n    <h1>Hello</h1>\n  </body>\n</html>"
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={minifyHtml}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Minify HTML
        </button>
      </div>

      {minified && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Minified HTML</h3>
            <button 
              onClick={() => { navigator.clipboard.writeText(minified); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
            <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4] whitespace-pre-wrap">{minified}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
