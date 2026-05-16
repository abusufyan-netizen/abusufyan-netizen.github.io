'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Image as ImageIcon, Download, Copy, Check, RotateCcw } from 'lucide-react'

export default function Base64ToImage() {
  const [base64, setBase64] = useState('')
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const convertToImage = () => {
    if (!base64.trim()) return
    // Simple validation and src fixing
    let src = base64.trim()
    if (!src.startsWith('data:image/')) {
      src = `data:image/png;base64,${src}`
    }
    setImageSrc(src)
  }

  const downloadImage = () => {
    if (!imageSrc) return
    const link = document.createElement('a')
    link.href = imageSrc
    link.download = `webtoolkit-image-${Date.now()}.png`
    link.click()
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <ImageIcon className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Base64 Input</h3>
        </div>

        <textarea
          value={base64}
          onChange={(e) => setBase64(e.target.value)}
          placeholder="Paste Base64 string here (with or without data:image/ prefix)..."
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={convertToImage}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all"
        >
          Generate Preview
        </button>
      </div>

      {imageSrc && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in fade-in zoom-in duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Image Preview</h3>
            <button 
              onClick={downloadImage}
              className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2"
            >
              <Download className="w-3 h-3" /> Download PNG
            </button>
          </div>
          <div className="bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-dashed border-gray-200 dark:border-[#1E2D47] p-8 flex items-center justify-center min-h-[300px]">
            <Image src={imageSrc} alt="Base64 Preview" className="max-w-full max-h-[500px] shadow-2xl rounded-lg" width={800} height={500} unoptimized />
          </div>
        </div>
      )}
    </div>
  )
}
