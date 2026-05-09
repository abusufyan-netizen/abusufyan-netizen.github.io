'use client'
import React, { useState, useEffect } from 'react'
import { Zap, Copy, Check, RefreshCw } from 'lucide-react'

export default function UuidV7Generator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(5)
  const [copied, setCopied] = useState<number | null>(null)

  const generateV7 = () => {
    const newUuids = []
    for (let i = 0; i < count; i++) {
      const now = Date.now()
      const random = crypto.getRandomValues(new Uint8Array(10))
      const uuid = new Uint8Array(16)
      uuid[0] = (now / 0x10000000000) & 0xff
      uuid[1] = (now / 0x100000000) & 0xff
      uuid[2] = (now / 0x1000000) & 0xff
      uuid[3] = (now / 0x10000) & 0xff
      uuid[4] = (now / 0x100) & 0xff
      uuid[5] = now & 0xff
      uuid[6] = 0x70 | (random[0] & 0x0f)
      uuid[7] = random[1]
      uuid[8] = 0x80 | (random[2] & 0x3f)
      uuid[9] = random[3]
      uuid[10] = random[4]
      uuid[11] = random[5]
      uuid[12] = random[6]
      uuid[13] = random[7]
      uuid[14] = random[8]
      uuid[15] = random[9]
      const hex = Array.from(uuid).map(b => b.toString(16).padStart(2, '0')).join('')
      const formatted = `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`
      newUuids.push(formatted)
    }
    setUuids(newUuids)
  }

  useEffect(() => {
    generateV7()
  }, [])

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text)
    setCopied(index)
    setTimeout(() => setCopied(null), 2000)
  }

  const handleCopyAll = () => {
    navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(-1)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-8">
      <div className="bg-gray-50 dark:bg-slate-900 rounded-3xl border border-gray-100 dark:border-slate-800 p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-4">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Quantity</label>
            <input 
              type="number" 
              min="1" 
              max="50" 
              value={count}
              onChange={(e) => setCount(Math.max(1, Math.min(50, parseInt(e.target.value) || 1)))}
              className="w-20 px-3 py-2 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl text-center font-bold dark:text-white"
            />
          </div>
          <div className="flex gap-3">
            <button onClick={generateV7} className="p-3 bg-white dark:bg-slate-800 text-gray-600 dark:text-slate-300 hover:text-lime-500 border border-gray-200 dark:border-slate-700 rounded-xl transition-all">
              <RefreshCw className="w-5 h-5" />
            </button>
            <button onClick={handleCopyAll} className="flex items-center gap-2 px-6 py-3 bg-lime-500 text-white font-bold rounded-xl hover:bg-lime-600 transition-all shadow-lg shadow-lime-500/20">
              {copied === -1 ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              <span>{copied === -1 ? 'All Copied' : 'Copy All'}</span>
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {uuids.map((uuid, index) => (
            <div key={index} className="group flex items-center justify-between p-4 bg-white dark:bg-slate-800 border border-gray-100 dark:border-slate-700 rounded-2xl hover:border-lime-500 transition-all">
              <code className="text-sm font-mono text-gray-600 dark:text-slate-300 break-all">{uuid}</code>
              <button onClick={() => handleCopy(uuid, index)} className={`ml-4 p-2 rounded-lg transition-all ${copied === index ? 'text-green-500' : 'text-gray-300 group-hover:text-lime-500'}`}>
                {copied === index ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
