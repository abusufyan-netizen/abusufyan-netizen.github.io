'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { Zap, Download, Image as ImageIcon, Trash2, Info, Check } from 'lucide-react'

export default function ImageCompressorPro() {
  const [image, setImage] = useState<string | null>(null)
  const [originalSize, setOriginalSize] = useState(0)
  const [compressedSize, setCompressedSize] = useState(0)
  const [quality, setQuality] = useState(0.8)
  const [compressedImage, setCompressedImage] = useState<string | null>(null)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setOriginalSize(file.size)
      const reader = new FileReader()
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string
        setImage(dataUrl)
        compress(dataUrl, quality)
      }
      reader.readAsDataURL(file)
    }
  }

  const compress = (dataUrl: string, q: number) => {
    const img = new window.Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      ctx?.drawImage(img, 0, 0)
      const newDataUrl = canvas.toDataURL('image/jpeg', q)
      setCompressedImage(newDataUrl)
      // Estimate size from base64
      setCompressedSize(Math.round((newDataUrl.length * 3) / 4))
    }
    img.src = dataUrl
  }

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B'
    const k = 1024
    const sizes = ['B', 'KB', 'MB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-600 dark:text-[#00D4B4]">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Professional Image Compressor</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-4 block ml-1">Compression Quality ({Math.round(quality * 100)}%)</label>
              <input
                type="range"
                min="0.1"
                max="1.0"
                step="0.05"
                value={quality}
                onChange={(e) => {
                  const q = parseFloat(e.target.value)
                  setQuality(q)
                  if (image) compress(image, q)
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-600"
              />
              <div className="flex justify-between mt-2 text-[8px] font-bold text-gray-400 uppercase tracking-widest">
                <span>Smallest File</span>
                <span>Balanced</span>
                <span>Best Quality</span>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-100 dark:border-[#1E2D47] space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Original Size</span>
                <span className="text-xs font-bold text-gray-900 dark:text-white">{formatSize(originalSize)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Compressed Size</span>
                <span className="text-xs font-bold text-orange-600">{formatSize(compressedSize)}</span>
              </div>
              <div className="pt-4 border-t border-black/5 dark:border-white/5 flex justify-between items-center">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Total Savings</span>
                <span className="text-lg font-black text-green-500">
                  {originalSize > 0 ? Math.round((1 - compressedSize / originalSize) * 100) : 0}%
                </span>
              </div>
            </div>

            {compressedImage && (
              <a 
                href={compressedImage} 
                download="compressed-image.jpg"
                className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-orange-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20"
              >
                <Download className="w-4 h-4" /> Download Compressed JPG
              </a>
            )}
          </div>

          <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-[2.5rem] p-8 border-2 border-dashed border-gray-100 dark:border-[#1E2D47] min-h-[300px]">
            {image ? (
              <div className="relative group w-full">
                <Image src={compressedImage || image} alt="Preview" className="w-full h-auto rounded-2xl shadow-2xl" width={800} height={600} unoptimized />
                <button 
                  onClick={() => { setImage(null); setCompressedImage(null); setOriginalSize(0); setCompressedSize(0) }}
                  className="absolute top-4 right-4 p-3 bg-red-500 text-white rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center cursor-pointer group">
                <div className="w-16 h-16 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform">
                  <ImageIcon className="w-8 h-8" />
                </div>
                <div className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Upload Image</div>
                <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">PNG or JPG to Compress</div>
                <input type="file" className="hidden" onChange={handleUpload} accept="image/png,image/jpeg" />
              </label>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
