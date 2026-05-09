'use client'
import React, { useState, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import ResultExporter from '../ResultExporter'

export default function ColorPicker() {
  const [color, setColor] = useState('#3b82f6')
  const [copied, setCopied] = useState<string | null>(null)

  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    setCopied(type)
    setTimeout(() => setCopied(null), 2000)
  }

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16), g = parseInt(hex.slice(3, 5), 16), b = parseInt(hex.slice(5, 7), 16)
    return `rgb(${r}, ${g}, ${b})`
  }

  const hexToHsl = (hex: string) => {
    let r = parseInt(hex.slice(1, 3), 16) / 255, g = parseInt(hex.slice(3, 5), 16) / 255, b = parseInt(hex.slice(5, 7), 16) / 255
    let max = Math.max(r, g, b), min = Math.min(r, g, b), h = 0, s, l = (max + min) / 2
    if (max !== min) {
      let d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    } else { s = 0 }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
  }

  const exportRef = useRef<HTMLDivElement>(null)

  return (
    <div className="space-y-8">
      <div ref={exportRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white dark:bg-slate-900 rounded-[2.5rem] p-2">
        <div className="p-8 flex flex-col items-center justify-center space-y-6">
          <div className="w-full h-64 rounded-2xl shadow-inner border border-gray-100 dark:border-slate-800" style={{ backgroundColor: color }} />
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="w-full h-16 cursor-pointer bg-transparent border-none outline-none" />
        </div>
        <div className="p-8 space-y-4">
          <div className="space-y-4">
            {[
              { label: 'HEX', value: color.toUpperCase(), id: 'hex' },
              { label: 'RGB', value: hexToRgb(color), id: 'rgb' },
              { label: 'HSL', value: hexToHsl(color), id: 'hsl' }
            ].map((type) => (
              <div key={type.id}>
                <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{type.label}</label>
                <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-gray-100 dark:border-slate-700 font-mono text-lg">
                  <span className="dark:text-white uppercase">{type.value}</span>
                  <button onClick={() => handleCopy(type.value, type.id)} className={`p-2 rounded-xl transition-all ${copied === type.id ? 'text-green-600 bg-green-50' : 'text-gray-400 hover:bg-gray-100'}`}>
                    {copied === type.id ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ResultExporter contentRef={exportRef} toolName="Color Picker" />
    </div>
  )
}
