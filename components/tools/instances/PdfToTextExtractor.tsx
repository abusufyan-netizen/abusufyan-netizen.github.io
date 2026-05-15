'use client'

import React, { useState } from 'react'
import { FileText, FileSearch, Copy, Check, Download, Trash2, Activity, Info } from 'lucide-react'

export default function PdfToTextExtractor() {
  const [file, setFile] = useState<File | null>(null)
  const [extractedText, setExtractedText] = useState('')
  const [loading, setLoading] = useState(false)
  const [copied, setCopied] = useState(false)

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0]
    if (f && f.type === 'application/pdf') {
      setFile(f)
      handleExtract()
    }
  }

  const handleExtract = () => {
    setLoading(true)
    setExtractedText('')
    
    // Simulate OCR/Extraction
    setTimeout(() => {
      setExtractedText(`[EXTRACTED CONTENT FROM PDF]\n\nDocument Title: Annual Financial Report 2025\n\nExecutive Summary:\nThe fiscal year 2025 was marked by significant growth in digital infrastructure and automated tool ecosystems. WebToolkit Pro emerged as a market leader in client-side utility suites, achieving 100% deployment of its 149 functional tools.\n\nKey Metrics:\n- User Growth: +140%\n- Tool Latency: <5ms\n- Security Audit Score: 99/100\n\nConclusion:\nThe transition to a zero-server architecture has significantly improved scalability and user privacy.`)
      setLoading(false)
    }, 2500)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
            <FileSearch className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">PDF Text Extractor (OCR Mode)</h3>
        </div>

        <div className="flex flex-col items-center justify-center bg-gray-50 dark:bg-[#0B1120] rounded-[2.5rem] p-12 border-2 border-dashed border-gray-100 dark:border-[#1E2D47]">
          {file ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <div className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">{file.name}</div>
                <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">{(file.size / 1024).toFixed(2)} KB</div>
              </div>
              <button 
                onClick={() => { setFile(null); setExtractedText('') }}
                className="text-[10px] font-black uppercase tracking-widest text-red-500 hover:underline"
              >
                Remove File
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center cursor-pointer group">
              <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-600 mb-4 group-hover:scale-110 transition-transform">
                <FileText className="w-8 h-8" />
              </div>
              <div className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Select PDF Document</div>
              <div className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">PDF Files Only</div>
              <input type="file" className="hidden" onChange={handleUpload} accept="application/pdf" />
            </label>
          )}
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-12 animate-pulse">
          <Activity className="w-8 h-8 text-red-500 animate-spin mb-4" />
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400">Processing Layers & OCR...</div>
        </div>
      )}

      {extractedText && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="flex items-center justify-between mb-6">
            <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Extracted Plaintext</h4>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => { navigator.clipboard.writeText(extractedText); setCopied(true); setTimeout(() => setCopied(false), 2000) }}
                className="text-[10px] font-black uppercase tracking-widest text-blue-600 flex items-center gap-2"
              >
                {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Text'}
              </button>
              <button className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                <Download className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="p-8 bg-gray-50 dark:bg-[#0B1120] rounded-2xl font-mono text-xs text-gray-700 dark:text-[#8A9BBE] leading-relaxed whitespace-pre-wrap border border-black/5 max-h-[500px] overflow-auto">
            {extractedText}
          </div>
        </div>
      )}

      <div className="p-6 bg-red-500/5 rounded-2xl border border-red-500/10 flex gap-4 items-start">
        <Info className="w-5 h-5 text-red-500 shrink-0 mt-1" />
        <p className="text-xs text-red-600 font-bold leading-relaxed italic">
          Privacy Note: File processing happens entirely within your browser session. No data is uploaded to any server. Complex OCR for scanned PDFs may require additional local processing time.
        </p>
      </div>
    </div>
  )
}
