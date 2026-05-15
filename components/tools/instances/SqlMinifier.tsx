'use client'

import React, { useState } from 'react'
import { Database, Zap, Copy, Check, RotateCcw } from 'lucide-react'

export default function SqlMinifier() {
  const [sql, setSql] = useState('')
  const [minified, setMinified] = useState('')
  const [copied, setCopied] = useState(false)

  const minifySql = () => {
    const res = sql
      .replace(/--.*$/gm, '') // Remove single line comments
      .replace(/\/\*[\s\S]*?\*\//g, '') // Remove multi-line comments
      .replace(/\s+/g, ' ') // Collapse whitespace
      .replace(/\s*([,()=<>!])\s*/g, '$1') // Remove spaces around operators
      .trim()
    setMinified(res)
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
            <Database className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">SQL Input</h3>
        </div>

        <textarea
          value={sql}
          onChange={(e) => setSql(e.target.value)}
          placeholder="SELECT * FROM users\nWHERE id = 1;\n-- Get user by ID"
          className="w-full h-48 p-6 bg-gray-50 dark:bg-[#0B1120] border border-gray-100 dark:border-[#1E2D47] rounded-2xl text-xs font-mono text-gray-800 dark:text-[#F0F6FF] outline-none"
        />

        <button
          onClick={minifySql}
          className="w-full mt-6 py-4 bg-blue-600 text-white rounded-xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-blue-500/20 hover:scale-[1.01] transition-all flex items-center justify-center gap-2"
        >
          <Zap className="w-4 h-4" /> Minify SQL
        </button>
      </div>

      {minified && (
        <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400">Minified SQL</h3>
            <button onClick={() => { navigator.clipboard.writeText(minified); setCopied(true); setTimeout(() => setCopied(false), 2000) }} className="p-2 text-gray-400">
              {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
          <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-xl border border-gray-100 dark:border-[#1E2D47] break-all">
            <code className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{minified}</code>
          </div>
        </div>
      )}
    </div>
  )
}
