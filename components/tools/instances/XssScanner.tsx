'use client'

import React, { useState } from 'react'
import { AlertTriangle, ShieldCheck, Search, Copy, Check, Trash2, Bug } from 'lucide-react'

export default function XssScanner() {
  const [input, setInput] = useState('')
  const [results, setResults] = useState<{ type: string; description: string; risk: 'low' | 'medium' | 'high'; payload: string }[]>([])
  const [copied, setCopied] = useState<number | null>(null)

  const scanPayload = () => {
    const findings: typeof results = []
    
    // Check for basic script tags
    if (/<script.*?>.*?<\/script>/gi.test(input)) {
      findings.push({
        type: 'Script Tag Injection',
        description: 'Detected executable <script> tags which can run arbitrary JavaScript.',
        risk: 'high',
        payload: input.match(/<script.*?>.*?<\/script>/gi)?.[0] || ''
      })
    }

    // Check for event handlers
    const eventHandlers = input.match(/on\w+="[^"]*"/gi)
    if (eventHandlers) {
      findings.push({
        type: 'Inline Event Handler',
        description: 'Detected HTML event handlers (e.g., onclick, onerror) which can be used for XSS.',
        risk: 'medium',
        payload: eventHandlers.join(', ')
      })
    }

    // Check for javascript: pseudo-protocol
    if (/javascript:/gi.test(input)) {
      findings.push({
        type: 'URI Pseudo-protocol',
        description: 'Detected "javascript:" prefix in URI which can execute code on click.',
        risk: 'high',
        payload: 'javascript:...'
      })
    }

    // Check for common payloads
    if (/(alert|prompt|confirm|eval)\(/gi.test(input)) {
      findings.push({
        type: 'Suspicious Function Call',
        description: 'Detected calls to dangerous functions like eval() or alert().',
        risk: 'medium',
        payload: input.match(/(alert|prompt|confirm|eval)\(/gi)?.[0] || ''
      })
    }

    setResults(findings)
  }

  const copyResult = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      {/* Input Area */}
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
            <Bug className="w-5 h-5 text-blue-600 dark:text-[#00D4B4]" />
          </div>
          <div>
            <h2 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Vulnerability Scanner</h2>
            <p className="text-xs text-gray-500 dark:text-[#8A9BBE] font-medium">Paste HTML or JS to analyze for XSS vectors</p>
          </div>
        </div>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="<script>alert('XSS')</script>..."
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-sm font-mono text-gray-800 dark:text-[#F0F6FF] placeholder-gray-400 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all outline-none"
        />

        <div className="flex flex-col sm:flex-row gap-4 mt-6">
          <button
            onClick={scanPayload}
            disabled={!input.trim()}
            className="flex-1 flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 disabled:opacity-50 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 transition-all active:scale-[0.98]"
          >
            <Search className="w-4 h-4" /> Analyze Input
          </button>
          <button
            onClick={() => { setInput(''); setResults([]) }}
            className="px-6 py-4 bg-gray-100 dark:bg-[#1E2D47] text-gray-600 dark:text-[#8A9BBE] rounded-xl font-bold uppercase tracking-widest text-[10px] hover:bg-gray-200 dark:hover:bg-[#253958] transition-all"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Results Area */}
      {results.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {results.map((res, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-3xl border flex flex-col md:flex-row gap-6 items-start md:items-center ${
                res.risk === 'high' 
                  ? 'bg-red-500/5 border-red-500/20' 
                  : 'bg-yellow-500/5 border-yellow-500/20'
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${
                res.risk === 'high' ? 'bg-red-500/10 text-red-500' : 'bg-yellow-500/10 text-yellow-600'
              }`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-bold text-gray-900 dark:text-white">{res.type}</h3>
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                    res.risk === 'high' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-white'
                  }`}>
                    {res.risk} Risk
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-[#8A9BBE] font-medium leading-relaxed">
                  {res.description}
                </p>
                <code className="mt-3 block p-3 bg-white/50 dark:bg-black/20 rounded-lg text-xs font-mono text-gray-500 dark:text-[#4A6080] border border-black/5 dark:border-white/5 truncate">
                  {res.payload}
                </code>
              </div>

              <button
                onClick={() => copyResult(res.payload, i)}
                className="p-3 bg-white dark:bg-white/5 rounded-xl border border-gray-100 dark:border-white/10 hover:border-blue-500/30 transition-all shrink-0"
              >
                {copied === i ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5 text-gray-400" />}
              </button>
            </div>
          ))}
        </div>
      ) : input && (
        <div className="p-12 border-2 border-dashed border-green-500/20 bg-green-500/5 rounded-3xl flex flex-col items-center text-center animate-in zoom-in duration-500">
          <div className="w-16 h-16 rounded-full bg-green-500/10 flex items-center justify-center mb-4 text-green-500">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">No XSS Vectors Detected</h3>
          <p className="text-sm text-gray-500 dark:text-[#8A9BBE] max-w-md font-medium">
            Our analysis found no common cross-site scripting patterns in the provided input. However, always ensure proper server-side sanitization.
          </p>
        </div>
      )}
    </div>
  )
}
