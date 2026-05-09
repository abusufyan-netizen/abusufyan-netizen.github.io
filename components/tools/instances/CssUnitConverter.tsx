'use client'
import React, { useState } from 'react'
import { RefreshCw } from 'lucide-react'

export default function CssUnitConverter() {
  const [value, setValue] = useState('16')
  const [baseFontSize, setBaseFontSize] = useState('16')
  const base = parseFloat(baseFontSize) || 16
  const v = parseFloat(value) || 0
  
  const conversions = [
    { unit: 'px', value: v.toFixed(2), description: 'Pixels' },
    { unit: 'rem', value: (v / base).toFixed(4), description: 'Root Em' },
    { unit: 'em', value: (v / base).toFixed(4), description: 'Element Em' },
    { unit: 'pt', value: (v * 0.75).toFixed(2), description: 'Points' },
    { unit: 'vw', value: (v / 19.2).toFixed(4), description: 'Viewport Width (1920px)' },
    { unit: 'vh', value: (v / 10.8).toFixed(4), description: 'Viewport Height (1080px)' },
    { unit: '%', value: ((v / base) * 100).toFixed(2), description: 'Percentage' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex justify-end mb-4">
        <button onClick={() => { setValue('16'); setBaseFontSize('16') }} className="flex items-center gap-2 px-4 py-2 text-fuchsia-600 font-bold text-xs"><RefreshCw className="w-4 h-4" /> Reset</button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-8">Configuration</h2>
            <div className="space-y-8">
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Input (px)</label>
                <input type="number" value={value} onChange={(e) => setValue(e.target.value)} className="w-full p-5 font-black text-2xl bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white" />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Base (px)</label>
                <input type="number" value={baseFontSize} onChange={(e) => setBaseFontSize(e.target.value)} className="w-full p-5 font-black text-xl bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl outline-none dark:text-white" />
              </div>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 p-8 shadow-xl">
            <h2 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-6">Computed Units</h2>
            <div className="space-y-3">
              {conversions.map((c) => (
                <div key={c.unit} className="flex justify-between items-center p-5 bg-gray-50 dark:bg-slate-800 rounded-2xl border border-transparent hover:border-fuchsia-200 transition-all">
                  <div className="text-left">
                    <span className="block text-sm font-black text-gray-900 dark:text-white uppercase">{c.unit}</span>
                    <span className="block text-[10px] text-gray-400 font-bold uppercase">{c.description}</span>
                  </div>
                  <span className="font-mono text-xl font-black text-fuchsia-600 dark:text-fuchsia-400">{c.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
