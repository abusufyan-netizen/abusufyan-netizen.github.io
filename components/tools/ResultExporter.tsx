'use client'
import React, { useRef, useState } from 'react'
import { Download, Share2, Loader2, Check } from 'lucide-react'
import { toPng } from 'html-to-image'
import confetti from 'canvas-confetti'

interface ResultExporterProps {
  contentRef: React.RefObject<HTMLElement>
  toolName: string
}

export default function ResultExporter({ contentRef, toolName }: ResultExporterProps) {
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)

  const handleExport = async () => {
    if (!contentRef.current) return
    
    setExporting(true)
    try {
      // Allow DOM to settle
      await new Promise(r => setTimeout(r, 100))
      
      const dataUrl = await toPng(contentRef.current, {
        cacheBust: true,
        backgroundColor: '#ffffff',
        style: {
           padding: '40px',
           borderRadius: '20px'
        }
      })
      
      const link = document.createElement('a')
      link.download = `wtkpro-${toolName.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.png`
      link.href = dataUrl
      link.click()
      
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2563eb', '#4f46e5', '#7c3aed']
      })
      
      setDone(true)
      setTimeout(() => setDone(false), 3000)
    } catch (err) {
      console.error('Export failed:', err)
      alert('Failed to export image. Please try again.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="mt-8 pt-8 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6">
      <div className="text-left">
        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-1 flex items-center gap-2">
          <Share2 className="w-4 h-4 text-blue-600" /> Save & Share Result
        </h4>
        <p className="text-xs text-gray-500 dark:text-slate-400 leading-relaxed">
          Download your branded result as a high-quality PNG image for documentation or sharing.
        </p>
      </div>

      <button
        onClick={handleExport}
        disabled={exporting}
        className={`relative flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm transition-all shadow-lg active:scale-95 disabled:opacity-50 ${
          done 
            ? 'bg-green-600 text-white' 
            : 'bg-slate-900 dark:bg-blue-600 text-white hover:bg-black dark:hover:bg-blue-700 shadow-blue-500/10'
        }`}
      >
        {exporting ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Generating...</span>
          </>
        ) : done ? (
          <>
            <Check className="w-4 h-4" />
            <span>Downloaded!</span>
          </>
        ) : (
          <>
            <Download className="w-4 h-4" />
            <span>Download Result</span>
          </>
        )}
      </button>
    </div>
  )
}
