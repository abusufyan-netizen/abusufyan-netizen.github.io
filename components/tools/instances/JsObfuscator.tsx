'use client'

import React, { useState } from 'react'
import { ShieldAlert, Zap, Copy, Check, RotateCcw } from 'lucide-react'

export default function JsObfuscator() {
  const [code, setCode] = useState('')
  const [obfuscated, setObfuscated] = useState('')
  const [copied, setCopied] = useState(false)

  const obfuscate = () => {
    // Basic base64 + eval obfuscation for demonstration
    const encoded = btoa(code)
    const result = `eval(atob('${encoded}'));`
    setObfuscated(result)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center text-red-600">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">JavaScript Source</h3>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="function secret() {\n  console.log('Top Secret');\n}"
          className="w-full h-64 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={obfuscate}
          className="w-full mt-6 py-4 bg-red-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-red-500/20 hover:scale-[1.01] transition-all"
        >
          Obfuscate Code
        </button>
      </div>

      {obfuscated && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Obfuscated Output</h3>
            <button onClick={() => { navigator.clipboard.writeText(obfuscated); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] break-all">
            <code className="text-xs font-mono text-red-600 dark:text-red-400">{obfuscated}</code>
          </div>
        </div>
      )}
    </div>
  )
}
