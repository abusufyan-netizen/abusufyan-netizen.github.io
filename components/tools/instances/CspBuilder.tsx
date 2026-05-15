'use client'

import React, { useState, useEffect } from 'react'
import { Shield, Lock, Copy, Check, Info, Plus, Trash2 } from 'lucide-react'

export default function CspBuilder() {
  const [directives, setDirectives] = useState<{ name: string; values: string[] }[]>([
    { name: 'default-src', values: ["'self'"] },
    { name: 'script-src', values: ["'self'"] },
    { name: 'style-src', values: ["'self'", "'unsafe-inline'"] },
  ])
  const [policy, setPolicy] = useState('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    const p = directives
      .filter(d => d.values.length > 0)
      .map(d => `${d.name} ${d.values.join(' ')}`)
      .join('; ')
    setPolicy(p + ';')
  }, [directives])

  const addValue = (index: number, value: string) => {
    if (!value.trim()) return
    const newDirectives = [...directives]
    if (!newDirectives[index].values.includes(value)) {
      newDirectives[index].values.push(value)
      setDirectives(newDirectives)
    }
  }

  const removeValue = (dirIndex: number, valIndex: number) => {
    const newDirectives = [...directives]
    newDirectives[dirIndex].values.splice(valIndex, 1)
    setDirectives(newDirectives)
  }

  const addDirective = () => {
    const name = prompt("Enter directive name (e.g., img-src):")
    if (name && !directives.find(d => d.name === name)) {
      setDirectives([...directives, { name, values: ["'self'"] }])
    }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-[#00D4B4]">
              <Shield className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">CSP Policy Builder</h3>
          </div>
          <button 
            onClick={addDirective}
            className="px-4 py-2 bg-blue-500/10 text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500/20 transition-all flex items-center gap-2"
          >
            <Plus className="w-3 h-3" /> Add Directive
          </button>
        </div>

        <div className="space-y-6">
          {directives.map((dir, i) => (
            <div key={i} className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47]">
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-bold font-mono text-blue-600 dark:text-[#00D4B4]">{dir.name}</span>
                <button onClick={() => {
                  const val = prompt(`Add value to ${dir.name}:`)
                  if (val) addValue(i, val)
                }} className="text-[10px] font-black text-gray-400 hover:text-blue-600 uppercase tracking-widest">
                  + Add Source
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {dir.values.map((val, vi) => (
                  <div key={vi} className="flex items-center gap-2 px-3 py-1.5 bg-white dark:bg-[#1E2D47] border border-gray-100 dark:border-white/5 rounded-lg text-[11px] font-medium text-gray-600 dark:text-[#8A9BBE]">
                    {val}
                    <button onClick={() => removeValue(i, vi)} className="hover:text-red-500">
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white dark:bg-[#0D1526] border border-gray-100 dark:border-[#1E2D47] rounded-3xl p-8 shadow-sm group">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center text-green-500">
              <Lock className="w-5 h-5" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-widest text-gray-900 dark:text-white">Generated Policy</h3>
          </div>
          <button 
            onClick={() => {
              navigator.clipboard.writeText(policy)
              setCopied(true)
              setTimeout(() => setCopied(false), 2000)
            }}
            className="p-2 text-gray-400 hover:text-blue-500 transition-colors"
          >
            {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
          </button>
        </div>
        
        <div className="p-6 bg-gray-50 dark:bg-[#0B1120] rounded-2xl border border-gray-100 dark:border-[#1E2D47] break-all">
          <code className="text-xs font-mono text-blue-600 dark:text-[#00D4B4]">{policy}</code>
        </div>
        
        <div className="mt-6 p-4 bg-blue-500/5 rounded-xl border border-blue-500/10 flex gap-3">
          <Info className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
          <p className="text-[10px] text-gray-500 dark:text-[#8A9BBE] leading-relaxed font-medium">
            Copy this policy and add it to your server's <span className="font-mono bg-blue-500/10 px-1 rounded">Content-Security-Policy</span> header or a <span className="font-mono bg-blue-500/10 px-1 rounded">&lt;meta&gt;</span> tag to protect your site against XSS and data injection attacks.
          </p>
        </div>
      </div>
    </div>
  )
}
