'use client'
import React, { useState } from 'react'
import { Shield, Copy, Check } from 'lucide-react'

export default function HashGenerator() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{[k:string]:string}>({})
  const [copied, setCopied] = useState<string|null>(null)

  const generate = async () => {
    if (!input) return
    const encoder = new TextEncoder()
    const data = encoder.encode(input)
    const results: {[k:string]:string} = {}
    for (const algo of ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512']) {
      const buf = await crypto.subtle.digest(algo, data)
      results[algo] = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
    }
    setHashes(results)
  }

  const handleCopy = (key: string) => { 
    navigator.clipboard.writeText(hashes[key])
    setCopied(key)
    setTimeout(() => setCopied(null), 2000) 
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
        <textarea 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter text to hash..." 
          className="w-full h-32 p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-2xl focus:ring-2 focus:ring-slate-500 outline-none resize-none mb-4 dark:text-white" 
        />
        <button onClick={generate} className="w-full py-4 bg-slate-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-slate-900 transition-all shadow-lg mb-8">Generate Secure Hashes</button>
        {Object.keys(hashes).length > 0 && (
          <div className="space-y-4">
            {Object.entries(hashes).map(([algo, hash]) => (
              <div key={algo} className="p-5 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100 dark:border-slate-700 transition-all group">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{algo}</span>
                  <button onClick={() => handleCopy(algo)} className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1.5 font-bold transition-colors">
                    {copied===algo ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />} 
                    <span>{copied===algo ? 'Copied' : 'Copy Hash'}</span>
                  </button>
                </div>
                <div className="font-mono text-sm text-gray-600 dark:text-slate-300 break-all bg-white dark:bg-slate-900 p-3 rounded-xl border border-gray-100 dark:border-slate-800">{hash}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
