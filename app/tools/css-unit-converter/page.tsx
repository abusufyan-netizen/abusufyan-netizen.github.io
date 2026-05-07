'use client'

import React, { useState } from 'react'
import { Ruler, RefreshCw, ArrowRight, Layers } from 'lucide-react'
import Link from 'next/link'
import BreadcrumbSchema from '@/components/seo/BreadcrumbSchema'
import AdSlot from '@/components/ads/AdSlot'

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

  const reset = () => {
    setValue('16')
    setBaseFontSize('16')
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 py-12 px-4 sm:px-6 lg:px-8 transition-colors duration-300">
      <BreadcrumbSchema name="CSS Unit Converter" slug="tools/css-unit-converter" />
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-fuchsia-600 rounded-2xl shadow-lg shadow-fuchsia-600/20">
              <Ruler className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">CSS Unit Converter</h1>
              <p className="text-gray-500 dark:text-slate-400">Professional conversion between pixels, rem, em, and viewports</p>
            </div>
          </div>
          
          <button 
            onClick={reset}
            className="flex items-center gap-2 px-6 py-3 bg-fuchsia-50 dark:bg-fuchsia-900/10 text-fuchsia-600 dark:text-fuchsia-400 rounded-xl font-bold text-sm hover:bg-fuchsia-100 dark:hover:bg-fuchsia-900/20 transition-all border border-fuchsia-100 dark:border-fuchsia-900/30"
          >
            <RefreshCw className="w-4 h-4" /> Reset Defaults
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-sm">
              <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-8">Base Configuration</h2>
              
              <div className="space-y-8">
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Input Value (px)</label>
                  <input 
                    type="number" 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    className="w-full p-5 font-black text-2xl bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all dark:text-white" 
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-bold text-gray-700 dark:text-slate-300 uppercase mb-3">Base Font Size (px)</label>
                  <input 
                    type="number" 
                    value={baseFontSize} 
                    onChange={(e) => setBaseFontSize(e.target.value)} 
                    className="w-full p-5 font-black text-xl bg-gray-50 dark:bg-slate-800 border border-transparent rounded-2xl focus:ring-2 focus:ring-fuchsia-500 outline-none transition-all dark:text-white" 
                  />
                  <p className="mt-2 text-[10px] text-gray-400 dark:text-slate-500 italic">Common default is 16px (1rem)</p>
                </div>
              </div>
            </div>
            
            <div className="bg-fuchsia-50 dark:bg-fuchsia-900/10 p-6 rounded-3xl border border-fuchsia-100 dark:border-fuchsia-900/30">
              <p className="text-xs text-fuchsia-700 dark:text-fuchsia-400 leading-relaxed">
                <strong>Tip:</strong> Modern web development favors <strong>rem</strong> units for accessibility. Converting hardcoded px values to rem ensures your layout scales with user browser settings.
              </p>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] border border-gray-100 dark:border-slate-800 shadow-xl shadow-fuchsia-900/5 p-8">
              <h2 className="text-[10px] font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest mb-6 px-2">Computed Units</h2>
              <div className="space-y-3">
                {conversions.map((c) => (
                  <div key={c.unit} className="flex justify-between items-center p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-transparent hover:border-fuchsia-200 dark:hover:border-fuchsia-900/30 transition-all group">
                    <div className="text-left">
                      <span className="block text-sm font-black text-gray-900 dark:text-white uppercase tracking-tight">{c.unit}</span>
                      <span className="block text-[10px] text-gray-400 dark:text-slate-500 uppercase font-bold">{c.description}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xl font-black text-fuchsia-600 dark:text-fuchsia-400 tracking-tighter">{c.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Design Insight Footer */}
        <div className="bg-fuchsia-600 rounded-[3rem] p-10 text-white relative overflow-hidden group mb-16 shadow-xl shadow-fuchsia-500/20">
          <Layers className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform" />
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="max-w-xl">
              <h3 className="text-2xl font-bold mb-4">Responsive Design Mastery</h3>
              <p className="text-fuchsia-100 text-sm leading-relaxed">
                Using relative units like <strong>vw</strong> and <strong>vh</strong> allows you to build truly fluid interfaces that respond perfectly to any screen dimension. Master the grid with precision.
              </p>
            </div>
            <Link 
              href="/tools/color-contrast/"
              className="inline-flex items-center gap-2 bg-white text-fuchsia-600 px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-2xl transition-all hover:-translate-y-1 whitespace-nowrap"
            >
              Check Color Contrast <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>

        <AdSlot />
      </div>
    </div>
  )
}
