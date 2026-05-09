'use client'
import React, { useState } from 'react'
import { Binary } from 'lucide-react'

export default function BinaryConverter() {
  const [input, setInput] = useState('')
  const [fromBase, setFromBase] = useState('10')
  const [results, setResults] = useState<{binary:string,decimal:string,hex:string,octal:string}>({binary:'',decimal:'',hex:'',octal:''})

  const convert = () => {
    try {
      const num = parseInt(input, parseInt(fromBase))
      if (isNaN(num)) throw new Error()
      setResults({ binary: num.toString(2), decimal: num.toString(10), hex: num.toString(16).toUpperCase(), octal: num.toString(8) })
    } catch { setResults({ binary: 'Invalid', decimal: 'Invalid', hex: 'Invalid', octal: 'Invalid' }) }
  }

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter number..." className="flex-1 p-4 font-mono bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-2xl outline-none dark:text-white" />
          <select value={fromBase} onChange={(e) => setFromBase(e.target.value)} className="p-4 bg-gray-50 dark:bg-slate-800 border border-gray-200 rounded-2xl outline-none font-bold text-gray-700 dark:text-slate-300">
            <option value="2">Binary (2)</option>
            <option value="8">Octal (8)</option>
            <option value="10">Decimal (10)</option>
            <option value="16">Hex (16)</option>
          </select>
        </div>
        <button onClick={convert} className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold hover:bg-red-700 transition-all shadow-lg mb-8 uppercase tracking-widest text-xs">Convert Now</button>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {[{l:'Binary (Base 2)',v:results.binary},{l:'Decimal (Base 10)',v:results.decimal},{l:'Hex (Base 16)',v:results.hex},{l:'Octal (Base 8)',v:results.octal}].map(r=>(
            <div key={r.l} className="p-4 bg-gray-50 dark:bg-slate-800/50 rounded-2xl border border-gray-100">
              <div className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mb-1">{r.l}</div>
              <div className="font-mono text-lg font-black text-gray-900 dark:text-white break-all">{r.v || '—'}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
