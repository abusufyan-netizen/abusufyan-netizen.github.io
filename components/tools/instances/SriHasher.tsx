'use client'

import React, { useState } from 'react'
import { Shield, Code, ArrowRight, Copy, Check, RotateCcw, AlertCircle } from 'lucide-react'

export default function SriHasher() {
  const [input, setInput] = useState('')
  const [hashes, setHashes] = useState<{ algo: string; hash: string; tag: string }[]>([])
  const [copied, setCopied] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateSri = async () => {
    setError(null)
    try {
      if (!input.trim()) return

      const enc = new TextEncoder()
      const data = enc.encode(input)
      
      const algos = ['SHA-256', 'SHA-384', 'SHA-512']
      const results = await Promise.all(algos.map(async (algo) => {
        const hashBuffer = await window.crypto.subtle.digest(algo, data)
        const hashArray = Array.from(new Uint8Array(hashBuffer))
        const base64Hash = btoa(hashArray.map(b => String.fromCharCode(b)).join(''))
        const sriValue = `${algo.toLowerCase().replace('-', '')}-${base64Hash}`
        
        return {
          algo,
          hash: base64Hash,
          tag: `<script src="your-script.js" integrity="${sriValue}" crossorigin="anonymous"></script>`
        }
      }))
      
      setHashes(results)
    } catch (err: any) {
      setError("Failed to generate SRI hash")
      setHashes([])
    }
  }

  const copyResult = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SRI Hash Generator</h2>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Subresource Integrity (SHA-256/384/512)</p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Paste your script or CSS content here..."
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={generateSri}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 transition-all hover:scale-[1.01]"
        >
          Generate Integrity Hashes
        </button>
      </div>

      {hashes.length > 0 && (
        <div className="grid grid-cols-1 gap-6">
          {hashes.map((h, i) => (
            <div key={i} className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm group">
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-600 px-3 py-1 rounded-full">{h.algo}</span>
                <button onClick={() => copyResult(h.tag, i)} className="p-2 text-gray-400 hover:text-blue-500 transition-colors">
                  {copied === i ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
              <div className="p-4 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] overflow-x-auto">
                <code className="text-xs font-mono text-gray-600 dark:text-[#8A9BBE] whitespace-nowrap">{h.tag}</code>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
