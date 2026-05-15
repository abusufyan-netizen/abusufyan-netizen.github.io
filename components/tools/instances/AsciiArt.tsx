'use client'

import React, { useState } from 'react'
import { Type, Image as ImageIcon, Copy, Check, RotateCcw } from 'lucide-react'

export default function AsciiArt() {
  const [text, setText] = useState('HELLO')
  const [art, setArt] = useState('')
  const [copied, setCopied] = useState(false)

  // Simple hardcoded block font for ASCII Art demonstration
  const FONT: any = {
    'A': '  AAA  \n A   A \n AAAAA \n A   A \n A   A ',
    'B': ' BBBB  \n B   B \n BBBB  \n B   B \n BBBB  ',
    'C': '  CCCC \n C     \n C     \n C     \n  CCCC ',
    'D': ' DDDD  \n D   D \n D   D \n D   D \n DDDD  ',
    'E': ' EEEEE \n E     \n EEE   \n E     \n EEEEE ',
    'H': ' H   H \n H   H \n HHHHH \n H   H \n H   H ',
    'L': ' L     \n L     \n L     \n L     \n LLLLL ',
    'O': '  OOO  \n O   O \n O   O \n O   O \n  OOO  ',
  }

  const generateArt = () => {
    const lines = ['', '', '', '', '']
    text.toUpperCase().split('').forEach(char => {
      const glyph = FONT[char] || '       \n       \n       \n       \n       '
      const rows = glyph.split('\n')
      rows.forEach((row: string, i: number) => {
        lines[i] += row + '  '
      })
    })
    setArt(lines.join('\n'))
  }

  const copyResult = () => {
    navigator.clipboard.writeText(art)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Type className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">ASCII Text Generator</h3>
        </div>

        <div className="flex gap-4">
          <input
            type="text"
            value={text}
            maxLength={10}
            onChange={(e) => setText(e.target.value.toUpperCase())}
            placeholder="HELLO"
            className="flex-1 p-4 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-bold uppercase tracking-widest outline-none"
          />
          <button 
            onClick={generateArt}
            className="px-8 bg-blue-600 text-white rounded-2xl font-bold uppercase tracking-widest text-[10px] hover:bg-blue-700 transition-all"
          >
            Generate
          </button>
        </div>
      </div>

      {art && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">ASCII Art Output</h3>
            <button 
              onClick={copyResult}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
            <pre className="text-[10px] font-mono text-blue-600 dark:text-[#00D4B4] leading-tight whitespace-pre">{art}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
