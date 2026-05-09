'use client'
import React, { useState, useEffect } from 'react'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const ResultCard = ({ title, passed, sub }: { title: string, passed: boolean, sub: string }) => (
  <div className={`p-4 rounded-xl border-2 flex items-center justify-between ${passed ? 'border-green-100 bg-green-50 text-green-800' : 'border-red-100 bg-red-50 text-red-800'}`}>
    <div>
      <div className="font-bold text-sm">{title}</div>
      <div className="text-xs opacity-75">{sub}</div>
    </div>
    {passed ? <CheckCircle2 className="w-6 h-6" /> : <AlertCircle className="w-6 h-6" />}
  </div>
)

export default function ColorContrast() {
  const [foreground, setForeground] = useState('#2563EB')
  const [background, setBackground] = useState('#FFFFFF')
  const [ratio, setRatio] = useState(0)
  const [results, setResults] = useState({ aaNormal: false, aaLarge: false, aaaNormal: false, aaaLarge: false })

  const getLuminance = (hex: string) => {
    const rgb = hex.replace(/^#/, '').match(/.{2}/g)?.map(x => {
      let v = parseInt(x, 16) / 255
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)
    }) || [0, 0, 0]
    return 0.2126 * rgb[0] + 0.7152 * rgb[1] + 0.0722 * rgb[2]
  }

  useEffect(() => {
    const l1 = getLuminance(foreground), l2 = getLuminance(background)
    const currentRatio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    setRatio(Number(currentRatio.toFixed(2)))
    setResults({ aaNormal: currentRatio >= 4.5, aaLarge: currentRatio >= 3, aaaNormal: currentRatio >= 7, aaaLarge: currentRatio >= 4.5 })
  }, [foreground, background])

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Foreground</label>
              <div className="flex gap-2">
                <input type="color" value={foreground} onChange={(e) => setForeground(e.target.value.toUpperCase())} className="w-12 h-12 p-1 rounded-lg border border-gray-200 cursor-pointer" />
                <input type="text" value={foreground} onChange={(e) => setForeground(e.target.value.toUpperCase())} className="flex-grow px-4 py-2 rounded-xl border border-gray-200 outline-none font-mono dark:bg-slate-800 dark:text-white" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-slate-300 mb-2">Background</label>
              <div className="flex gap-2">
                <input type="color" value={background} onChange={(e) => setBackground(e.target.value.toUpperCase())} className="w-12 h-12 p-1 rounded-lg border border-gray-200 cursor-pointer" />
                <input type="text" value={background} onChange={(e) => setBackground(e.target.value.toUpperCase())} className="flex-grow px-4 py-2 rounded-xl border border-gray-200 outline-none font-mono dark:bg-slate-800 dark:text-white" />
              </div>
            </div>
            <div className="mt-8 p-12 rounded-2xl border border-gray-200 flex flex-col items-center justify-center text-center shadow-inner" style={{ backgroundColor: background, color: foreground }}>
              <div className="text-3xl font-bold mb-2">Preview Text</div>
              <div className="text-sm">Sample accessibility demonstration.</div>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
          <div className="text-center mb-8 pb-8 border-b border-gray-50 dark:border-slate-800">
            <div className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Ratio</div>
            <div className="text-6xl font-black text-gray-900 dark:text-white">{ratio}:1</div>
          </div>
          <div className="grid grid-cols-1 gap-4">
            <ResultCard title="AA Normal" passed={results.aaNormal} sub="Required 4.5:1" />
            <ResultCard title="AA Large" passed={results.aaLarge} sub="Required 3:1" />
            <ResultCard title="AAA Normal" passed={results.aaaNormal} sub="Required 7:1" />
            <ResultCard title="AAA Large" passed={results.aaaLarge} sub="Required 4.5:1" />
          </div>
        </div>
      </div>
    </div>
  )
}
