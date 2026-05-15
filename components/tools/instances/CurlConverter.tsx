'use client'

import React, { useState } from 'react'
import { Terminal, ArrowRight, Copy, Check, RotateCcw } from 'lucide-react'

export default function CurlConverter() {
  const [curl, setCurl] = useState('')
  const [fetchCode, setFetchCode] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToFetch = () => {
    const urlMatch = curl.match(/curl\s+["']?(https?:\/\/[^"'\s]+)/i)
    const methodMatch = curl.match(/-X\s+(\w+)/i) || curl.match(/--request\s+(\w+)/i)
    
    if (!urlMatch) {
      setFetchCode('// Invalid cURL command')
      return
    }

    const url = urlMatch[1]
    const method = methodMatch ? methodMatch[1] : 'GET'
    
    let code = `fetch("${url}", {\n`
    code += `  method: "${method}",\n`
    code += `  headers: {\n`
    
    const headers = curl.matchAll(/-H\s+["']?([^"']+)["']?/gi)
    for (const h of headers) {
      const [k, v] = h[1].split(/:\s*/)
      code += `    "${k}": "${v}",\n`
    }
    
    code += `  }\n`
    code += `}).then(res => res.json())\n  .then(console.log);`
    
    setFetchCode(code)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Terminal className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">cURL Command</h3>
        </div>

        <textarea
          value={curl}
          onChange={(e) => setCurl(e.target.value)}
          placeholder="curl -X POST https://api.example.com -H 'Content-Type: application/json'"
          className="w-full h-32 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={convertToFetch}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          Convert to Fetch <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {fetchCode && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">JavaScript Fetch</h3>
            <button onClick={() => { navigator.clipboard.writeText(fetchCode); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47]">
            <pre className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{fetchCode}</pre>
          </div>
        </div>
      )}
    </div>
  )
}
