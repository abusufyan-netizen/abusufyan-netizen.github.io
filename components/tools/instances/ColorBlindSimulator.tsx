'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Eye, Image as ImageIcon, Search, Download, Trash2, Info } from 'lucide-react'

const TYPES = [
  { id: 'none', name: 'Normal Vision', filter: '' },
  { id: 'deuteranopia', name: 'Deuteranopia', desc: 'Red-Green (Most Common)', filter: 'url(#deuteranopia)' },
  { id: 'protanopia', name: 'Protanopia', desc: 'Red-Green (Less Common)', filter: 'url(#protanopia)' },
  { id: 'tritanopia', name: 'Tritanopia', desc: 'Blue-Yellow (Rare)', filter: 'url(#tritanopia)' },
  { id: 'achromatopsia', name: 'Achromatopsia', desc: 'Total Color Blindness', filter: 'grayscale(100%)' },
]

export default function ColorBlindSimulator() {
  const [image, setImage] = useState<string | null>(null)
  const [activeType, setActiveType] = useState(TYPES[0])

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => setImage(e.target?.result as string)
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="space-y-8">
      <svg className="hidden">
        <filter id="deuteranopia">
          <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
        </filter>
        <filter id="protanopia">
          <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
        </filter>
        <filter id="tritanopia">
          <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
        </filter>
      </svg>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-[#00D4B4]">
            <Eye className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Color Blindness Simulator</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block ml-1">Simulation Type</label>
            <div className="space-y-3">
              {TYPES.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActiveType(t)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all ${
                    activeType.id === t.id 
                      ? 'bg-purple-600 text-white border-purple-500 shadow-lg shadow-purple-500/20' 
                      : 'bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-[#1E2D47] text-gray-500 hover:bg-gray-100'
                  }`}
                >
                  <div className="text-xs font-black uppercase tracking-widest">{t.name}</div>
                  {t.desc && <div className={`text-[10px] mt-1 font-bold ${activeType.id === t.id ? 'text-purple-200' : 'text-gray-400'}`}>{t.desc}</div>}
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-[2.5rem] p-8 border-2 border-dashed border-gray-100 dark:border-[#1E2D47]">
            {image ? (
              <div className="relative w-full group">
                <Image 
                  src={image} 
                  alt="Preview" 
                  className="w-full h-auto rounded-2xl shadow-2xl transition-all duration-500"
                  style={{ filter: activeType.filter }}
                  width={600}
                  height={400}
                  unoptimized
                />
                <button 
                  onClick={() => setImage(null)}
                  className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Upload Reference Image</div>
                <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">PNG, JPG or WebP</div>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="p-6 bg-purple-500/5 rounded-2xl border border-purple-500/10 flex gap-4 items-start">
        <Info className="w-5 h-5 text-purple-500 shrink-0 mt-1" />
        <p className="text-xs text-purple-600 font-bold leading-relaxed italic">
          This simulation uses SVG color matrices to approximate various forms of color vision deficiency (CVD). It is an essential tool for ensuring your UI designs are accessible to the 300 million people worldwide with color blindness.
        </p>
      </div>
    </div>
  )
}
