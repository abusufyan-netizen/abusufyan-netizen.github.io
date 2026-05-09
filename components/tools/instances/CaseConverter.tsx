'use client'
import React, { useState, useRef } from 'react'
import { Copy, Check } from 'lucide-react'
import ResultExporter from '../ResultExporter'

export default function CaseConverter() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)
  const convert = (fn: (s: string) => string) => setText(fn(text))
  const handleCopy = () => { navigator.clipboard.writeText(text); setCopied(true); setTimeout(() => setCopied(false), 2000) }
  const toTitleCase = (s: string) => s.replace(/\w\S*/g, t => t.charAt(0).toUpperCase() + t.substring(1).toLowerCase())
  const toSentenceCase = (s: string) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase()
  const toAlternating = (s: string) => s.split('').map((c, i) => i % 2 === 0 ? c.toLowerCase() : c.toUpperCase()).join('')
  const toSlug = (s: string) => s.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '')

  const exportRef = useRef<HTMLDivElement>(null)

  const buttons = [
    { label: 'UPPERCASE', fn: (s: string) => s.toUpperCase() },
    { label: 'lowercase', fn: (s: string) => s.toLowerCase() },
    { label: 'Title Case', fn: toTitleCase },
    { label: 'Sentence case', fn: toSentenceCase },
    { label: 'aLtErNaTiNg', fn: toAlternating },
    { label: 'slug-case', fn: toSlug },
  ]

  return (
    <div className="space-y-8">
      <div ref={exportRef} className="bg-white dark:bg-slate-900 rounded-3xl p-1">
        <textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Type or paste text here..." className="w-full h-64 p-8 bg-transparent border-none outline-none resize-none dark:text-white text-lg" />
        <div className="px-8 pb-4 flex items-center justify-between opacity-0 group-export:opacity-100">
           <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Processed via wtkpro.site</span>
        </div>
      </div>
      <div className="flex flex-wrap gap-3">
        {buttons.map(b => (
          <button key={b.label} onClick={() => convert(b.fn)} className="px-6 py-3 bg-white dark:bg-slate-800 border border-gray-200 rounded-2xl font-bold text-sm text-gray-700 dark:text-slate-300 hover:bg-gray-50 transition-all">{b.label}</button>
        ))}
        <button onClick={handleCopy} className="px-6 py-3 bg-cyan-600 text-white rounded-2xl font-bold text-sm hover:bg-cyan-700 transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/20">
          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} 
          <span>{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <ResultExporter contentRef={exportRef} toolName="Case Converter" />
    </div>
  )
}
