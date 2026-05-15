'use client'

import React, { useState } from 'react'
import { FileUp, Image as ImageIcon, Copy, Check, RotateCcw } from 'lucide-react'

export default function ImageToBase64() {
  const [base64, setBase64] = useState('')
  const [preview, setPreview] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onloadend = () => {
      const result = reader.result as string
      setBase64(result)
      setPreview(result)
    }
    reader.readAsDataURL(file)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(base64)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <FileUp className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Upload Image</h3>
        </div>

        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 dark:border-[#1E2D47] rounded-2xl p-12 hover:border-blue-500/50 transition-all group">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            id="image-upload"
          />
          <label htmlFor="image-upload" className="cursor-pointer flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center group-hover:scale-110 transition-all">
              <ImageIcon className="w-8 h-8 text-gray-400 group-hover:text-blue-500" />
            </div>
            <div className="text-center">
              <span className="text-xs font-black uppercase tracking-widest text-gray-600 dark:text-white block mb-1">Click to Upload</span>
              <span className="text-[10px] text-gray-400 font-medium">PNG, JPG, SVG or WEBP</span>
            </div>
          </label>
        </div>
      </div>

      {base64 && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Base64 Output</h3>
            <button 
              onClick={copyToClipboard}
              className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
            >
              {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
            </button>
          </div>
          <textarea
            readOnly
            value={base64}
            className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-[10px] font-mono text-blue-600 dark:text-[#00D4B4] outline-none resize-none"
          />
        </div>
      )}
    </div>
  )
}
