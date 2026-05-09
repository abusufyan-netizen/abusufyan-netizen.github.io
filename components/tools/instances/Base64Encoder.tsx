'use client'
import React, { useState } from 'react'
import { FileText, Copy, ArrowRightLeft, Check } from 'lucide-react'

export default function Base64Encoder() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [copied, setCopied] = useState(false)

  const encode = () => {
    try { setOutput(btoa(input)) } catch (err) { setOutput('Error: Invalid input') }
  }

  const decode = () => {
    try { setOutput(atob(input)) } catch (err) { setOutput('Error: Invalid Base64') }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const swap = () => { setInput(output); setOutput('') }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">Input</label>
          <textarea value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter text..." className="w-full h-72 p-6 font-mono text-sm bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-3xl outline-none resize-none dark:text-white" />
          <div className="flex gap-4">
            <button onClick={encode} className="flex-1 py-4 bg-purple-600 text-white rounded-2xl font-bold hover:bg-purple-700 transition-all shadow-lg">Encode</button>
            <button onClick={decode} className="flex-1 py-4 bg-gray-800 dark:bg-slate-700 text-white rounded-2xl font-bold hover:bg-gray-900 transition-all">Decode</button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest">Result</label>
            <div className="flex gap-2">
              <button onClick={swap} className="p-2 text-gray-400 hover:text-purple-600 rounded-xl transition-all" title="Swap"><ArrowRightLeft className="w-5 h-5" /></button>
              <button onClick={handleCopy} className="p-2 text-gray-400 hover:text-purple-600 rounded-xl transition-all">{copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}</button>
            </div>
          </div>
          <textarea readOnly value={output} placeholder="Result..." className="w-full h-72 p-6 font-mono text-sm bg-gray-900 dark:bg-slate-950 text-gray-100 dark:text-emerald-400 border border-gray-800 rounded-3xl outline-none resize-none" />
        </div>
      </div>
    </div>
  )
}
